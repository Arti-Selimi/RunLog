import React, { useContext } from "react";
import { useState, useMemo, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../App";

export const Modal = (props) => {
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const {count, setCount} = useContext(AppContext)

  useEffect(() => {
    if (count) {
      localStorage.setItem("count", count);
    }
    if (hover) {
      localStorage.setItem("rating", hover);
    }
    if (location) {
      localStorage.setItem("location", location);
    }
  });

  if (props.toggle) {
    return (
      <div className="modal" onClick={() => props.closeModal()}>
        <div className="modal__overlay"></div>
        <div className="modal__container">
          {props.typeOfModal === "Log" && (
            <>
              <p>You have pooped {count} times today, yippie ^-^</p>
              <button
                onClick={() => {
                  props.closeModal();
                }}
              >
                Add a poop
              </button>
            </>
          )}
          {props.typeOfModal === "Locate" && (
            <>
              <p>Just took a huge poo at</p>
              <button
                onClick={() => {
                  setLocation("Zyre");
                  props.closeModal();
                }}
              >
                Zyre 🙈
              </button>
              <button
                onClick={() => {
                  setLocation("Shpi");
                  props.closeModal();
                }}
              >
                Shpi 😒
              </button>
              <button
                onClick={() => {
                  setLocation("Banese");
                  props.closeModal();
                }}
              >
                Banese 🦅
              </button>
            </>
          )}
          {props.typeOfModal === "Rate" && (
            <>
              <p>I'm giving this delightful experience a </p>
              <div className="stars__container">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        className="star"
                        size={50}
                        color={
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#030303"
                        }
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              <p>out of 5!!</p>
            </>
          )}
        </div>
      </div>
    );
  }
};
