import React, { useEffect, useState } from 'react';

export default function AIGuard({ context }) {
  const [status, setStatus] = useState('MONITORING');

  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    // Logika Respon Berdasarkan Halaman (Context)
    switch(context) {
      case 'DASHBOARD':
        speak("System integrity verified. Market prices for E-N-P-E and L-U-V are now live.");
        break;
      case 'ENROLL':
        speak("Sovereign Enrollment portal active. Please provide your legal name for hash generation.");
        break;
      case 'ERROR':
        speak("Alert. Anomaly detected in transaction hash. Security protocols engaged.");
        setStatus('ALERT');
        break;
      default:
        break;
    }
  }, [context]);

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 9999 }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: status === 'MONITORING' ? '#00ff41' : '#ff0000', boxShadow: '0 0 10px currentColor' }}></div>
      <span style={{ fontSize: '0.6rem', color: '#00ff41', fontWeight: 'bold', letterSpacing: '1px' }}>AI GUARD: {status}</span>
    </div>
  );
}
