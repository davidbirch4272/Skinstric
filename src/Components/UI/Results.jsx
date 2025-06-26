import React from "react";
import { GoDiamond } from "react-icons/go";
import results from "./results.css";

function Results() {
  return (
    <div className="page__results">
      <div className="para__wrapper-results">
        <p className="starter__para-results">A.I. ANALYSIS</p>
        <h1 className="starter__demographics-results">DEMOGRAPHICS</h1>
        <p className="starter__para-sub-results">PREDICTED RACE & AGE.</p>
      </div>
      <div className="grid">
        <div className="side__panel">
          <div className="custom__rectangle-ethnicity">
            <div className="ethnicity">
              <p className="Ethnicity__is">Latino Hispanic</p>
              <div className="race">RACE</div>
            </div>
          </div>
          <div className="custom__rectangle-age">
            <div className="age">
              <p className="Age__Range__is">40-49</p>
              <div className="age">AGE</div>
            </div>
          </div>
          <div className="custom__rectangle-gender">
            <div className="gender__wrapper">
              <p className="Gender__is">Male</p>
              <div className="gender">SEX</div>
            </div>
          </div>
        </div>

        <div className="custom__rectangle-graph">
          <p className="ethnicity__is--graph">Latino Hispanic</p>
          <div className="transparent__rectangle">
            <div class="circle-wrapper">
              <div class="circle">
                <div class="mask full"></div>
                <div class="mask half"></div>
                <div class="inside-circle">75%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="custom__rectangle-ethnicity-specifications">
            <div className="current__focus--ai-confidence">
                <h4 className="ethncity__current-focus">RACE</h4>
                <h4 className="AI__Confidence">A.I. CONFIDENCE</h4>                
            </div>
            <div className="ethnicity__breakdown">
                <GoDiamond className="small__diamond-b" />
                <span className="Latino-Hispanic">Latino Hispanic</span>
                <span className="percentage">45%</span>
            </div>
        </div>












      </div>
    </div>
  );
}

export default Results;
