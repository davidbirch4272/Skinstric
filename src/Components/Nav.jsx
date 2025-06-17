import React from "react"
import { Link } from "react-router-dom";
import nav from './nav.css';

function Navigation() {
  return (
    <nav>
  
    <div className="row__nav">
      <div className="title__wrapper">
        <Link to="/">
        <h1 className="Nav__Main--Title">SKINSTRIC</h1>
        </Link>
        <h2 className="Nav__Sub--Title">(INTRO)</h2>
      </div>
        <button className="Nav__Button">Enter Code</button>
    </div>
  
          </nav>
  )
};

export default Navigation; 
