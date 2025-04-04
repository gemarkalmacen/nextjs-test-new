import React from 'react'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const Dashboard = async () => {
    const session = await getServerSession(authOptions)
    console.log("SESSION", session)
    console.log("LASTNAME", session?.user?.profile?.primary_information.first_name)
  return (
    <div>Dashboard {session?.user?.profile?.primary_information?.first_name}l</div>
  )
}

export default Dashboard