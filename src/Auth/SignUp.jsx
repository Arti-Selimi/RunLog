import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, database } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export const SignUp = () => {
  const { formState, setFormState, setDisplayName } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFormState = () => {
    setFormState(!formState);
    console.log("Form state", formState);
    if (formState) {
      navigate("/");
    } else {
      navigate("/SignUp");
    }
  };

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
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        const db = database;
        set(ref(db, "users/" + data.email.replace(/\./g, "_")), {
          email: data.email.replace(/\./g, "_"),
          username: data.username.replace(/\./g, "_")
        });
      })
      .catch((error) => {
        console.log(error);
        alert("This user already exists, try logging in");
        reset();
      });
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
        <button className="formStateButton" onClick={handleFormState}>
          Sign In
        </button>
      </h4>
    </div>
  );
};
