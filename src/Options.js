import { useState } from "react"
import {LogNumPopUp} from "./popups/logNumPopUp"
import { RatingPopUp } from "./popups/ratingPopUp"

export const Options = () => {

    const [ toggle, setToggle ] = useState ("")

    const togglePopUp = (id) => {
        if(id === 'logNum') {
            setToggle("logNum")
        } else if(id === 'rate') {
            setToggle("rate") 
        } else {
            setToggle("location")
        }
    }

    return (
        <div className="Options">
            <LogNumPopUp toggle = {toggle}/>
            <button onClick={() => togglePopUp("logNum")}>Log number</button>
            <button>Location</button>
            <RatingPopUp toggle = {toggle}/>
            <button onClick={() => togglePopUp("rate")}>Rating</button>
        </div>
    )
}