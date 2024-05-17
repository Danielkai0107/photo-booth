//App.js
import React, { useState } from "react";
import SettingPage from "./pages/SettingPage";
import MainMode from "./pages/MainMode";

function App() {
  const [mode, setMode] = useState(2);
  const [countdown, setCountdown] = useState(2);
  return (
    <main>
      {mode === 1 && (
        <SettingPage
          setMode={setMode}
          countdown={countdown}
          setCountdown={setCountdown}
        />
      )}
      {mode === 2 && <MainMode setMode={setMode} countdown={countdown} />}
    </main>
  );
}

export default App;
