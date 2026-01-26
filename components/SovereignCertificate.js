import React, { useState } from 'react';

const SovereignCertificate = ({ data }) => {
  const { alias, identity, aura_score = 15 } = data;
  const [lang, setLang] = useState('ID');

  const content = {
    ID: {
      title: "SERTIFIKAT KEDAULATAN DIGITAL",
      identity: "IDENTITAS",
      aura: "AURA METER (SELEKSI 1M LUV)",
      log: "LOG KEBAIKAN (VALIDATED)",
      target: "Target Seleksi: 1 Juta Jiwa Terpilih",
      auth: "Diverifikasi oleh AI GUARD PROTOCOL v1.0"
    },
    ENG: {
      title: "DIGITAL SOVEREIGNTY CERTIFICATE",
      identity: "IDENTITY",
      aura: "AURA METER (1M LUV SELECTION)",
      log: "KINDNESS LOG (VALIDATED)",
      target: "Selection Target: 1 Million Chosen Souls",
      auth: "Authenticated by AI GUARD PROTOCOL v1.0"
    },
    AR: {
      title: "شهادة السيادة الرقمية",
      identity: "الهوية",
      aura: "مقيas الهالة (اختيار 1 مليون LUV)",
      log: "سجل أعمال الخير (تم التحقق)",
      target: "هدف الاختيار: 1 مليون روح مختارة",
      auth: "موثق بواسطة بروتوكول AI GUARD v1.0"
    }
  };

  const t = content[lang];

  return (
    <div style={{
      border: '5px double #46FF2E', padding: '20px', backgroundColor: '#050505',
      color: '#46FF2E', fontFamily: 'monospace', maxWidth: '550px', margin: 'auto',
      textAlign: 'center', boxShadow: '0 0 20px #46FF2E', direction: lang === 'AR' ? 'rtl' : 'ltr'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setLang('ID')} style={{ margin: '0 5px', cursor: 'pointer' }}>ID</button>
        <button onClick={() => setLang('ENG')} style={{ margin: '0 5px', cursor: 'pointer' }}>ENG</button>
        <button onClick={() => setLang('AR')} style={{ margin: '0 5px', cursor: 'pointer' }}>AR</button>
      </div>

      <h2 style={{ letterSpacing: '2px' }}>{t.title}</h2>
      <p style={{ fontSize: '10px' }}>NEUROSPHERE: INDIENATION ECOSYSTEM</p>
      <hr style={{ borderColor: '#46FF2E' }} />
      
      <div style={{ margin: '20px 0' }}>
        <p>{t.identity}: <span style={{ color: '#fff' }}>{alias}</span></p>
        <p>ID: <span style={{ color: '#fff' }}>{identity}</span></p>
      </div>

      <div style={{ backgroundColor: '#111', padding: '15px', border: '1px solid #46FF2E' }}>
        <p style={{ margin: '5px 0' }}>ALLOCATION (LOCKED):</p>
        <h3 style={{ margin: '0' }}>€100.000 STABLE</h3>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>{t.aura}:</p>
        <div style={{ width: '100%', backgroundColor: '#222', height: '15px', border: '1px solid #46FF2E', margin: '5px 0' }}>
          <div style={{ width: `${aura_score}%`, backgroundColor: '#46FF2E', height: '100%', transition: 'width 1s' }}></div>
        </div>
        
        <div style={{ marginTop: '15px', textAlign: lang === 'AR' ? 'right' : 'left', fontSize: '11px', borderTop: '1px solid #222', paddingTop: '10px' }}>
          <p style={{ color: '#FFD700', marginBottom: '5px' }}>{t.log}:</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
            <span>▸ Keys of Kindness Estafet</span>
            <span style={{ color: '#46FF2E' }}>+10%</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '10px' }}>{t.auth}</p>
        <p style={{ fontSize: '9px' }}>{t.target} [01-02-2027]</p>
      </div>
    </div>
  );
};

export default SovereignCertificate;
