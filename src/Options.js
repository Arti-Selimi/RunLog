import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './popups/Modal';
import { push, ref } from "firebase/database";
import { database, auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';

export const Options = () => {
  const {currentUser, setFormState, displayName, month, day, year,count, setCount, formState} = useContext(AppContext)
  const [toggle, setToggle] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if(displayName === '') {
      navigate('/')
    } 
  })

  function writeUserData() {
    const db = database;
    push(ref(db, 'users/' + currentUser + "/logs/"), {
      location: localStorage.getItem('location'),
      rating: localStorage.getItem('rating'),
      count: localStorage.getItem('count'),
      date: day + "." + month + "." + year,
      distance: localStorage.getItem('distance') + "km"
    });
  }
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      alert('Something went wrong :3')
      console.log(error)
    });
  }

  return (
    <div className="options">
      <h1>Date: {day + "." + month + "." + year}</h1>
      <h1>Current user: {displayName}</h1>
    <Modal closeModal={() => setToggle(!toggle)} toggle={toggle} typeOfModal={typeOfModal} />
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Log') }}>Log no.</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Locate') }}>Location</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Rate') }}>Rating</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Distance') }}>Distance</button>
    <button onClick={()=> {writeUserData(); setCount(count + 1)}}>Log the run</button>
    <button onClick={() => {handleSignOut(); setFormState(!formState)}} >Sign out</button>
    </div>
  );
};
