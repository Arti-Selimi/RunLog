import React from "react";

export const LocationPopUp = (props) => {
  return (
    <div
      className="locationPupUp"
      style={{ display: props.toggle === "location" ? "flex" : "none" }}
    >
        <h2>Poop Location</h2>
      <div>
        <label for="dropdown">Choose an option:</label>
        <select id="dropdown">
          <option value="Zyre">Zyre</option>
          <option value="Katun">Katun</option>
          <option value="Banes">Banes</option>
        </select>
      </div>
      <button onClick={() => props.togglePopUp("w")}>Exit</button>
    </div>
  );
};
