import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { generateHash } from '../lib/crypto';
import AIGuard from '../components/AIGuard';

export default function Enroll() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [txData, setTxData] = useState(null);

  const handleClaim = async () => {
    if(!name || !email) return alert("Fill data");
    const timestamp = Date.now();
    const hash = await generateHash(`${name}${email}${timestamp}NEUROFOUNDER2026`);
    setTxData({ hash, id: `NERO-${Math.floor(Math.random()*100000)}` });
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <AIGuard context={txData ? "SUCCESS" : "ENROLL"} />
      <h2 style={{ textAlign: 'center' }}>◈ SOVEREIGN ENROLLMENT ◈</h2>
      {!txData ? (
        <div style={{ maxWidth: '400px', margin: '40px auto', border: '1px solid #222', padding: '20px' }}>
          <input placeholder="FULL NAME" onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: '#000', color: '#fff', border: 'none', borderBottom: '1px solid #00ff41', marginBottom: '20px', padding: '10px' }} />
          <input placeholder="EMAIL" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#000', color: '#fff', border: 'none', borderBottom: '1px solid #00ff41', marginBottom: '30px', padding: '10px' }} />
          <button onClick={handleClaim} style={{ width: '100%', padding: '15px', background: '#00ff41', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>CLAIM SOVEREIGNTY</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <CheckCircle size={50} color="#00ff41" style={{margin:'0 auto 20px'}} />
          <h3>GENESIS GRANTED</h3>
          <p style={{fontSize:'0.7rem', color:'#888'}}>CITIZEN ID: {txData.id}</p>
          <div style={{background:'#fff', padding:'10px', display:'inline-block', marginTop:'10px'}}>
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${txData.hash}`} />
          </div>
          <p style={{ fontSize: '0.4rem', wordBreak: 'break-all', marginTop:'20px', color:'#555' }}>HASH: {txData.hash}</p>
          <button onClick={() => router.push('/dashboard')} style={{ marginTop: '20px', background:'none', border:'1px solid #444', color: '#888', padding:'10px' }}>Return to Dashboard</button>
        </div>
      )}
    </div>
  );
}
