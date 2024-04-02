import React, { useState, useContext } from 'react';
import { Modal } from './popups/Modal';
import { push, ref } from "firebase/database";
import { database } from './config/firebase';
import { AppContext } from './App';

export const Options = () => {
  const {currentUser} = useContext(AppContext)
  const [toggle, setToggle] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");

  function writeUserData() {
    const db = database;
    push(ref(db, 'accounts/counts/'), {
      location: localStorage.getItem('location'),
      rating: localStorage.getItem('rating'),
      count: localStorage.getItem('count')
    });
  }

  return (
    <div className="options">
    <Modal closeModal={() => setToggle(!toggle)} toggle={toggle} typeOfModal={typeOfModal} />
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Log') }}>Log no.</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Locate') }}>Location</button>
    <button onClick={() => { setToggle(!toggle); setTypeOfModal('Rate') }}>Rating</button>
    <button onClick={()=>writeUserData()}>Test Set Values</button>
    </div>
  );
};
