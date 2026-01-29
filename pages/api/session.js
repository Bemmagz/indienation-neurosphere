import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

export default async function handler(req, res) {
  const { token } = req.query
  
  const { data, error } = await supabase
    .from('iid_inventory')
    .select('*')
    .eq('access_token', token) // Pastikan menggunakan underscore sesuai database
    .single()

  if (error || !data) {
    return res.status(403).json({ error: 'Invalid Stealth Key' })
  }

  return res.status(200).json(data)
}
