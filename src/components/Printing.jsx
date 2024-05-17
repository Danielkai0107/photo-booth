import React from 'react'

const Printing = ({ setStep }) => {
  return (
    <article className='printing' onClick={() => { setStep(0) }}>
      <h2>列印中</h2>
      <h1>Printing ...</h1>
    </article>
  )
}

export default Printing
