import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';

export default function TMWallet({ auraValue = 100, balances, txHash }) {
  const [showQR, setShowQR] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().replace('T', ' ').slice(0, 19) + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pulseSpeed = Math.max(0.5, 3 - (auraValue / 100)) + 's';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      
      <div style={{ fontSize: '10px', color: '#00ff41', opacity: 0.4, marginBottom: '30px', letterSpacing: '2px' }}>
        {txHash || "LEDGER_HASH: INDIE-F-GENESIS-2026"}
      </div>

      {/* THE ORB - PENUH WARNA KEBAIKAN (TANPA TEKS) */}
      <div 
        onClick={() => setShowQR(!showQR)}
        style={{
          width: '280px', height: '280px', borderRadius: '50%',
          background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 70%, #000 100%)',
          boxShadow: '0 0 60px #39ff1466',
          animation: `pulse ${pulseSpeed} infinite alternate`,
          cursor: 'pointer', transition: 'all 0.5s ease', position: 'relative',
          marginBottom: '40px', border: '1px solid #39ff1444'
        }}>
        {showQR && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VERIFY-FOUNDER-001`} alt="QR" />
          </div>
        )}
      </div>

      {/* LOGIKA ANGKA DI LUAR (RAPI DI BAWAH) */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '350px' }}>
        <h2 style={{ color: '#00ff41', fontSize: '0.8rem', letterSpacing: '3px', margin: '0 0 10px 0' }}>TOTAL LIVING VALUE</h2>
        <div style={{ fontSize: '2.8rem', color: '#fff', fontWeight: 'bold', marginBottom: '30px' }}>
          € 100.000
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.7rem', margin: '0 0 5px 0' }}>IND-EUR (STABLE)</p>
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>{balances?.stable || "3.00"}</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505' }}>
            <p style={{ color: '#00ff41', fontSize: '0.7rem', margin: '0 0 5px 0' }}>ENPE NATIVE</p>
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>{balances?.enpe || "1.000"}</p>
          </div>
        </div>

        <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px', background: '#050505', marginBottom: '40px' }}>
          <p style={{ color: '#ff00ff', fontSize: '0.7rem', margin: '0 0 5px 0' }}>AURA REWARD</p>
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>{balances?.luv || "1.000.000"} LUV</p>
        </div>
      </div>

      {/* FOOTER & SIGNATURE */}
      <div style={{ borderTop: '1px solid #1a1a1a', width: '200px', paddingTop: '15px', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', color: '#00ff41', opacity: 0.5, margin: '0 0 5px 0' }}>{time}</p>
        <p style={{ color: '#fff', fontStyle: 'italic', fontSize: '1.2rem', letterSpacing: '4px' }}>INDIE-Founder</p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          from { transform: scale(0.98); box-shadow: 0 0 40px #39ff1433; }
          to { transform: scale(1.02); box-shadow: 0 0 80px #39ff1477; }
        }
      `}</style>
    </div>
  );
}
