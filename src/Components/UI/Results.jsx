import React, { useState } from "react";
import { GoDiamond } from "react-icons/go";
import results from "./results.css";
import DonutProgress from "./DonutProgress";

function Results() {
  const [activeType, setActiveType] = useState("ethnicity");

  const [selectedEthnicity, setSelectedEthnicity] = useState({
    label: "Latino Hispanic",
    percentage: 45,
  });

  const [selectedAge, setSelectedAge] = useState({
    label: "40-49",
    percentage: 60,
  });

  const [selectedGender, setSelectedGender] = useState({
    label: "Male",
    percentage: 70,
  });

  const ethnicityData = [
    { label: "South Asian", pct: 45 },
    { label: "Black", pct: 0 },
    { label: "Southeast Asian", pct: 50 },
    { label: "White", pct: 0 },
    { label: "Latino Hispanic", pct: 0 },
    { label: "East Asian", pct: 5 },
    { label: "Middle Eastern", pct: 0 },
  ];

    const ageData = [
    { label: "0-9", pct: 10 },
    { label: "10-19", pct: 20 },
    { label: "20-29", pct: 30 },
    { label: "30-39", pct: 40 },
    { label: "40-49", pct: 60 },
    { label: "50-59", pct: 50 },
    { label: "60+", pct: 25 },
  ];

  const genderData = [
    { label: "Male", pct: 70 },
    { label: "Female", pct: 30 },
  ];

  const getProgressColor = (pct) => {
    if (pct >= 75) return "black";
    if (pct >= 50) return "black";
    if (pct > 0) return "black";
    return "#ccc";
  };

   const currentSelection =
    activeType === "ethnicity"
      ? selectedEthnicity
      : activeType === "age"
      ? selectedAge
      : selectedGender === "gender";

  return (
    <div className="page__results">
      <div className="para__wrapper-results">
        <p className="starter__para-results">A.I. ANALYSIS</p>
        <h1 className="starter__demographics-results">DEMOGRAPHICS</h1>
        <p className="starter__para-sub-results">PREDICTED RACE & AGE.</p>
      </div>

      <div className="grid">
        <div className="side__panel">
          <div className="custom__rectangle-ethnicity" onclick={() => setActiveType("ethnicity")}>
            <div className="ethnicity__wrapper">
              <p className="ethnicity__is">{selectedEthnicity.label}</p>
              <div className="race">RACE</div>
            </div>
          </div>
          <div className="custom__rectangle-age"onclick={() => setActiveType("age")}>
            <div className="age__wrapper">
              <p className="age__range__is">{selectedAge.label}</p>
              <div className="age">AGE</div>
            </div>
          </div>
          <div className="custom__rectangle-gender"onclick={() => setActiveType("gender")}>
            <div className="gender__wrapper">
              <p className="gender__is">{selectedGender.label}</p>
              <div className="gender">SEX</div>
            </div>
          </div>
        </div>

        <div className="custom__rectangle-graph">
          <p className="ethnicity__is--graph">{currentSelection.label}</p>
          <div className="transparent__rectangle">
            <DonutProgress
              percentage={currentSelection.percentage}
              progressColor={getProgressColor(currentSelection.percentage)}
              backgroundColor="#e0e0e0"
              size={360}
              strokeWidth={4}
            />
          </div>
        </div>

        <div className="custom__rectangle-ethnicity-specifications">
          <div className="current__focus--ai-confidence">
            <h4 className="AI__calculations-race">RACE</h4>
            <h4 className="AI__confidence">A.I. CONFIDENCE</h4>
          </div>

          {activeType === "ethnicity"  && 
           ethnicityData.map((ethnicity, index) => (
            <div
              key={index}
              className={`ethnicity__breakdown ${selectedEthnicity.label === ethnicity.label ? "selected" : ""}`}
              onClick={() => setSelectedEthnicity({ label: ethnicity.label, percentage: ethnicity.pct })}
            >
              <div className="community">
                <GoDiamond className="small__diamond-results" />
                <span className="Latino-Hispanic">{ethnicity.label}</span>
              </div>
              <span className="percentage">{ethnicity.pct}%</span>
            </div>
          ))}
          
          {activeType === "age" &&
          ageData.map((age, index) => (
            <div
              key={index}
              className={`age__breakdown ${selectedAge.label === age.label ? "selected" : ""}`}
              onClick={() => setSelectedAge({ label: age.label, percentage: age.pct })}
            >
              <div className="community">
                <GoDiamond className="small__diamond-results" />
                <span className="Latino-Hispanic">{age.label}</span>
              </div>
              <span className="percentage">{age.pct}%</span>
            </div>
          ))}

          {activeType === "gender"  &&
          genderData.map((gender, index) => (
            <div
              key={index}
              className={`gender__breakdown ${selectedGender.label === gender.label ? "selected" : ""}`}
              onClick={() => setSelectedGender({ label: gender.label, percentage: gender.pct })}
            >
              <div className="community">
                <GoDiamond className="small__diamond-results" />
                <span className="Latino-Hispanic">{gender.label}</span>
              </div>
              <span className="percentage">{gender.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
