//父層
import React, { useState } from 'react'
import Camera from '../components/Camera'
import Preview from '../components/Preview'
import Welcome from '../components/Welcome'
import Printing from '../components/Printing'
import Item from '../components/Item'
import { deleteObject } from 'firebase/storage'
import axios from 'axios'

const MainMode = ({ setMode, countdown ,IP}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [step, setStep] = useState(0);
  const [storageRef, setStorageRef] = useState(null);
  const [printableImageURL, setPrintableImageURL] = useState(null);

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

  const printPhoto = async () => {
    if (!printableImageURL) {
      console.error('No image URL available to print.');
      return;
    }
    const blob = await fetch(printableImageURL, { mode: 'no-cors' }).then(res => res.blob());
    const formData = new FormData();
    formData.append('photo', blob, 'upload.png');
  
    try {
      const response = await axios.post(`http://${IP}:5500/upload-and-print`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      setStep(3);
    } catch (error) {
      console.error('Error printing photo:', error);
    }
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
            printPhoto={printPhoto}
          />}
        {step === 2 &&
          <Item
            mainIMG={croppedImageSrc}
            setStorageRef={setStorageRef}
            setPrintableImageURL={setPrintableImageURL}
          />
        }
        {step === 3 && <Printing setStep={setStep} />}
      </section>
    </article>
  );
}

export default MainMode;
