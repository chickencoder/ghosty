import classnames from 'classnames'

export default function Input({
  label,
  variant = 'green',
  className,
  ...props
}) {
  const variants = {
    green: 'focus:border-green-400',
    purple: 'focus:border-purple-400',
  }
  const classes = classnames(
    'mt-0 block mx-auto px-0.5 border-0 border-b-2 border-gray-200 text-gray-800 border-dashed focus:ring-0 text-center text-2xl',
    variants[variant],
    className
  )
  return (
    <label className="block text-center">
      <span className="block text-lg text-gray-500 mb-1">{label}</span>
      <input {...props} className={classes} />
    </label>
  )
}
