export class MoveInput {
    public timestamp: number
    public direction: number
    public speed: number
    // public start_x_pos: number
    // public start_y_pos: number

    constructor(input: {
        timestamp: number,
        direction: number,
        speed: number,
        // start_x_pos: number,
        // start_y_pos: number
    }) {
        this.timestamp = input.timestamp
        this.direction = input.direction
        this.speed = input.speed
        // this.start_x_pos = input.start_x_pos
        // this.start_y_pos = input.start_y_pos
    }
}

enum AgentType {
    PEDESTRIAN = 'pedestrian',
    CAR = 'car',
    CYCLIST = 'bicycle'
}

export class Agent {
    private motions: Array<MoveInput> = [];
    public readonly initial_x_pos: number
    public readonly initial_y_pos: number
    public readonly initial_timestamp: number
    public final_timestamp: number = -1
    public readonly id: string
    public agent_type: AgentType

    constructor(parameters: any[]) {
        if (parameters.length != 5) {
            throw new TypeError('Each agent has to have exactly five arguments')
        }
        this.id = parameters[0] as string;
        this.initial_x_pos = parameters[2] as number
        this.initial_y_pos = parameters[3] as number
        this.initial_timestamp = parameters[1] as number

        if (Object.values<string>(AgentType).includes(parameters[4])) {
            this.agent_type = parameters[4] as AgentType
        } else {
            const error = new TypeError('The agent type has to be part of the enum')
            console.log(parameters[4])
            console.error(error)
            throw error
        }
    }

    public move(moveInput: MoveInput): Agent {
        // TODO: check if next position is the same as last_position + time * last_direction

        // set latest timestamp as final timestamp
        this.final_timestamp = moveInput.timestamp

        // TODO: transform meter to pixels
        this.motions.push(moveInput)
        return this
    }

    public get_positions(last_timestamp: number): Array<{x: number, y: number} | null> {
        const positions: Array<{x: number, y: number} | null> = []
        
        let motions_index = 0
        let x_direction = 0, y_direction = 0
        let speed = 0
        let x_pos = this.initial_x_pos
        let y_pos = this.initial_y_pos
        
        for (let timestamp = 0; timestamp <= last_timestamp; timestamp++) {
            if (this.motions.length == 0 || timestamp < this.initial_timestamp) {
                positions.push(null);
            } else {
                positions.push({
                    x: x_pos,
                    y: y_pos
                })

                if (motions_index < this.motions.length && timestamp == this.motions[motions_index].timestamp) {
                    const current_motion = this.motions[motions_index]
                    const radian = current_motion.direction * (Math.PI / 180)
                    x_direction = Math.cos( radian )
                    y_direction = Math.sin( radian )
                    speed = current_motion.speed
                    motions_index += 1
                }

                x_pos += x_direction * speed
                y_pos += y_direction * speed
            }
        }

        return positions
    }
}