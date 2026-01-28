import React, { useState, useEffect } from 'react';

export default function TMWallet() {
  const [showQR, setShowQR] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const hash = "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(hash);
    setLastUpdate(new Date().toISOString().replace('T', ' ').slice(0, 19) + " UTC");
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'monospace', padding: '20px', position: 'relative' }}>
      
      {/* 1. NFT CONTAINER OVERLAY (POPS UP ON CLAIM) */}
      {showNFT && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div id="nft-certificate" style={{ width: '100%', maxWidth: '350px', background: 'linear-gradient(135deg, #0b3d0b 0%, #000 100%)', border: '2px solid #39ff14', borderRadius: '15px', padding: '30px', textAlign: 'center', boxShadow: '0 0 50px #39ff1444' }}>
            <div style={{ color: '#39ff14', fontSize: '0.6rem', letterSpacing: '3px' }}>NEUROSPHERE SOVEREIGNTY</div>
            <h2 style={{ fontSize: '1.2rem', margin: '20px 0', color: '#fff' }}>LIVING VALUE IDENTITY</h2>
            
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, #39ff14 0%, #000 80%)', margin: '0 auto 20px', boxShadow: '0 0 30px #39ff1466' }}></div>
            
            <div style={{ textAlign: 'left', fontSize: '8px', color: '#39ff14', borderTop: '1px solid #39ff1433', paddingTop: '15px' }}>
              <p>HOLDER: INDIE-Founder</p>
              <p>VALUE: € 100.000</p>
              <p style={{ wordBreak: 'break-all' }}>HASH: {txHash}</p>
              <p>ISSUED: {lastUpdate}</p>
            </div>
            
            <div style={{ marginTop: '20px' }}>
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${txHash}&color=39ff14&bgcolor=000`} alt="QR" />
            </div>
          </div>
          <button onClick={() => setShowNFT(false)} style={{ marginTop: '30px', background: 'none', border: '1px solid #fff', color: '#fff', padding: '10px 20px', cursor: 'pointer' }}>CLOSE & RETURN</button>
          <p style={{ marginTop: '10px', fontSize: '10px', color: '#39ff14' }}>SCREENSHOT TO SAVE TO GALLERY</p>
        </div>
      )}

      {/* 2. MAIN WALLET UI */}
      <div style={{ color: '#00ff41', fontSize: '1.2rem', letterSpacing: '5px', marginTop: '10px', fontWeight: 'bold' }}>INDIE-Founder</div>

      <div onClick={() => setShowQR(!showQR)} style={{ width: '240px', height: '240px', borderRadius: '50%', background: showQR ? '#fff' : 'radial-gradient(circle, #39ff14 0%, #008000 85%, #000 100%)', boxShadow: '0 0 40px #39ff1422', margin: '30px 0', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {showQR && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${txHash}`} alt="QR" />}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
        <p style={{ color: '#00ff41', fontSize: '0.7rem', letterSpacing: '2px' }}>TOTAL LIVING VALUE IDENTITY</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>€ 100.000</div>

        <div style={{ textAlign: 'left', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '8px', background: '#080808' }}>
          <p style={{ color: '#00ff41', fontSize: '9px', margin: '0' }}>TX_HASH_LEDGER:</p>
          <p style={{ fontSize: '9px', color: '#fff', wordBreak: 'break-all', opacity: 0.7 }}>{txHash}</p>
          <p style={{ fontSize: '9px', opacity: 0.5, marginTop: '5px' }}>TIMESTAMP: {lastUpdate}</p>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #00ff4133' }}>
          <p style={{ fontSize: '1.2rem', color: '#fff', fontStyle: 'italic', letterSpacing: '4px', margin: 0 }}>INDIE-Founder</p>
        </div>
      </div>

      <button 
        onClick={() => {
          setShowNFT(true);
          window.location.href=`mailto:sah@indienation.io?subject=CLAIM_SAH_CERTIFICATE&body=TX:${txHash}`;
        }}
        style={{ marginTop: 'auto', marginBottom: '20px', backgroundColor: 'transparent', border: '1px solid #00ff41', color: '#00ff41', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>
        PUSH TO EMAIL & GET NFT CERTIFICATE
      </button>
    </div>
  );
}
