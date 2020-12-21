import Link from 'next/link'
import Div100vh from 'react-div-100vh'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import client from '../lib/supabase'

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
    <Div100vh className="bg-yellow-300 flex h-full flex-col justify-between ">
      <header className="text-center standalone:pt-safe-top py-20 ">
        <h1 className="text-7xl" aria-label="Ghosty">
          👻
        </h1>
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
    </Div100vh>
  )
}
