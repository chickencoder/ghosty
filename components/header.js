import Link from 'next/link'
import Camera from './camera'
import { useState, useEffect } from 'react'

function Settings() {
  return (
    <Link href="/settings">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-8 h-8 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            stroke="currentColor"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </a>
    </Link>
  )
}

function Friends() {
  return (
    <Link href="/friends">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-8 h-8 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="white"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </a>
    </Link>
  )
}

function Overlay() {
  return (
    <div className="z-50 fixed inset-0 bg-white flex items-center justify-center">
      <span
        role="img"
        aria-label="Ghost Emoji"
        className="animate-pulse text-5xl"
      >
        👻
      </span>
    </div>
  )
}

export default function Header() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      document.body.classList.add('fixed')
    } else {
      document.body.classList.remove('fixed')
    }
    return () => {
      document.body.classList.remove('fixed')
    }
  }, [loading])

  return (
    <>
      {loading && <Overlay />}
      <header className="fixed top-0 inset-x-0 h-16 standalone:h-24 standalone:pt-safe-top px-4 bg-green-400 text-white">
        <nav className="h-full grid grid-cols-4 items-center">
          <div className="col-span-1 inline-flex items-center">
            <Camera setLoading={setLoading} />
          </div>
          <div className="col-span-2 inline-flex justify-center">
            <h1 className="text-2xl">Ghosty</h1>
          </div>
          <div class="col-span-1 inline-flex justify-end">
            <span className="flex items-center space-x-3">
              <Friends />
              <Settings />
            </span>
          </div>
        </nav>
      </header>
    </>
  )
}
