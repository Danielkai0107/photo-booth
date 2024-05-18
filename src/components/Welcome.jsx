import React, { useState, useEffect } from 'react';
import image1 from '../images/w1.jpeg';
import image2 from '../images/w2.jpeg';
import image3 from '../images/w3.jpeg';
import image4 from '../images/w4.jpg';

const Welcome = ({ setStep }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [image1, image2, image3, image4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change image every 3000 milliseconds (3 seconds)

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <article className='welcome' onClick={() => setStep(1)}>
      <h1>Ink Memory</h1>
      <figure className='slider'>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index}`}
            className={index === currentSlide ? 'active' : ''}
          />
        ))}
      </figure>
    </article>
  );
}

export default Welcome;
