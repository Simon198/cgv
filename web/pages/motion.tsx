import Head from "next/head"
import React, { useEffect, useState } from "react"
import { parse, interprete, matrixToArray } from "cgv"
import { operations } from "cgv/domains/motion"
import { Agent } from "cgv/domains/motion/agent"
import { interval, map, NEVER, of, startWith } from "rxjs"
import { useMapbox } from "../src/use-mapbox"
import { useInterpretion } from "../src/use-interpretion"
import { AgentVisualizer } from "../src/agent-visualizer"

export default function Index() {
    // const initial_agent = new Agent(0)

    const [text, setText] = useState("")
    const [[[positions, maximum_timestamp], error], setState] = useState<[[null | (Array<Array<{x: number, y: number} | null>>), number], string | undefined]>([[null, -1], undefined])
    useEffect(() => {
        try {
            const grammar = parse(text)
            setState([[[], -1], undefined])
            const subscription = of(() => {}).pipe(
                map((value) => {
                    return {
                        value,
                        eventDepthMap: {},
                        parameters: {},
                        terminated: false,
                    }
                }),
                interprete(grammar, operations),
            ).subscribe({
                next: (results: any) => {
                    if (Array.isArray(results)) {
                        while (Array.isArray(results)) {
                            results = results[0]
                        }

                        // parse results
                        const agents = []
                        let current_agent: Agent | null = results.value
                        while (current_agent != null) {
                            if (current_agent instanceof Agent) {
                                agents.push(current_agent)
                            }
                            current_agent = current_agent.prev_agent
                        }

                        // get maximal timestamp of all agents
                        // idea: start_timestamp = 0 to maximal timestamp
                        try {
                            const maximum_timestamp = 2 + Math.max(...agents.map((agent) => agent.get_last_timestamp()))
                            const positions = agents.map(agent => agent.complete_positions(maximum_timestamp))
                            setState([[positions, maximum_timestamp], undefined])
                        } catch (error) {
                            setState([[null, -1], (error as Error).message])
                        }
                    } else {
                        setState([[[], -1], undefined])
                    }
                },
                error: (error) => {
                    setState([[null, -1], (error as Error).message])
                },
            })
            return () => subscription.unsubscribe()
        } catch (error: any) {
            setState([[null, -1], (error as Error).message])
        }
    }, [text])

    // TODO: add option to change datasets

    return (
        <>
            <Head>
                <title>CGV | Editor</title>
                <meta name="description" content=""></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="d-flex responsive-flex-direction" style={{ width: "100vw", height: "100vh" }}>
                <div style={{ whiteSpace: "pre-line" }} className="p-3 flex-basis-0 flex-grow-1 bg-white h3 mb-0">
                    <AgentVisualizer positions={positions} maximum_timestamp={maximum_timestamp} />
                </div>
                <div className="d-flex flex-column flex-basis-0 flex-grow-1">
                    <textarea
                        style={{ resize: "none", outline: 0 }}
                        value={text}
                        spellCheck={false}
                        onChange={(e) => setText(e.target.value)}
                        className="overflow-auto p-3 flex-basis-0 h3 mb-0 text-light border-0 bg-dark flex-grow-1"
                    />
                    <div
                        className="overflow-auto p-3 flex-basis-0 h3 mb-0 bg-black flex-grow-1"
                        style={{ whiteSpace: "pre-line", maxHeight: 300 }}>
                        {error == null ? (
                            positions == null ? (
                                <span className="text-primary">loading ...</span>
                            ) : (
                                <span className="text-success">ok</span>
                            )
                        ) : (
                            <span className="text-danger">{error}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
