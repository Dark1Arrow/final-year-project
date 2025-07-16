import React from 'react'
import Workout from "@/components/workouts/workouts"
const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6'>
      Workout Page
      <Workout/>
    </div>
  )
}

export default page
