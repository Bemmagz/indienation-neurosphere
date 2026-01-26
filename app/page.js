"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

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
        <h1 style={{ letterSpacing: '5px', textShadow: '0 0 10px #FF2E2E' }}>◈ ACCESS DENIED ◈</h1>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle, #0d1a0d 0%, #000 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '380px', 
        padding: '30px', 
        borderRadius: '30px', 
        background: 'rgba(255, 255, 255, 0.03)', 
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(70, 255, 46, 0.2)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(70, 255, 46, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '10px', color: '#46FF2E', letterSpacing: '3px', marginBottom: '10px' }}>NEUROSPHERE GENESIS ID</div>
        <div style={{ height: '80px', width: '80px', background: 'linear-gradient(45deg, #46FF2E, #1a3d1a)', borderRadius: '50%', margin: 'auto', marginBottom: '15px', border: '3px solid #000', boxShadow: '0 0 15px #46FF2E' }}></div>
        
        <h2 style={{ fontSize: '24px', margin: '0', color: '#fff' }}>{data.alias}</h2>
        <code style={{ fontSize: '11px', color: '#46FF2E', opacity: 0.6 }}>UUID: {data.identity}</code>

        <div style={{ marginTop: '30px', textAlign: 'left' }}>
          <div style={{ marginBottom: '15px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
            <div style={{ fontSize: '10px', color: '#888' }}>LIVING VALUE (STABLE)</div>
            <div style={{ fontSize: '22px', color: '#FFD700', fontWeight: 'bold' }}>€{data.tm_identity.stable}</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
              <div style={{ fontSize: '9px', color: '#888' }}>ENPE NATIVE</div>
              <div style={{ fontSize: '16px', color: '#46FF2E' }}>{data.tm_identity.enpe}</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
              <div style={{ fontSize: '9px', color: '#888' }}>AURA REWARD</div>
              <div style={{ fontSize: '16px', color: '#46FF2E' }}>{data.tm_identity.luv} LUV</div>
            </div>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: '30px', padding: '15px', borderRadius: '12px', background: '#46FF2E', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
          ACTIVATE VOUCHER 01-02-2026
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div style={{ color: '#46FF2E', textAlign: 'center', marginTop: '50vh' }}>ACCESSING NEURAL NETWORK...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
