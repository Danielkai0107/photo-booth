import axios from 'axios';
import React from 'react';
import testPhoto from '../images/1.png';

function SettingPage({ setMode, setCountdown, countdown, setIP, IP }) {
  const sendTestPhoto = async () => {
    const response = await fetch(testPhoto);
    const blob = await response.blob(); // Convert the image to a blob

    const formData = new FormData();
    formData.append('photo', blob, 'test-photo.png');

    try {
      const response = await axios.post(`https://${IP}:5500/upload-and-print`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending test photo:', error);
    }
  };

  return (
    <article className='setting'>
      <h1 className='logo'>Ink Memory</h1>
      <section className='input_group'>
        <label>Countdown: </label>
        <input type="number" value={countdown} onChange={e => setCountdown(e.target.value)} />
      </section>
      <section className='input_group'>
        <label>IP: </label>
        <input type="text" value={IP} onChange={e => setIP(e.target.value)} />
      </section>
      <section className='input_group'>
        <span className='test' onClick={sendTestPhoto}>列印測試</span>
        <a href={`https://${IP}:5500`}>後端安全性測試</a>
      </section>
      <p className='version'>Version <span> 24-0519-01 </span> ®InkMemory</p>
      <span className='start_btn' onClick={() => { setMode(2) }}></span>
    </article>
  );
}

export default SettingPage;
