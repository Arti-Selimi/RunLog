import React, { useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please use a valid username")
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      console.log("Email already exists in the database");
      navigate('/Options');
      return;
    }
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    console.log("New account data:", data);
    writeLoginData();
  };

  async function checkEmailExists(email) {
    const db = database;
    const dbRef = ref(db, "accounts/");
    const emailQuery = query(dbRef, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);
    return snapshot.exists();
  }

  function writeLoginData() {
    const db = database;
    push(ref(db, "accounts/"), {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    });
    console.log(localStorage);
  }

  return (
    <div>
      <form className="logInForm" onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" />
      </form>
    </div>
  );
};
