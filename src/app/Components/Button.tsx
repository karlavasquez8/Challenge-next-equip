import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  type?: 'submit' | 'button'
}>

const Button = ({ children, type = 'submit' }: ButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 px-4 rounded bg-fuchsia-800 hover:bg-fuchsia-900"
    >
      {children}
    </button>
  )
}

export default Button
