import Head from "next/head"
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import 'rc-slider/assets/index.css';
import TooltipSlider from "../src/tool-tip-slider"

export default function Index() {
    // const initial_agent = new Agent(0)

    const address = 'http://localhost:8000/'

    // let [compile, setCompile] = useState(false)
    // const [nextStep, setNextStep] = useState(false)
    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [rule_index, setIndex] = useState({previous: -1, current: -1})
    const [dataset_options, setDatasetOptions] = useState([] as object[])
    const [dataset_option, setDatasetOption] = useState(null)
    const [range, setRange] = useState([0, 50])
    const [frame_range, setFrameRange] = useState([0, 20])


    const [[rules, error], setState] = useState<[JSX.Element[], string | undefined]>([[], undefined])

    function nextStep() {
        setIndex({
            previous: rule_index.current,
            current: rule_index.current + 1
        })
    }

    function onClick(index: number) {
        return () => {
            setIndex({
                previous: rule_index.current,
                current: index
            })
        }
    }

    function createRules(rule_strings: string[]) {
        const rules = rule_strings.map((rule, index) =>
        <div className={"rules" + ((index == rule_index.current) ? ' highlight':'')} key={rule} onClick={onClick(index)}>{rule}</div>)
        setState([rules, undefined])
    }

    function updateRules() {
        const new_rules = rules.map((rule, index) => {
            const key = rule.key
            const className = "rules" + ((index == rule_index.current) ? ' highlight':'')
            return <div className={className} key={key} onClick={onClick(index)}>{key}</div>
        })
        setState([new_rules, undefined])
    }

    function selectOption(option) {
        setDatasetOption(option)
        setRange([option.value.start_frame, option.value.end_frame])
    }

    async function fetchCompile() {
        try {
            const resp = await fetch(`${address}compile?input=${encodeURIComponent(text)}`)
            if(!resp.ok){
                const response = await resp.text()
                throw new Error(response);
            }
            const response = await resp.json()
            if (response.length && response.length > 0) {
                createRules(response as string[])
            } else {
                setState([[], undefined])
            }
            setIndex({
                current: rule_index.current,
                previous: -1
            })
        } catch (error: any) {
            const message  = (error as Error).message
            alert(message)
            setState([[], undefined])
            setImage('')
        }
    }

    async function fetchImage(index: number) {
        if (dataset_option == null) {
            return
        }
        try{
            const option = dataset_option.value
            const resp = await fetch(`${address}get_image`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    'name': option.dataset_name,
                    'rule_index': index,
                    'kwargs': option.kwargs
                })
            });
            if(!resp.ok){
                const response = await resp.text()
                throw new Error(response);
            }
            const reader = await (resp.body as any).getReader();

            let chunks: any = [];
            reader.read().then(
                function processText({ done, value }: any): any {
                if (done) {
                    const blob = new Blob([chunks], { type: "image/png" });
                    setImage(URL.createObjectURL(blob));
                    return
                }

                const tempArray = new Uint8Array(chunks.length + value.length);
                tempArray.set(chunks);
                tempArray.set(value, chunks.length);
                chunks = tempArray

                return reader.read().then(processText)
            })
        } catch (error: any) {
            const message  = (error as Error).message
            alert(message)
            setState([[], undefined])
            setImage('')
        }
    }

    async function fetchDatasetOptions() {
        try {
            const resp = await fetch(`${address}dataset_options`)
            if(!resp.ok){
                const response = await resp.text()
                throw new Error(response);
            }
            const response = await resp.json()
            if (response.length && response.length > 0) {
                const select_options = response.map((option: any) => { return {
                    label: option.display_name,
                    value: option
                }})
                setDatasetOptions(select_options)
            } else {
                setDatasetOptions([])
            }
        } catch (error: any) {
            const message  = (error as Error).message
            alert(message)
            setDatasetOptions([])
        }
    }

    async function fetchRules() {
        if (dataset_option == null) {
            return
        }
        const option: any = dataset_option.value
        try {
            const resp = await fetch(`${address}get_rules`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    'name': option.dataset_name,
                    'start_frame': frame_range[0],
                    'end_frame': frame_range[1],
                    'kwargs': option.kwargs
                })
            })
            if(!resp.ok){
                const response = await resp.text()
                throw new Error(response);
            }
            const response = await resp.json()
            if (response.length && response.length > 0) {
                setText(response)
            } else {
                setText('')
            }
        } catch (error: any) {
            const message  = (error as Error).message
            alert(message)
            setText('')
        }
    }

    useEffect(() => {
        if (dataset_options.length == 0) {
            fetchDatasetOptions()
        }
        
        if (rule_index.previous != rule_index.current) {
            // TODO: check if text has changed since last time
            if (rule_index.current >= rules.length) {
                rule_index.current = -1
                rule_index.previous = -1
                updateRules()
                setImage('')
            } else {
                rule_index.previous = rule_index.current
                updateRules()
                fetchImage(rule_index.current)
            }
        } else {
            // console.log('NOTHING')
        }
    }, [image, rule_index, frame_range])

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
                    <Select
                        options={dataset_options}
                        onChange={selectOption}
                        value={dataset_option}
                    ></Select>
                    <TooltipSlider
                        min={range[0]} max={range[1]}
                        count={1}
                        pushable={10}
                        value={frame_range}
                        onChange={setFrameRange}
                        tipProps={{ overlayClassName: 'foo' }}
                    ></TooltipSlider>
                    <button onClick={fetchRules}>Load rules</button>
                    <img src={image} style={{width: '100%'}}></img>
                </div>
                <div className="d-flex flex-column flex-basis-0 flex-grow-1">
                    <textarea
                        style={{ resize: "none", outline: 0, whiteSpace: 'pre-line' }}
                        value={text}
                        spellCheck={false}
                        onChange={(e) => setText(e.target.value)}
                        className="overflow-auto p-3 flex-basis-0 h3 mb-0 text-light border-0 bg-dark flex-grow-1"
                    />
                    <div>
                        <button onClick={fetchCompile}>Compile</button>
                        <button onClick={nextStep}>Next step</button>
                    </div>
                    <div className="overflow-auto p-3 flex-basis-0 h3 mb-0 text-light border-0 bg-dark flex-grow-1">
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
