import { defer, delay, map, merge, MonoTypeOperatorFunction, Observable, of, OperatorFunction, shareReplay } from "rxjs"
import {
    asChangeSet,
    changesToMatrix,
    // LeftHandSymbol,
    mapMatrix,
    Matrix,
    mergeMatrixOperators,
    operationInterpretion,
    ParsedGrammarDefinition,
    ParsedStep,
    ParsedSymbol,
    thisParameter,
} from "."
import { Agent, AgentParameters } from "./domains/motion/agent"
import { is_agent_symbol } from "./parser/parser"

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

function merge_observables(observables: Observable<any>[]): Observable<any> {
    const single_observable = Array(observables.length).fill(null)
    for (let i = 0; i < observables.length; i++) {
        const subscription = observables[i].pipe().subscribe({
            next: (result) => {
                if (single_observable[i] == null) {
                    while (Array.isArray(result)) {
                        result = result[0]
                    }
                    single_observable[i] = result
                }
            },
            error: (error) => {
                throw error;
            },
        })
        subscription.unsubscribe()
    }
    return of(single_observable)
}

export function interprete<T>(
    grammar: ParsedGrammarDefinition,
    operations: Operations
): OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> {

    if (grammar.length === 0) {
        return (input) => input
    }
    const ruleOperatorMap = new Map<string,
        { ref: OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> | undefined }
    >()

    let index = 0;
    const result: Observable<any>[] = []
    const iterate = (input: Observable<Matrix<Readonly<{
        value: T;
        eventDepthMap: Readonly<{
            [x: string]: number | undefined;
        }>;
        terminated: boolean;
        parameters: Readonly<{
            [x: string]: Observable<any> | undefined;
        }>;
    }>>>): Observable<Matrix<Readonly<{
        value: T;
        eventDepthMap: Readonly<{
            [x: string]: number | undefined;
        }>;
        terminated: boolean;
        parameters: Readonly<{
            [x: string]: Observable<any> | undefined;
        }>}>>> => {

        if (index == grammar.length) {
            return merge_observables(result)
        }

        const rule = grammar[index++]
        const symbol = rule.symbol
        const step = rule.step

        if (ruleOperatorMap.has(symbol.identifier)) {
            return iterate(input)
        }

        const interpretedStep = interpreteStep(symbol, grammar, operations, ruleOperatorMap)(input)
        result.push(interpretedStep)
        return iterate(
            interpretedStep.pipe()
        )
    }
    return iterate
}

export function interpreteStep<T>(
    step: ParsedStep,
    grammar: ParsedGrammarDefinition,
    operations: Operations,
    ruleOperatorMap: Map<string,
        { ref: OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> | undefined }
    >
): OperatorFunction<Matrix<InterpretionValue<T>>, Matrix<InterpretionValue<T>>> {
    switch (step.type) {
        case "operation":
            const operation = operations[step.identifier]
            if (operation == null) {
                throw new Error(`unknown operation "${step.identifier}"`)
            }
            return operation(
                step.parameters.map((parameter) => interpreteStep(parameter, grammar, operations, ruleOperatorMap))
            )
        case "parallel":
            return mergeMatrixOperators(
                step.steps.map((stepOfSteps) => interpreteStep(stepOfSteps, grammar, operations, ruleOperatorMap))
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
                        shareReplay({
                            refCount: true,
                            bufferSize: 1,
                        })
                    )
                    terminated.push(sharedCurrent.pipe(filterTerminated(true)))
                    current = sharedCurrent.pipe(
                        filterTerminated(false),
                        interpreteStep(stepOfSteps, grammar, operations, ruleOperatorMap)
                    )
                }

                return merge(...[current, ...terminated].map((matrix, i) => matrix.pipe(asChangeSet([i])))).pipe(
                    changesToMatrix<Matrix<InterpretionValue<T>>>()
                )
            }
        case "this":
            return (input) => input
        case "symbol":
            let entry = ruleOperatorMap.get(step.identifier)
            if (!entry) {
                const rule = grammar.find(rule => rule.symbol.identifier == step.identifier)
                if (!rule) {
                    throw new Error(`Rule ${step.identifier} not found`)
                }

                entry = { ref: undefined }
                ruleOperatorMap.set(step.identifier, entry)

                if (is_agent_symbol(step.identifier)) {
                    const get_agent: Operation<any> = (parameters) => (matrix) => {
                        return matrix.pipe(
                            operationInterpretion(
                                (inputs) => {
                                    const previous_agent: Agent = inputs[0]
                                    const agent_id = inputs[1]

                                    const agent_parameters = new AgentParameters([
                                        inputs[2], inputs[3], inputs[4]
                                    ])
                                    const agent_type = inputs[5]

                                    if (!agent_id) {
                                        throw new Error(`The id of the agent ${step.identifier} cannot be empty`)
                                    }

                                    if (!previous_agent || previous_agent.id != agent_id) {
                                        // TODO: probably add motions of previous agent to the new one
                                        const agent = new Agent(agent_id, agent_parameters, agent_type)
                                        return of(agent)
                                    } else {
                                        previous_agent.update_agent_parameters(agent_parameters)
                                        return of(previous_agent)
                                    }
                                },
                                (values) => values,
                                [thisParameter, ...parameters]
                            )
                        )
                    }
                    const agent_operator = get_agent(
                        step.parameters.map((parameter) => interpreteStep(parameter, grammar, operations, ruleOperatorMap))
                    )
                    const interpretedStep = interpreteStep(rule.step, grammar, operations, ruleOperatorMap)
                    entry.ref = interpretedStep
                    return (input) => agent_operator(input).pipe(
                        interpretedStep
                    )
                } else  {
                    entry.ref = interpreteStep(rule.step, grammar, operations, ruleOperatorMap)
                }
            }
            return (value) => defer(() => value.pipe(entry!.ref!))
    }
}

function filterTerminated<T>(terminated: boolean): MonoTypeOperatorFunction<Matrix<InterpretionValue<T>>> {
    return map((matrix) => mapMatrix((i, element) => (element.terminated === terminated ? element : undefined), matrix))
}
