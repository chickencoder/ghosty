import client from '../lib/supabase'
import useSWR from 'swr'

export function useFriends() {
  return useSWR('friends', async (key) => {
    const { data, ...response } = await client.from(key).select(`
      friend:friend_id (
        id,
        username
      )
    `)

    return data
  })
}
