import React from 'react'

const Layout = ({children} : {
    children : React.ReactNode
}) => {

  return (
    <div className='flex h-screen w-full'>
        <div className='mx-auto my-auto min-w-80 border border-neutral-700 py-3 rounded-xl'>
            {children}
        </div>
    </div>
  )
}

export default Layout