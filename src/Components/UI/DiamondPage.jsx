import React, { useState } from "react";
import diamondpage from "./diamondpage.css";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import DiamondWithRightArrow from "./DiamondWithRightArrow";
import { Link } from "react-router-dom";

function App() {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="page">
      <div className="split-layout">
        <div
          className={`half-container left ${
            hoveredSide === "left" ? "hidden" : ""
          }`}
        >
          <div className="dp_diamond">
            <button className="dp_diamond__arrow--wrapper">
              <image
                className="arrow__left"
                onMouseEnter={() => setHoveredSide("right")}
                onMouseLeave={() => setHoveredSide(null)}
              >
                <DiamondWithLeftArrow 
                />
              </image>
              <p
                className="left__diamond--para"
                onMouseEnter={() => setHoveredSide("right")}
                onMouseLeave={() => setHoveredSide(null)}
              >
                Discover AI
              </p>
            </button>
          </div>
        </div>
        <h1 className={`center-text ${hoveredSide}`}>Sophisticated skincare</h1>
        <div
          className={`half-container right ${
            hoveredSide === "right" ? "hidden" : ""
          }`}
        >
          <div className="dp_diamond">
            <Link to="/testing">
            <button className="dp_diamond__arrow--wrapper">
              <p
                className="right__diamond--para"
                onMouseEnter={() => setHoveredSide("left")}
                onMouseLeave={() => setHoveredSide(null)}
                >
                Take Test
              </p>
              <image
                className="arrow__right"
                onMouseEnter={() => setHoveredSide("left")}
                onMouseLeave={() => setHoveredSide(null)}
                >
                <DiamondWithRightArrow />
              </image>
            </button>
                </Link>
          </div>
        </div>
        <p className="landing__bottom--para">
          SKINSTIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
      <div className="mobile-centered-layout">
        <div className="dp_diamond-stack">
          <div className="dp_diamond outer-dp">
            <div className="dp_diamond inner-dp">
              <h1 className="center-text">Sophisticated skincare</h1>
              <p className="landing__bottom--para">
                SKINSTIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
                ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
              </p>
              <div className="experience-entry">
                <Link to="/testing">
                <button className="enter-button">ENTER EXPERIENCE</button>
                <div className="arrow-diamond">
                  <DiamondWithRightArrow />
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;