import { createClient } from '@supabase/supabase-js'
const { SERVICE_KEY, SUPABASE_URL } = process.env

const client = createClient(SUPABASE_URL, SERVICE_KEY)

export default async function (req, res) {
  const { email, password, username } = req.body

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
    .from('users')
    .insert([{ id: user.id, username }])

  const teamGhosty = 'a5c1a8f4-a994-4572-9c25-930799c06e0c'
  await client.from('friends').insert({
    id: `${user.id}_${teamGhosty}`,
    user_id: user.id,
    friend_id: teamGhosty,
  })

  if (insertError) {
    return res.status(400).json({
      error: insertError.message,
    })
  }

  return res.json({
    user,
  })
}
