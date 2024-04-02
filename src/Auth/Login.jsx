import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ref,
  get,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { database } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const {formState, setFormState,} = useContext(AppContext)
  const navigate = useNavigate()

  const handleFormState = () => {
    setFormState(!formState)
    console.log("Form state", formState)
    if(formState) {
      navigate('/')
    } else {
      navigate('/SignUp')
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();
      console.log("data", data);
      const emailExists = await checkAccountExists(data.email);
      if (emailExists) {
        console.log("it exists")
        navigate('../Options')
      } else {
        alert("This account does not exist, try signing up")
      }
      reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  async function checkAccountExists(email) {
    const db = database;
    const dbRef = ref(db, "accounts/");
    const emailQuery = query(dbRef, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);
    console.log(snapshot);
    return snapshot.exists();
  }

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input type="submit" /> 
      </form>
      <h4>
      Don't have an account?
      <button
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
          border: "none",
          background: "transparent",
        }}
        onClick={handleFormState}
      >
        Sign Up
      </button>
      </h4>
    </div>
  );
};
