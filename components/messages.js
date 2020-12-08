import Link from 'next/link'
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
  const { identifier, opened, type, to, from, time } = message
  const boxClass = cn('block border-2 border-red-500 w-6 h-6 rounded', {
    'bg-red-500': !opened,
  })

  return (
    <Link href={`/message/${identifier}`}>
      <a className="w-full flex items-center space-x-4 px-4 py-3">
        <div className="flex-shrink-0">
          {type === 'sent' ? (
            <SentIcon opened={opened} />
          ) : (
            <span className={boxClass}></span>
          )}
        </div>
        <div>
          <span className="block text-left text-lg leading-none">
            {type === 'received' ? from.username : to.username}
          </span>
          <span className="text-gray-400 text-sm">{time}</span>
        </div>
      </a>
    </Link>
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
