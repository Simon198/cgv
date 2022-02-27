export class MoveInput {
    // public timestamp: number
    public direction: number
    public speed: number
    // public start_x_pos: number
    // public start_y_pos: number

    constructor(input: {
        // timestamp: number,
        direction: number,
        speed: number,
        // start_x_pos: number,
        // start_y_pos: number
    }) {
        // this.timestamp = input.timestamp
        this.direction = input.direction
        this.speed = input.speed
        // this.start_x_pos = input.start_x_pos
        // this.start_y_pos = input.start_y_pos
    }
}

export class AgentParameters {
    public timestamp: number
    public x: number
    public y: number
    constructor(parameters: number[]) {
        if (parameters.length != 3) {
            throw new Error('AgentParameters needs exactly three parameters')
        }
        this.timestamp = parameters[0]
        this.x = parameters[1]
        this.y = parameters[2]
    }
}

enum AgentType {
    PEDESTRIAN = 'pedestrian',
    CAR = 'car',
    CYCLIST = 'biker'
}

export class Agent {
    private motions: Array<MoveInput> = [];
    private positions: Array<{x: number, y: number} | null> = [];
    
    public readonly initial_agent_parameters: AgentParameters

    public last_agent_parameters: AgentParameters
    public last_move_input: MoveInput | null = null;

    public readonly id: string
    public agent_type: AgentType

    constructor(id: string, agent_parameters: AgentParameters, agent_type: string) {
        this.id = id;
        this.initial_agent_parameters = agent_parameters
        this.last_agent_parameters = this.initial_agent_parameters

        if (Object.values<string>(AgentType).includes(agent_type)) {
            this.agent_type = agent_type as AgentType
        } else {
            const error = new Error('The agent type has to be part of the enum')
            console.error(error)
            throw error
        }

        for (let i = 0; i < this.initial_agent_parameters.timestamp; i++) {
            this.positions.push(null)
        }
        this.add_position(this.initial_agent_parameters.x, this.initial_agent_parameters.y)
    }

    private get_move_information(move_input: MoveInput) {
        const radian = move_input.direction * (Math.PI / 180)
        const speed = move_input.speed
        const x_direction = Math.cos( radian )
        const y_direction = Math.sin( radian )
        return [speed, x_direction, y_direction]
    }

    private add_position(x: number, y: number) {
        // TODO: transform meter to pixels
        this.positions.push({
            x, y
        })
    }

    public update_agent_parameters(parameters: AgentParameters) {
        if (this.last_move_input == null) {
            throw new Error(`You have to call "move" before you can set the next timestamp of agent ${this.id} to ${parameters.timestamp}`)
        }
        if (this.last_agent_parameters.timestamp >= parameters.timestamp) {
            throw new Error(`The next timestamp ${parameters.timestamp} has to be larger than the previous timestamp ${this.last_agent_parameters.timestamp} for agent ${this.id}`)
        }
        // check if valid next position
        const duration = parameters.timestamp - this.last_agent_parameters.timestamp
        
        const move_input = this.last_move_input as MoveInput
        const [speed, x_direction, y_direction] = this.get_move_information(move_input)

        const distance = duration * speed
        const real_x = this.last_agent_parameters.x + distance * x_direction
        const real_y = this.last_agent_parameters.y + distance * y_direction

        if ( Math.sqrt((real_x - parameters.x)**2 + (real_y - parameters.y)**2) > 0.1 ) {
            throw new Error(
                `The positions of agent ${this.id} at timestamp ${parameters.timestamp} should be ${[real_x, real_y]},` + 
                `instead of ${[parameters.x, parameters.y]}`
            )
        }

        // add missing positions
        for (let time = 1; time < parameters.timestamp - this.last_agent_parameters.timestamp; time++) {
            const distance = time * speed
            this.add_position(
                this.last_agent_parameters.x + distance * x_direction,
                this.last_agent_parameters.y + distance * y_direction
            )
        }
        this.add_position(parameters.x, parameters.y)

        // update last agent parameters
        this.last_agent_parameters = parameters
    }

    public complete_positions(last_timestamp: number) {
        if (this.last_move_input == null) {
            throw new Error(`You have to call "move" at least once for agent ${this.id}`)
        }
        const [speed, x_direction, y_direction] = this.get_move_information(this.last_move_input)
        for (let time = 1; time <= last_timestamp - this.last_agent_parameters.timestamp; time++) {
            const distance = time * speed
            this.add_position(
                this.last_agent_parameters.x + distance * x_direction,
                this.last_agent_parameters.y + distance * y_direction
            )
        }

        // update last agent parameters in case complete_positions is called multiple times
        const last_position = this.positions[this.positions.length - 1] as {x: number, y: number}
        this.last_agent_parameters = new AgentParameters([
            last_timestamp,
            last_position.x,
            last_position.y
        ])
    }

    public move(moveInput: MoveInput): Agent {
        this.last_move_input = moveInput
        this.motions.push(moveInput)
        return this
    }

    public get_positions() {
        return this.positions
    }
}