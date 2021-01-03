import { useEffect } from 'react'
import client from '../lib/supabase'
import Div100vh from 'react-div-100vh'
import Image from 'next/image'

export default function Viewer({ id }) {
  const url = `https://snapchat.ams3.digitaloceanspaces.com/${id}`

  async function recordView() {
    const { id: userId } = client.auth.user()
    await client
      .from('messages')
      .update({ opened_at: new Date() })
      .eq('identifier', id)
      .eq('user_to', userId)
  }

  useEffect(() => {
    // recordView()
  }, [])

  return (
    <>
      <div className="z-10 fixed inset-0">
        <Div100vh className="bg-black">
          <div className="animate-loader absolute z-10 top-0 left-0 right-0 float-right bg-white h-1 standalone:mt-safe-top" />
          <div className="h-full flex items-center justify-center align-center">
            <Image
              src={url}
              quality={40}
              priority={true}
              width={300}
              height={400}
              className="w-full"
            />
          </div>
        </Div100vh>
        <div className="fixed bottom-0 inset-x-0 bg-red h-64" />
      </div>
    </>
  )
}
