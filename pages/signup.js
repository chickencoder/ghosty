import { useState } from 'react'
import { getForm } from '../lib/form'
import client from '../lib/supabase'
import Input from '../components/input'
import LargeButton from '../components/large-button'
import Div100vh from 'react-div-100vh'
import { useRouter } from 'next/router'

export default function SignUp() {
  const [error, setError] = useState(null)
  const router = useRouter()

  async function signUp(e) {
    e.preventDefault()
    setError(null)

    const formData = getForm(e.target)

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { error } = await response.json()
    if (error) {
      return setError(error)
    }

    const { email, password } = formData
    await client.auth.signIn({
      email,
      password,
    })

    router.push('/feed')
  }

  return (
    <>
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold">Sign Up</h1>
      </header>
      <main>
        <Div100vh>
          <form onSubmit={signUp}>
            <div className="max-w-sm mx-auto mb-16">
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <div className="space-y-16 px-4">
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  variant="purple"
                  required={true}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  variant="purple"
                  required={true}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  variant="purple"
                  required={true}
                />
              </div>
            </div>
            <LargeButton variant="purple" className="fixed bottom-0">
              Sign Up
            </LargeButton>
          </form>
        </Div100vh>
      </main>
    </>
  )
}
