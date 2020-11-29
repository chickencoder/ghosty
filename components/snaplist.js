import cn from 'classnames'

function Snap({ snap }) {
  const boxClass = cn('block border-2 border-red-500 w-6 h-6 rounded', {
    'bg-red-500': !snap.opened,
  })
  return (
    <article className="flex items-center space-x-4 px-4 py-3">
      <aside className="flex-shrink-0">
        <span className={boxClass}></span>
      </aside>
      <section>
        <h2 className="text-lg leading-none">{snap.username}</h2>
        <span className="text-gray-400 text-sm">{snap.time}</span>
      </section>
    </article>
  )
}

export default function SnapList({ snaps }) {
  console.log(snaps)
  return (
    <div className="rounded-md-t bg-white">
      <ul className="divide-y">
        {snaps.map((snap, index) => (
          <li key={index}>
            <Snap snap={snap} />
          </li>
        ))}
      </ul>
    </div>
  )
}
