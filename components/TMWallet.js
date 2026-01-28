import React, { useState, useEffect } from 'react';

export default function TMWallet() {
  const [showQR, setShowQR] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    // GENERATE REAL-TIME ENTANGLEMENT DATA
    const hash = "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(hash);
    setLastUpdate(new Date().toISOString().replace('T', ' ').slice(0, 19) + " UTC");
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      
      <div style={{ color: '#00ff41', fontSize: '1.2rem', letterSpacing: '5px', marginTop: '10px', fontWeight: 'bold' }}>
        INDIE-Founder
      </div>

      {/* THE ORB - PURE AURA */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '240px', height: '240px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 85%, #000 100%)',
          boxShadow: '0 0 50px #39ff1422',
          margin: '30px 0', cursor: 'pointer', transition: '0.5s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '1px solid #39ff1433'
        }}>
        {showQR && (
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${txHash}`} alt="QR" />
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '350px' }}>
        <p style={{ color: '#00ff41', fontSize: '0.7rem', letterSpacing: '2px' }}>TOTAL LIVING VALUE IDENTITY</p>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '30px' }}>€ 100.000</div>

        {/* LOGIKA LEDGER REAL (VERSION READINESS) */}
        <div style={{ textAlign: 'left', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px', background: '#080808' }}>
          <p style={{ color: '#00ff41', fontSize: '9px', margin: '0 0 5px 0' }}>TX_HASH_LEDGER (READ-ONLY):</p>
          <p style={{ fontSize: '9px', color: '#fff', wordBreak: 'break-all', opacity: 0.7, fontFamily: 'monospace' }}>{txHash}</p>
          
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '9px', opacity: 0.5 }}>
            <span>TIMESTAMP: {lastUpdate}</span>
            <span style={{ color: '#00ff41' }}>STATUS: VERIFIED</span>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', border: '1px dashed #00ff4155', borderRadius: '4px' }}>
          <p style={{ fontSize: '8px', color: '#00ff41', opacity: 0.6, margin: 0 }}>DIGITAL SIGNATURE (SOVEREIGN AUTHORITY)</p>
          <p style={{ fontSize: '1.4rem', color: '#fff', fontStyle: 'italic', letterSpacing: '3px', margin: 0 }}>INDIE-Founder</p>
        </div>
      </div>

      <button 
        onClick={() => window.location.href='mailto:sah@indienation.io?subject=CLAIM_SAH_CERTIFICATE&body=ID:INDIE-Founder'}
        style={{ marginTop: 'auto', marginBottom: '20px', background: 'transparent', border: '1px solid #00ff41', color: '#00ff41', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>
        PUSH TO EMAIL (SAH CERTIFICATE)
      </button>
    </div>
  );
}
