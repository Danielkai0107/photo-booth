import React, { useEffect } from 'react';

function Preview({ imageSrc, printPhoto, croppedImageSrc, setCroppedImageSrc, handleRetry }) {
  const dpi = 300; // Desired DPI for better printing quality

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

        // Scaling factors to adjust canvas size based on DPI
        const scaleFactor = dpi / 96;
        canvas.width = width * scaleFactor; // Scale width for high DPI
        canvas.height = height * scaleFactor; // Scale height for high DPI
        canvas.style.width = `${width}px`; // Maintain visual width
        canvas.style.height = `${height}px`; // Maintain visual height

        const xOffset = (image.width - width) / 2;
        const yOffset = (image.height - height) / 2;

        // Scale drawing operations by scaleFactor
        ctx.drawImage(image, xOffset, yOffset, width, height, 0, 0, canvas.width, canvas.height);
        setCroppedImageSrc(canvas.toDataURL('image/png'));
      };
    }
  }, [imageSrc, setCroppedImageSrc, dpi]);

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
