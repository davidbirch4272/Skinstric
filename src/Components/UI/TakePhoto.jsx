import React, { useState, useEffect, useRef } from "react";
import './takephoto.css';
import { GoDiamond } from "react-icons/go";
import DiamondWithLeftArrowWhite from "./DiamondWithLeftArrowWhite";
import { Link } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import Nav from '../Nav';
import nav from '../nav.css';

function TakePhoto({ onPhotoCaptured, onDone }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [step, setStep] = useState("permission"); 
  const [stream, setStream] = useState(null);

  const handleAllow = () => {
    setStep("loading");
    navigator.mediaDevices.getUserMedia({ video: true })
       .then((stream) => {
        console.log("Got Stream:", stream);
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        } else {
            console.error("videoRef.current is null")
        }
        setStep("camera");
      })
      .catch((err) => {
        console.error("Camera access denied", err);
        setStep("permission");
        onDone(); 
      });
  };

  const handleDeny = () => {
    onDone(); 
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video || video.readyState < 2) {
      console.warn("Camera not ready to capture photo.");
      return;
    }

    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photo = canvas.toDataURL("image/png");
    onPhotoCaptured(photo);
    setStep("done");

    
    setTimeout(() => onDone(), 100);
  };

  

useEffect(() => {
  if (videoRef.current && stream) {
    videoRef.current.srcObject = stream;
  }
}, [stream]);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  
  if (step === "permission") {
    return (
      <div className="permission-overlay">
        <p className="permission-text">AI would like to access your camera</p>
        <div className="permission-divider"></div>
        <div className="permission-buttons">
          <button onClick={handleDeny}>Deny</button>
          <button onClick={handleAllow}>Allow</button>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="loading-screen">
        <p>Setting up camera...</p>
      </div>
    );
  }

  return (
<>
<Nav />
<div className="camera-view">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-fullscreen"
        onLoadedMetadata={() => videoRef.current?.play()}
        />
      <div className="camera-overlay">TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
      <image className="small__diamond-a"><GoDiamond /></image><p className="instruction__a">Neutral Expression</p>
      <image className="small__diamond-b"><GoDiamond /></image><p className="instruction__b">Frontal Pose</p>
      <image className="small__diamond-c"><GoDiamond /></image><p className="instruction__c">Adequate Lighting</p>
      <button className="diamond__arrow--wrapper-tp"onClick={onDone}>
        <Link to="/">
          <div className="arrow__left-tp">
            <DiamondWithLeftArrowWhite />
          </div>
          <p className="left__diamond--para-tp">Back</p>
        </Link>
      </button>
     <p className="instruction__d">Take Picture</p> <button className="photo-button" onClick={takePhoto}><MdCamera/></button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
        </>
  );
}

export default TakePhoto;
