import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { push, ref, set } from "firebase/database";
import { database } from "../config/firebase";

export const Login = () => {

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

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (handleSubmit) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
    }
  };
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
        <input type="submit" onClick={writeLoginData}/>
      </form>
    </div>
  );
};
