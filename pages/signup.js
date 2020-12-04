import { useState } from 'react'
import { getForm } from '../lib/form'

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
          <div className="space-y-8">
            <label className="block">
              <span>Username</span>
              <input
                required={true}
                id="username"
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-400"
                placeholder=""
              ></input>
            </label>
            <label className="block">
              <span>Email</span>
              <input
                required={true}
                id="email"
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-400"
                placeholder=""
              ></input>
            </label>
            <label className="block">
              <span>Password</span>
              <input
                required={true}
                id="password"
                type="password"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-400"
                placeholder=""
              ></input>
            </label>
            <button className="fixed bottom-0 inset-x-0 w-full block bg-purple-500 hover:bg-purple-400 text-white text-2xl p-4">
              Sign Up
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
