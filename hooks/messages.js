import { useClient } from '../lib/supabase'
import { useEffect, useState } from 'react'
import { format } from 'timeago.js'

export function useMessages() {
  const client = useClient()
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMessages() {
      let { data, error } = await client
        .from('messages')
        .select(
          `
          identifier,
          sent_at,
          users:user_from (
            username
          )
        `
        )
        .range(0, 25)
        .order('sent_at')

      if (error) {
        setError(error)
      } else {
        const messages = data.map((message) => {
          const username = message.users.username
          const identifier = message.identifier
          const time = format(new Date(message.sent_at))
          return {
            time,
            username,
            identifier,
            viewed: false,
          }
        })
        setMessages(messages.reverse())
      }
    }

    fetchMessages()
  }, [])

  return {
    messages,
    error,
  }
}
