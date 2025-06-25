import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from '../src/Components/Nav';
import Landing from "./Components/Landing"
import Home from './Pages/Home';
import Testing from './Pages/Testing';
import Access from './Pages/Access';
import TakePhoto from './Components/UI/TakePhoto';
import Variables from './Pages/Variables';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

function App() {
  
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  AOS.refresh();
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
         <Route path="/"            element={<Home />} /> 
         <Route path="/Testing"     element={<Testing />} />
         <Route path="/Access"      element={<Access />} />
         <Route path="/TakePhoto"   element={<TakePhoto />} />
         <Route path="/Variables"   element={<Variables />} />
        
      </Routes>
    </Router>
    
  );
  
}

export default App;
