import { useState } from "react"
import {LogNumPopUp} from "./popups/logNumPopUp"
import { RatingPopUp } from "./popups/ratingPopUp"
import { LocationPopUp } from "./popups/locationPopUp"

export const Options = () => {

    const [ toggle, setToggle ] = useState ("")

    const togglePopUp = (id) => {
        if(id === 'logNum') {
            setToggle("logNum")
        } else if(id === 'rate') {
            setToggle("rate") 
        } else if(id === "location") {
            setToggle("location")
        } else {
            setToggle("")
        }
    }

    return (
        <div className="Options">
            <LogNumPopUp toggle = {toggle} togglePopUp = {togglePopUp}/>
            <button onClick={() => togglePopUp("logNum")}>Log number</button>
            <LocationPopUp toggle = {toggle} togglePopUp = {togglePopUp}/>
            <button onClick={() => togglePopUp("location")}>Location</button>
            <RatingPopUp toggle = {toggle} togglePopUp = {togglePopUp}/>
            <button onClick={() => togglePopUp("rate")}>Rating</button>
        </div>
    )
}