//App.js
import React, { useState } from "react";
import SettingPage from "./pages/SettingPage";
import MainMode from "./pages/MainMode";

function App() {
  const [mode, setMode] = useState(2);
  const [countdown, setCountdown] = useState(5);
  const [IP, setIP] = useState('192.168.1.109');
  return (
    <main>
      {mode === 1 && (
        <SettingPage
          setMode={setMode}
          countdown={countdown}
          setCountdown={setCountdown}
          setIP={setIP}
          IP={IP}
        />
      )}
      {mode === 2 && <MainMode setMode={setMode} countdown={countdown} IP={IP} />}
    </main>
  );
}

export default App;
