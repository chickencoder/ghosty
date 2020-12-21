import { useState } from 'react'
import { getForm } from '../lib/form'
import Input from '../components/input'
import LargeButton from '../components/large-button'

export default function SignUp() {
  const [error, setError] = useState(null)

  function signUp(e) {
    e.preventDefault()

    const formData = getForm(e.target)

    setError(null)

    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) {
          setError(error)
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <>
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold">Sign Up</h1>
      </header>
      <main className="px-4">
        <form className="max-w-sm mx-auto" onSubmit={signUp}>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="space-y-16">
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
            <LargeButton variant="purple" className="fixed bottom-0 inset-x-0">
              Sign Up
            </LargeButton>
          </div>
        </form>
      </main>
    </>
  )
}
