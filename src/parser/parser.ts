// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
    return d[0]
}
declare let ws: any
declare let identifier: any
declare let arrow: any
declare let parallel: any
declare let thisSymbol: any
declare let returnSymbol: any
declare let openBracket: any
declare let closedBracket: any
declare let openSquaredBracket: any
declare let closedSquaredBracket: any
declare let comma: any
declare let js: any
declare let boolean: any
declare let string: any
declare let number: any
declare let int: any
declare let point: any
declare let equal: any
declare let ifSymbol: any
declare let thenSymbol: any
declare let elseSymbol: any
declare let switchSymbol: any
declare let caseSymbol: any
declare let colon: any
declare let or: any
declare let and: any
declare let not: any
declare let unequal: any
declare let smaller: any
declare let smallerEqual: any
declare let greater: any
declare let greaterEqual: any
declare let plus: any
declare let minus: any
declare let divide: any
declare let multiply: any
declare let modulo: any

import moo from "moo"
import { ParsedRaw, ParsedSymbol } from "."

const lexer = moo.compile({
    returnSymbol: /return/,
    thisSymbol: /this/,
    ifSymbol: /if/,
    thenSymbol: /then/,
    elseSymbol: /else/,
    switchSymbol: /switch/,
    caseSymbol: /case/,
    arrow: /->/,
    openBracket: /\(/,
    closedBracket: /\)/,
    openSquaredBracket: /\[/,
    closedSquaredBracket: /\]/,
    point: /\./,
    comma: /,/,
    colon: /:/,
    smallerEqual: /<=/,
    greaterEqual: />=/,
    smaller: /</,
    greater: />/,
    equal: /==/,
    unequal: /!=/,
    and: /&&/,
    or: /\|\|/,
    not: /!/,
    parallel: /\|/,
    int: /0[Xx][\da-fA-F]+|0[bB][01]+/,
    number: /-?\d+(?:\.\d+)?/,
    string: /"[^"]*"/,
    boolean: /true|false/,
    plus: /\+/,
    minus: /-/,
    multiply: /\*/,
    modulo: /%/,
    divide: /\//,
    identifier: /[A-Za-z]+(?:_[0-9]+)?(?:\[(?:\s*(?:[+-])?\d+(?:\.\d*)?\s*,)*\s*(?:[+-])?\d+(?:\.\d*)?\s*\])?/,
    // identifier: /[A-Za-z]+(?:_[0-9]+)?/,
    ws: { match: /\s+/, lineBreaks: true },
})

interface NearleyToken {
    value: any
    [key: string]: any
}

interface NearleyLexer {
    reset: (chunk: string, info: any) => void
    next: () => NearleyToken | undefined
    save: () => any
    formatError: (token: never) => string
    has: (tokenType: string) => boolean
}

interface NearleyRule {
    name: string
    symbols: NearleySymbol[]
    postprocess?: (d: any[], loc?: number, reject?: {}) => any
}

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean }

interface Grammar {
    Lexer: NearleyLexer | undefined
    ParserRules: NearleyRule[]
    ParserStart: string
}

export function is_agent_symbol(symbol_identifier: string) {
    return symbol_identifier.includes('[')
}

export function get_agent_id(symbol_identifier: string): ParsedRaw[] {
    let [symbol_name, parameters] = symbol_identifier.split('[')
    const [agent_type, agent_id] = symbol_name.split('_')

    // remove remaining ']'
    parameters = parameters.slice(0, -1)

    const raw_parameters: ParsedRaw[] = [
        {
            type: 'raw',
            value: agent_id
        }
    ]
    for (const par of parameters.split(',')) {
        raw_parameters.push({
            type: 'raw',
            value: parseFloat(par)
        })
    }
    raw_parameters.push({
        type: 'raw',
        value: agent_type
    })
    
    return raw_parameters
}

const grammar: Grammar = {
    Lexer: lexer,
    ParserRules: [
        {
            name: "GrammarDefinition",
            symbols: ["ws", "RuleDefinition", "ws"],
            postprocess: ([, [symbol, step], ]) => ([{
                    symbol: symbol,
                    step: step
                }
            ])
        },
        {
            name: "GrammarDefinition",
            symbols: ["ws", "RuleDefinition", lexer.has("ws") ? { type: "ws" } : ws, "GrammarDefinition"],
            postprocess: ([, [symbol, step], , prev]) => ([{
                    symbol: symbol,
                    step: step
                },
                ...prev
            ])
        },
        { name: "GrammarDefinition", symbols: ["ws"], postprocess: () => ([]) },
        {
            name: "RuleDefinition",
            symbols: [
                "Symbol",
                "ws",
                lexer.has("arrow") ? { type: "arrow" } : arrow,
                "ws",
                "Steps",
            ],
            postprocess: ([value, , , , steps]) => [value, steps],
        },
        { name: "Steps", symbols: ["ParallelSteps"], postprocess: ([steps]) => steps },
        { name: "EmptySteps", symbols: ["ParallelSteps"], postprocess: ([steps]) => steps },
        { name: "EmptySteps", symbols: [], postprocess: () => ({ type: "raw", value: [] }) },
        { name: "ParallelSteps$ebnf$1", symbols: ["ParallelStep"] },
        {
            name: "ParallelSteps$ebnf$1",
            symbols: ["ParallelSteps$ebnf$1", "ParallelStep"],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: "ParallelSteps",
            symbols: ["SequentialSteps", "ParallelSteps$ebnf$1"],
            postprocess: ([sequential, sequentials]) => ({ type: "parallel", steps: [sequential, ...sequentials] }),
        },
        { name: "ParallelSteps", symbols: ["SequentialSteps"], postprocess: ([sequential]) => sequential },
        {
            name: "ParallelStep",
            symbols: ["ws", lexer.has("parallel") ? { type: "parallel" } : parallel, "SequentialSteps"],
            postprocess: ([, , sequential]) => sequential,
        },
        { name: "SequentialSteps$ebnf$1", symbols: ["SequentialStep"] },
        {
            name: "SequentialSteps$ebnf$1",
            symbols: ["SequentialSteps$ebnf$1", "SequentialStep"],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: "SequentialSteps",
            symbols: ["PrimarySteps", "SequentialSteps$ebnf$1"],
            postprocess: ([primary, primaries]) => ({ type: "sequential", steps: [primary, ...primaries] }),
        },
        { name: "SequentialSteps", symbols: ["PrimarySteps"], postprocess: ([primary]) => primary },
        {
            name: "SequentialStep",
            symbols: [lexer.has("ws") ? { type: "ws" } : ws, "PrimarySteps"],
            postprocess: ([, primary]) => primary,
        },
        { name: "PrimarySteps", symbols: ["ws", "BasicOperation"], postprocess: ([, operation]) => operation },
        { name: "Step", symbols: ["Operation"], postprocess: ([operation]) => operation },
        { name: "Step", symbols: ["Symbol"], postprocess: ([symbol]) => symbol },
        {
            name: "Step",
            symbols: [lexer.has("thisSymbol") ? { type: "thisSymbol" } : thisSymbol],
            postprocess: () => ({ type: "this" }),
        },
        { name: "Step", symbols: ["GetVariable"], postprocess: ([getVariable]) => getVariable },
        { name: "Step", symbols: ["Constant"], postprocess: ([value]) => ({ type: "raw", value }) },
        { name: "Step", symbols: ["ConditionalOperation"], postprocess: ([operation]) => operation },
        {
            name: "Step",
            symbols: [lexer.has("returnSymbol") ? { type: "returnSymbol" } : returnSymbol],
            postprocess: () => ({ type: "operation", parameters: [], identifier: "return" }),
        },
        {
            name: "Step",
            symbols: [
                lexer.has("openBracket") ? { type: "openBracket" } : openBracket,
                "Steps",
                "ws",
                lexer.has("closedBracket") ? { type: "closedBracket" } : closedBracket,
            ],
            postprocess: ([, steps]) => steps,
        },
        {
            name: "Operation",
            symbols: [
                lexer.has("identifier") ? { type: "identifier" } : identifier,
                lexer.has("openBracket") ? { type: "openBracket" } : openBracket,
                "EmptyParameters",
                "ws",
                lexer.has("closedBracket") ? { type: "closedBracket" } : closedBracket,
            ],
            postprocess: ([{ value }, , parameters]) => ({ type: "operation", parameters, identifier: value }),
        },
        { name: "EmptyParameters", symbols: ["Parameters"], postprocess: ([parameters]) => parameters },
        { name: "EmptyParameters", symbols: [], postprocess: () => [] },
        { name: "Parameters$ebnf$1", symbols: ["Parameter"] },
        {
            name: "Parameters$ebnf$1",
            symbols: ["Parameters$ebnf$1", "Parameter"],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: "Parameters",
            symbols: ["Steps", "Parameters$ebnf$1"],
            postprocess: ([steps, stepsList]) => [steps, ...stepsList],
        },
        { name: "Parameters", symbols: ["Steps"], postprocess: ([steps]) => [steps] },
        {
            name: "Parameter",
            symbols: ["ws", lexer.has("comma") ? { type: "comma" } : comma, "Steps"],
            postprocess: ([, , steps]) => steps,
        },
        // {
        //     name: "Symbol",
        //     symbols: [
        //         lexer.has("identifier") ? { type: "identifier" } : identifier,
        //         lexer.has("openSquaredBracket") ? { type: "openSquaredBracket" } : openSquaredBracket,
        //         "EmptyParameters",
        //         "ws",
        //         lexer.has("closedSquaredBracket") ? { type: "closedSquaredBracket" } : closedSquaredBracket,
        //     ],
        //     postprocess: ([{ value }, , parameters]) => {
        //         const [agent_type, agent_id] = value.split('_')
        //         parameters.unshift({ type: 'raw', value: agent_id})
        //         parameters.push({ type: 'raw', value: agent_type})
        //         return { type: "symbol", identifier: value, parameters }
        //     },
        // },
        {
            name: "Symbol",
            symbols: [lexer.has("identifier") ? { type: "identifier" } : identifier],
            postprocess: ([{ value }]) => {
                let parameters: ParsedRaw[] = [];
                if (is_agent_symbol(value)) {
                    parameters = get_agent_id(value)
                }
                return { type: "symbol", identifier: value, parameters }
            },
        },
        {
            name: "JS",
            symbols: [lexer.has("js") ? { type: "js" } : js],
            postprocess: ([{ value }]) => eval((value as string).replace(/"([^"]+)"/, (_, fn) => fn)),
        },
        { name: "ws", symbols: [lexer.has("ws") ? { type: "ws" } : ws] },
        { name: "ws", symbols: [] },
        {
            name: "Constant",
            symbols: [lexer.has("boolean") ? { type: "boolean" } : boolean],
            postprocess: ([{ value }]) => value === "true",
        },
        {
            name: "Constant",
            symbols: [lexer.has("string") ? { type: "string" } : string],
            postprocess: ([{ value }]) => value.slice(1, -1),
        },
        {
            name: "Constant",
            symbols: [lexer.has("number") ? { type: "number" } : number],
            postprocess: ([{ value }]) => Number.parseFloat(value),
        },
        {
            name: "Constant",
            symbols: [lexer.has("int") ? { type: "int" } : int],
            postprocess: ([{ value }]) => Number.parseInt(value),
        },
        {
            name: "Variable",
            symbols: [
                lexer.has("thisSymbol") ? { type: "thisSymbol" } : thisSymbol,
                lexer.has("point") ? { type: "point" } : point,
                lexer.has("identifier") ? { type: "identifier" } : identifier,
            ],
            postprocess: ([, , identifier]) => ({ type: "raw", value: identifier }),
        },
        {
            name: "GetVariable",
            symbols: ["Variable"],
            postprocess: ([name]) => ({ type: "operation", parameters: [name], identifier: "getVariable" }),
        },
        {
            name: "SetVariable",
            symbols: ["Variable", "ws", lexer.has("equal") ? { type: "equal" } : equal, "ws", "Step"],
            postprocess: ([name, , , , step]) => ({
                type: "operation",
                parameters: [name, step],
                identifier: "setVariable",
            }),
        },
        { name: "ConditionalOperation", symbols: ["IfThenElseOperation"], postprocess: ([value]) => value },
        { name: "ConditionalOperation", symbols: ["SwitchOperation"], postprocess: ([value]) => value },
        {
            name: "IfThenElseOperation",
            symbols: [
                lexer.has("ifSymbol") ? { type: "ifSymbol" } : ifSymbol,
                lexer.has("ws") ? { type: "ws" } : ws,
                "Step",
                lexer.has("ws") ? { type: "ws" } : ws,
                lexer.has("thenSymbol") ? { type: "thenSymbol" } : thenSymbol,
                lexer.has("ws") ? { type: "ws" } : ws,
                "Step",
                lexer.has("ws") ? { type: "ws" } : ws,
                lexer.has("elseSymbol") ? { type: "elseSymbol" } : elseSymbol,
                lexer.has("ws") ? { type: "ws" } : ws,
                "Step",
            ],
            postprocess: ([, , value, , , , ifOperation, , , , elseOperation]) => ({
                type: "operation",
                parameters: [value, ifOperation, elseOperation],
                identifier: "if",
            }),
        },
        { name: "SwitchOperation$ebnf$1", symbols: ["SwitchCase"] },
        {
            name: "SwitchOperation$ebnf$1",
            symbols: ["SwitchOperation$ebnf$1", "SwitchCase"],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: "SwitchOperation",
            symbols: [
                lexer.has("switchSymbol") ? { type: "switchSymbol" } : switchSymbol,
                lexer.has("ws") ? { type: "ws" } : ws,
                "Step",
                "SwitchOperation$ebnf$1",
            ],
            postprocess: ([, , value, cases]) => ({
                type: "operation",
                parameters: [value, ...cases.reduce((v1: Array<any>, v2: Array<any>) => v1.concat(v2))],
                identifier: "switch",
            }),
        },
        {
            name: "SwitchCase",
            symbols: [
                lexer.has("ws") ? { type: "ws" } : ws,
                lexer.has("caseSymbol") ? { type: "caseSymbol" } : caseSymbol,
                lexer.has("ws") ? { type: "ws" } : ws,
                "Step",
                lexer.has("colon") ? { type: "colon" } : colon,
                "ws",
                "Step",
            ],
            postprocess: ([, , , value, , , operation]) => [value, operation],
        },
        { name: "BasicOperation", symbols: ["BooleanOperation"], postprocess: ([value]) => value },
        { name: "BooleanOperation", symbols: ["OrOperation"], postprocess: ([value]) => value },
        {
            name: "OrOperation",
            symbols: ["OrOperation", "ws", lexer.has("or") ? { type: "or" } : or, "ws", "AndOperation"],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "||" }),
        },
        { name: "OrOperation", symbols: ["AndOperation"], postprocess: ([value]) => value },
        {
            name: "AndOperation",
            symbols: ["AndOperation", "ws", lexer.has("and") ? { type: "and" } : and, "ws", "NegateOperation"],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "&&" }),
        },
        { name: "AndOperation", symbols: ["NegateOperation"], postprocess: ([value]) => value },
        {
            name: "NegateOperation",
            symbols: [lexer.has("not") ? { type: "not" } : not, "ws", "NegateOperation"],
            postprocess: ([, , value]) => ({ type: "operation", parameters: [value], identifier: "!" }),
        },
        { name: "NegateOperation", symbols: ["ComparisonOperation"], postprocess: ([value]) => value },
        { name: "ComparisonOperation", symbols: ["EquityOperation"], postprocess: ([value]) => value },
        { name: "EquityOperation", symbols: ["EqualOperation"], postprocess: ([value]) => value },
        { name: "EquityOperation", symbols: ["UnequalOperation"], postprocess: ([value]) => value },
        { name: "EquityOperation", symbols: ["RelationalOperation"], postprocess: ([value]) => value },
        {
            name: "EqualOperation",
            symbols: [
                "EquityOperation",
                "ws",
                lexer.has("equal") ? { type: "equal" } : equal,
                "ws",
                "RelationalOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "==" }),
        },
        {
            name: "UnequalOperation",
            symbols: [
                "EquityOperation",
                "ws",
                lexer.has("unequal") ? { type: "unequal" } : unequal,
                "ws",
                "RelationalOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "!=" }),
        },
        { name: "RelationalOperation", symbols: ["SmallerOperation"], postprocess: ([value]) => value },
        { name: "RelationalOperation", symbols: ["SmallerEqualOperation"], postprocess: ([value]) => value },
        { name: "RelationalOperation", symbols: ["GreaterOperation"], postprocess: ([value]) => value },
        { name: "RelationalOperation", symbols: ["GreaterEqualOperation"], postprocess: ([value]) => value },
        { name: "RelationalOperation", symbols: ["ArithmeticOperation"], postprocess: ([value]) => value },
        {
            name: "SmallerOperation",
            symbols: [
                "RelationalOperation",
                "ws",
                lexer.has("smaller") ? { type: "smaller" } : smaller,
                "ws",
                "ArithmeticOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "<" }),
        },
        {
            name: "SmallerEqualOperation",
            symbols: [
                "RelationalOperation",
                "ws",
                lexer.has("smallerEqual") ? { type: "smallerEqual" } : smallerEqual,
                "ws",
                "ArithmeticOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "<=" }),
        },
        {
            name: "GreaterOperation",
            symbols: [
                "RelationalOperation",
                "ws",
                lexer.has("greater") ? { type: "greater" } : greater,
                "ws",
                "ArithmeticOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op2, op1], identifier: "<" }),
        },
        {
            name: "GreaterEqualOperation",
            symbols: [
                "RelationalOperation",
                "ws",
                lexer.has("greaterEqual") ? { type: "greaterEqual" } : greaterEqual,
                "ws",
                "ArithmeticOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op2, op1], identifier: "<=" }),
        },
        { name: "ArithmeticOperation", symbols: ["LineOperation"], postprocess: ([value]) => value },
        { name: "LineOperation", symbols: ["AddOperation"], postprocess: ([value]) => value },
        { name: "LineOperation", symbols: ["SubtractOperation"], postprocess: ([value]) => value },
        { name: "LineOperation", symbols: ["PointOperation"], postprocess: ([value]) => value },
        {
            name: "AddOperation",
            symbols: ["LineOperation", "ws", lexer.has("plus") ? { type: "plus" } : plus, "ws", "PointOperation"],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "+" }),
        },
        {
            name: "SubtractOperation",
            symbols: ["LineOperation", "ws", lexer.has("minus") ? { type: "minus" } : minus, "ws", "PointOperation"],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "-" }),
        },
        { name: "PointOperation", symbols: ["MultiplyOperation"], postprocess: ([value]) => value },
        { name: "PointOperation", symbols: ["DivideOperation"], postprocess: ([value]) => value },
        { name: "PointOperation", symbols: ["ModuloOperation"], postprocess: ([value]) => value },
        { name: "PointOperation", symbols: ["InvertOperation"], postprocess: ([value]) => value },
        {
            name: "DivideOperation",
            symbols: [
                "PointOperation",
                "ws",
                lexer.has("divide") ? { type: "divide" } : divide,
                "ws",
                "InvertOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "/" }),
        },
        {
            name: "MultiplyOperation",
            symbols: [
                "PointOperation",
                "ws",
                lexer.has("multiply") ? { type: "multiply" } : multiply,
                "ws",
                "InvertOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "*" }),
        },
        {
            name: "ModuloOperation",
            symbols: [
                "PointOperation",
                "ws",
                lexer.has("modulo") ? { type: "modulo" } : modulo,
                "ws",
                "InvertOperation",
            ],
            postprocess: ([op1, , , , op2]) => ({ type: "operation", parameters: [op1, op2], identifier: "%" }),
        },
        {
            name: "InvertOperation",
            symbols: [lexer.has("minus") ? { type: "minus" } : minus, "ws", "InvertOperation"],
            postprocess: ([, , value]) => ({ type: "operation", parameters: [value], identifier: "!-" }),
        },
        { name: "InvertOperation", symbols: ["Step"], postprocess: ([value]) => value },
    ],
    ParserStart: "GrammarDefinition",
}

export default grammar
