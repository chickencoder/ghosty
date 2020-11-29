import Header from '../components/header'
import SnapList from '../components/snaplist'
import { useClient } from '../hooks/supabase'
import { useState, useEffect } from 'react'

const snaps = [
  {
    opened: false,
    username: 'wilusfe',
    time: '10 minutes ago',
  },
  {
    opened: true,
    username: 'snappingjack',
    time: '2 hours ago',
  },
]

export default function IndexPage() {
  const [error, setError] = useState(null)
  const [snaps, setSnaps] = useState(null)
  const client = useClient()

  useEffect(() => {
    async function fetchSnaps() {
      let { data: snaps, error } = await client
        .from('snap')
        .select(
          `
          image_url,
          sent_at,
          from_account (
            username
          )
        `
        )
        .range(0, 25)

      if (error) {
        setError(error)
      } else {
        setSnaps(
          snaps.map((snap) => ({
            username: snap.from_account.username,
            viewed: false,
            time: '2 hours ago',
          }))
        )
      }
    }
    fetchSnaps()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {snaps && <SnapList snaps={snaps} />}
    </div>
  )
}
