import { useEffect } from 'react'
import client from '../lib/supabase'

export default function Viewer({ id }) {
  const url = `https://snapchat.ams3.digitaloceanspaces.com/${id}`

  async function recordView() {
    await client
      .from('messages')
      .update({ opened_at: new Date() })
      .eq('identifier', id)
  }

  useEffect(() => {
    recordView()
  }, [])

  return (
    <>
      <div className="animate-loader absolute z-10 top-0 left-0 right-0 float-right bg-white h-1" />
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <img src={url} className="w-full" />
      </div>
    </>
  )
}
