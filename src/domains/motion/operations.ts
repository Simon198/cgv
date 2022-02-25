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
                    const agent = inputs[0]
                    const moveInput = new MoveInput({
                        timestamp: inputs[1],
                        direction: inputs[2],
                        speed: inputs[3]
                    })
                    return of( move(agent, moveInput) )
                },
                (values) => values,
                parameters
            )
        )
    }
}