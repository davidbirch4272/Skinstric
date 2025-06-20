import React, { useState, useEffect, useRef } from "react";

function TakePhoto() {
const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [step, setStep] = useState("idle");
  const [photoData, setPhotoData] = useState(null);
  const [stream, setStream] = useState(null);

  const handleStart = () => {
    setStep("loading-permission");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        setStep("camera");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Permission denied or error:", err);
        setStep("idle");
      });
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoData(canvas.toDataURL("image/png"));
    setStep("preview");
  };


  const handleRetake = () => {
    setPhotoData(null);
    setStep("camera");
  };


  const handleUsePhoto = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("done"); 
    }, 3000);
  };

  
  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  return (
    <div className="camera-flow" style={{ textAlign: "center", padding: 20 }}>
        {step === "idle" && (
   <>
   
         <div className="half-container-tp">
            <p className="instruction-tp">Allow A.I To ACCESS YOUR CAMERA</p>
            <div className="border-tp"></div>
                <span className="select-tp">Deny</span> <span className="select-tp">Allow</span> 
         </div>
     
       <button onClick={handleStart}>📸 Start Camera</button>
</> 
     
     )}

  
      {step === "loading-permission" && (
        <p>Setting up camera...</p>
      )}

        {step === "camera" && (
        <div className="camera-view" style={{ position: "relative" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxHeight: "80vh", borderRadius: 8 }}
          />
          <button
            onClick={() => setStep("idle")}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            ⬅ Back
          </button>
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)", color: "white", fontSize: "1.2rem" }}>
            Align your face and tap the button
          </div>
          <button
            onClick={takePhoto}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            📷
          </button>
        </div>
      )}

  
      {step === "preview" && (
        <div className="preview">
          <img
            src={photoData}
            alt="Captured"
            style={{ width: "100%", maxHeight: "80vh", borderRadius: 8 }}
          />
          <div style={{ marginTop: 10 }}>
            <button onClick={handleRetake}>🔄 Retake</button>
            <button onClick={handleUsePhoto} style={{ marginLeft: 10 }}>
              ✅ Use Photo
            </button>
          </div>
        </div>
      )}

  
      {step === "processing" && (
        <div className="processing-state" style={{ marginTop: 50 }}>
          <p className="click">Processing submission...</p>
          <div className="dots" style={{ fontSize: "2rem", animation: "blink 1s infinite" }}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )}

  
      {step === "done" && (
        <div>
          <h2>🎉 Submission Complete</h2>
          <p>Proceeding to next screen...</p>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};





export default TakePhoto;