import { getForm } from '../lib/form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useClient } from '../hooks/supabase'

export default function Login() {
  const client = useClient()

  const [error, setError] = useState(null)
  const router = useRouter()

  function login(event) {
    event.preventDefault()
    setError(null)

    const { email, password } = getForm(event.target)

    client.auth
      .signIn({
        email,
        password,
      })
      .then(({ error }) => {
        if (error) {
          setError(error.message)
        } else {
          router.push('/snaps')
        }
      })
  }

  return (
    <>
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold">Login</h1>
      </header>
      <main className="px-4">
        <form className="max-w-sm mx-auto" onSubmit={login}>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="space-y-8">
            <label className="block">
              <span>Email</span>
              <input
                id="email"
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-400"
                placeholder=""
                required={true}
              ></input>
            </label>
            <label className="block">
              <span>Password</span>
              <input
                id="password"
                type="password"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-400"
                placeholder=""
                required={true}
              ></input>
            </label>
            <button className="fixed bottom-0 inset-x-0 w-full block bg-green-500 hover:bg-green-400 text-white text-2xl p-4">
              Log In
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
