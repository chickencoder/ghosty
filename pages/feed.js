import Header from '../components/header'
import Messages from '../components/messages'
import Viewer from '../components/viewer'
import Error from '../components/error'
import client from '../lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMessages } from '../hooks/messages'

const MESSAGE_TIMEOUT = 10_000

export default function IndexPage() {
  const { data, error } = useMessages()
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!client.auth.user()) {
      router.push('/')
    }
  })

  useEffect(() => {
    setMessage(router.query.message)
  }, [router.query.message])

  useEffect(() => {
    let timer
    if (message) {
      timer = setTimeout(() => {
        router.push('/feed', undefined, { shallow: true })
      }, MESSAGE_TIMEOUT)
    }
    return () => timer && clearTimeout(timer)
  }, [message])

  return (
    <>
      <div className="min-h-screen mt-16">
        <Header />
        {error && <Error message={error.message} />}
        {data && <Messages messages={data} />}
      </div>
      {message && <Viewer id={message} />}
    </>
  )
}
