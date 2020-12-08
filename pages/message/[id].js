import { useRouter } from 'next/router'
import { useEffect } from 'react'
import client from '../../lib/supabase'

const SPACES_URL = 'https://snapchat.ams3.digitaloceanspaces.com/'

function CloseButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="absolute right-0 top-0 p-2 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}

export default function Viewer() {
  const { query } = useRouter()
  const url = SPACES_URL + query.id

  useEffect(() => {
    async function updateOpened() {
      await client
        .from('messages')
        .update({ opened_at: new Date() })
        .eq('identifier', query.id)
    }
    updateOpened()
  })

  return (
    <>
      <CloseButton />
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <img src={url} className="w-full" />
      </div>
    </>
  )
}
