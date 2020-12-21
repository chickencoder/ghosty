import { getForm } from '../lib/form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import client from '../lib/supabase'
import Div100vh from 'react-div-100vh'
import Input from '../components/input'

export default function Login() {
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
          router.push('/feed')
        }
      })
  }

  return (
    <Div100vh className="bg-white">
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold">Login</h1>
      </header>
      <main className="px-4">
        <form className="max-w-sm mx-auto" onSubmit={login}>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="space-y-16">
            <Input id="email" type="text" label="Email" required={true} />
            <Input
              id="password"
              type="password"
              label="Password"
              required={true}
            />
            <button className="fixed bottom-0 inset-x-0 w-full block bg-green-500 hover:bg-green-400 text-white text-3xl p-6">
              Log In
            </button>
          </div>
        </form>
      </main>
    </Div100vh>
  )
}
