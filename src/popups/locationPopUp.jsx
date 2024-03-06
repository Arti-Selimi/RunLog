import React from "react";

export const LocationPopUp = (props) => {
  return (
    <div
      className="locationPupUp"
      style={{ display: props.toggle === "location" ? "flex" : "none" }}
    >
      <div>
        <label for="dropdown">Choose an option:</label>
        <select id="dropdown">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <button onClick={() => props.togglePopUp("w")}>Exit</button>
    </div>
  );
};
