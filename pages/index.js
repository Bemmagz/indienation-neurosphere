import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState('ID');

  const languages = [
    "Indonesian", "English", "German", "French", "Chinese", 
    "Japanese", "Arabic", "Russian", "Spanish", "Portuguese", 
    "Hindi", "Italian", "Korean", "Turkish"
  ];

  useEffect(() => {
    // AURALANG: AI Voice Guidance (Male Voice)
    const speakGuidance = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Welcome to Indienation Neuro Sphere. You are entering a new digital civilization. Proceed to authentication to claim your living value identity.";
        msg.lang = 'en-US';
        msg.rate = 0.9;
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('google us english'));
        if (maleVoice) msg.voice = maleVoice;
        window.speechSynthesis.speak(msg);
      }
    };
    
    // Suara dipicu setelah interaksi ringan atau sedikit delay
    const timer = setTimeout(speakGuidance, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#00ff41', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      
      {/* 1. NEUROLANG VISUAL: PROPORTIONAL CORE */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px #00ff41", "0 0 50px #00ff41", "0 0 20px #00ff41"] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '180px', height: '180px', borderRadius: '50%', border: '2px solid #00ff41', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.6rem', color: '#888' }}>FOUNDER ACCESS</p>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1rem' }}>NEURO</p>
        </div>
      </motion.div>

      {/* 2. TITLES & DESCRIPTION */}
      <h1 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px', letterSpacing: '2px' }}>INDIENATION<br/>NEUROSPHERE</h1>
      
      <p style={{ fontSize: '0.85rem', color: '#00ff41', maxWidth: '280px', lineHeight: '1.6', marginBottom: '30px' }}>
        The New World Order of Kindness. <br/>
        Claim your **€ 100,000** Living Value.
      </p>

      {/* 3. MULTILINGUAL ENGINE (14 LANGUAGES) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '30px', border: '1px solid #222', marginBottom: '40px' }}>
        <Globe size={16} color="#888" />
        <select 
          onChange={(e) => setLang(e.target.value)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
        >
          {languages.map(l => <option key={l} value={l} style={{background:'#000'}}>{l}</option>)}
        </select>
      </div>

      {/* 4. CALL TO ACTION */}
      <button 
        onClick={() => router.push('/auth')}
        style={{ width: '80%', maxWidth: '300px', background: '#00ff41', color: '#000', border: 'none', padding: '18px', fontWeight: 'bold', borderRadius: '15px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 15px rgba(0,255,65,0.3)' }}
      >
        ENTER SYSTEM
      </button>

      {/* 5. FOUNDER BACKDOOR HINT */}
      <p 
        onClick={() => router.push('/admin')}
        style={{ marginTop: '20px', fontSize: '0.6rem', color: '#222', cursor: 'pointer' }}
      >
        MASTER ACCESS ENCRYPTED
      </p>

      <footer style={{ position: 'absolute', bottom: '20px', fontSize: '0.55rem', color: '#444', letterSpacing: '1px' }}>
        © 2026 INDIENATION FOUNDATION | NEUROSPHERE 2.0
      </footer>
    </div>
  );
}
