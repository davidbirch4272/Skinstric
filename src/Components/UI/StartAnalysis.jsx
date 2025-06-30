import React, { useEffect, useState } from "react";
import "./startanalysis.css";
import DiamondWithRightArrow from "./DiamondWithRightArrow";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { apiFetch } from '../../ApiCheck.js';

function StartAnalysis() {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({ name: "", city: "" });

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedCity = localStorage.getItem("userCity");

    if (savedName && savedCity) {
      setUserData({ name: savedName, city: savedCity });
      setStep(4);
    } else if (savedName) {
      setUserData((prev) => ({ ...prev, name: savedName }));
      setStep(2);
    }
  }, []);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      localStorage.setItem("userName", inputValue);
      setUserData((prev) => ({ ...prev, name: inputValue }));
      setInputValue("");
      setStep(2);
    } else if (step === 2) {
      localStorage.setItem("userCity", inputValue);

      const updatedData = {
        name: userData.name,
        location: inputValue,
      };

      setUserData((prev) => ({ ...prev, city: inputValue }));
      setInputValue("");
      setStep(3);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_PHASE_ONE}`, 
          
         // "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send user data");
        }

        console.log(
          `Success: added ${updatedData.name} from ${updatedData.location}`
        );
        console.log("Uploaded data:\n" + JSON.stringify(updatedData, null, 2));
      } catch (error) {
        console.error("API error:", error);
      }
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("userName");
      localStorage.removeItem("userCity");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (location.key === "default") {
      localStorage.removeItem("userName");
      localStorage.removeItem("userCity");
      setUserData({ name: "", city: "" });
      setStep(1);
      setInputValue("");
    }
  }, [location]);

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
              {step === 1 && (
                <form onSubmit={handleSubmit} className="message__input">
                  <p className="click">CLICK TO TYPE</p>
                  <input  
                    type="text"
                    placeholder="Introduce Yourself"
                    value={inputValue}
                    onChange={handleChange}
                    className="input__name"
                    autoFocus
                  />
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="message__input">
                  <p className="click">CLICK TO TYPE</p>
                  <input
                    type="text"
                    placeholder="your city name"
                    value={inputValue}
                    onChange={handleChange}
                    className="input__name"
                    autoFocus
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
      {step === 4 && (
        <button
          className="diamond__arrow--wrapper"
          onClick={() => {
            localStorage.removeItem("userName");
            localStorage.removeItem("userCity");
            setUserData({ name: "", city: "" });
            setStep(1);
          }}
          data-aos="fade-right"
          data-aos-offset="1"
          data-aos-delay="250"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="center"
        >
          <Link to="/access">
            <image className="arrow__right-sa">
              <DiamondWithRightArrow />
            </image>
            <p className="right__diamond--para-sa">Proceed</p>
          </Link>
        </button>
      )}
      <button className="diamond__arrow--wrapper">
        <Link to="/">
          <image className="arrow__left-sa">
            <DiamondWithLeftArrow />
          </image>
          <p className="left__diamond--para-sa">Back</p>
        </Link>
      </button>
    </div>
  );
}

export default StartAnalysis;
