import classnames from 'classnames'

export default function LargeButton({
  children,
  variant = 'green',
  className = '',
}) {
  const variants = {
    green: 'bg-green-500 hover:bg-green-400',
    purple: 'bg-purple-500 hover:bg-purple-500',
  }
  const classes = classnames(
    'inset-x-0 w-full block text-white text-3xl p-6',
    variants[variant],
    className
  )
  return <button className={classes}>{children}</button>
}
