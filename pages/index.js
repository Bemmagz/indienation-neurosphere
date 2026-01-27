import React, { useState } from 'react';
import Link from 'next/link';
import ledgerData from '../state/ledger.json';

const languages = {
  ID: "ID", EN: "EN", AR: "AR", ZH: "ZH", HI: "HI", 
  FR: "FR", ES: "ES", DE: "DE", JP: "JP", KR: "KR", 
  PT: "PT", RU: "RU", IT: "IT", SW: "SW"
};

export default function Dashboard() {
  const [lang, setLang] = useState('ID');
  const user = ledgerData[0];

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', textAlign: 'center' }}>
      <header style={{ padding: '15px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.7rem' }}>
        {Object.keys(languages).map(l => (
          <span key={l} onClick={() => setLang(l)} style={{ cursor: 'pointer', padding: '2px 5px', border: lang === l ? '1px solid #00ff41' : 'none' }}>{l}</span>
        ))}
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ letterSpacing: '4px', marginBottom: '40px' }}>◈ NEUROSPHERE CONTROL ROOM ◈</h2>
        <div style={{ border: '2px double #00ff41', padding: '30px', display: 'inline-block', minWidth: '320px' }}>
          <p>IDENTITAS: {user.name}</p>
          <p style={{ fontSize: '0.8rem' }}>ID: {user.id} | STATUS: {user.status}</p>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', margin: '20px 0' }}>{user.allocation}</h1>
        </div>
        <br />
        <Link href="/enroll"><button style={{ marginTop: '40px', background: 'transparent', border: '1px solid #00ff41', color: '#00ff41', padding: '15px 40px', cursor: 'pointer', fontWeight: 'bold' }}>DAFTAR / ENROLL</button></Link>
      </main>
      <footer style={{ padding: '40px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#888', margin: '0' }}>Powered by:</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0' }}>INDIENATION Foundation</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0' }}>1001NDONESIA INVESTMENT</p>
      </footer>
    </div>
  );
}
