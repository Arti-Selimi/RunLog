import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { Options } from "./Options";
import { Login } from "./Auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Options" element={<Options />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
