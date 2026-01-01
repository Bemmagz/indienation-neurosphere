import React, { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function SovereignMainGate() {
  const [showSplash, setShowSplash] = useState(true);
  const [intent, setIntent] = useState("");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("device_proof_v1");
    if (!id) {
      id = "NS-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("device_proof_v1", id);
    }
    setDeviceId(id);
  }, []);

  const handleClaim = () => {
    if (intent.trim().toUpperCase() === "CLAIM LUV") {
      alert("BERHASIL!\nID: " + deviceId + "\n1.000.000 LUV Dialokasikan.");
      window.location.reload();
    } else {
      alert("Ketik: CLAIM LUV");
    }
  };

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', textAlign: 'center', position: 'relative' }}>
      
      {/* Header Logo */}
      <h1 style={{ color: '#00ffff', letterSpacing: '5px', marginBottom: '10px' }}>NEUROSPHERE</h1>
      
      {/* Login Access Biometric (Fingerprint & Face ID) */}
      <div style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => alert("Mengaktifkan Sensor Biometrik...")}>
        <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px #00ffff)' }}>👆 👁️</div>
        <p style={{ fontSize: '0.7rem', color: '#00ffff', marginTop: '5px', letterSpacing: '2px' }}>BIOMETRIC ACCESS: FINGERPRINT & SCAN WAJAH</p>
      </div>

      <div style={{ margin: '20px', border: '1px solid #333', padding: '10px', background: '#050505' }}>
        <p style={{ fontSize: '0.7rem', color: '#888' }}>SOVEREIGN ID ANDA:</p>
        <p style={{ fontWeight: 'bold' }}>{deviceId}</p>
      </div>

      <input 
        type="text" 
        value={intent} 
        onChange={(e) => setIntent(e.target.value)} 
        placeholder="KETIK: CLAIM LUV" 
        style={{ background: '#000', color: '#0f0', border: '1px solid #0f0', padding: '12px', textAlign: 'center', width: '250px', outline: 'none' }} 
      />
      
      <button onClick={handleClaim} style={{ marginTop: '20px', padding: '15px 30px', background: '#00ffff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 15px #00ffff' }}>
        AKSES & KLAIM 1.000.000 LUV
      </button>

      {/* Footer Identitas Pelaksana */}
      <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.6rem', color: '#333', letterSpacing: '1px' }}>
        1001NDONESIA INVESTMENT • CLOSE 2 U GROUP
      </div>
    </div>
  );
}
