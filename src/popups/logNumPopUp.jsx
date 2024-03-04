import React from "react";
import { useState } from "react";

export const LogNumPopUp = (props) => {
  const [count, setCount] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className="logNumPopUp" style={{ display: props.toggle === "logNum" ? "flex" : "none" }}>
      <p>
        This is your{" "}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setCount(e.target.value);
            setValue(e.target.value);
          }}
          style={{ width: `${value.length}ch` }}
        />
        {count === "11" || count === "12" || count === "13"
          ? "th"
          : count?.endsWith(1)
          ? "st"
          : count?.endsWith(2)
          ? "nd"
          : count?.endsWith(3)
          ? "rd"
          : "th"}{" "}
        poop of the day
      </p>
      <button>Log</button>
    </div>
  );
};
