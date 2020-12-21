import client from '../lib/supabase'
import useSWR from 'swr'
import { format } from 'timeago.js'

function isOpened(time) {
  return time && new Date(time) <= new Date()
}

function sentOrReceieved({ from }) {
  const { id } = client.auth.user()
  return from.id === id ? 'sent' : 'received'
}

function formatMessages({ data }) {
  return data
    .map(({ sent_at, opened_at, ...message }) => ({
      time: format(new Date(sent_at)),
      opened: isOpened(opened_at),
      type: sentOrReceieved(message),
      ...message,
    }))
    .reverse()
}

export function useMessages() {
  return useSWR(
    'messages',
    () => {
      return client
        .from('messages')
        .select(
          `
        identifier,
        sent_at,
        opened_at,
        to:user_to (
          id,
          username
        ),
        from:user_from (
          id,
          username
        )
      `
        )
        .range(0, 25)
        .order('sent_at')
        .then(formatMessages)
    },
    {
      refreshInterval: 2000,
    }
  )
}
