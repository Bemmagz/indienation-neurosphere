"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const iid = searchParams.get('iid');
  const key = searchParams.get('key');

  useEffect(() => {
    if (iid && key) {
      fetch(`/api/v1/verify?iid=${iid}&key=${key}`)
        .then(res => res.json())
        .then(json => setData(json));
    }
  }, [iid, key]);

  if (!data || data.status !== "ACCESS_GRANTED") {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#FF2E2E', backgroundColor: '#000' }}>
        <h1 style={{ letterSpacing: '5px' }}>◈ ACCESS DENIED ◈</h1>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle, #0d1a0d 0%, #000 100%)', color: '#fff', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid rgba(70, 255, 46, 0.3)', padding: '30px', borderRadius: '30px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ color: '#46FF2E', fontSize: '10px', letterSpacing: '4px' }}>GENESIS IDENTITY</div>
          <h2 style={{ margin: '5px 0' }}>{data.alias}</h2>
          <div style={{ fontSize: '10px', color: '#888' }}>ID: {data.identity}</div>
        </div>

        {/* QR CODE FOR WALKING WALLET */}
        <div style={{ textAlign: 'center', background: '#fff', padding: '15px', borderRadius: '15px', width: 'fit-content', margin: '20px auto' }}>
          <QRCodeSVG value={`https://indienation-neurosphere.vercel.app/?iid=${data.identity}&key=${key}`} size={150} />
        </div>

        {/* ASSET STATUS */}
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ fontSize: '10px', color: '#888' }}>STABLE ANCHOR</span>
            <div style={{ fontSize: '20px', color: '#FFD700' }}>€{data.tm_identity.stable}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#888' }}>ENPE</span>
              <div style={{ color: '#46FF2E' }}>{data.tm_identity.enpe}</div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#888' }}>LUV AURA</span>
              <div style={{ color: '#46FF2E' }}>{data.tm_identity.luv}</div>
            </div>
          </div>
        </div>

        {/* AI GUARD SEAL */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center' }}>
          <div style={{ color: '#46FF2E', fontSize: '12px', fontWeight: 'bold' }}>🛡️ VERIFIED BY AI GUARD</div>
          <div style={{ fontSize: '9px', color: '#555', marginTop: '5px' }}>ASSETS LOCKED UNTIL 2028 | FOUNDER LOCKED 2029</div>
          <button style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'none', border: '1px solid #46FF2E', color: '#46FF2E', borderRadius: '10px', cursor: 'pointer' }}>
            DOWNLOAD SOVEREIGN CERTIFICATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div style={{ color: '#46FF2E', textAlign: 'center', marginTop: '50vh' }}>SYNCHRONIZING NEURAL LEDGER...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
