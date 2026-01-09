'use client'

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import React from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {

    const router = useRouter();

  return (
    <div>
    <div>
      <Button 
        variant={'destructive'}
        onClick={async()=> {
          await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login')
                }
            }
          });
        }} 
      >Logout</Button>
    </div>
    </div>
  )
}

export default Logout