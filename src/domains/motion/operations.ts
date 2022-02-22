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
                    const moveInput = new MoveInput(
                        inputs[1],
                        inputs[2],
                        inputs[3],
                        inputs[4],
                        inputs[5],
                        inputs[6],
                        inputs[7]
                    )
                    return of( move(agent, moveInput) )
                },
                (values) => values,
                parameters
            )
        )
    }
}