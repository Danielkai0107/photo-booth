//子層
import React, { useEffect, useCallback, useRef, useState } from 'react';
import { storage } from '../firebase-config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import templateIMG1 from '../images/1.png';
import templateIMG2 from '../images/2.png';
import templateIMG3 from '../images/3.png';
import templateIMG4 from '../images/4.png';

const Item = ({ mainIMG, setStorageRef }) => {
  const ref = useRef(null);
  const [templateImage, setTemplateImage] = useState('');

  const uploadCanvasImage = useCallback((canvas) => {
    canvas.toBlob(blob => {
      const imageRef = storageRef(storage, `images/${Date.now()}.jpg`);
      uploadBytes(imageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setStorageRef(snapshot.ref); // Ensure this is being set correctly
        }).catch(error => {
          console.error("Error getting download URL: ", error);
        });
      }).catch(error => {
        console.error("Error uploading file: ", error);
      });
    });
  }, [setStorageRef]);
  

  useEffect(() => {
    // Randomly choose one of the template images
    const templates = [templateIMG1, templateIMG2, templateIMG3, templateIMG4];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setTemplateImage(randomTemplate);
  }, []);

  useEffect(() => {
    if (!templateImage || !ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const unitWidth = 10;
    const width = 54 * unitWidth;
    const height = 86 * unitWidth;
    canvas.width = width;
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
        uploadCanvasImage(canvas);
      };
      templateImageObj.src = templateImage;
    };
    mainImage.src = mainIMG;
  }, [mainIMG, ref, uploadCanvasImage, templateImage]);

  return (
    <div className='card'>
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default React.memo(Item);
