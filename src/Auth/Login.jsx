import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const { formState, setFormState, currentUser, setCurrentUser } = useContext(AppContext);
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, event) => {
      event.preventDefault();
      console.log("data", data);
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate('/Options')
          setCurrentUser(user.username)
          console.log(user.username)
        })
        .catch((error) => {
          alert("User credentials wrong or this account doesnt exist, maybe try signing up.")
        });
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
          className="formStateButton"
          onClick={handleFormState}
        >
          Sign Up
        </button>
      </h4>
    </div>
  );
};
