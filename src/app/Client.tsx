"use client"

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const Client = () => {

    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.hello.queryOptions());

  return (
    <div>
        {JSON.stringify(users)}
    </div>
  )
}

export default Client