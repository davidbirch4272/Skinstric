import React, { useState } from "react";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { Link } from "react-router-dom";
import './cameriafileaccess.css'
import { MdCamera } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import TakePhoto from "./TakePhoto";


function CameraFileAccess() {
const [showCameraUI, setShowCameriaUI]  = useState(false);

const handleClick = () => {
    setShowCameriaUI(true);
};

  return (
    <div className="page__cf">
      <div className="para__wrapper">
        <p className="starter__para">TO START ANALYSIS</p>
      </div>

      <div className="diamond-stack-cf-1">
        <div className="diamond-rotate-wrapper-cf outer-rotate-cf">
          <div className="diamond-cf outer-cf"></div>
        </div>
        <div className="diamond-rotate-wrapper-cf inner-rotate-cf">
          <div className="diamond-cf inner-cf"></div>
        </div>
        <div className="diamond-rotate-wrapper-cf inner-last-rotate-cf">
          <div className="diamond-cf inner--last-cf">
            <div className="diamond__content-cf counter-spin-cf">
              <div className="camera-cf">
                <MdCamera onClick={handleClick}/>
              </div>
               { showCameraUI && <TakePhoto />}              
            </div>           
          </div>
        </div>
      </div>

        <div className="diamond-stack-cf-2">
        <div className="diamond-rotate-wrapper-cf outer-rotate-cf">
          <div className="diamond-cf outer-cf"></div>
        </div>
        <div className="diamond-rotate-wrapper-cf inner-rotate-cf">
          <div className="diamond-cf inner-cf"></div>
        </div>
        <div className="diamond-rotate-wrapper-cf inner-last-rotate-cf">
          <div className="diamond-cf inner--last-cf">
            <div className="diamond__content-cf counter-spin-cf">
             <div className="camera-cf">
                <ImFilePicture />
              </div>

             
             
            </div>           
          </div>
        </div>
      </div>
      <div className="preview__wrapper-cf">
        <p className="preview-cf">Preview</p>
      <div className="half-container-cf"></div>
      </div>
    





      

      <button className="diamond__arrow--wrapper-cf">
        <Link to="/">
          <div className="arrow__left-cf">
            <DiamondWithLeftArrow />
          </div>
          <p className="left__diamond--para-cf">Back</p>
        </Link>
      </button>
    </div>
  )
}

export default CameraFileAccess;
