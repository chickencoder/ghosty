import classnames from 'classnames'

export default function LargeButton({
  children,
  variant = 'green',
  className = '',
  ...props
}) {
  const variants = {
    green: 'bg-green-400 hover:bg-green-300',
    purple: 'bg-purple-500 hover:bg-purple-400',
  }
  const classes = classnames(
    'inset-x-0 w-full block text-white text-3xl p-6',
    variants[variant],
    className
  )
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
