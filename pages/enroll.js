import React, { useState, useEffect } from 'react';
import { generateSovereignHash } from '../lib/crypto';
import { ShieldCheck, Mail, PenTool, Download } from 'lucide-react';

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [certData, setCertData] = useState(null);

  const handleClaim = () => {
    const timestamp = Date.now();
    const sovereignHash = generateSovereignHash({ ...formData, timestamp, allocation: '100000' });
    
    setCertData({
      id: `NERO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      hash: sovereignHash,
      signature: "SIGNED_BY_FOUNDER_NEUROSPHERE",
      date: new Date().toLocaleDateString()
    });
    setStep(3);
    
    // AI Voice Guidance
    const msg = new SpeechSynthesisUtterance("Sovereignty Claimed. Your certificate and digital wallet have been initialized.");
    window.speechSynthesis.speak(msg);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      {step === 1 && (
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <h2>◈ CITIZENSHIP ENROLLMENT ◈</h2>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '30px' }}>Enter your details to anchor your identity</p>
          <input placeholder="FULL NAME" onChange={(e)=>setFormData({...formData, name: e.target.value})} style={{ background: '#000', color: '#00ff41', border: '1px solid #00ff41', padding: '15px', width: '90%', marginBottom: '15px' }} />
          <input placeholder="EMAIL ADDRESS" onChange={(e)=>setFormData({...formData, email: e.target.value})} style={{ background: '#000', color: '#00ff41', border: '1px solid #00ff41', padding: '15px', width: '90%' }} />
          <button onClick={() => setStep(2)} style={{ marginTop: '30px', background: '#00ff41', color: '#000', padding: '15px 40px', border: 'none', fontWeight: 'bold', width: '90%' }}>NEXT</button>
        </div>
      )}

      {step === 2 && (
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <ShieldCheck size={60} style={{ marginBottom: '20px' }} />
          <h3>GENESIS AGREEMENT</h3>
          <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #222', padding: '10px', fontSize: '0.7rem', textAlign: 'left', color: '#888', margin: '20px 0' }}>
            I hereby accept the €100,000 Living Value Identity. I commit to the principles of NeuroSphere: 
            Decentralization, Autonomy, and the Pursuit of Universal Kindness. My identity is now anchored in the Smart Ledger.
          </div>
          <button onClick={handleClaim} style={{ background: '#00ff41', color: '#000', padding: '15px 40px', border: 'none', fontWeight: 'bold', width: '90%' }}>SIGN & CLAIM</button>
        </div>
      )}

      {step === 3 && certData && (
        <div style={{ animation: 'fadeIn 1s' }}>
          <div id="certificate" style={{ border: '4px double #fff', padding: '25px', background: '#080808', color: '#fff', textAlign: 'center' }}>
            <h2 style={{ letterSpacing: '2px' }}>CERTIFICATE OF SOVEREIGNTY</h2>
            <div style={{ margin: '20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
               <p style={{ fontSize: '0.7rem', color: '#888' }}>HOLDER NAME</p>
               <h3 style={{ margin: '5px 0' }}>{formData.name.toUpperCase()}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#888' }}>
              <span>ID: {certData.id}</span>
              <span>DATE: {certData.date}</span>
            </div>
            <h1 style={{ color: '#00ff41', margin: '20px 0' }}>€ 100.000</h1>
            <div style={{ background: '#fff', padding: '10px', display: 'inline-block' }}>
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${certData.hash}`} />
            </div>
            <p style={{ fontSize: '0.4rem', color: '#444', marginTop: '15px', wordBreak: 'break-all' }}>HASH: {certData.hash}</p>
            <p style={{ fontSize: '0.6rem', color: '#00ff41', marginTop: '10px' }}>{certData.signature}</p>
          </div>
          <button onClick={() => window.print()} style={{ marginTop: '20px', width: '100%', background: 'none', border: '1px solid #00ff41', color: '#00ff41', padding: '15px' }}>
            <Download size={16} /> SAVE CERTIFICATE
          </button>
          <button onClick={() => window.location.href='/dashboard'} style={{ marginTop: '10px', width: '100%', background: 'none', color: '#888', border: 'none' }}>BACK TO DASHBOARD</button>
        </div>
      )}
    </div>
  );
}
