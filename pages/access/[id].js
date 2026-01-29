import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AccessPage() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Ambil token dari URL jika router Next.js belum siap
    const token = id || window.location.pathname.split('/').pop()

    if (token && token !== '[id]') {
      // Coba jalur API baru yang sudah kita satukan [id].js
      fetch(`/api/access/${token}`)
        .then(res => res.json())
        .then(res => {
          if (res.error) throw new Error(res.error)
          setData(res)
        })
        .catch(() => {
          // Fallback ke jalur lama jika jalur baru gagal
          fetch(`/api/session?id=${token}`)
            .then(res => res.json())
            .then(res => {
              if (res.error) setError(res.error)
              else setData(res)
            })
            .catch(() => setError('Connection Failed'))
        })
    }
  }, [id])

  if (error) return <div style={{color:'red', padding:'20px'}}>❌ {error}</div>
  if (!data) return <div style={{padding:'20px'}}>⌛ Authenticating Sovereign Identity...</div>

  return (
    <div style={{padding:'20px', fontFamily:'sans-serif', maxWidth:'400px', border:'1px solid #ccc', margin:'20px auto', borderRadius:'10px'}}>
      <h2 style={{color:'#2ecc71'}}>✅ IDENTITY VERIFIED</h2>
      <hr/>
      <p>IID: <strong>{data.iid}</strong></p>
      <p>Balance: <strong>{data.currency} {data.balance?.toLocaleString()}</strong></p>
      <p style={{fontSize:'12px', color:'#666'}}>Status: {data.status}</p>
    </div>
  )
}
