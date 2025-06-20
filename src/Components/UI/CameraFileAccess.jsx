// App structure:
// - Clicking the <MdCamera /> icon opens a full-screen camera overlay
// - The camera overlay has:
//    * An initial "permission prompt" styled overlay
//    * A live camera feed with text instructions
//    * A capture button and a bottom-positioned back button

import React, { useState } from "react";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { Link } from "react-router-dom";
import './cameriafileaccess.css';
import { MdCamera } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import TakePhoto from "./TakePhoto";

function CameraFileAccess() {
  const [showCameraUI, setShowCameraUI] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const handleClick = () => {
    setShowCameraUI(true);
  };

  if (showCameraUI) {
    return (
      <TakePhoto
        onPhotoCaptured={(photo) => setPhotoData(photo)}
        onDone={() => setShowCameraUI(false)}
      />
    );
  }

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
                <MdCamera onClick={handleClick} />
              </div>
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
        <div className="half-container-cf">
          {photoData && (
            <img
              src={photoData}
              alt="Captured Preview"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}
        </div>
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
  );
}

export default CameraFileAccess;
