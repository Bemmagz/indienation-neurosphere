import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ledgerData from '../state/ledger.json';

const translations = {
  ID: { title: "RUANG KENDALI", welcome: "Selamat Datang, Founder.", identity: "IDENTITAS", status: "STATUS", total: "TOTAL NILAI HIDUP", enroll: "DAFTAR PIONEER", language: "BAHASA" },
  EN: { title: "CONTROL ROOM", welcome: "Welcome, Founder.", identity: "IDENTITY", status: "STATUS", total: "LIVING VALUE IDENTITY", enroll: "PIONEER ENROLLMENT", language: "LANGUAGE" },
  AR: { title: "غرفة التحكم", welcome: "أهلاً بك أيها المؤسس", identity: "الهوية", status: "الحالة", total: "قيمة الحياة", enroll: "تسجيل الرواد", language: "لغة" },
  ZH: { title: "控制室", welcome: "欢迎，创始人", identity: "身份", status: "状态", total: "生活价值身份", enroll: "先锋注册", language: "语言" },
  HI: { title: "नियंत्रण कक्ष", welcome: "स्वागत है, संस्थापक", identity: "पहचान", status: "स्थिति", total: "जीवन मूल्य पहचान", enroll: "पायनियर पंजीकरण", language: "भाषा" },
  FR: { title: "SALLE DE CONTRÔLE", welcome: "Bienvenue, Fondateur", identity: "IDENTITÉ", status: "STATUT", total: "VALEUR DE VIE", enroll: "INSCRIPTION PIONNIER", language: "LANGUE" },
  ES: { title: "SALA DE CONTROL", welcome: "Bienvenido, Fundador", identity: "IDENTIDAD", status: "ESTADO", total: "VALOR DE VIDA", enroll: "INSCRIPCIÓN PIONERA", language: "IDIOMA" },
  DE: { title: "KONTROLLRAUM", welcome: "Willkommen, Gründer", identity: "IDENTITÄT", status: "STATUS", total: "LEBENSWERT", enroll: "PIONIER-ANMELDUNG", language: "SPRACHE" },
  JP: { title: "コントロールルーム", welcome: "ようこそ、創設者", identity: "身元", status: "ステータス", total: "生活価値のアイデンティティ", enroll: "パイオニア登録", language: "言語" },
  KR: { title: "제어실", welcome: "환영합니다, 설립자님", identity: "정체성", status: "상태", total: "생활 가치 정체성", enroll: "개척자 등록", language: "언어" },
  PT: { title: "SALA DE CONTROLO", welcome: "Bem-vindo, Fundador", identity: "IDENTIDADE", status: "STATUS", total: "VALOR DE VIDA", enroll: "INSCRIÇÃO PIONEIRA", language: "IDIOMA" },
  RU: { title: "ПУЛЬТ УПРАВЛЕНИЯ", welcome: "Добро пожаловать, Основатель", identity: "ЛИЧНОСТЬ", status: "СТАТУС", total: "ЖИЗНЕННАЯ ЦЕННОСТЬ", enroll: "РЕГИСТРАЦИЯ", language: "ЯЗЫК" },
  IT: { title: "SALA DI CONTROLLO", welcome: "Benvenuto, Fondatore", identity: "IDENTITÀ", status: "STATO", total: "VALORE DI VITA", enroll: "ISCRIZIONE PIONIERE", language: "LINGUA" },
  SW: { title: "CHUMBA CHA UDHIBITI", welcome: "Karibu, Mwanzilishi", identity: "UTAMBULISHO", status: "HALI", total: "THAMANI YA MAISHA", enroll: "USAJILI WA PAIANIA", language: "LUGHA" }
};

export default function Dashboard() {
  const [lang, setLang] = useState('ID');
  const [isMounted, setIsMounted] = useState(false);
  const user = ledgerData[0];

  useEffect(() => {
    setIsMounted(true);
    speak(translations[lang].welcome);
  }, [lang]);

  const speak = (msg) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isMounted) return <div style={{backgroundColor:'#000', height:'100vh'}} />;

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      {/* 14 LANGUAGES SELECTOR */}
      <nav style={{ padding: '15px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {Object.keys(translations).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{ 
            background: lang === l ? '#00ff41' : 'transparent', 
            color: lang === l ? '#000' : '#00ff41',
            border: '1px solid #00ff41',
            fontSize: '10px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            {l}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h2 style={{ letterSpacing: '5px', margin: '30px 0', textShadow: '0 0 10px #00ff41' }}>◈ {translations[lang].title} ◈</h2>
        
        {/* VALUE IDENTITY CARD */}
        <div style={{ 
          border: '2px double #00ff41', 
          padding: '40px', 
          display: 'inline-block', 
          minWidth: '350px',
          backgroundColor: 'rgba(0, 255, 65, 0.02)',
          boxShadow: '0 0 30px rgba(0, 255, 65, 0.1)'
        }}>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>{translations[lang].identity}</p>
          <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>{user.name}</h3>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>ID: {user.id} | {translations[lang].status}: {user.status}</p>
          
          <hr style={{ border: '0.5px solid #111', margin: '25px 0' }} />
          
          <p style={{ fontSize: '0.8rem', color: '#888' }}>{translations[lang].total}</p>
          <h1 style={{ color: '#fff', fontSize: '3rem', margin: '10px 0' }}>{user.allocation}</h1>
          <p style={{ color: '#00ff41', fontSize: '1rem' }}>+ {user.aura} (AURA)</p>
        </div>

        {/* NAVIGATION SYSTEM */}
        <div style={{ marginTop: '50px' }}>
          <Link href="/enroll">
            <button style={{ 
              padding: '15px 40px', 
              background: 'transparent', 
              border: '2px solid #00ff41', 
              color: '#00ff41', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              letterSpacing: '2px',
              transition: '0.3s'
            }} onMouseOver={(e) => e.target.style.background = '#00ff41'} onMouseOut={(e) => e.target.style.background = 'transparent'}>
              {translations[lang].enroll}
            </button>
          </Link>
        </div>
      </main>

      {/* VERTICAL TRADEMARK */}
      <footer style={{ padding: '60px 0', borderTop: '1px solid #111', backgroundColor: '#050505' }}>
        <div style={{ opacity: 0.6 }}>
          <p style={{ fontSize: '0.7rem', marginBottom: '10px' }}>Powered by:</p>
          <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '1.1rem', letterSpacing: '2px' }}>INDIENATION Foundation</p>
          <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '1.1rem', letterSpacing: '2px' }}>1001NDONESIA INVESTMENT</p>
        </div>
      </footer>
    </div>
  );
}
