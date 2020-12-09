import client from '../lib/supabase'
import { useRouter } from 'next/router'

function Back() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  )
}

export default function Settings() {
  const router = useRouter()

  function logout() {
    client.auth.signOut()
    router.push('/')
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 h-16 px-4 bg-green-400 text-white">
        <nav className="h-full flex items-center justify-between">
          <Back />
          <h1 className="text-2xl">Settings</h1>
          <span className="w-6" />
        </nav>
      </header>
      <main className="mt-16 p-4">
        <button
          onClick={logout}
          className="w-full bg-gray-100 rounded-md text-xl text-red-500 px-2 py-3"
        >
          Log Out
        </button>
      </main>
    </>
  )
}
