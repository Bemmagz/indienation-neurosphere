import React from 'react';

const SovereignCertificate = ({ data }) => {
  const { alias, identity, aura_score = 15 } = data;

  // Simulasi Log Kebaikan yang divalidasi AI Guard
  const kindnessLogs = [
    { action: "Partisipasi Keys of Kindness Estafet", points: "+10%" },
    { action: "Verifikasi Identitas Manusia (Anti-Bot)", points: "+5%" }
  ];

  return (
    <div style={{
      border: '5px double #46FF2E', padding: '20px', backgroundColor: '#050505',
      color: '#46FF2E', fontFamily: 'monospace', maxWidth: '500px', margin: 'auto',
      textAlign: 'center', boxShadow: '0 0 20px #46FF2E'
    }}>
      <h2 style={{ letterSpacing: '3px' }}>SERTIFIKAT KEDAULATAN DIGITAL</h2>
      <p style={{ fontSize: '10px' }}>NEUROSPHERE: INDIENATION ECOSYSTEM</p>
      <hr style={{ borderColor: '#46FF2E' }} />
      
      <div style={{ margin: '20px 0' }}>
        <p>IDENTITAS: <span style={{ color: '#fff' }}>{alias}</span></p>
        <p>IDENTITY ID: <span style={{ color: '#fff' }}>{identity}</span></p>
      </div>

      <div style={{ backgroundColor: '#111', padding: '15px', border: '1px solid #46FF2E' }}>
        <p style={{ margin: '5px 0' }}>ALLOCATION (LOCKED):</p>
        <h3 style={{ margin: '0' }}>€100.000 STABLE</h3>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>AURA METER (PROSES SELEKSI 1M LUV):</p>
        <div style={{ width: '100%', backgroundColor: '#222', height: '15px', border: '1px solid #46FF2E', margin: '5px 0' }}>
          <div style={{ width: `${aura_score}%`, backgroundColor: '#46FF2E', height: '100%', transition: 'width 1s' }}></div>
        </div>
        <p style={{ fontSize: '10px' }}>{aura_score}% / 100% Aura Kebaikan Tercapai</p>
        
        <div style={{ marginTop: '15px', textAlign: 'left', fontSize: '11px', borderTop: '1px solid #222', paddingTop: '10px' }}>
          <p style={{ color: '#FFD700', marginBottom: '5px' }}>LOG KEBAIKAN (VALIDATED):</p>
          {kindnessLogs.map((log, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <span>▸ {log.action}</span>
              <span style={{ color: '#46FF2E' }}>{log.points}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '10px' }}>Authenticated by:</p>
        <p style={{ fontWeight: 'bold' }}>AI GUARD PROTOCOL v1.0</p>
        <p style={{ fontSize: '9px' }}>Target Seleksi: 1 Juta Jiwa Terpilih [01-02-2027]</p>
      </div>
    </div>
  );
};

export default SovereignCertificate;
