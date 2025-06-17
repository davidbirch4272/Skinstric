import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Landing from "./Components/Landing"

function App() {
  return (
    <Router>
      <Nav />
      <Landing />
      <Routes>
        
      </Routes>
    </Router>
    
  );
}

export default App;
