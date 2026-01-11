import React from 'react'

interface PageProps {
    params : Promise<{
        executionId : string;
    }>
}

const page = async ( {params} : PageProps) => {
    
    const { executionId } = await params;

    return(
        <div> executionId : { executionId }</div>
    )
  
}

export default page