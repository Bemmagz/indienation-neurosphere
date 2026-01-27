import React, { useState } from 'react';
import Link from 'next/link';

const languages = {
  ID: "ID", EN: "EN", AR: "AR", ZH: "ZH", HI: "HI", 
  FR: "FR", ES: "ES", DE: "DE", JP: "JP", KR: "KR", 
  PT: "PT", RU: "RU", IT: "IT", SW: "SW"
};

export default function Enroll() {
  const [lang, setLang] = useState('ID');
  const [name, setName] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);

  const speak = (msg) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', textAlign: 'center' }}>
      <header style={{ padding: '15px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.7rem' }}>
        {Object.keys(languages).map(l => (
          <span key={l} onClick={() => {setLang(l); speak("Language Activated");}} style={{ cursor: 'pointer', padding: '2px 5px', border: lang === l ? '1px solid #00ff41' : 'none' }}>{l}</span>
        ))}
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ letterSpacing: '3px' }}>◈ PIONEER ENROLLMENT ◈</h2>
        {!isClaimed ? (
          <div style={{ marginTop: '50px' }}>
            <input placeholder="ENTER NAME" onChange={(e) => setName(e.target.value)} style={{ background: '#000', color: '#00ff41', border: '1px solid #00ff41', padding: '15px', width: '80%', maxWidth: '300px', textAlign: 'center' }} />
            <br />
            <button onClick={() => {setIsClaimed(true); speak("Sovereignty Claimed Successfully");}} style={{ marginTop: '30px', background: '#00ff41', color: '#000', border: 'none', padding: '15px 30px', fontWeight: 'bold' }}>CLAIM NOW</button>
          </div>
        ) : (
          <div style={{ marginTop: '20px', border: '2px solid #fff', padding: '20px', display: 'inline-block' }}>
            <h3 style={{ color: '#fff' }}>CERTIFICATE OF SOVEREIGNTY</h3>
            <p>NAME: {name.toUpperCase()}</p>
            <p>ALLOCATION: €100.000 STABLE</p>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${name}`} style={{ marginTop: '15px', border: '5px solid #fff' }} />
            <br/><Link href="/"><button style={{color:'#888', background:'none', border:'none', marginTop:'10px'}}>Back</button></Link>
          </div>
        )}
      </main>
      <footer style={{ padding: '40px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#888', margin: '0' }}>Powered by:</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0' }}>INDIENATION Foundation</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0' }}>1001NDONESIA INVESTMENT</p>
      </footer>
    </div>
  );
}
