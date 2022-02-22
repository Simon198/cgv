export class MoveInput {
    constructor(
        public agent_id: number,
        public timestamp: number,
        public direction: number,
        public speed: number,
        public start_x_pos: number,
        public start_y_pos: number,
        public duration: number
    ) {}
}

export class Agent {
    public motions: Array<any> = [];

    constructor(public readonly id: number) {}

    public move(parameters: any): Agent {
        this.motions.push(parameters)
        return this
    }
}