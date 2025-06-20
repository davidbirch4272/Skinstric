import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from '../src/Components/Nav';
import Landing from "./Components/Landing"
import Home from './Pages/Home';
import Testing from './Pages/Testing';
import Access from './Pages/Access';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
         <Route path="/" element={<Home />} /> 
         <Route path="/Testing" element={<Testing />} />
         <Route path="/Access" element={<Access />} />
  
        
      </Routes>
    </Router>
    
  );
}

export default App;
