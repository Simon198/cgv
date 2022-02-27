import { Canvas, useLoader } from "@react-three/fiber"
import { Agent } from "cgv/domains/motion/agent"
import { RefObject, Suspense, useEffect, useRef, useState } from "react"
import { Vector3, BufferGeometry, WebGLRenderer, Scene, LineBasicMaterial, Line, PerspectiveCamera, TextureLoader, Mesh, PlaneBufferGeometry, MeshBasicMaterial } from "three"
import img from '../public/pedestrian.png'

export function AgentVisualizer({ positions, maximum_timestamp }: { positions: null | (Array<Array<{x: number, y: number} | null>>), maximum_timestamp: number }) {
    let camera_z_position = 10;
    const canvasRef: RefObject<HTMLCanvasElement> | null = useRef<HTMLCanvasElement>(null)
    const camera = new PerspectiveCamera()
    camera.position.set(0, 0, camera_z_position)
    camera.lookAt( 0, 0, 0 );

    const onWheel = (event: any) => {
        camera_z_position = Math.max(1, camera_z_position - event.nativeEvent.wheelDelta / 10)
        camera.position.set(0, 0, camera_z_position)
    }
  
    useEffect(() => {
        console.log('USE EFFECT')
        if (canvasRef == null) {
            return
        }
        const canvas = canvasRef.current as HTMLCanvasElement
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
        let scene = new Scene();

        let animationFrameId: number | null = null;
        function render() {
            animationFrameId = requestAnimationFrame(render);
            renderer.render( scene, camera );
        };

        let timeout: NodeJS.Timeout | null = null
        let frame_number = 0
        function next_frame() {
            timeout = setTimeout(() => {
                if (frame_number == 0) {
                    scene = new Scene()
                }
                console.log('Frame', frame_number + 1, maximum_timestamp - 1)
                for (const agent_positions of positions as ({
                    x: number;
                    y: number;
                } | null)[][]) {
    
                    let points: Vector3[] = []
                    for (const position of agent_positions.slice(0, frame_number+2))  {
                        if (position != null) {
                            points.push(new Vector3(position.x, position.y, 0))
                        }
                    }
                    
                    const line_material = new LineBasicMaterial({color: 0xaaaaaa});
                    const line_geometry = new BufferGeometry().setFromPoints( points );
                    const line = new Line( line_geometry, line_material );
                    scene.add( line );
                }
                frame_number += 1
                if (frame_number < maximum_timestamp - 1) {
                    next_frame()
                }
            }, 2000)
        }

        render()
        if (positions != null && maximum_timestamp > -1) {
            next_frame()
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
        <div onWheel={onWheel} style={{height: "100%", width: "100%"}}>
            <Canvas ref={canvasRef}>
            </Canvas>
        </div>
    )
}
