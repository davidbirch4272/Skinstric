  import React, { useState, useEffect } from "react";
  import { GoDiamond } from "react-icons/go";
  import results from "./results.css";
  import DonutProgress from "./DonutProgress";
  import DiamondWithRightArrow from "./DiamondWithRightArrow";
  import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
  import { Link } from "react-router-dom";
  import { apiFetch } from '../../ApiCheck.js';

  function Results() {
    const [activeType, setActiveType] = useState("ethnicity");

    const [selectedEthnicity, setSelectedEthnicity] = useState({label: "", percentage: 0});
    const [selectedAge, setSelectedAge] = useState({label: "", percentage: 0});
    const [selectedGender, setSelectedGender] = useState({label: "", percentage: 0});

    const [ethnicityData, setEthnicityData] = useState([]);
    const [ageData, setAgeData] = useState([]);
    const [genderData, setGenderData] = useState([]);

      useEffect(() => {
      const raw = localStorage.getItem("skinstricResult");
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        const data = parsed.data || {};
        console.log("Parsed skinstricResult data:", data);
                
        const raceArray = Object.entries(data.race || {}).map(([label, pct]) => ({
          label,
          pct: Math.round(pct * 100),
        }));        

      const ageArray = Object.entries(data.age || {}).map(([label, pct]) => ({
          label,
          pct: Math.round(pct * 100),
        }))
        .sort((a, b) => {  
    const getStart = (label) => parseInt(label.split("-")[0], 10);
    return getStart(a.label) - getStart(b.label);
  });

        const genderArray = Object.entries(data.gender || {}).map(([label, pct]) => ({
          label,
          pct: Math.round(pct * 100),
        }));
        
        
        setEthnicityData(raceArray);
        setAgeData(ageArray);
        setGenderData(genderArray);

        if (raceArray.length > 0) {
          const top = raceArray.reduce((a, b) => (a.pct > b.pct ? a : b));
          setSelectedEthnicity({ label: top.label, percentage: top.pct });
        }

        if (ageArray.length > 0) {
          const top = ageArray.reduce((a, b) => (a.pct > b.pct ? a : b));
          setSelectedAge({ label: top.label, percentage: top.pct });
        }

        if (genderArray.length > 0) {
          const top = genderArray.reduce((a, b) => (a.pct > b.pct ? a : b));
          setSelectedGender({ label: top.label, percentage: top.pct });
        }
      } catch (e) {
        console.error("Failed to parse skinstric result:", e);
      }
    }, []);
        

    const getProgressColor = (pct) => {
      if (pct >= 75) return "black";
      if (pct >= 50) return "black";
      if (pct > 0) return "black";
      return "#ccc";
    };


const [donutSize, setDonutSize] = useState(360);

useEffect(() => {
  const updateSize = () => {
    setDonutSize(window.innerWidth < 500 ? 310 : 360);
  };
  updateSize(); 
  window.addEventListener("resize", updateSize);
  return () => window.removeEventListener("resize", updateSize);
}, []);

    const currentSelection =
      activeType === "ethnicity"
        ? selectedEthnicity
        : activeType === "age"
        ? selectedAge
        : selectedGender;


   return (
      <div className="page__results">
        <div className="para__wrapper-results">
          <p className="starter__para-results">A.I. ANALYSIS</p>
          <h1 className="starter__demographics-results">DEMOGRAPHICS</h1>
          <p className="starter__para-sub-results">PREDICTED RACE & AGE.</p>
        </div>

        <div className="grid">
          <div className="side__panel">
            <div className={`custom__rectangle-breakdown ${activeType === "ethnicity" ? "selected rectangle" : ""}`}
              onClick={() => setActiveType("ethnicity")}>
              <div className="ethnicity__wrapper">
                <p className="ethnicity__is">{selectedEthnicity.label}</p>
                <div className="race">RACE</div>
              </div>
            </div>
            <div className={`custom__rectangle-breakdown ${activeType === "age" ? "selected rectangle" : ""}`}
            onClick={() => setActiveType("age")}>
              <div className="age__wrapper">
                <p className="age__range__is">{selectedAge.label}</p>
                <div className="age">AGE</div>
              </div>
            </div>
            <div className={`custom__rectangle-breakdown ${activeType === "gender" ? "selected rectangle" : ""}`}
            onClick={() => setActiveType("gender")}>
              <div className="gender__wrapper">
                <p className="gender__is">{selectedGender.label}</p>
                <div className="gender">SEX</div>
              </div>
            </div>
          </div>

          <div className="custom__rectangle-graph">
            <p className="ethnicity__is--graph">{currentSelection.label}</p>
              </div>
            <div className="transparent__rectangle">
              <DonutProgress
                percentage={currentSelection.percentage}
                progressColor={getProgressColor(currentSelection.percentage)}
                backgroundColor="#e0e0e0"
                size={donutSize}
                strokeWidth={4}
              />
            </div>

          <div className="custom__rectangle-ethnicity-specifications">
            <div className="current__focus--ai-confidence">
              <h4 className="AI__calculations-race">
                {activeType === "ethnicity" && "RACE"}
                {activeType === "age" && "AGE"}
                {activeType === "gender" && "SEX"}
                </h4>
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
                className={`ethnicity__breakdown ${selectedAge.label === age.label ? "selected" : ""}`}
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
                className={`ethnicity__breakdown ${selectedGender.label === gender.label ? "selected" : ""}`}
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
      <button
          className="diamond__arrow--wrapper-results">
          <Link to="/">
            <image className="arrow__right-results">
              <DiamondWithRightArrow />
            </image>
            <p className="right__diamond--para-results">Home</p>
          </Link>
        </button>
      <button className="diamond__arrow--wrapper-results">
        <Link to="/variables">
          <image className="arrow__left-results">
            <DiamondWithLeftArrow />
          </image>
          <p className="left__diamond--para-results">Back</p>
        </Link>
      </button>        
      </div>
);
  }

  export default Results;
