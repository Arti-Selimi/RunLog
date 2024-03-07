import { useState } from "react"
import {Modal} from "./popups/Modal"

export const Options = () => {

    const [ toggle, setToggle ] = useState(false)
    const [ typeOfModal, setTypeOfModal ] = useState("")

    return (
        <div className="options">
            <Modal closeModal={() => setToggle(!toggle)} toggle = {toggle} typeOfModal={typeOfModal}/>
            <button onClick={() => {setToggle(!toggle); setTypeOfModal('Log')}}>Log no.</button>
            <button onClick={() => {setToggle(!toggle); setTypeOfModal('Locate')}}>Location</button>
            <button onClick={() => {setToggle(!toggle); setTypeOfModal('Rate')}}>Rating</button>
        </div>
    )
}