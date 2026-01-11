import React from 'react'

interface PageProps{ 
    params : Promise<{
        workflowId : string
    }>
}

const page = async ({params} : PageProps) => {

    const { workflowId } = await params;

  return (
    <div>workFlowId : { workflowId }</div>
  )
}

export default page