import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState('EN');

  const dict = {
    EN: { welcome: "Welcome to NeuroSphere", desc: "Claim your €100,000 Living Value Identity.", btn: "ENTER SYSTEM", voice: "Welcome to Indienation Neuro Sphere. Proceed to claim your identity." },
    ID: { welcome: "Selamat Datang di NeuroSphere", desc: "Klaim Identitas Nilai Hidup €100.000 Anda.", btn: "MASUK SISTEM", voice: "Selamat datang di Indienation Neuro Sphere. Silakan klaim identitas Anda." },
    DE: { welcome: "Willkommen bei NeuroSphere", desc: "Fordern Sie Ihre €100.000 Living Value Identity an.", btn: "SYSTEM EINTRETEN", voice: "Willkommen bei Indienation Neuro Sphere. Fordern Sie Ihre Identität an." },
    FR: { welcome: "Bienvenue sur NeuroSphere", desc: "Réclamez votre identité de valeur de vie de 100 000 €.", btn: "ENTRER DANS LE SYSTÈME", voice: "Bienvenue sur Indienation Neuro Sphere. Réclamez votre identité." },
    ES: { welcome: "Bienvenido a NeuroSphere", desc: "Reclama tu Identidad de Valor de Vida de 100.000 €.", btn: "ENTRAR AL SISTEMA", voice: "Bienvenido a Indienation Neuro Sphere. Reclama tu identidad." },
    IT: { welcome: "Benvenuti in NeuroSphere", desc: "Richiedi la tua identità di valore vivente di € 100.000.", btn: "ENTRA NEL SISTEMA", voice: "Benvenuti in Indienation Neuro Sphere. Richiedi la tua identità." },
    PT: { welcome: "Bem-vindo ao NeuroSphere", desc: "Reivindique sua Identidade de Valor de Vida de € 100.000.", btn: "ENTRAR NO SISTEMA", voice: "Bem-vindo ao Indienation Neuro Sphere. Reivindique sua identidade." },
    RU: { welcome: "Добро пожаловать в NeuroSphere", desc: "Получите удостоверение личности стоимостью 100 000 евро.", btn: "ВОЙТИ В СИСТЕМУ", voice: "Добро пожаловать в Indienation Neuro Sphere." },
    ZH: { welcome: "欢迎来到 NeuroSphere", desc: "领取您的 100,000 欧元生活价值身份。", btn: "进入系统", voice: "欢迎来到 Indienation Neuro Sphere。" },
    JA: { welcome: "NeuroSphereへようこそ", desc: "100,000ユーロの生活価値アイデンティティを請求してください。", btn: "システムに入る", voice: "Indienation Neuro Sphereへようこそ。" },
    KR: { welcome: "NeuroSphere에 오신 것을 환영합니다", desc: "100,000유로의 생활 가치 정체성을 청구하십시오.", btn: "시스템 입장", voice: "Indienation Neuro Sphere에 오신 것을 환영합니다." },
    AR: { welcome: "NeuroSphere مرحبًا بك في", desc: "طالب بهوية قيمة معيشية قدرها 100,000 يورو.", btn: "دخول النظام", voice: "مرحبًا بك في Indienation Neuro Sphere." },
    HI: { welcome: "NeuroSphere में आपका स्वागत है", desc: "अपने €100,000 के जीवन मूल्य पहचान का दावा करें।", btn: "सिस्टम में प्रवेश करें", voice: "NeuroSphere में आपका स्वागत है।" },
    TR: { welcome: "NeuroSphere'e Hoş Geldiniz", desc: "100.000 € Yaşam Değeri Kimliğinizi talep edin.", btn: "SİSTEME GİRİŞ", voice: "Indienation Neuro Sphere'e hoş geldiniz." }
  };

  const speak = (text, l) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = l === 'ID' ? 'id-ID' : l === 'DE' ? 'de-DE' : 'en-US';
      msg.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices.find(v => v.name.toLowerCase().includes('male')) || voices[0];
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => { speak(dict[lang].voice, lang); }, [lang]);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#00ff41', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} style={{ width: '180px', height: '180px', borderRadius: '50%', border: '2px solid #00ff41', boxShadow: "0 0 30px #00ff41", display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1rem' }}>NEURO</h2>
      </motion.div>

      <h1 style={{ fontSize: '1.4rem', color: '#fff' }}>{dict[lang].welcome}</h1>
      <p style={{ fontSize: '0.85rem', color: '#00ff41', margin: '20px 0 40px' }}>{dict[lang].desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111', padding: '10px 20px', borderRadius: '30px', border: '1px solid #333', marginBottom: '30px' }}>
        <Globe size={16} />
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: 'none', border: 'none', color: '#fff', outline: 'none' }}>
          {Object.keys(dict).map(k => <option key={k} value={k} style={{background:'#000'}}>{k}</option>)}
        </select>
      </div>

      <button onClick={() => router.push('/auth')} style={{ width: '80%', maxWidth: '300px', background: '#00ff41', color: '#000', border: 'none', padding: '18px', fontWeight: 'bold', borderRadius: '15px' }}>
        {dict[lang].btn}
      </button>
    </div>
  );
}
