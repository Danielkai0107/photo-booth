import React, { } from 'react';

function SettingPage({ setMode, setCountdown, countdown,setIP }) {

  return (
    <article className='setting'>
      <h1 className='logo'>Ink Memory</h1>
      <section className='input_group'>
        <label>Countdown: </label>
        <input type="number" value={countdown} onChange={e => setCountdown(e.target.value)} />

        <label>IP: </label>
        <input type="text" value={countdown} onChange={e => setIP(e.target.value)} />
      </section>
      <span className='start_btn' onClick={() => { setMode(2) }}></span>
    </article>
  );
}

export default SettingPage;
