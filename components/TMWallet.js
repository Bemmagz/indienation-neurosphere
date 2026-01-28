import React, { useState } from 'react';

export default function TMWallet({ balances }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* HEADER IDENTITAS */}
      <div style={{ marginTop: '20px', color: '#00ff41', fontSize: '1.2rem', letterSpacing: '2px' }}>
        INDIE-Founder
      </div>

      {/* THE ORB - PENUH WARNA KEBAIKAN */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '260px', height: '260px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 80%, #000 100%)',
          boxShadow: '0 0 50px #39ff1444',
          margin: '40px 0', cursor: 'pointer', transition: '0.5s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
        }}>
        {showQR && (
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=FOUNDER-VALID-TRANSACTION-01-02-03" alt="QR" />
        )}
      </div>

      {/* SALDO ELEGAN - RAPI DI BAWAH */}
      <div style={{ textAlign: 'center', width: '90%' }}>
        <p style={{ fontSize: '0.8rem', color: '#00ff41', margin: '0' }}>TOTAL LIVING VALUE IDENTITY</p>
        <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>€ {balances?.total || "0"}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.7rem' }}>IND-EUR</p>
            <p style={{ fontSize: '1.2rem' }}>{balances?.stable || "0.00"}</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
            <p style={{ color: '#00ff41', fontSize: '0.7rem' }}>ENPE</p>
            <p style={{ fontSize: '1.2rem' }}>{balances?.enpe || "0"}</p>
          </div>
        </div>

        <div style={{ marginTop: '10px', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
          <p style={{ color: '#ff00ff', fontSize: '0.7rem' }}>AURA REWARD (LUV)</p>
          <p style={{ fontSize: '1.2rem' }}>{balances?.luv || "0"}</p>
        </div>
      </div>

      {/* TOMBOL KONFIRMASI SAH (SERTIFIKAT) */}
      <button 
        onClick={() => window.location.href='mailto:founder@neurosphere.io?subject=SAH_CERTIFICATE_CLAIM&body=IID:INDIE-Founder_Verified'}
        style={{ marginTop: '40px', backgroundColor: '#39ff14', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
        PUSH TO EMAIL & CLAIM SAH
      </button>
    </div>
  );
}
