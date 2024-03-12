import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { Options } from "./Options";
import { Login } from "./Auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({
    user: "",
  });
  return (
    <div className="container">
      <AppContext.Provider value={{
        currentUser,
        setCurrentUser
      }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Options" element={<Options />} />
          </Routes>
        </Router>
        </AppContext.Provider>
    </div>
  );
}

export default App;
