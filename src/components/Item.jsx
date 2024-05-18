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

  // Define the desired DPI for printing
  const dpi = 300;

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

    // Randomly choose one of the template images
    const randomTemplate = imageLoaders[Math.floor(Math.random() * imageLoaders.length)].src;
    setTemplateImage(randomTemplate);
  }, []);

  useEffect(() => {
    if (!templateImage || !ref.current || !Object.values(imagesLoaded).every(Boolean)) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    const scaleFactor = dpi / 96; // Default browser DPI is 96
    const unitWidth = 10 * scaleFactor; // Adjust unit width based on the scale factor
    const width = 54 * unitWidth;
    const height = 86 * unitWidth;
    canvas.style.width = `${width / scaleFactor}px`; // Maintain visual size
    canvas.style.height = `${height / scaleFactor}px`;
    canvas.width = width; // Set actual size of the canvas element
    canvas.height = height;

    const mainImage = new Image();
    mainImage.onload = () => {
      const scale = Math.min(width / mainImage.width, height / mainImage.height);
      const x = (width - mainImage.width * scale) / 2;
      const y = (height - mainImage.height * scale) / 2;
      ctx.drawImage(mainImage, x, y, mainImage.width * scale, mainImage.height * scale);

      const templateImageObj = new Image();
      templateImageObj.onload = () => {
        ctx.drawImage(templateImageObj, 0, 0, width, height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setPrintableImageURL(imageDataUrl);
      };
      templateImageObj.src = templateImage;
    };
    mainImage.src = mainIMG;
  }, [mainIMG, ref, templateImage, setPrintableImageURL, imagesLoaded, dpi]);

  if (!Object.values(imagesLoaded).every(Boolean)) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card'>
      <canvas ref={ref} style={{ width: '100%', height: 'auto' }}></canvas>
    </div>
  );
};

export default React.memo(Item);
