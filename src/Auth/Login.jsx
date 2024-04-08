import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, database } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const { formState, setFormState, setDisplayName, setCurrentUser, handleNextLog } = useContext(AppContext);
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("data", data);
    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    ).then((userCredential) => {
      const db = getDatabase();
      const databaseRef = ref(db, "users");
      setDisplayName(
        (userCredential._tokenResponse.displayName = data.username)
      );
      setCurrentUser(data.email.replace(/\./g, "_"))
      const user = userCredential.user;
      console.log("user", user);
      navigate("/Options");
      handleNextLog(data)
    })
    .catch((error) => {
      alert(
        "User credentials wrong or this account doesnt exist, maybe try signing up."
      );
      reset();
      console.log(error)
    });
    handleChildOrder(data);
  };

  const handleChildOrder = (data) => {
    const dbRef = ref(database, '/users')
    const sanitizedEmail = data.email.replace(/\./g, "_");
    const orderedQuery = query(dbRef, orderByChild('email') ,equalTo(sanitizedEmail));   
      onValue(orderedQuery, (snapshot) => {
      console.log("snapshot", snapshot.val())
      setDisplayName(snapshot.val()[Object.keys(snapshot.val())[0]].username)
      setCurrentUser(snapshot.val()[Object.keys(snapshot.val())[0]].email)
    })
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
        <button className="formStateButton" onClick={handleFormState}>
          Sign Up
        </button>
      </h4>
    </div>
  );
};
