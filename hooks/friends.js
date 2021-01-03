import client from '../lib/supabase'
import useSWR from 'swr'

export function useFriends() {
  return useSWR('friends', async (key) => {
    const { id } = client.auth.user()
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
