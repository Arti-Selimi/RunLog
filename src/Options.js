import { useState } from "react"
import {LogNumPopUp} from "./popups/logNumPopUp"
import { RatingPopUp } from "./popups/ratingPopUp"

export const Options = () => {

    const [ toggle, setToggle ] = useState ("")

    return (
        <div className="Options">
            <LogNumPopUp toggle = {toggle}/>
            <button onClick={() =>setToggle("logNum")}>Log number</button>
            <button>Location</button>
            <RatingPopUp toggle = {toggle}/>
            <button onClick={() => setToggle("rate")}>Rating</button>
        </div>
    )
}