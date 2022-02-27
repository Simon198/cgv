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
    private parameters = new Map<AgentParameters, MoveInput>();
    private positions: Array<{x: number, y: number} | null> = [];
    
    public last_agent_parameters: AgentParameters | null

    public readonly id: string
    public agent_type: AgentType

    public prev_agent: Agent | null

    constructor(id: string, agent_parameters: AgentParameters, agent_type: string, prev_agent: Agent | null) {
        this.id = id;
        this.last_agent_parameters = agent_parameters
        this.prev_agent = prev_agent

        if (Object.values<string>(AgentType).includes(agent_type)) {
            this.agent_type = agent_type as AgentType
        } else {
            const error = new Error('The agent type has to be part of the enum')
            console.error(error)
            throw error
        }
    }

    public update_agent_parameters(parameters: AgentParameters) {
        this.last_agent_parameters = parameters
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

    private get_next_positions(number_positions: number, agent_parameters: AgentParameters, move_input: MoveInput) {
        const result = []
        const [speed, x_direction, y_direction] = this.get_move_information(move_input)
        for (let time = 0; time < number_positions; time++) {
            const distance = time * speed
            result.push({
                x: agent_parameters.x + distance * x_direction,
                y: agent_parameters.y + distance * y_direction
            })
        }
        return result
    }

    private fill_positions(prev_parameters: AgentParameters, prev_move_input: MoveInput, current_parameters: AgentParameters) {
        // get intermediate positions between the two parameters
        const duration = current_parameters.timestamp - prev_parameters.timestamp
        const next_positions = this.get_next_positions(duration + 1, prev_parameters, prev_move_input)
        
        // check if the position of current_parameters is valid
        const real_position = next_positions[next_positions.length - 1]
        if ( Math.sqrt((real_position.x - current_parameters.x)**2 + (real_position.y - current_parameters.y)**2) > 0.1 ) {
            throw new Error(
                `The positions of agent ${this.id} at timestamp ${current_parameters.timestamp} should be (${[real_position.x, real_position.y]}),` + 
                `instead of (${[current_parameters.x, current_parameters.y]})`
            )
        }

        // add positions
        for (const position of next_positions.slice(0, -1)) {
            this.add_position(position.x, position.y)
        }
        // this.add_position(current_parameters.x, current_parameters.y)
    }

    public complete_positions(last_timestamp: number) {
        this.positions = []

        // sort parameters by their timestamp
        const sorted_parameters = Array.from(this.parameters.keys()).sort((a, b) => a.timestamp - b.timestamp)

        // fill initial positions with null
        for (let i = 0; i < sorted_parameters[0].timestamp; i++) {
            this.positions.push(null)
        }

        // set posit along this.parameters
        for (let i = 1; i < sorted_parameters.length; i++) {
            const prev_agent_parameters = sorted_parameters[i - 1]
            const prev_motion = this.parameters.get(prev_agent_parameters) as MoveInput
            const current_agent_parameters = sorted_parameters[i]
            if (current_agent_parameters.timestamp == prev_agent_parameters.timestamp) {
                throw new Error(`The timestamp ${prev_agent_parameters.timestamp} has been set twice for ${this.agent_type}_${this.id}`)
            }

            this.fill_positions(prev_agent_parameters, prev_motion, current_agent_parameters)
        }

        // add remaining positions until last_timestamp
        const last_agent_parameters = sorted_parameters[sorted_parameters.length - 1]
        const last_motion = this.parameters.get(last_agent_parameters) as MoveInput
        const next_positions = this.get_next_positions(last_timestamp - last_agent_parameters.timestamp, last_agent_parameters, last_motion)
        for (const position of next_positions) {
            this.add_position(position.x, position.y)
        }
        return this.positions
    }

    public move(moveInput: MoveInput): Agent {
        if (this.last_agent_parameters == null) {
            throw new Error(`last_agent_parameters for ${this.agent_type}_${this.id} cannot be empty`)
        }
        this.parameters.set(this.last_agent_parameters, moveInput)
        this.last_agent_parameters = null
        return this
    }

    public get_positions() {
        return this.positions
    }

    public get_last_timestamp(): number {
        return Math.max(...Array.from(this.parameters.keys()).map(par => par.timestamp))
    }
}