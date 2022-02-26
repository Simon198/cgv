import { operations as defaultOperations } from ".."
import { Observable, of, OperatorFunction } from "rxjs"
import { createMatrixFromArray, Matrix, operationInterpretion, Operations, Operation, thisParameter, InterpretionValue } from "../.."
import { Agent, MoveInput } from "./agent"

function move(agent: Agent, moveInput: MoveInput): any {
    agent.move(moveInput)
    return agent
}

export const operations: Operations = {
    ...defaultOperations,
    move: (parameters) => (matrix) => {
        return matrix.pipe(
            operationInterpretion(
                (inputs) => {
                    if (inputs.length != 3) {
                        throw new Error('"move" has to receive exactly two parameters')
                    }
                    const agent = inputs[0]
                    const moveInput = new MoveInput({
                        direction: inputs[1],
                        speed: inputs[2]
                    })
                    return of( move(agent, moveInput) )
                },
                (values) => values,
                [thisParameter, ...parameters]
            )
        )
    }
}