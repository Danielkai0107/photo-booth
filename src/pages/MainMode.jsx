//父層
import React, { useState } from 'react'
import Camera from '../components/Camera'
import Preview from '../components/Preview'
import Welcome from '../components/Welcome'
import Printing from '../components/Printing'
import Item from '../components/Item'
import { deleteObject } from 'firebase/storage'

const MainMode = ({ setMode, countdown }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [step, setStep] = useState(0);
  const [storageRef, setStorageRef] = useState(null);

  const resetStates = () => {
    setImageSrc(null);
    setCroppedImageSrc(null);
    setStorageRef(null);
  };

  const handleRetry = () => {
  if (storageRef) {
    deleteObject(storageRef).then(() => {
      console.log("Image successfully deleted from storage");
      setStorageRef(null);
      setStep(1);
    }).catch((error) => {
      console.error("Failed to delete image from storage:", error);
    });
  } else {
    console.log("No reference to delete");
    setStep(1);
  }
};


  const handleCapture = (imageSrc) => {
    setImageSrc(imageSrc);
  };

  return (
    <article className='mode_container'>
      <figure className='end_btn' onClick={() => { setMode(1) }}>
      </figure>
      <section className="mode">
        {step === 0 && <Welcome setStep={setStep} />}
        {step === 1 &&
          <Camera
            onCapture={handleCapture}
            setStep={setStep}
            step={step}
            count={countdown}
            setImageSrc={setImageSrc}
            resetStates={resetStates}
          />}
        {step === 2 &&
          <Preview
            imageSrc={imageSrc}
            setStep={setStep}
            step={step}
            croppedImageSrc={croppedImageSrc}
            setCroppedImageSrc={setCroppedImageSrc}
            handleRetry={handleRetry}
          />}
        {step === 2 &&
          <Item
            mainIMG={croppedImageSrc}
            setStorageRef={setStorageRef}
          />
        }
        {step === 3 && <Printing setStep={setStep} />}
      </section>
    </article>
  );
}

export default MainMode;
