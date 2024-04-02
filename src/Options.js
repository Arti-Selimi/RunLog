import React, { useState } from 'react';
import { Modal } from './popups/Modal';
import { push, ref } from "firebase/database";
import { database, auth } from './config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Options = () => {
  const [toggle, setToggle] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");
  const navigate = useNavigate();

  function writeUserData() {
    const db = database;
    push(ref(db, 'poopLogs'), {
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
    });
  }

  return (
    <div className="options">
    <Modal closeModal={() => setToggle(!toggle)} toggle={toggle} typeOfModal={typeOfModal} />
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Log') }}>Log no.</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Locate') }}>Location</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Rate') }}>Rating</button>
    <button onClick={()=>writeUserData()}>Test Set Values</button>
    <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};
