import React, { useState } from "react";
import TakePhoto from "./TakePhoto";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { MdCamera } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { Link } from "react-router-dom";
import "./cameriafileaccess.css";

function CameraFileAccess() {
  const [photoData, setPhotoData] = useState(null);
  const [showPermission, setShowPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const[userStream, setUserStream] = useState();

  const handleClick = () => {
    setShowPermission(true);
  };

  const handleAllow = async () => {
    try {
      console.log("Requesting camera...");
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera granted:", userStream);
      setStream(userStream);
      setShowPermission(false);
      setShowCamera(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setShowPermission(false);
    }
  };

  const handleDeny = () => {
    setShowPermission(false);
  };

  const handleDone= () => {
    if (stream)  {
        stream.getTracks().forEach((t) => t.stop());
}
            setShowCamera(false);
            setStream(null);
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
                    <MdCamera onClick={handleClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="diamond-stack-cf-2">
            {/* Repeat for file upload diamond */}
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
            <Link to="/testing">
              <div className="arrow__left-cf">
                <DiamondWithLeftArrow />
              </div>
              <p className="left__diamond--para-cf">Back</p>
            </Link>
          </button>

        
      {showPermission && (
        <div className="permission-popup">
          <p className="permission-text">AI would like to access your camera</p>
          <div className="permission-divider"></div>
          <div className="permission-buttons">
            <button onClick={handleDeny}>Deny</button>
            <button onClick={handleAllow}>Allow</button>
          </div>
        </div>
      )}

        
      {showCamera && (
        <div className="takephoto-overlay">
        <TakePhoto
          stream={stream}
          onPhotoCaptured={(photo) => setPhotoData(photo)}
          onDone={handleDone}           
        />
        </div>
      )}

    </div>
  );
}

export default CameraFileAccess;
