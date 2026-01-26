"use client";
import { QRCodeSVG } from 'qrcode.react';

export default function SovereignCertificate({ data }) {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#fff', 
      color: '#000', 
      border: '10px double #46FF2E', 
      maxWidth: '600px', 
      margin: '20px auto',
      fontFamily: 'serif',
      position: 'relative',
      borderRadius: '2px'
    }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', marginBottom: '20px' }}>
        <h1 style={{ margin: '0', fontSize: '22px', letterSpacing: '2px' }}>SERTIFIKAT KEDAULATAN DIGITAL</h1>
        <p style={{ margin: '5px 0', fontSize: '10px', fontWeight: 'bold' }}>NEUROSPHERE: INDIENATION ECOSYSTEM</p>
      </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', fontSize: '14px' }}>Dengan ini mensertifikasi bahwa:</p>
        <h2 style={{ margin: '10px 0', textTransform: 'uppercase', fontSize: '28px' }}>{data.alias}</h2>
        <p style={{ fontSize: '12px', letterSpacing: '1px' }}>IDENTITY ID: {data.identity}</p>
      </div>

      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '5px', marginBottom: '25px' }}>
        <p style={{ fontSize: '10px', margin: '0 0 10px 0', fontWeight: 'bold', color: '#555' }}>VALUE ALLOCATION (TM IDENTITY):</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }}>
          <span>€{data.tm_identity.stable} STABLE</span>
          <span>{data.tm_identity.luv} LUV</span>
          <span>{data.tm_identity.enpe} ENPE</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <QRCodeSVG value={`https://indienation-neurosphere.vercel.app/?iid=${data.identity}`} size={90} />
          <p style={{ fontSize: '8px', marginTop: '5px' }}>SCAN TO VALIDATE</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '10px', margin: '0' }}>Authenticated by:</p>
          <div style={{ fontWeight: 'bold', color: '#46FF2E', border: '2px solid #46FF2E', padding: '5px 10px', display: 'inline-block', background: '#000' }}>
            AI GUARD PROTOCOL v1.0
          </div>
          <p style={{ fontSize: '9px', marginTop: '5px' }}>Activation Date: 01-02-2026</p>
        </div>
      </div>
    </div>
  );
}
