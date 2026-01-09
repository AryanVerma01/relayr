import RegisterForm from '@/features/auth/registerForm'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

const page = async () => {

   await requireUnauth(); 

  return <RegisterForm/>
  
}

export default page