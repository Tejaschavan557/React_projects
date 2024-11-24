import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl x-auto px-4'>
        {children}
        </div>
  )
}

export default Container