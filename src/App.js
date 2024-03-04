import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Navbar } from './Navbar';


const arti = "arti";

console.log(arti)

function App() {
  return (
    <div className="App"> 
      <h1>arti</h1>
        <Navbar />
    </div>  
  );
}

export default App;
