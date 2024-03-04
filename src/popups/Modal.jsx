import React from "react";
import { useState, useMemo } from "react";

export const Modal = (props) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const itemCount = useMemo(() => count === 0 ? '1st' : count === 1 ? '2nd' : count===2 ? '3rd' : `${count+1}th`, [count]);


    if(props.toggle){
        return (
            <div className="modal" onClick={()=>props.closeModal()}>
                <div className="modal__overlay"></div>
                <div className="modal__container">
                    {props.typeOfModal === 'Log' && (
                        <>
                        <p>This is your {itemCount} poop for the day ^_^</p>
                        <button onClick={() => { setCount(count + 1); props.closeModal(); }}>Log</button>
                        </>
                    )}
                </div>
            </div>
          );
    }
  
};
