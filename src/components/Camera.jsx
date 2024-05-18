import React, { useState, useEffect, useRef, useCallback } from 'react';

function Camera({ onCapture, setStep, count, resetStates }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [cameraStep, setCameraStep] = useState(1);


  useEffect(() => {
    resetStates();
    const getVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.stream = stream; // Store stream reference for cleanup

        })
        .catch(error => {
          console.error("Error accessing the camera: ", error);
          alert("Error accessing the camera: " + error.message);
        });
    };

    getVideo();

    // Capture the current value of videoRef to use in the cleanup function
    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef && currentVideoRef.stream) {
        currentVideoRef.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [resetStates]);

  const handleCapture = useCallback(() => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.translate(canvasRef.current.width, 0);
      context.scale(-1, 1); // Mirror the image
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      canvasRef.current.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        onCapture(url);
        setCountdown(null); // Reset countdown after capture
      }, 'image/png');
      setStep(2);
    }
  }, [onCapture, setStep]);

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleCapture();
    }
    return () => clearTimeout(timer);
  }, [countdown, handleCapture]);

  const startCountdown = () => {
    setCameraStep(2);
    setCountdown(count); // Start countdown from the specified count
  };

  return (
    <article className='camera' onClick={startCountdown}>
      <ul className='camera_mask'>
        <li className='camera_mask--1'></li>
        <li className='camera_mask--2'></li>
        <li className='camera_mask--3'></li>
      </ul>
      <video className='camera_area' ref={videoRef} autoPlay playsInline />
      {cameraStep === 1 && <span className='camera_btn' ></span>}
      {countdown !== null && <div className='countdown'>{countdown}</div>}
      <canvas ref={canvasRef} width="2560" height="1920" style={{ display: 'none' }} />
    </article>
  );
}

export default Camera;
