import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

export default function Auth() {
  const router = useRouter();
  const [status, setStatus] = useState('READY');

  const handleBiometric = async () => {
    setStatus('SCANNING');
    // AI Voice konfirmasi
    const msg = new SpeechSynthesisUtterance("Biometric verification in progress. Please hold your position.");
    window.speechSynthesis.speak(msg);

    setTimeout(() => {
      setStatus('SUCCESS');
      router.push('/dashboard');
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#00ff41', fontFamily: 'monospace' }}>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: 'center' }}>
        <Fingerprint size={80} color={status === 'SCANNING' ? '#fff' : '#00ff41'} style={{ marginBottom: '20px' }} />
        <h2 style={{ letterSpacing: '3px' }}>{status === 'READY' ? 'BIOMETRIC ACCESS' : status}</h2>
        <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '10px' }}>VERIFYING SOVEREIGN IDENTITY</p>
        
        {status === 'READY' && (
          <button onClick={handleBiometric} style={{ marginTop: '50px', background: 'none', border: '1px solid #00ff41', color: '#00ff41', padding: '15px 30px', cursor: 'pointer', fontWeight: 'bold' }}>
            START SCAN
          </button>
        )}
      </motion.div>
    </div>
  );
}
