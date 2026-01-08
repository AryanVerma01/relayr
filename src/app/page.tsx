"use client"

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'
import React from 'react'

const page = () => {
  
  const {
    data,
    isPending,
    error,
    refetch
  } = authClient.useSession();
  
  return (
    <div>
      {JSON.stringify(data)}
      {data && <div>
          <Button onClick={()=>{
            authClient.signOut()
          }}>
            Logout
          </Button> 
        </div>}  
    </div>
  )
}

export default page