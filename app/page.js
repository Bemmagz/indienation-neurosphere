'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SB_URL = "https://yyzymgkdqevkuhowjci.supabase.co"
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enltZ2tkcHFldmt1aG93amNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgyMDQsImV4cCI6MjA4MTk2NDIwNH0.hk3M39domZHQXjlG8i7ikGhxEFThqtO1RQaEzc65_1Y"
const supabase = createClient(SB_URL, SB_KEY)

export default function GenesisPage() {
    const [idInput, setIdInput] = useState('')
    const [available, setAvailable] = useState(1000)
    const [status, setStatus] = useState('')
    const [localLogs, setLocalLogs] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('indie_receipts')
        if (saved) setLocalLogs(JSON.parse(saved))
    }, [])

    const claim = async () => {
        if (!idInput) return alert("Masukkan ID!")
        if (available <= 0) return alert("Limit harian habis.")
        
        setStatus('🔄 WRITING TO LEDGER...')
        const txData = { iid: idInput, amount: 1000, ts: new Date().toISOString() }

        try {
            const { error } = await supabase.from('claims').upsert([txData])
            if (error) throw error
            
            const newLogs = [...localLogs, txData]
            localStorage.setItem('indie_receipts', JSON.stringify(newLogs))
            setLocalLogs(newLogs)
            setAvailable(0)
            alert("✅ SUCCESS! Tersimpan di Cloud & HP.")
        } catch (err) {
            alert("❌ ERROR: " + err.message)
        } finally { setStatus('') }
    }

    return (
        <div style={{ background:'#000', color:'#fff', minHeight:'100vh', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
            <h1 style={{letterSpacing:'5px'}}>INDIENATION</h1>
            <div style={{ background:'#111', padding:'30px', borderRadius:'20px', border:'1px solid #333', maxWidth:'400px', margin:'auto' }}>
                <p style={{color:'#888', margin:'0'}}>TOTAL ALLOCATION</p>
                <h2 style={{fontSize:'2.5em', margin:'10px 0'}}>€ 100.000</h2>
                <div style={{background:'#00e1ff22', padding:'10px', borderRadius:'10px', color:'#00e1ff', fontWeight:'bold'}}>
                    AVAILABLE TODAY: € {available}
                </div>
                <input type="text" placeholder="ENTER IID (1-100000)" value={idInput} onChange={(e)=>setIdInput(e.target.value)} style={{width:'100%', padding:'15px', marginTop:'20px', background:'#000', color:'#fff', border:'1px solid #333', borderRadius:'10px', boxSizing:'border-box'}} />
                <button onClick={claim} style={{width:'100%', padding:'15px', marginTop:'15px', background:'#fff', color:'#000', border:'none', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
                    {status || 'ACTIVATE IDENTITY'}
                </button>
            </div>
            <div style={{marginTop:'40px', textAlign:'left', maxWidth:'400px', margin:'40px auto'}}>
                <p style={{fontSize:'0.8em', color:'#555'}}>LOCAL BACKUP (IMMUTABLE)</p>
                {localLogs.map((l, i) => (
                    <div key={i} style={{fontSize:'0.75em', padding:'10px', borderBottom:'1px solid #222'}}>
                        🟢 {l.ts.split('T')[0]} | {l.iid} | €{l.amount}
                    </div>
                ))}
            </div>
        </div>
    )
}
