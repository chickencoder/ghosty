import Link from 'next/link'
import FullScreen from 'react-div-100vh'
import client from '../lib/supabase'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const login = useCallback(() => {
    if (client.auth.user()) {
      router.push('/feed')
    } else {
      router.push('/login')
    }
  })

  return (
    <FullScreen className="bg-white flex flex-col justify-between">
      <header className="text-center py-20">
        <h1 className="text-7xl">👻</h1>
      </header>
      <nav className="fixed bottom-0 inset-x-0">
        <ul>
          <li className="text-center">
            <button
              href="#"
              className="w-full block p-6 bg-purple-500 text-3xl text-white"
              onClick={login}
            >
              Login
            </button>
          </li>
          <li className="text-center">
            <Link href="/signup">
              <a
                href="#"
                className="block pb-8 p-6 bg-green-500 text-3xl text-white"
              >
                Sign Up
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </FullScreen>
  )
}
