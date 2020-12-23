import Link from 'next/link'
import Spacer from '../components/spacer'
import Div100vh from 'react-div-100vh'
import { useFriends } from '../hooks/friends'
import { useState, useEffect } from 'react'
import client from '../lib/supabase'
import { mutate } from 'swr'

export default function Send() {
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const { data: friends } = useFriends()

  async function addFriend(event) {
    event.preventDefault()
    const { id: friend_id } = user
    const { id: user_id } = client.auth.user()

    await client.from('friends').insert({
      id: `${user_id}_${friend_id}`,
      friend_id,
      user_id,
    })

    mutate('friends')
    setUser(null)
    setSearch('')
  }

  function checkUserExists() {
    if (!search) {
      return setUser(false)
    }

    return fetch(`/api/user-exists?u=${search.toLowerCase()}`)
      .then((data) => data.json())
      .then(({ user }) => {
        if (user) {
          setUser(user)
        }
      })
  }

  useEffect(() => {
    checkUserExists()
  }, [search])

  return (
    <Div100vh>
      <header className="fixed top-0 inset-x-0 h-16 standalone:h-24 standalone:pt-safe-top px-4 bg-green-400 text-white flex items-center">
        <div className="w-full container mx-auto grid grid-cols-4 items-center">
          <Link href="/feed">
            <a className="col-span-1 text-center border-2 border-green-500 rounded-md px-2 py-1">
              Back
            </a>
          </Link>
          <div className="col-span-2 text-center">
            <h1 className="text-2xl">Friends</h1>
          </div>
        </div>
      </header>
      <Spacer />
      <main className="p-4 bg-white">
        <div className="container mx-auto ">
          <form onSubmit={addFriend} className="mb-4">
            <div className="relative">
              <input
                id="username"
                type="text"
                className="w-full bg-gray-100 border-gray-200 focus:border-transparent border-2 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
                placeholder="Search for Friends"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {user && (
                <div className="absolute right-0 inset-y-0 flex items-center pr-2">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1 py-1 px-2 text-sm rounded bg-green-400 text-white"
                  >
                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>
          </form>
          <ul className="divide-y">
            {friends &&
              friends.map(({ friend }, index) => (
                <li key={index} className="text-lg py-2">
                  {friend?.username}
                </li>
              ))}
          </ul>
        </div>
      </main>
    </Div100vh>
  )
}
