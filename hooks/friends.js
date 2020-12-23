import client from '../lib/supabase'
import useSWR from 'swr'

export function useFriends() {
  const { id } = client.auth.user()
  return useSWR('friends', async (key) => {
    const { data } = await client
      .from(key)
      .select(
        `
      friend:friend_id (
        id,
        username
      )
    `
      )
      .eq('user_id', id)

    return data
  })
}
