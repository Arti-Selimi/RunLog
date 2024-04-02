import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { Options } from "./Options";
import { SignUp } from "./Auth/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState, createContext } from "react";
import { Login } from "./Auth/Login";

export const AppContext = createContext();

function App() {
  const [formState, setFormState] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    name: "",
  });
  return (
    <div className="container">
      <AppContext.Provider value={{
        currentUser,
        setCurrentUser,
        formState,
        setFormState,
      }}>
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
