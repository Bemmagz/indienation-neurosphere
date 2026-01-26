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

  const downloadCert = () => {
    const certText = `
    ◈ NEUROSPHERE GENESIS CERTIFICATE ◈
    ====================================
    ID: ${data.identity}
    ALIAS: ${data.alias}
    ROLE: ${data.role}
    
    ASSETS (TOTAL TM):
    - ENPE (Engine): ${data.tm_identity.enpe}
    - LUV (Social): ${data.tm_identity.luv}
    - STABLE (IND-EUR): €${data.tm_identity.stable}
    
    STATUS: TERVERIFIKASI & TERKUNCI (2 TAHUN)
    DISTRIBUSI TUNAI: 01-02-2026
    ====================================
    Dikelola oleh AI Guard & Neurosphere.
    `;
    const element = document.createElement("a");
    const file = new Blob([certText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Certificate_${data.identity}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (!data || data.status !== "ACCESS_GRANTED") {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#FF2E2E' }}>
        <h1>◈ ACCESS DENIED ◈</h1>
        <p>Gunakan Kunci Rahasia Valid untuk Identitas Living Value.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', border: '1px solid #46FF2E', padding: '30px', borderRadius: '20px', backgroundColor: '#0a0a0a', boxShadow: '0 0 20px #46FF2E33' }}>
      <h2 style={{ textAlign: 'center', letterSpacing: '2px', borderBottom: '2px solid #46FF2E', paddingBottom: '10px' }}>GENESIS CARD</h2>
      
      <div style={{ margin: '20px 0' }}>
        <p style={{ fontSize: '12px', color: '#888', margin: '0' }}>IDENTITY HOLDER</p>
        <p style={{ fontSize: '20px', margin: '5px 0' }}>{data.alias}</p>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>ID: {data.identity}</p>
      </div>

      <div style={{ backgroundColor: '#111', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #46FF2E' }}>
        <h3 style={{ fontSize: '14px', color: '#46FF2E', margin: '0 0 10px 0' }}>TOTAL TM ASSETS</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>ENPE (Engine)</span>
          <span>{data.tm_identity.enpe}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>LUV (Social)</span>
          <span>{data.tm_identity.luv}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFD700' }}>
          <span>STABLE (IND-EUR)</span>
          <span>€{data.tm_identity.stable}</span>
        </div>
      </div>

      <button onClick={downloadCert} style={{ width: '100%', marginTop: '25px', padding: '12px', backgroundColor: '#46FF2E', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
        UNDUH SERTIFIKAT KEDAULATAN
      </button>

      <footer style={{ marginTop: '20px', fontSize: '10px', textAlign: 'center', color: '#666', lineHeight: '1.5' }}>
        ASET TERKUNCI HINGGA 2028<br/>
        STABLE COIN AKTIF: 01 FEBRUARI 2026
      </footer>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', color: '#46FF2E' }}>Synchronizing Identity...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
