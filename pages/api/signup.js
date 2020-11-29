const { createClient } = require('@supabase/supabase-js')
const { SERVICE_KEY, SUPABASE_URL } = process.env

const client = createClient(SUPABASE_URL, SERVICE_KEY)

export default async function (req, res) {
  const { email, password, username } = req.body

  console.log(req.body)

  if (!email || !password || !username) {
    return res.json({
      error: ['You must specifiy a username, email and password'],
    })
  }

  let { user, error } = await client.auth.signUp({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  let { error: insertError } = await client
    .from('account')
    .insert([{ user_id: user.id, username }])

  if (insertError) {
    return res.status(400).json({
      error: insertError.message,
    })
  }

  return res.json({
    user,
  })
}
