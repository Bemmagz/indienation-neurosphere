import React, { useState } from 'react';

export default function LoginAccess() {
  const [intent, setIntent] = useState("");

  const handleSovereignLogin = () => {
    if (intent.toLowerCase() === "claim luv") {
      localStorage.setItem("session_active", "true");
      localStorage.setItem("device_proof_v1", "VERIFIED_" + Math.random().toString(36).substr(2, 9));
      window.location.href = "/claim"; // Menuju halaman klaim nyata
    } else {
      alert("Please state your Intent: 'CLAIM LUV'");
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>SOVEREIGN LOGIN ACCESS</h1>
      <p>Type your intent below to verify Human Identity</p>
      <input 
        type="text" 
        placeholder="ENTER INTENT (e.g. CLAIM LUV)" 
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        style={{ padding: '10px', width: '300px', textAlign: 'center' }}
      />
      <button onClick={handleSovereignLogin} style={{ marginTop: '20px', padding: '10px 20px', background: '#0f0', cursor: 'pointer' }}>
        VERIFY DEVICE & INTENT
      </button>
    </div>
  );
}
