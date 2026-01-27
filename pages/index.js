import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Genesis() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  const handleStart = () => {
    setHasStarted(true);
    // Suara AI: "Welcome to INDIENATION NEUROSPHERE..."
    const msg = new SpeechSynthesisUtterance("Welcome to INDIENATION NEUROSPHERE. A new civilization that gives you a 100,000 Euro voucher just by doing kindness.");
    msg.lang = 'en-US';
    msg.rate = 0.9;
    msg.onend = () => {
      // Pindah ke Login setelah bicara selesai
      router.push('/auth');
    };
    window.speechSynthesis.speak(msg);
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#00ff41', fontFamily: 'monospace', overflow: 'hidden' }}>
      {!hasStarted ? (
        <motion.button 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={handleStart}
          style={{ background: 'none', border: '2px solid #00ff41', color: '#00ff41', padding: '20px 40px', fontSize: '1.2rem', cursor: 'pointer', letterSpacing: '5px' }}
        >
          ENTER NEUROSPHERE
        </motion.button>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {/* LOGO NEUROSPHERE MOBILE PROPORSIONAL */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ width: '250px', height: '250px', border: '2px solid #00ff41', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', boxShadow: '0 0 50px #00ff41' }}
          >
            <h1 style={{ fontSize: '1rem' }}>NEUROSPHERE</h1>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '80%' }}
          >
            Selamat datang di INDIENATION NEUROSPHERE
          </motion.h2>
          <p style={{ color: '#00ff41', marginTop: '10px', fontSize: '0.8rem' }}>
            Peradaban baru yang memberi anda Voucher € 100.000 hanya dengan berbuat kebaikan
          </p>
        </div>
      )}

      <footer style={{ position: 'absolute', bottom: '30px', fontSize: '0.6rem', opacity: 0.5, textAlign: 'center' }}>
        INDIENATION Foundation | 1001NDONESIA INVESTMENT
      </footer>
    </div>
  );
}
