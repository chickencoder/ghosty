import client from '../../lib/supabase'
import { useState, useEffect } from 'react'
import { getForm } from '../../lib/form'
import { useRouter } from 'next/router'

export default function Send() {
  const router = useRouter()
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)

  const {
    query: { id },
  } = router

  useEffect(() => {
    async function getFriends() {
      const { data: friends, error } = await client.from('friends').select(`
          users:friend_id (
            username,
            id
          )
        `)
      if (error) {
        setError(error)
      } else {
        setFriends(friends)
      }
    }
    getFriends()
  }, [])

  async function send(event) {
    event.preventDefault()
    const formData = getForm(event.target)
    const user = client.auth.user()

    const messages = Object.values(formData).map((userId) => ({
      user_from: user.id,
      user_to: userId,
      identifier: id,
    }))

    await client.from('messages').insert(messages)

    await router.push('/feed')
  }

  return (
    <>
      <header className="text-center bg-purple-400 text-white p-4">
        <h1 className="text-2xl">Send to...</h1>
      </header>
      <form onSubmit={send}>
        {friends && (
          <ul className="divide-y">
            {friends.map(({ users }, index) => (
              <li key={index}>
                <label className="flex items-center justify-between space-x-2 p-4">
                  <span className="text-xl font-bold">{users.username}</span>
                  <input id={users.username} value={users.id} type="checkbox" />
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
    </>
  )
}
