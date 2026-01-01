import React, { useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 8000); // Durasi 8 detik
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center' }}>
        <div className="logo-4d">INDIENATION NEUROSPHERE 4D</div>
        <div className="orchestra-box">
          <div className="text-anim">FREE 1 MILLION LOVELY COIN</div>
          <div className="text-anim-sub">FOR 1 MILLION PEOPLES</div>
        </div>
      </div>

      {/* FOOTNOTE PERMANEN */}
      <div style={{ position: 'absolute', bottom: '40px', textAlign: 'center', color: '#666', fontSize: '0.75rem', letterSpacing: '2px', lineHeight: '1.8' }}>
        POWERED BY :<br />
        <span style={{ color: '#aaa', fontWeight: 'bold' }}>1001NDONESIA INVESTMENT</span><br />
        <span style={{ color: '#aaa', fontWeight: 'bold' }}>CLOSE 2 U GROUP</span>
      </div>

      <style>{`
        .logo-4d { font-size: 2.5rem; font-weight: bold; background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: bloom 8s ease-in-out infinite; }
        .text-anim { color: #0f0; font-size: 1.2rem; letter-spacing: 5px; margin-top: 20px; animation: fade 8s infinite; }
        .text-anim-sub { color: #fff; font-size: 0.9rem; opacity: 0.7; letter-spacing: 3px; animation: fade 8s infinite; }
        @keyframes bloom { 0%, 100% { transform: scale(0.9); opacity: 0; } 50% { transform: scale(1.1); opacity: 1; } }
        @keyframes fade { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
};
export default SplashScreen;
