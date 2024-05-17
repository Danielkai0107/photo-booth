import React from 'react';

const Welcome = ({ setStep }) => {
  return (
    <article className='welcome' onClick={() => { setStep(1) }}>
      <h1>Ink Memory</h1>
      <figure className='slider'>
      </figure>
    </article>
  )
}

export default Welcome;
