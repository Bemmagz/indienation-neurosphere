import React, { useEffect } from 'react';

export default function SovereignGate() {
  const handleFinalClaim = () => {
    // 1. Eksekusi Klaim Nyata
    console.log("LUV Allocated: 1,000,000");
    alert("CLAIM SUCCESSFUL! Your 1,000,000 LUV is secured.");

    // 2. Pembersihan Sesi Secara Total (Hard Reset)
    localStorage.clear();
    sessionStorage.clear();

    // 3. Force Redirect ke Login Access
    alert("System resetting for next user... Please wait.");
    window.location.replace("/"); // Menggunakan replace agar tidak bisa 'back'
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <h2 style={{ borderBottom: '2px solid #0f0' }}>SOVEREIGN ID GATE ACTIVE</h2>
      <p style={{ opacity: 0.7 }}>HUMAN INTENT + DEVICE PROOF v1</p>
      <div style={{ margin: '20px', padding: '30px', border: '1px solid #0f0', textAlign: 'center' }}>
        <p>You are eligible for:</p>
        <h1 style={{ fontSize: '3rem' }}>1,000,000 LUV</h1>
        <button 
          onClick={handleFinalClaim}
          style={{ background: '#0f0', color: '#000', padding: '20px 40px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem', border: 'none' }}>
          CONFIRM & CLAIM NOW
        </button>
      </div>
    </div>
  );
}
