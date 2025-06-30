import React, { useState, useRef } from "react";
import TakePhoto from "./TakePhoto";
import DiamondWithLeftArrow from "./DiamondWithLeftArrow";
import { MdCamera } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import "./cameriafileaccess.css";
import { apiFetch } from '../../ApiCheck.js';

function CameraFileAccess() {
  const [photoData, setPhotoData] = useState(null);
  const [showPermission, setShowPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [CameraReady, setCameraReady] = useState(false);
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result;
        setPhotoData(base64Data);

        const payload = { image: base64Data };

        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_PHASE_TWO}`, 
            
            //"https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
            
            
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) throw new Error("Failed to upload image");

           const responseData = await response.json();
           localStorage.setItem("skinstricResult", JSON.stringify(responseData));
           console.log("API response:", responseData);

          console.log("Photo successfully uploaded.");
          console.log(JSON.stringify(payload, null, 2));
        } catch (error) {
          console.error("Upload error:", error.message);
        }

        setTimeout(() => {
          setFileLoading(true);
          setTimeout(() => {
            navigate("/variables");
          }, 1500);
        }, 500);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = () => setShowPermission(true);

  const handleAllow = async () => {
    setShowPermission(false);
    setCameraReady(false);
    setShowLoading(true);

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userStream);

      setTimeout(() => {
        setShowLoading(true);
      }, 500);
      setShowCamera(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setShowPermission(false);
      setShowLoading(false);
    }
  };

  const handleDeny = () => setShowPermission(false);

  const handleDone = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setStream(null);
    setShowCamera(false);
  };

  const handleCameraReady = () => {
    setCameraReady(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowCamera(true);
    }, 1500);
  };

  return (
    <div className="page__cf">
      <div className="para__wrapper-cfa">
        <p className="starter__para-cfa">TO START ANALYSIS</p>
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
                <MdCamera onClick={handleClick}
                style={{ cursor: "pointer" }} />
              </div>
              <div className="scanline scanline-1">
                <img src="./Scan1.svg" alt="scanline" />
                <p className="scanline__para-1">ALLOW A.I TO SCAN YOUR FACE</p>
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
                <ImFilePicture
                  onClick={handleFileClick}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="scanline scanline-2">
                <img src="./Scan1.svg" alt="scanline" />
                <p className="scanline__para-2">ALLOW A.I TO ACCESS GALLERY</p>
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 8,
              }}
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

      {showLoading && (
        <div className="loading-overlay-cfa">
          <div className="diamond-stack-loading">
            <div className="diamond-rotate-wrapper-cf outer-rotate-cf">
              <div className="diamond-cf outer-cf"></div>
            </div>
            <div className="diamond-rotate-wrapper-cf inner-rotate-cf">
              <div className="diamond-cf inner-cf"></div>
            </div>
            <div className="diamond-rotate-wrapper-cf inner-last-rotate-cf">
              <div className="diamond-cf inner--last-cf">
                <div className="diamond__content-cf counter-spin-cf">
                  <p className="loading-text">
                    Loading Camera<span className="dots-cfa">...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            onCameraReady={handleCameraReady}
          />
        </div>
      )}

 {fileLoading && (
          <div className="loading-overlay-cfa">
          <div className="diamond-stack-loading">
            <div className="diamond-rotate-wrapper-cf outer-rotate-cf">
              <div className="diamond-cf outer-cf"></div>
            </div>
            <div className="diamond-rotate-wrapper-cf inner-rotate-cf">
              <div className="diamond-cf inner-cf"></div>
            </div>
            <div className="diamond-rotate-wrapper-cf inner-last-rotate-cf">
              <div className="diamond-cf inner--last-cf">
                <div className="diamond__content-cf counter-spin-cf">
                  <p className="loading-text">
                    Preparing your Analysis<span className="dots-cfa">...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
)}
    </div>
  );
}

export default CameraFileAccess;
