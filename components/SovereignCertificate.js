import React from 'react';

const SovereignCertificate = ({ data }) => {
  const { alias, identity, aura_score = 15 } = data; // Default aura 15% untuk warga baru

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

      <div style={{ backgroundColor: '#111', padding: '10px', border: '1px solid #46FF2E' }}>
        <p style={{ margin: '5px 0' }}>ALLOCATION (LOCKED):</p>
        <h3 style={{ margin: '0' }}>€100.000 STABLE</h3>
        <p style={{ fontSize: '12px' }}>AURA METER (SELEKSI 1M LUV):</p>
        <div style={{ width: '100%', backgroundColor: '#222', height: '20px', border: '1px solid #46FF2E' }}>
          <div style={{ width: `${aura_score}%`, backgroundColor: '#46FF2E', height: '100%', transition: 'width 1s' }}></div>
        </div>
        <p style={{ fontSize: '10px' }}>{aura_score}% / 100% Aura Kebaikan Tercapai</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '10px' }}>Authenticated by:</p>
        <p style={{ fontWeight: 'bold' }}>AI GUARD PROTOCOL v1.0</p>
        <p style={{ fontSize: '9px' }}>Distribusi Final LUV: 01-02-2027 [cite: 2026-01-25]</p>
      </div>
    </div>
  );
};

export default SovereignCertificate;
