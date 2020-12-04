import Link from 'next/link'
import cn from 'classnames'

function Message({ message }) {
  const boxClass = cn('block border-2 border-red-500 w-6 h-6 rounded', {
    'bg-red-500': !message.opened,
  })

  return (
    <Link href={`/message/${message.identifier}`}>
      <a className="w-full flex items-center space-x-4 px-4 py-3">
        <div className="flex-shrink-0">
          <span className={boxClass}></span>
        </div>
        <div>
          <span className="block text-left text-lg leading-none">
            {message.username}
          </span>
          <span className="text-gray-400 text-sm">{message.time}</span>
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
