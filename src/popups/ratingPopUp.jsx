import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export const RatingPopUp = (props) => {
    const [rating , setRating] = useState(null)
    const [hover, setHover] = useState(null)
    console.log(props.toggle)
  return (
    <div style={{ display: props.toggle === "rate" ? "flex" : "none" }}>
      {[
        ...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label>
              <input
               type="radio"
               value={currentRating}
               onClick={() => setRating(currentRating)}
              />
              <FaStar
              className="star"
               size={50} 
               color={currentRating <= (hover || rating) ? "#ffc107" : "#030303"}
               onMouseEnter={() => setHover(currentRating)}
               onMouseLeave={() => setHover(null)}
               />
            </label>
          );
        })}
    </div>
  );
};
