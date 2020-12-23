import { createClient } from '@supabase/supabase-js'
const { SERVICE_KEY, SUPABASE_URL } = process.env

const client = createClient(SUPABASE_URL, SERVICE_KEY)

module.exports = async (req, res) => {
  const { u } = req.query

  if (!u) {
    return res.status(400).json({
      error: 'Please specify a username',
    })
  }

  const { data: users } = await client
    .from('users')
    .select('id, username')
    .eq('username', u)

  const user = users[0]
  if (user) {
    return res.json({ user })
  } else {
    return res.status(404).json({ message: 'User not found' })
  }
}
