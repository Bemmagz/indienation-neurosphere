import React, { useState } from 'react';

const SovereignCertificate = ({ data }) => {
  const { alias, identity, aura_score = 15 } = data;
  const languages = ['ID', 'ENG', 'AR'];
  const [langIndex, setLangIndex] = useState(0);

  const content = {
    ID: { title: "SERTIFIKAT KEDAULATAN", identity: "IDENTITAS", aura: "AURA METER (SELEKSI 1M LUV)", log: "LOG KEBAIKAN", auth: "Diverifikasi AI GUARD v1.0", direction: 'ltr' },
    ENG: { title: "SOVEREIGNTY CERTIFICATE", identity: "IDENTITY", aura: "AURA METER (1M LUV SELECTION)", log: "KINDNESS LOG", auth: "Authenticated by AI GUARD v1.0", direction: 'ltr' },
    AR: { title: "شهادة السيادة", identity: "الهوية", aura: "مقياس الهالة (اختيار 1 مليون LUV)", log: "سجل أعمال الخير", auth: "موثق بواسطة AI GUARD v1.0", direction: 'rtl' }
  };

  const currentLang = languages[langIndex];
  const t = content[currentLang];

  const toggleLang = () => {
    setLangIndex((prev) => (prev + 1) % languages.length);
  };

  return (
    <div style={{ position: 'relative', minHeight: '600px', padding: '20px' }}>
      
      {/* Floating World Navigation */}
      <div 
        onClick={toggleLang}
        style={{
          position: 'absolute', top: '10px', right: '10px', cursor: 'pointer',
          backgroundColor: '#111', border: '1px solid #46FF2E', borderRadius: '50%',
          width: '50px', height: '50px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px', zIndex: 100, boxShadow: '0 0 10px #46FF2E'
        }}
        title="Switch Language"
      >
        🌍 <span style={{ fontSize: '10px', marginLeft: '2px' }}>{currentLang}</span>
      </div>

      <div style={{
        border: '5px double #46FF2E', padding: '20px', backgroundColor: '#050505',
        color: '#46FF2E', fontFamily: 'monospace', maxWidth: '550px', margin: '40px auto',
        textAlign: 'center', boxShadow: '0 0 20px #46FF2E', direction: t.direction
      }}>
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
          
          <div style={{ marginTop: '15px', textAlign: t.direction === 'rtl' ? 'right' : 'left', fontSize: '11px', borderTop: '1px solid #222', paddingTop: '10px' }}>
            <p style={{ color: '#FFD700', marginBottom: '5px' }}>{t.log}:</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <span>▸ Keys of Kindness Estafet</span>
              <span style={{ color: '#46FF2E' }}>+10%</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '10px' }}>{t.auth}</p>
          <p style={{ fontSize: '9px' }}>Target: 1,000,000 Pioneer Souls [01-02-2027]</p>
        </div>
      </div>
    </div>
  );
};

export default SovereignCertificate;
