import Header from '../components/header'
import Messages from '../components/messages'
import Error from '../components/error'
import client from '../lib/supabase'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMessages } from '../hooks/messages'

export default function IndexPage() {
  const { data, error } = useMessages()
  const router = useRouter()

  useEffect(() => {
    if (!client.auth.user()) {
      router.push('/')
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <div className="text-center h-16 flex items-center justify-center">
        <span role="img">👻</span>
      </div>
      {error && <Error message={error.message} />}
      {data && <Messages messages={data} />}
    </div>
  )
}
