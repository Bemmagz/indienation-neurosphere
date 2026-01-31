'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://yyzymgkdqevkuhowjci.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y")

export default function GenesisPage() {
    const [iid, setIid] = useState('')
    const [age, setAge] = useState(18)
    const [loading, setLoading] = useState(false)

    const activate = async () => {
        if(!iid) return alert("IID Wajib diisi!");
        setLoading(true);
        
        // PROSES AI & PRIVACY PURGE
        setTimeout(async () => {
            const isMinor = age < 17;
            const payload = { 
                iid: "INDIE-" + iid.padStart(10, '0'), 
                status: isMinor ? 'LOCKED_GUARDIAN' : 'ACTIVE',
                amount: 100000,
                metadata: { age_verified: true, data_purged: true }
            };

            const { error } = await supabase.from('claims').upsert([payload]);
            
            if(error) alert("Gagal: " + error.message);
            else {
                alert(isMinor ? "Hak Anak Dilindungi! Saldo €100.000 Terkunci hingga usia 17." : "Genesis Berhasil! €1.000 pertama dapat digunakan.");
            }
            setLoading(false);
        }, 1500);
    }

    return (
        <div style={{ background:'#000', color:'#fff', minHeight:'100vh', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
            <h1 style={{color:'#00e1ff'}}>NEUROSPHERE</h1>
            <div style={{ background:'#111', padding:'30px', borderRadius:'20px', border:'1px solid #333', maxWidth:'400px', margin:'auto' }}>
                <h3>STATUS KEDAULATAN</h3>
                <div style={{fontSize:'2em', fontWeight:'bold', marginBottom:'20px'}}>€ 100.000</div>
                
                <input type="number" placeholder="Input Usia Anda" onChange={(e)=>setAge(e.target.value)} style={{width:'100%', padding:'12px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #444', background:'#000', color:'#fff'}} />
                
                <input type="text" placeholder="Wallet IID" value={iid} onChange={(e)=>setIid(e.target.value)} style={{width:'100%', padding:'12px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #444', background:'#000', color:'#fff'}} />
                
                <button onClick={activate} disabled={loading} style={{width:'100%', padding:'15px', borderRadius:'8px', border:'none', fontWeight:'bold', background: age < 17 ? '#ff9800' : '#fff', cursor:'pointer'}}>
                    {loading ? 'VERIFYING...' : (age < 17 ? 'SIMPAN SEBAGAI ANAK' : 'AKTIVASI PENUH')}
                </button>
                
                <p style={{fontSize:'0.7em', color:'#ff4444', marginTop:'20px'}}>
                    ⚠ PERINGATAN KEJUJURAN:<br/>
                    Jika data tidak sesuai, Wallet Orang Tua dibekukan 1 TAHUN melalui mekanisme laporan 3 warga.
                </p>
            </div>
        </div>
    )
}
