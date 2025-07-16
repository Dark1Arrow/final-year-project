import React from 'react'
import Dashboard from "@/components/dashboard/dashboard"

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6'>
      Dashboard Page
      <Dashboard/>
    </div>
  )
}

export default page
