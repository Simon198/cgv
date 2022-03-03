import Head from "next/head"
import React, { useEffect, useState } from "react"
import { interval, map, NEVER, of, startWith } from "rxjs"
import { useMapbox } from "../src/use-mapbox"
import { useInterpretion } from "../src/use-interpretion"
import { AgentVisualizer } from "../src/agent-visualizer"

export default function Index() {
    // const initial_agent = new Agent(0)

    let [compile, setCompile] = useState(false)
    const [text, setText] = useState("")
    const [rule_index, setIndex] = useState(-1)
    const [[rules, error], setState] = useState<[Array<object>, string | undefined]>([[], undefined])
    useEffect(() => {
        if (!compile) {
            return
        }
        try {
            setCompile(false)
            console.log('compile', compile)
            fetch(`http://localhost:8000/compile?input=${text}`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                    'Access-Control-Allow-Credentials': 'true'
                }
            })
                .then(resp => {
                    if(!resp.ok){
                        throw new Error('' + resp.status);
                    } else {
                        resp.json().then(result => {
                            if (result.length > 0) {
                                console.log('RESULT', result)
                                const rules = result.map(rule => <div key={rule}>rule</div>)
                                console.log('RULES', rules)
                                setState(result)
                            }
                        })
                    }
                })
                .catch(error => console.error(error))
                // .then(response => response.json())
                // .then(data => setState({ totalReactPackages: data.total }));
        } catch (error: any) {
            const message  = (error as Error).message
            setState([[], message])
            alert(message)
        }
    }, [compile, text, rule_index, rules])

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
                    {text}
                </div>
                <div className="d-flex flex-column flex-basis-0 flex-grow-1">
                    <textarea
                        style={{ resize: "none", outline: 0 }}
                        value={text}
                        spellCheck={false}
                        onChange={(e) => setText(e.target.value)}
                        className="overflow-auto p-3 flex-basis-0 h3 mb-0 text-light border-0 bg-dark flex-grow-1"
                    />
                    <button onClick={(e) => setCompile(true)}>Compile</button>
                    <div>
                        {rules}
                    </div>

                    {/* <div
                        className="overflow-auto p-3 flex-basis-0 h3 mb-0 bg-black flex-grow-1"
                        style={{ whiteSpace: "pre-line", maxHeight: 300 }}>
                        {error == null ? (
                            rules == null ? (
                                <span className="text-primary">loading ...</span>
                            ) : (
                                <span className="text-success">ok</span>
                            )
                        ) : (
                            <span className="text-danger">{error}</span>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    )
}
