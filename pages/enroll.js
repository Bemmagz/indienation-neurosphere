import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, CheckCircle, Download, Mail } from 'lucide-react';
import { generateHash } from '../lib/crypto';
import AIGuard from '../components/AIGuard';

export default function Enroll() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [txData, setTxData] = useState(null);

  const handleClaim = async () => {
    if(!name || !email) return alert("Please fill all data");
    const timestamp = new Date().toLocaleString();
    const hash = await generateHash(`${name}${email}${timestamp}NEURO-SOVEREIGN`);
    
    setTxData({
      name: name.toUpperCase(),
      email: email,
      id: `NS-${Math.floor(100000 + Math.random() * 900000)}`,
      hash: hash,
      value: "€ 100.000",
      date: timestamp
    });
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <AIGuard context={txData ? "SUCCESS" : "ENROLL"} />
      
      {!txData ? (
        <div style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
          <h2 style={{ letterSpacing: '5px' }}>SOVEREIGN ENROLLMENT</h2>
          <div style={{ marginTop: '30px', border: '1px solid #222', padding: '20px', borderRadius: '15px' }}>
            <input placeholder="FULL NAME" onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: '#000', color: '#fff', border: 'none', borderBottom: '1px solid #00ff41', marginBottom: '20px', padding: '10px' }} />
            <input placeholder="EMAIL ADDRESS" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#000', color: '#fff', border: 'none', borderBottom: '1px solid #00ff41', marginBottom: '30px', padding: '10px' }} />
            <button onClick={handleClaim} style={{ width: '100%', padding: '15px', background: '#00ff41', color: '#000', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' }}>GENERATE CERTIFICATE</button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '30px', border: '5px double #00ff41', background: '#050505', position: 'relative', overflow: 'hidden' }}>
          {/* WATERMARK BACKGROUND */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, fontSize: '5rem', zIndex: 0 }}>NEURO</div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <ShieldCheck size={40} style={{ margin: '0 auto' }} />
              <h2 style={{ margin: '10px 0' }}>KEYS OF KINDNESS ESTAFET</h2>
              <p style={{ fontSize: '0.6rem', color: '#888' }}>OFFICIAL LIVING VALUE IDENTITY</p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '20px' }}>
              <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>HOLDER NAME:</p>
              <h3 style={{ margin: '5px 0 15px 0', color: '#fff' }}>{txData.name}</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>CITIZEN ID:</p>
                  <p style={{ fontSize: '0.9rem', color: '#fff' }}>{txData.id}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.7rem', color: '#888', margin: 0 }}>VALUE:</p>
                  <p style={{ fontSize: '0.9rem', color: '#00ff41', fontWeight: 'bold' }}>{txData.value}</p>
                </div>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '5px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${txData.hash}`} alt="QR" />
                </div>
                <p style={{ fontSize: '0.5rem', color: '#444', marginTop: '10px', wordBreak: 'break-all' }}>HASH: {txData.hash}</p>
              </div>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #00ff41', color: '#00ff41', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Download size={16} /> SAVE
              </button>
              <button onClick={() => alert('Email Certificate Sent to ' + txData.email)} style={{ flex: 1, padding: '12px', background: '#00ff41', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Mail size={16} /> SEND EMAIL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
