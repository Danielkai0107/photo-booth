import React, { useEffect } from 'react';

function Preview({ imageSrc, printPhoto, croppedImageSrc, setCroppedImageSrc, handleRetry, IP }) {

  useEffect(() => {
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        // 提高解析度的倍數
        const scaleFactor = 2; // 這裡設置為2，意味著解析度為原來的2倍
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetAspectRatio = 8 / 9;
        let width, height;

        if (image.width / image.height > targetAspectRatio) {
          height = image.height * scaleFactor;
          width = height * targetAspectRatio;
        } else {
          width = image.width * scaleFactor;
          height = width / targetAspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        const xOffset = (image.width * scaleFactor - width) / 2;
        const yOffset = (image.height * scaleFactor - height) / 2;

        ctx.drawImage(image, xOffset / scaleFactor, yOffset / scaleFactor, width / scaleFactor, height / scaleFactor, 0, 0, width, height);
        setCroppedImageSrc(canvas.toDataURL('image/png'));
      };
    }
  }, [imageSrc, setCroppedImageSrc]);

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
