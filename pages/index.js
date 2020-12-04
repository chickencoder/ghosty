import { useClient } from '../lib/supabase'
import MessagesView from '../components/views/messages'
import LandingView from '../components/views/landing'

export default function Index() {
  const client = useClient()

  console.log(client.auth.user())

  if (client.auth.user()) {
    return <MessagesView />
  } else {
    return <LandingView />
  }
}
