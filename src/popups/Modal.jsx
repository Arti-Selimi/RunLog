import React, { useContext } from "react";
import { useState, useMemo, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../App";

export const Modal = (props) => {
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { count, setCount } = useContext(AppContext);
  const [distance, setDistance] = useState(null);

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
    if (distance) {
      localStorage.setItem("distance", distance);
    }
  });

  const itemCount = useMemo(
    () =>
      count === 1
        ? `${count}st`
        : count === 2
        ? `${count}nd`
        : count === 3
        ? `${count}rd`
        : `${count}th`,
    [count]
  );

  if (props.toggle) {
    return (
      <div className="modal" onClick={() => props.closeModal()}>
        <div className="modal__overlay"></div>
        <div className="modal__container">
          {props.typeOfModal === "Log" && (
            <>
              <p>This is your {itemCount} run for the day ^_^</p>
              <button
                onClick={() => {
                  props.closeModal();
                }}
              >
                Log
              </button>
            </>
          )}
          {props.typeOfModal === "Locate" && (
            <>
              <p>Just managed a proper run at</p>
              <button
                onClick={() => {
                  setLocation("On the wild");
                  props.closeModal();
                }}
              >
                On the wild 🦅
              </button>
              <button
                onClick={() => {
                  setLocation("Gym");
                  props.closeModal();
                }}
              >
                Gym 😒
              </button>
              <button
                onClick={() => {
                  setLocation("Other");
                  props.closeModal();
                }}
              >
                Other 🙈
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
          {props.typeOfModal === "Distance" && (
            <>
              <p>
                You ran for{" "}
                <input
                  type="number"
                  id="distance"
                  size={1}
                  autoFocus
                  onChange={(e) => {
                    setDistance(e.target.value);
                  }}
                />
                km
              </p>
              <button
                onClick={() => {
                  props.closeModal();
                }}
              >
                Log Distance
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};
