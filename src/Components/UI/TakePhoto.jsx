import React, { useEffect, useRef, useState, useCallback } from "react";
import "./takephoto.css";
import { GoDiamond } from "react-icons/go";
import DiamondWithLeftArrowWhite from "./DiamondWithLeftArrowWhite";
import { Link, useNavigate } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { apiFetch } from '../../ApiCheck.js';

function TakePhoto({ stream, onPhotoCaptured, onDone, onCameraReady }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [processing, SetProcessing] = useState(false);
  const [PhotoDataState, setPhotoDataState] = useState();
  const navigate = useNavigate();

  const handleDone = useCallback(() => {
    if (handleUsePhoto) {
      handleUsePhoto();
    }
    
  }, [onDone]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      const handleCanPlay = () => {
       
        if (onCameraReady) onCameraReady();
      };

     
      video.srcObject = stream;

      video.addEventListener("canplay", handleCanPlay);
      video.play().catch((err) => {
        console.error("Auto-Play failed, err", err);
      });

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [stream, onCameraReady]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        
      }
    };
  }, []);

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video || video.readyState < 2) {
      console.warn("Camera not ready.");
      return;
    }

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedPhotoData = canvas.toDataURL("image/png");
    setPhoto(capturedPhotoData);
    if (onPhotoCaptured) {
      onPhotoCaptured(capturedPhotoData);
    }

    setPhotoDataState(capturedPhotoData);
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleUsePhoto = async () => {
    SetProcessing(true);

   const payload = { image: photo };

    try {
      const response = await fetch(
           "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",      
       
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");
      const responseData = await response.json(); 
      localStorage.setItem("skinstic Result", JSON.stringify(responseData));
      console.log("API response:", responseData);

      console.log("Photo successfully uploaded.");
      console.log(JSON.stringify(payload, null, 2));
    } catch (error) {
      console.error("Upload error:", error.message);
    }

    setTimeout(() => {
      if (onPhotoCaptured) onPhotoCaptured(photo);
  
 if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null; 
  }

      navigate("/variables");
    }, 2000);
  };

    return (
    <div className="page__tp">
      <div className="camera-view">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-fullscreen"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.play().catch((err) => {
                console.error("Auto-play failed", err);
              });
              if (onCameraReady) onCameraReady();
            }
          }}
        />

        {!photo && !processing && (
          <>
            <div className="camera-overlay">
              <p className="Overlay-heading">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </p>

              <div className="instruction-wrapper">
                <div className="instruction-item">
                  <GoDiamond className="small__diamond-a" />
                  <p className="instruction__a">Neutral Expression</p>
                </div>
                <div className="instruction-item">
                  <GoDiamond className="small__diamond-b" />
                  <p className="instruction__b">Frontal Pose</p>
                </div>
                <div className="instruction-item">
                  <GoDiamond className="small__diamond-c" />
                  <p className="instruction__c">Adequate Lighting</p>
                </div>
              </div>
            </div>
            <div className="instruction-item">
              <p className="instruction__d">Take Picture</p>
              <button className="photo-button" onClick={takePhoto}>
                <MdCamera />
              </button>
            </div>
          </>
        )}

        {photo && !processing && (
          <div className="photo-preview-overlay">
            <p className="great-shot">Great Shot!</p>
            <h2 className="preview-label">Preview</h2>
            <img src={photo} alt="Preview" className="photo-preview-image" />
            <div className="photo-preview-buttons">
              <button className="retake-button" onClick={handleRetake}>
                Retake
              </button>
              <button className="use-button" onClick={handleUsePhoto}>
                Use This Photo
              </button>
            </div>
          </div>
        )}

        {processing && (
          <div className="analyze__image-overlay">
            <div className="half__container-tp--end">
              <div className="processing-state-tp">
                <h1 className="click-tp">Analyzing Image</h1>
                <div className="dots-tp">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="diamond__arrow--wrapper-tp" onClick={onDone}>
          <Link to="/access">
            <div className="arrow__left-tp">
              <DiamondWithLeftArrowWhite />
            </div>
            <p className="left__diamond--para-tp">Back</p>
          </Link>
        </button>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default TakePhoto;
