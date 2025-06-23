import React, { useEffect, useRef, useState, useCallBack } from "react";
import "./takephoto.css";
import { GoDiamond } from "react-icons/go";
import DiamondWithLeftArrowWhite from "./DiamondWithLeftArrowWhite";
import { Link, useNavigate } from "react-router-dom";
import { MdCamera } from "react-icons/md";

function TakePhoto({ stream, onPhotoCaptured, onDone, onCameraReady }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [processing, SetProcessing] = useState(false);
  const [PhotoDataState, setPhotoDataState] = useState();
  
  const navigate = useNavigate();

  const handleDone = useCallBack(() => {
   if (onDone) {
    onDone();
   }
   console.log("Photo process marked as done.");

  }, [onDone]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      const handleCanPlay = () => {
        console.log("Video Can play, calling on CameraReady");
        if (onCameraReady) onCameraReady();
      };
      
      console.log("Attaching Stream to Video Element");
      video.srcObject = stream;
      video.addEventListener("canplay", handleCanPlay);
      video.play().catch((err) => {
        console.error("Auto-Play failed, err", err);
      });    
    
    return () => {
    video.removeEventListener("canplay", handleCanPlay);
  }
}
  },[stream, onCameraReady]);

useEffect(() => {
  return () => {
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      console.log("Camera stream stopped on unmount.");
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
    setPhoto(capturedPhotoData)
    if (onPhotoCaptured) {
    onPhotoCaptured(capturedPhotoData);
    }

    setPhotoDataState(capturedPhotoData);
    handleDone();
    setTimeout(() => navigate("/"), 1500);
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleUsePhoto = () => {
    SetProcessing(true);
    
    setTimeout(() => {
    if (onPhotoCaptured) onPhotoCaptured(photo)
    navigate("/");
    }, 20000);
  };

  console.log("📷 TakePhoto component rendered");


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
          <p className="preview-label">Preview</p>
          <img src={photo} alt="Preview" className="photo-preview-image" />
          <div className="photo-preview-buttons">
            <button className="retake-button" onClick={handleRetake}>Retake</button>
            <button className="use-button" onClick={handleUsePhoto}>Use This Photo</button>
          </div>
        </div>
)}
      
{processing && (

  <div className="analyze__image-overlay">
        <div className="half__container-tp--end">
          <div className="processing-state-tp">
                  <h1 className="click-tp">Processing submission...</h1>
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
