import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Zap } from 'lucide-react';
import { useRouter } from 'next/router';
import AIGuard from '../components/AIGuard';

export default function GenesisCeremony() {
  const router = useRouter();
  const [isSigned, setIsSigned] = useState(false);
  const [masterHash, setMasterHash] = useState('');

  const handleFinalSignature = () => {
    const msg = new SpeechSynthesisUtterance(
      "Master Genesis Ceremony initiated. Founder signature detected. Sealing Genesis Block 0. Neuro Sphere is now officially born."
    );
    window.speechSynthesis.speak(msg);

    // GENERATE MASTER HASH 0
    const finalHash = "00000000" + Math.random().toString(16).slice(2, 56) + "NEURO";
    setMasterHash(finalHash);
    setIsSigned(true);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'serif', textAlign: 'center' }}>
      <AIGuard context="SUCCESS" />
      
      {!isSigned ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Award size={80} color="#ffd700" style={{ marginBottom: '20px' }} />
          <h1 style={{ letterSpacing: '8px', fontSize: '2rem' }}>MASTER GENESIS CEREMONY</h1>
          <p style={{ color: '#888', maxWidth: '500px', margin: '20px auto', fontStyle: 'italic', lineHeight: '1.6' }}>
            "Hari ini, kita meletakkan batu pertama peradaban digital yang berdaulat. 
            Dengan tanda tangan ini, 100 Triliun ENPE dan 1 Triliun LUV resmi dilepas ke dalam ekosistem."
          </p>
          
          <div style={{ marginTop: '50px', border: '1px solid #333', padding: '40px', background: 'rgba(255,215,0,0.05)', borderRadius: '10px' }}>
            <p style={{ fontSize: '0.8rem', color: '#ffd700', marginBottom: '20px' }}>FOUNDER DIGITAL SIGNATURE REQUIRED</p>
            <button 
              onClick={handleFinalSignature}
              style={{ background: '#ffd700', color: '#000', border: 'none', padding: '20px 50px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}
            >
              SIGN GENESIS BLOCK
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Zap size={100} color="#00ff41" style={{ marginBottom: '20px' }} />
          <h1 style={{ color: '#00ff41', letterSpacing: '10px' }}>NEUROSPHERE IS LIVE</h1>
          
          <div style={{ margin: '40px 0', border: '1px solid #00ff41', padding: '20px', background: '#050505', textAlign: 'left' }}>
            <p style={{ fontSize: '0.7rem', color: '#888' }}>BLOCK 0 HASH (MASTER ANCHOR):</p>
            <p style={{ fontSize: '0.8rem', wordBreak: 'break-all', color: '#00ff41', fontFamily: 'monospace' }}>{masterHash}</p>
            <hr style={{ border: '0.1px solid #222', margin: '15px 0' }} />
            <p style={{ fontSize: '0.7rem', color: '#888' }}>STATUS: <span style={{ color: '#fff' }}>IMMUTABLE & SOVEREIGN</span></p>
          </div>

          <button 
            onClick={() => router.push('/dashboard')}
            style={{ background: 'none', border: '1px solid #444', color: '#444', padding: '15px 30px', cursor: 'pointer' }}
          >
            ENTER THE NEW WORLD
          </button>
        </motion.div>
      )}

      <footer style={{ position: 'absolute', bottom: '30px', color: '#333', fontSize: '0.7rem' }}>
        ESTABLISHED 2026 ◈ INDIENATION NEUROSPHERE
      </footer>
    </div>
  );
}
