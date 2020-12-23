import { useRouter } from 'next/router'
import Repeatable from 'react-repeatable'
import client from '../lib/supabase'
import cn from 'classnames'

function SentIcon({ opened = false }) {
  return (
    <span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={opened ? 'none' : 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        className="text-red-500 w-6 h-6"
      >
        <path
          d="M6 12L3 21L21 12L3 3L6 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function Message({ message }) {
  const router = useRouter()
  const { identifier, opened, type, to, from, time } = message
  const user = client.auth.user()

  const boxClass = cn('block border-2 border-red-500 w-6 h-6 rounded', {
    'bg-red-500': !opened,
  })

  function openMessage() {
    if (!opened && to.id === user.id) {
      router.push(`/feed?message=${identifier}`, undefined, {
        shallow: true,
        scroll: false,
      })
    }
  }

  function closeMessage() {
    router.push('/feed')
  }

  return (
    <Repeatable
      tag="button"
      type="button"
      onPress={(e) => {
        e.preventDefault()
        openMessage()
      }}
      onRelease={(e) => {
        e.preventDefault()
        closeMessage()
      }}
      className="w-full flex items-center space-x-4 px-4 py-3"
    >
      <div className="flex-shrink-0">
        {type === 'sent' && user.id !== to.id ? (
          <SentIcon opened={opened} />
        ) : (
          <span className={boxClass}></span>
        )}
      </div>
      <div>
        <span className="block text-left text-lg leading-none">
          {type === 'received' ? from.username : to.username}
        </span>
        <span className="text-gray-400 text-sm">
          {(type === 'received' || user.id === to.id) && !opened
            ? 'Tap and hold to view'
            : time}
        </span>
      </div>
    </Repeatable>
  )
}

export default function Messages({ messages }) {
  return (
    <div className="rounded-md-t bg-white">
      <ul className="divide-y">
        {messages.map((map, index) => (
          <li key={index}>
            <Message message={map} />
          </li>
        ))}
      </ul>
    </div>
  )
}
