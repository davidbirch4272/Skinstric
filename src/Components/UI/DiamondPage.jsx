import React, { useState } from "react";
import diamondpage from "./diamondpage.css";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import DiamondWithRightArrow from "./DiamondWithRightArrow";

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
          <div className="diamond">
            <button className="diamond__arrow--wrapper">
              <image
                className="arrow__left"
                onMouseEnter={() => setHoveredSide("right")}
                onMouseLeave={() => setHoveredSide(null)}
              >
                <DiamondWithLeftArrow />
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
          <div className="diamond">
            <button className="diamond__arrow--wrapper">
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
          </div>
        </div>
        <p className="landing__bottom--para">
          SKINSTIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
      <div className="mobile-centered-layout">
        <div className="diamond-stack">
          <div className="diamond outer">
            <div className="diamond inner">
              <h1 className="center-text">Sophisticated skincare</h1>
              <p className="landing__bottom--para">
                SKINSTIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
                ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
              </p>
              <div className="experience-entry">
                <button className="enter-button">ENTER EXPERIENCE</button>
                <div className="arrow-diamond">
                  <DiamondWithRightArrow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;