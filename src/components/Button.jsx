import React from 'react'

function Button({
    children,
    type ='button',
    bgColor='bg-blue-400 ',
    textColor ='text-white ',
    calssName = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg  ${textColor} ${bgColor} ${calssName}`}{...props}>
        {children}
    </button>
  )
}

export default Button