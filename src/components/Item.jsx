import React, { useEffect, useRef, useState } from 'react';
import templateIMG1 from '../images/1.png';
import templateIMG2 from '../images/2.png';
import templateIMG3 from '../images/3.png';
import templateIMG4 from '../images/4.png';

const Item = ({ mainIMG, setPrintableImageURL }) => {
  const ref = useRef(null);
  const [templateImage, setTemplateImage] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false
  });

  useEffect(() => {
    const imageLoaders = [
      { src: templateIMG1, key: 'img1' },
      { src: templateIMG2, key: 'img2' },
      { src: templateIMG3, key: 'img3' },
      { src: templateIMG4, key: 'img4' }
    ];

    imageLoaders.forEach((img) => {
      const image = new Image();
      image.onload = () => setImagesLoaded(prev => ({ ...prev, [img.key]: true }));
      image.src = img.src;
    });

    const randomTemplate = imageLoaders[Math.floor(Math.random() * imageLoaders.length)].src;
    setTemplateImage(randomTemplate);
  }, []);

  useEffect(() => {
    if (!templateImage || !ref.current || !Object.values(imagesLoaded).every(Boolean)) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    
    // Set higher resolution for printing quality
    const scaleFactor = 3;  // Adjust this factor based on your print quality needs
    const displayWidth = 360;  // Display width in pixels
    const displayHeight = 576;  // Display height in pixels
    canvas.width = displayWidth * scaleFactor;
    canvas.height = displayHeight * scaleFactor;
    canvas.style.width = `${displayWidth}px`;  // Set the display size
    canvas.style.height = `${displayHeight}px`;

    const mainImage = new Image();
    mainImage.onload = () => {
      const scale = Math.min(canvas.width / mainImage.width, canvas.height / mainImage.height);
      const x = (canvas.width - mainImage.width * scale) / 2;
      const y = (canvas.height - mainImage.height * scale) / 2;
      ctx.drawImage(mainImage, x, y, mainImage.width * scale, mainImage.height * scale);

      const templateImageObj = new Image();
      templateImageObj.onload = () => {
        ctx.drawImage(templateImageObj, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setPrintableImageURL(imageDataUrl);
      };
      templateImageObj.src = templateImage;
    };
    mainImage.src = mainIMG;
  }, [mainIMG, ref, templateImage, setPrintableImageURL, imagesLoaded]);

  if (!Object.values(imagesLoaded).every(Boolean)) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card'>
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default React.memo(Item);
