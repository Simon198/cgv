import { Grammar, Parser } from "nearley"
import grammar from "./parser"

const G = Grammar.fromCompiled(grammar)

export function parse(text: string): ParsedGrammarDefinition {
    const parser = new Parser(G)
    parser.feed(text)
    if (parser.results.length === 0) {
        throw new Error("unexpected end of input")
    }
    return parser.results[0]
}

export type ParsedStep =
    | ParsedParallelValues
    | ParsedSequantialValues
    | ParsedOperation
    | ParsedSymbol
    | ParsedRaw
    | ParsedThis

export type ParsedParallelValues = {
    type: "parallel"
    steps: Array<ParsedStep>
}

export type ParsedSequantialValues = {
    type: "sequential"
    steps: Array<ParsedStep>
}

export type ParsedOperation = {
    type: "operation"
    parameters: Array<ParsedStep>
    identifier: string
}

export type ParsedSymbol = {
    type: "symbol"
    identifier: string
}

export type ParsedRaw = {
    type: "raw"
    value: any
}
export type ParsedThis = {
    type: "this"
}
export type ParsedReturn = {
    type: "return"
}

export type ParsedGrammarDefinition = {
    [symbol: string]: {
        symbol: ParsedSymbol,
        step: ParsedStep
    }
}
