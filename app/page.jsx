import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


export default function page() {
  const login = 10;
  
  if(login) redirect("/name/?");
  return (
    <>
      
    </>
  )
}
