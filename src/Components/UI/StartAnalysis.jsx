import React, { useEffect, useState } from "react";
import "./startanalysis.css";
import DiamondWithRightArrow from "./DiamondWithRightArrow";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { Link } from "react-router-dom";

function StartAnalysis() {
const [step, setStep] = useState(1);
const [inputValue, setInputValue] = useState("");
const [userData, setUserData] = useState({ name: "", city: "" });

useEffect(() => {
  const savedName = localStorage.getItem("userName");
  const savedCity = localStorage.getItem("userCity");

  if (savedName && savedCity) {
      setUserData({ name: savedName, city: savedCity});
      setStep(4);
  } else if (savedName) {
    setUserData((prev) => ({ ...prev, name: savedName }));
    setStep(2)    
  }
}, []);

useEffect(() => {
  if (step === 3) {
    const timer = setTimeout(() => {
  setStep(4)
}, 3000);
return () => clearTimeout(timer)
}
}, [step])

    const handleChange = (e) => setInputValue(e.target.value);  

    const handleSubmit = (e) => {
      e.preventDefault();
    

    if (step === 1) {
      localStorage.setItem("userName", inputValue);
      setUserData((prev) => ({ ...prev, name: inputValue}));
      setInputValue("");
      setStep(2);
    } else if (step === 2) {
      localStorage.setItem("userCity", inputValue);
      setUserData((prev) => ({ ...prev, city: inputValue}));
      setInputValue("");
      setStep(3);      
    }
  };

 return (
    <div className="page__sa">
      <div className="para__wrapper">
        <p className="starter__para">TO START ANALYSIS</p>
      </div>
      
      <div className="diamond-stack">
        <div className="diamond-rotate-wrapper outer-rotate">
          <div className="diamond outer"></div>
        </div>
        <div className="diamond-rotate-wrapper inner-rotate">
          <div className="diamond inner"></div>
        </div>
        <div className="diamond-rotate-wrapper inner-last-rotate">
          <div className="diamond inner--last">
             
            <div className="diamond__content counter-spin">
              {step  === 1 &&  (
              <form onSubmit={handleSubmit} className="message__input">
               <p className="click">CLICK TO TYPE</p>
               <input
                  type="text"
                  placeholder="Introduce Yourself"
                  value={inputValue}
                  onChange={handleChange}
                  className="input__name"
                  />                  
              </form>
              )}
              
              {step  === 2 &&  (
              <form onSubmit={handleSubmit} className="message__input">
               <p className="click">CLICK TO TYPE</p>
               <input
                  type="text"
                  placeholder="your city name"
                  value={inputValue}
                  onChange={handleChange}
                  className="input__name"
                  />                  
              </form>
              )}

              {step === 3 && (
                <div className="processing-state">
                  <p className="click">Processing submission...</p>
                  <div className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    </div>
                  </div>
              )} 

              {step === 4 && (
                <div className="thank-you-state">
                  <p className="click">Thank You! Proceed to the next step!</p>               
                </div>                
              )}             
            </div>
          </div>
        </div>
      </div>
           <button className="diamond__arrow--wrapper">
             <Link to="/">
              <image className="arrow__left-sa">
                <DiamondWithLeftArrow />
              </image>
              <p className="left__diamond--para-sa">
                Back
              </p>
             </Link>
            </button>
        </div>
  );
}

export default StartAnalysis;
