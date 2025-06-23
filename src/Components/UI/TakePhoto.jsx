import React, { useEffect, useRef } from "react";
import "./takephoto.css";
import { GoDiamond } from "react-icons/go";
import DiamondWithLeftArrowWhite from "./DiamondWithLeftArrowWhite";
import { Link } from "react-router-dom";
import { MdCamera } from "react-icons/md";

function TakePhoto({ stream, onPhotoCaptured, onDone }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log("Attaching Stream in TakePhoto", stream);
      videoRef.current.srcObject = stream;
     
    }
  }, [stream]);


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

    const photo = canvas.toDataURL("image/png");
    onPhotoCaptured(photo);

    setTimeout(() => onDone(), 100);
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
          }
          
        }}
      />

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
