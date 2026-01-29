import { createClient } from '@supabase/supabase-js'

// Menggunakan Service Role untuk otoritas penuh AI Guard
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
)

export default async function handler(req, res) {
  const { token } = req.query

  if (!token || token.length !== 24) {
    return res.status(403).json({ error: 'Invalid Stealth Key Length' })
  }

  const { data, error } = await supabase
    .from('iid_inventory')
    .select('iid, balance, currency, updated_at')
    .eq('access_token', token)
    .single()

  if (error || !data) {
    console.error('Auth Error:', error)
    return res.status(403).json({ error: 'Invalid Stealth Key' })
  }

  // Response sukses sesuai standar kedaulatan
  return res.status(200).json({
    ...data,
    status: 'VERIFIED_CITIZEN',
    message: 'Welcome to NeuroSphere Sovereign System'
  })
}
// System Heartbeat: Thu Jan 29 10:48:32 WIB 2026
