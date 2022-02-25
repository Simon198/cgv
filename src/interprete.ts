import { defer, delay, map, merge, MonoTypeOperatorFunction, Observable, of, OperatorFunction, shareReplay } from "rxjs"
import {
    asChangeSet,
    changesToMatrix,
    mapMatrix,
    Matrix,
    mergeMatrixOperators,
    ParsedGrammarDefinition,
    ParsedStep,
    ParsedSymbol,
} from "."
import { Agent } from "./domains/motion/agent"

export type EventDepthMap = Readonly<{ [identifier in string]?: number }>

export type Parameters = Readonly<{ [identifier in string]?: Observable<any> }>

export type Operation<T> = (
    parameters: Array<OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>>>
) => OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>>

export type Operations = {
    "+": Operation<number>
    "-": Operation<number>
    "/": Operation<number>
    "*": Operation<number>
    "%": Operation<number>
    "!-": Operation<number>
    "!": Operation<boolean>
    "&&": Operation<boolean>
    "||": Operation<number>
    "<": Operation<any>
    "<=": Operation<any>
    "==": Operation<any>
    "!=": Operation<any>
    if: Operation<any>
    switch: Operation<any>
    select: Operation<any>
    index: Operation<number>
    getVariable: Operation<any>
    setVariable: Operation<any>
    return: Operation<any>
    random: Operation<number>
} & {
    [name in string]?: Operation<any>
}

export type InterpretionValue<T> = Readonly<{
    value: T
    eventDepthMap: EventDepthMap
    terminated: boolean
    parameters: Parameters
}>

export function is_agent_symbol(symbol: ParsedSymbol) {
    return symbol.identifier.includes('[')
}

export function get_agent_id(symbol: ParsedSymbol) {
    let [symbol_name, parameters] = symbol.identifier.split('[')
    const [agent_type, agent_id] = symbol_name.split('_')

    // remove remaining ']'
    parameters = parameters.slice(0, -1)
    
    return [agent_id, agent_type, parameters.split(',').map(parameter => parseFloat(parameter))]
}

export function interprete<T>(
    grammar: ParsedGrammarDefinition,
    operations: Operations
): OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> {

    const rules = Object.values(grammar)
    if (rules.length === 0) {
        return (input) => input
    }
    const ruleOperatorMap = new Map<
        string,
        { ref: OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> | undefined }
    >()

    // iterate over leftsymbols of grammar to initialize agents
    const agents: {[id: string]: {agent: Agent, step: ParsedStep}} = {}
    for (const rule of rules) {
        const symbol = rule.symbol

        if (is_agent_symbol(symbol)) {
            const [agent_id, agent_type, parameters] = get_agent_id(symbol)

            if (!Object.keys(agents).includes(agent_id as string)) {
                agents[agent_id as string] = {
                    agent: new Agent([agent_id, ...parameters, agent_type]),
                    step: rule.step
                }
            }
        }
    }

    // iterate over steps all initialization rules of each 
    const completed_agents: string[] = []
    const result: OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>>[] = []
    for (const [agent_id, agent] of Object.entries(agents)) {
        if (completed_agents.includes(agent_id)) {
            continue
        }
        completed_agents.push(agent_id)
        const tmp = interpreteStep<T>(agent.agent, agent.step, grammar, operations, ruleOperatorMap, completed_agents)
        if (tmp) {
            result.push(tmp)
        }
    }
    return (input) => {
        const t = Array(result.length).fill(null)
        for (let i = 0; i < result.length; i++) {
            const subscription = result[i](input).pipe().subscribe({
                next: (a) => {
                    if (t[i] == null) {
                        while (Array.isArray(a)) {
                            a = a[0]
                        }
                        t[i] = a
                    }
                },
                error: (error) => {
                    throw error;
                },
            })
            subscription.unsubscribe()
        }
        return of(t)
    }
}

export function interpreteStep<T>(
    agent: Agent,
    step: ParsedStep,
    grammar: ParsedGrammarDefinition,
    operations: Operations,
    ruleOperatorMap: Map<
        string,
        { ref: OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> | undefined }
    >,
    completed_agents: string[]
): OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> {
    switch (step.type) {
        case "operation":
            const operation = operations[step.identifier]
            if (operation == null) {
                throw new Error(`unknown operation "${step.identifier}"`)
            }
            return operation(
                step.parameters.map((parameter) => interpreteStep(agent, parameter, grammar, operations, ruleOperatorMap, completed_agents))
            )
        case "parallel":
            return mergeMatrixOperators(
                step.steps.map((stepOfSteps) => interpreteStep(agent, stepOfSteps, grammar, operations, ruleOperatorMap, completed_agents))
            )
        case "raw": {
            return (matrix) =>
                matrix.pipe(
                    map((matrix) =>
                        mapMatrix(
                            (index, value) => ({
                                ...value,
                                value: step.value,
                            }),
                            matrix
                        )
                    )
                )
        }
        case "sequential":
            return (input) => {
                let current = input
                const terminated: Array<Observable<Matrix<InterpretionValue<T>>>> = []
                for (const stepOfSteps of step.steps) {
                    const sharedCurrent = current.pipe(
                        //delay(10),
                        shareReplay({
                            refCount: true,
                            bufferSize: 1,
                        })
                    )
                    terminated.push(sharedCurrent.pipe(filterTerminated(true)))
                    current = sharedCurrent.pipe(
                        filterTerminated(false),
                        interpreteStep(agent, stepOfSteps, grammar, operations, ruleOperatorMap, completed_agents)
                    )
                }

                return merge(...[current, ...terminated].map((matrix, i) => matrix.pipe(asChangeSet([i])))).pipe(
                    changesToMatrix<Matrix<InterpretionValue<T>>>()
                )
            }
        case "this":
            return () => of({
                value: agent,
                eventDepthMap: {},
                terminated: false,
                parameters: []
            })
        case "symbol":
            let entry = ruleOperatorMap.get(step.identifier)
            if (entry == null) {
                const rule = grammar[step.identifier]
                
                if (is_agent_symbol(step)) {
                    const [agent_id, agent_type, parameters] = get_agent_id(step)
                    if ( !completed_agents.includes(agent_id as string) ) {
                        completed_agents.push(agent_id as string)
                        if (agent_id != agent.id) {
                            agent = new Agent([agent_id, ...parameters, agent_type])
                        }
                    }
                }

                if (rule == null) {
                    throw new Error(`unknown rule "${step.identifier}"`)
                }
                entry = { ref: undefined }
                ruleOperatorMap.set(step.identifier, entry)
                entry.ref = interpreteStep(agent, rule.step, grammar, operations, ruleOperatorMap, completed_agents)
            }
            return (value) => defer(() => value.pipe(entry!.ref!))
    }
}

function filterTerminated<T>(terminated: boolean): MonoTypeOperatorFunction<Matrix<InterpretionValue<T>>> {
    return map((matrix) => mapMatrix((i, element) => (element.terminated === terminated ? element : undefined), matrix))
}
