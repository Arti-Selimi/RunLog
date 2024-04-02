import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './popups/Modal';
import { push, ref, set, update } from "firebase/database";
import { database, auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';

export const Options = () => {
  const {currentUser, setFormState, formState} = useContext(AppContext)
  const [toggle, setToggle] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if(currentUser === '') {
      navigate('/')
    } 
  })

  function writeUserData() {
    const db = database;
    push(ref(db, 'users/' + currentUser), {
      user: currentUser,
      location: localStorage.getItem('location'),
      rating: localStorage.getItem('rating'),
      count: localStorage.getItem('count')
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
      <h1>Current user: {currentUser}</h1>
    <Modal closeModal={() => setToggle(!toggle)} toggle={toggle} typeOfModal={typeOfModal} />
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Log') }}>Log no.</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Locate') }}>Location</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Rate') }}>Rating</button>
    <button onClick={()=>writeUserData()}>Test Set Values</button>
    <button onClick={() => {handleSignOut(); setFormState(false)}} >Sign out</button>
    </div>
  );
};
