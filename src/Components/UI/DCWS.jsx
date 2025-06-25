import React from "react";
import dcws from "./dcws.css";
import DiamondWithRightArrow from "./DiamondWithRightArrow";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { Link } from "react-router-dom";

function DCWS() {
  return (
    <>
      <div className="page__dcws">
        <div className="para__wrapper-dcws">
          <p className="starter__para-dcws">A.I. ANALYSIS</p>
          <p className="starter__para-sub-dcws">A.I. HAS THE FOLLOWING.</p>
          <p className="starter__para-sub-dcws">
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>
        <div className="diamond__wrapper--dcws">
          <div className="diamond-dcws-1">
            <h1 className="label_demographics-dcws-1">DEMOGRAPHICS</h1>
          </div>
          <div className="expander-dcws expander-1" />

          <div className="diamond-dcws-2">
            <h1 className="label_demographics-dcws-2">COSMETIC CONCERNS</h1>
          </div>
          <div className="expander-dcws expander-2" />

          <div className="diamond-dcws-3">
            <h1 className="label_demographics-dcws-3">WEATHER</h1>
          </div>
          <div className="expander-dcws expander-3" />

          <div className="diamond-dcws-4">
            <h1 className="label_demographics-dcws-4">SKIN TYPE DETAILS</h1>
          </div>
          <div className="expander-dcws expander-4" />
        </div>
      </div>

      <button className="diamond__arrow--wrapper">
        <Link to="/access">
          <image className="arrow__right-dcws">
            <DiamondWithRightArrow />
          </image>
          <p className="right__diamond--para-dcws">Proceed</p>
        </Link>
      </button>

      <button className="diamond__arrow--wrapper">
        <Link to="/">
          <image className="arrow__left-dcws">
            <DiamondWithLeftArrow />
          </image>
          <p className="left__diamond--para-dcws">Back</p>
        </Link>
      </button>
    </>
  );
}

export default DCWS;
