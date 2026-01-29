import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const { token } = req.query

  // 1. Cek Ketersediaan Environment Variables
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
    return res.status(500).json({ error: 'Config Missing', detail: 'Check Vercel Env Vars' })
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    )

    // 2. Query ke Database dengan penanganan error eksplisit
    const { data, error } = await supabase
      .from('iid_inventory')
      .select('iid, balance, currency')
      .eq('access_token', token)
      .single()

    if (error) {
      console.error('Supabase Query Error:', error.message)
      return res.status(403).json({ error: 'Access Denied', detail: error.message })
    }

    if (!data) {
      return res.status(404).json({ error: 'Token Not Found' })
    }

    // 3. Response Berhasil
    return res.status(200).json({
      iid: data.iid,
      balance: data.balance,
      currency: data.currency,
      status: 'VERIFIED_CITIZEN'
    })

  } catch (err) {
    console.error('Crash Error:', err.message)
    return res.status(500).json({ error: 'Internal Server Crash', detail: err.message })
  }
}
