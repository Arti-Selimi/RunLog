import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  push,
  ref,
  get,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { database } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export const SignUp = () => {
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

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup
      .string()
      .email("Please use a valid e-mail")
      .required("E-mail is required"),
    password: yup
      .string()
      .min(8, "Password must contain 8-20 characters")
      .max(20, "Password must contain 8-20 characters")
      .required("Password is required"),
    verifiedPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Must match password")
      .required("Password verification is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("data", data);
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      alert("Account already exists in the database, try logging in.");
      navigate("./Login")
      return;
    }
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    console.log("New account data:", data);
    writeLoginData();
    reset();
  };

  async function checkEmailExists(email) {
    const db = database;
    const dbRef = ref(db, "accounts/");
    const emailQuery = query(dbRef, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);
    console.log(snapshot);
    return snapshot.exists();
  }

  function writeLoginData() {
    const db = database;
    push(ref(db, "accounts/"), {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    });
    console.log(localStorage);
  }

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")} />
        <p>{errors.username?.message}</p>
        <input type="text" placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          placeholder="Verify password"
          {...register("verifiedPassword")}
        />
        <p>{errors.verifiedPassword?.message}</p>
        <input type="submit" value={"Sign up"} />
      </form>
      <h4>
        Already have an account?
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
          Sign In
        </button>
      </h4>
    </div>
  );
};
