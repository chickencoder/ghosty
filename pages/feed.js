import Header from '../components/header'
import Messages from '../components/messages'
import Viewer from '../components/viewer'
import Error from '../components/error'
import Spacer from '../components/spacer'
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
    if (message) {
      document.body.classList.add('fixed')
    } else {
      document.body.classList.remove('fixed')
    }
  }, [message])

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
    <div className="min-h-screen bg-gray-200">
      <Header />
      <Spacer />
      {error && <Error message={error.message} />}
      {data && <Messages messages={data} />}
      {message && <Viewer id={message} />}
      {!data && (
        <div className="bg-white text-gray-500 p-4 text-center">
          Time to send some pics! 👻
        </div>
      )}
    </div>
  )
}
