import Link from 'next/link'
import Div100vh from 'react-div-100vh'

export default function Index() {
  return (
    <Div100vh className="bg-yellow-300 flex h-full flex-col justify-between ">
      <header className="text-center standalone:pt-safe-top py-20 ">
        <h1 className="text-7xl" aria-label="Ghosty">
          👻
        </h1>
      </header>
      <nav>
        <ul>
          <li className="text-center">
            <Link href="/login">
              <a
                href="#"
                className="block p-6 bg-purple-500 text-3xl text-white"
              >
                Login
              </a>
            </Link>
          </li>
          <li className="text-center">
            <Link href="/signup">
              <a
                href="#"
                className="block p-6 bg-green-500 text-3xl text-white"
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
