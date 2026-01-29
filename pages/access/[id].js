import { useEffect, useState } from 'react'

export default function AccessPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Memaksa pengambilan token dari URL Bar jika router gagal
    const path = window.location.pathname
    const token = path.split('/').pop()

    if (token && token !== '[id]') {
      fetch(`/api/session?id=${token}`)
        .then(res => res.json())
        .then(res => {
          if (res.error) setError(res.error)
          else setData(res)
        })
        .catch(() => setError('Connection Failed'))
    }
  }, [])

  if (error) return <div style={{color:'red', padding:'20px'}}>❌ {error}</div>
  if (!data) return <div style={{padding:'20px'}}>⌛ Authenticating Sovereign Identity...</div>

  return (
    <div style={{padding:'20px', fontFamily:'sans-serif'}}>
      <h1>✅ IDENTITY VERIFIED</h1>
      <hr/>
      <p>ID: <strong>{data.iid}</strong></p>
      <p>Balance: <strong>{data.currency} {data.balance?.toLocaleString()}</strong></p>
      <p>Status: <span style={{color:'green'}}>{data.status}</span></p>
    </div>
  )
}
