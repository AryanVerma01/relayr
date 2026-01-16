import React from 'react'
import AppHeader from '@/components/appheader'

const layout = ({children}: {
    children : React.ReactNode
}) => {
  return (
    <>
        <AppHeader/>
        <main className='flex-1'>
            {children}
        </main>
    </>
  )
}

export default layout