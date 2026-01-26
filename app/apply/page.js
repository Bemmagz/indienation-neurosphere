"use client";
import { useState } from 'react';

export default function ApplySovereignty() {
  const [formData, setFormData] = useState({ alias: '', email: '', contribution: '' });
  const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    
    // Simulasi Verifikasi AI Guard Protocol v1.0
    setTimeout(() => {
      setStatus('SUCCESS');
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #46FF2E' }}>◈ AJUKAN KEDAULATAN DIGITAL ◈</h1>
      
      {status === 'IDLE' ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '30px', maxWidth: '500px' }}>
          <p>Daftar untuk menerima alokasi €100.000 & 1.000.000 LUV [cite: 2025-12-20].</p>
          <label>ALIAS / NAMA DIGITAL:</label><br />
          <input 
            type="text" required 
            style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #46FF2E', color: '#fff', marginBottom: '20px' }}
            onChange={(e) => setFormData({...formData, alias: e.target.value})}
          /><br />
          <label>EMAIL VERIFIKASI:</label><br />
          <input 
            type="email" required 
            style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #46FF2E', color: '#fff', marginBottom: '20px' }}
          /><br />
          <label>BUKTI KARYA/KEBAIKAN (Link/Deskripsi):</label><br />
          <textarea 
            required
            style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #46FF2E', color: '#fff', height: '100px' }}
            placeholder="Contoh: Partisipasi dalam Keys of Kindness Estafet..."
          ></textarea>
          <button type="submit" style={{ marginTop: '20px', padding: '15px', width: '100%', background: '#46FF2E', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            KIRIM KE AI GUARD
          </button>
        </form>
      ) : status === 'SUBMITTING' ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>MEMPROSES INTEGRITAS...</h2>
          <p>AI Guard Protocol v1.0 sedang memvalidasi data kemanusiaan Anda.</p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px', border: '1px solid #46FF2E', padding: '20px' }}>
          <h2 style={{ color: '#FFD700' }}>PENDAFTARAN DITERIMA!</h2>
          <p>ID Identitas Anda sedang diproses. Silakan cek email Anda secara berkala untuk menerima Nomor Identitas (ID) dan Kunci Aktivasi.</p>
          <p style={{ fontSize: '12px' }}>Aset akan diaktifkan pada: 01-02-2026</p>
          <button onClick={() => window.location.href='/'} style={{ background: '#46FF2E', padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>KEMBALI KE HUB</button>
        </div>
      )}
    </div>
  );
}
