import Div100vh from 'react-div-100vh'
import LargeButton from '../components/large-button'
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

  const signup = useCallback(() => {
    router.push('/signup')
  })

  return (
    <Div100vh className="bg-yellow-300 flex h-full flex-col justify-between">
      <header className="text-center standalone:mt-safe-top py-20">
        <h1 className="text-7xl" aria-label="Ghosty">
          👻
        </h1>
      </header>
      <nav className="fixed bottom-0 inset-x-0">
        <ul>
          <li className="text-center">
            <LargeButton variant="green" onClick={login}>
              Login
            </LargeButton>
          </li>
          <li className="text-center">
            <LargeButton variant="purple" onClick={signup}>
              Sign Up
            </LargeButton>
          </li>
        </ul>
      </nav>
    </Div100vh>
  )
}
