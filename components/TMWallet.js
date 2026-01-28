import React, { useState, useEffect } from 'react';

export default function TMWallet() {
  const [showQR, setShowQR] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [luvReward, setLuvReward] = useState(0);

  useEffect(() => {
    const hash = "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(hash);
    setLastUpdate(new Date().toISOString().replace('T', ' ').slice(0, 19) + " UTC");
    
    // Simulasi Stream LUV Harian (0-10)
    setLuvReward((Math.random() * 10).toFixed(2));
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px', overflowX: 'hidden' }}>
      
      {/* AURA DUST NFT OVERLAY */}
      {showNFT && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="nft-card" style={{ width: '100%', maxWidth: '340px', background: 'linear-gradient(135deg, #0b3d0b 0%, #000 100%)', border: '2px solid #39ff14', borderRadius: '15px', padding: '30px', textAlign: 'center', position: 'relative', boxShadow: '0 0 50px #39ff1466' }}>
            {/* Aura Dust Effect */}
            <div className="aura-dust"></div>
            <div style={{ color: '#39ff14', fontSize: '0.6rem', letterSpacing: '3px' }}>NEUROSPHERE SOVEREIGNTY</div>
            <h2 style={{ fontSize: '1.2rem', margin: '20px 0' }}>NFT CONTAINER</h2>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, #39ff14 0%, #000 80%)', margin: '0 auto 20px' }}></div>
            <div style={{ textAlign: 'left', fontSize: '8px', color: '#39ff14', lineHeight: '1.5' }}>
              <p>HOLDER: INDIE-Founder</p>
              <p>HASH: {txHash.substring(0,32)}...</p>
              <p>DAILY REWARD: +{luvReward} LUV ACTIVE</p>
            </div>
          </div>
          <button onClick={() => setShowNFT(false)} style={{ marginTop: '20px', background: 'none', border: '1px solid #fff', color: '#fff', padding: '10px 20px', cursor: 'pointer' }}>CLOSE</button>
        </div>
      )}

      {/* DASHBOARD UI */}
      <div style={{ color: '#39ff14', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '20px' }}>INDIE-Founder</div>

      {/* ORB */}
      <div onClick={() => setShowQR(!showQR)} style={{ width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, #39ff14 0%, #008000 90%, #000 100%)', boxShadow: '0 0 40px #39ff1433', marginBottom: '30px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showQR && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${txHash}`} alt="QR" />}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '360px' }}>
        <p style={{ fontSize: '0.7rem', color: '#39ff14' }}>TOTAL LIVING VALUE</p>
        <h1 style={{ fontSize: '2.5rem', margin: '5px 0' }}>€ 100.000</h1>
        
        {/* LUV STREAM INDICATOR */}
        <div style={{ fontSize: '0.7rem', color: '#ff00ff', marginBottom: '20px' }}>
          ● LIVE STREAM: +{luvReward} LUV / DAY
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px' }}>
            <p style={{ color: '#fbbf24', fontSize: '0.6rem' }}>IND-EUR</p>
            <p>0.00</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #1a1a1a', borderRadius: '10px' }}>
            <p style={{ color: '#39ff14', fontSize: '0.6rem' }}>ENPE (STAKING)</p>
            <p>0</p>
            <button style={{ fontSize: '8px', background: '#39ff14', color: '#000', border: 'none', padding: '2px 5px', marginTop: '5px' }}>STAKE 20%</button>
          </div>
        </div>
      </div>

      <button onClick={() => setShowNFT(true)} style={{ marginTop: 'auto', marginBottom: '20px', border: '1px solid #39ff14', background: 'none', color: '#39ff14', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>
        PUSH TO EMAIL & CLAIM NFT
      </button>

      <style jsx>{`
        .aura-dust {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(#39ff14 1px, transparent 1px);
          background-size: 20px 20px; opacity: 0.2; pointer-events: none;
          animation: dust-move 10s linear infinite;
        }
        @keyframes dust-move {
          from { background-position: 0 0; }
          to { background-position: 100px 100px; }
        }
      `}</style>
    </div>
  );
}
