import { Canvas } from "@react-three/fiber"
import { Agent } from "cgv/domains/motion/agent"
import { RefObject, useEffect, useRef, useState } from "react"
import { Vector3, BufferGeometry, WebGLRenderer, Scene, LineBasicMaterial, Line, PerspectiveCamera } from "three"

export function AgentVisualizer({ agents }: { agents: Agent[] | null }) {
    // const [[object, error], setState] = useState<[any, string | undefined]>([undefined, undefined])

    const canvasRef: RefObject<HTMLCanvasElement> | null = useRef<HTMLCanvasElement>(null)
    const camera = new PerspectiveCamera()
    camera.position.set(0, 0, 10)
    camera.lookAt( 0, 0, 0 );
  
    useEffect(() => {
        if (canvasRef == null) {
            return
        }
        const canvas = canvasRef.current as HTMLCanvasElement
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
        let scene = new Scene();
        const material = new LineBasicMaterial({
            color: 0xaaaaaa
        });

        let animationFrameId: number | null = null;
        function render() {
            animationFrameId = requestAnimationFrame(render);
            renderer.render( scene, camera );
        };

        let timeout: NodeJS.Timeout | null = null
        let frame_number = 0
        function next_frame(agents: Agent[], maximum_timestamp: number) {
            timeout = setTimeout(() => {
                if (frame_number == 0) {
                    scene = new Scene()
                }
                console.log('Frame', frame_number + 1, maximum_timestamp)
                for (const agent_positions of positions) {
    
                    let points: Vector3[] = []
                    for (const position of agent_positions.slice(0, frame_number+2))  {
                        if (position != null) {
                            points.push(new Vector3(position.x, position.y, 0))
                        }
                    }
                    
                    const geometry = new BufferGeometry().setFromPoints( points );
                    
                    const line = new Line( geometry, material );
                    scene.add( line );
                }
                frame_number = ((frame_number + 1) % (maximum_timestamp))
                next_frame(agents, maximum_timestamp)
            }, 2000)
        }

        if (agents != null) {
            // get maximal timestamp of all agents
            // idea: start_timestamp = 0 to maximal timestamp
            const maximum_timestamp = Math.max(...agents.map((agent) => agent.last_agent_parameters.timestamp)) + 1
            agents.map(agent => agent.complete_positions(maximum_timestamp))
            var positions = agents.map(agent => agent.get_positions())
            
            if (maximum_timestamp > -1) {
                render()
                next_frame(agents, maximum_timestamp)
            }
        }

        return () => {
            if (animationFrameId != null) {
                cancelAnimationFrame(animationFrameId)
            }
            if (timeout != null) {
                clearTimeout(timeout)
            }
        }
    }, [canvasRef, camera])

    return (
        <Canvas ref={canvasRef}>
        </Canvas>
    )
}
