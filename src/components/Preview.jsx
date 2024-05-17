import React, { useEffect } from 'react';
import axios from 'axios';

function Preview({ imageSrc, setStep, croppedImageSrc, setCroppedImageSrc ,handleRetry}) {

  useEffect(() => {
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetAspectRatio = 8 / 9;
        let width, height;

        if (image.width / image.height > targetAspectRatio) {
          height = image.height;
          width = height * targetAspectRatio;
        } else {
          width = image.width;
          height = width / targetAspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        const xOffset = (image.width - width) / 2;
        const yOffset = (image.height - height) / 2;

        ctx.drawImage(image, xOffset, yOffset, width, height, 0, 0, width, height);
        setCroppedImageSrc(canvas.toDataURL('image/png'));
      };
    }
  }, [imageSrc, setCroppedImageSrc]);

  const printPhoto = async () => {
    try {
      const response = await axios.post('http://localhost:5500/print-latest-photo');
      console.log('Server response:', response.data);
      setStep(3)
    } catch (error) {
      console.error('Error printing photo:', error);
    }
  };

  return (
    <article className='preview'>
      <ul className='preview_mask'>
        <li className='preview_mask--1' onClick={handleRetry}>
          <span className='retry'></span>
        </li>
        <li className='preview_mask--2'>
          {croppedImageSrc && (
            <section className="image-wrapper">
              <img src={croppedImageSrc} alt="Preview" className="image-preview" />
            </section>
          )}
        </li>
        <li className='preview_mask--3' onClick={printPhoto}>
          <span className='print'></span>
        </li>
      </ul>
    </article>
  );
}

export default Preview;
