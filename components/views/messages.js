import Header from '../../components/header'
import Messages from '../../components/messages'
import Error from '../../components/error'
import { useMessages } from '../../hooks/messages'

export default function IndexPage() {
  const { messages, error } = useMessages()

  return (
    <div className="min-h-screen">
      <Header />
      {error && <Error message={error} />}
      {messages && <Messages messages={messages} />}
    </div>
  )
}
