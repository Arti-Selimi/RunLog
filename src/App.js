import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { Options } from "./Options";
import { SignUp } from "./Auth/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import { Login } from "./Auth/Login";
import { database } from "./config/firebase";
import { ref, query, onValue, orderByChild, equalTo } from "firebase/database";

export const AppContext = createContext();

function App() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const [formState, setFormState] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [count, setCount] = useState(0);

  const handleNextLog = (data) => {
    const logRef = ref(
      database,
      "/users/" + data.email.replace(/\./g, "_") + "/logs"
    );
    const orderedQuery = query(logRef, orderByChild("date"), equalTo(day + "." + month + "." + year));
    onValue(orderedQuery, (snapshot) => {
      console.log("logSnapshot", snapshot.val());
      const logsData = snapshot.val();
      if (logsData !== null) {
          Object.keys(logsData).forEach((logKey) => {
          const keys = Object.keys(logsData)  
          const logEntry = keys.map(key => logsData[key])
          const lastLog = logEntry[Array.length - 1]
          setCount(lastLog.count++) 
        });
      } else {
        console.log("No log data found.");
        setCount(count++)
      }
    });
  };

  return (
    <div className="container">
      <AppContext.Provider
        value={{
          formState,
          setFormState,
          displayName,
          setDisplayName,
          currentUser,
          setCurrentUser,
          year,
          month,
          day,
          handleNextLog,
          count,
          setCount,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Options" element={<Options />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
