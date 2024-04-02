import React from "react";
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

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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
        <input type="submit" value={"Log In"} />
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
        >
          Sign Up
        </button>
      </h4>
    </div>
  );
};
