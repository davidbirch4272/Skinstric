import React, { useState, useEffect } from "react";
import "./startanalysis.css";

function StartAnalysis() {
  const [step, setStep] = useState(1); // 1 = ask name, 2 = ask city
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({ name: "", city: "" });

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedCity = localStorage.getItem("userCity");

    if (savedName && savedCity) {
      setUserData({ name: savedName, city: savedCity });
      setStep(3); // skip to final message
    } else if (savedName) {
      setUserData((prev) => ({ ...prev, name: savedName }));
      setStep(2); // go to city step
    }
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      localStorage.setItem("userName", inputValue);
      setUserData((prev) => ({ ...prev, name: inputValue }));
      setInputValue("");
      setStep(2);
    } else if (step === 2) {
      localStorage.setItem("userCity", inputValue);
      setUserData((prev) => ({ ...prev, city: inputValue }));
      setInputValue("");
      setStep(3);
    }
  };

  return (
    <div className="page">
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
              {step === 1 && (
                <form onSubmit={handleSubmit} className="message__input">
                  <p className="click">What’s your name?</p>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={inputValue}
                    onChange={handleChange}
                    className="input__name"
                  />
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="message__input">
                  <p className="click">What city are you in?</p>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={inputValue}
                    onChange={handleChange}
                    className="input__name"
                  />
                </form>
              )}

              {step === 3 && (
                <p className="click">
                  Welcome, {userData.name} from {userData.city}!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartAnalysis;
