import client from '../../lib/supabase'
import { getForm } from '../../lib/form'
import { useRouter } from 'next/router'
import Spacer from '../../components/spacer'
import Error from '../../components/error'
import { useFriends } from '../../hooks/friends'

export default function Send() {
  const { data: friends, error } = useFriends()
  const router = useRouter()

  const {
    query: { id },
  } = router

  async function send(event) {
    event.preventDefault()
    const formData = getForm(event.target)
    const user = client.auth.user()

    const messages = Object.values(formData).map((userId) => ({
      user_from: user.id,
      user_to: userId,
      identifier: id,
    }))

    try {
      await client.from('messages').insert(messages)
    } catch (error) {
      setError(error.message)
    }

    await router.push('/feed')
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 h-16 standalone:h-24 standalone:pt-safe-top px-4 bg-purple-400 text-white flex items-center justify-center">
        <h1 className="text-2xl">Send to...</h1>
      </header>
      <Spacer />
      <main>
        {error && <Error message={error} />}
        <form onSubmit={send}>
          {friends && (
            <ul className="divide-y">
              {friends.map(({ friend }, index) => (
                <li key={index}>
                  <label className="flex items-center justify-between space-x-2 p-4">
                    <span className="text-xl font-bold">{friend.username}</span>
                    <input
                      id={friend.username}
                      value={friend.id}
                      type="checkbox"
                    />
                  </label>
                </li>
              ))}
            </ul>
          )}
          <footer className="fixed bottom-0 inset-x-0">
            <button
              type="submit"
              className="block p-4 w-full text-2xl bg-purple-400 text-white"
            >
              Send
            </button>
          </footer>
        </form>
      </main>
    </>
  )
}
