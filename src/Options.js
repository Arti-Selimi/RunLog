import { useState } from "react"
import {LogNumPopUp} from "./popups/logNumPopUp"

export const Options = () => {

    const [ toggle, setToggle ] = useState ("")

    const togglePopUp = (id) => {
        if(id === 'logNum') {
            setToggle("logNum")
        } 
    }

    return (
        <div className="Options">
            <LogNumPopUp toggle = {toggle}/>
            <button onClick={() => togglePopUp("logNum")}>Log number</button>
            <button>Location</button>
            <button>Rating</button>
        </div>
    )
}