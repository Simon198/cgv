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
    const [[agents, error], setState] = useState<[Agent[] | null, string | undefined]>([null, undefined])
    useEffect(() => {
        try {
            const grammar = parse(text)
            setState([[], undefined])
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
                next: (results) => {
                    return setState([results.map(result => result.value), undefined])
                },
                error: (error) => {
                    setState([null, error.message])
                },
            })
            return () => subscription.unsubscribe()
        } catch (error: any) {
            console.error(error)
            setState([null, error.message])
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
                    {/* {agents} */}
                    <AgentVisualizer agents={agents} />
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
                            agents == null ? (
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
