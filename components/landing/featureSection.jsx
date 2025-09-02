import React from 'react'
import { featureData } from "@/constants/landing/data"

const featureSection = () => {
  return (
    <div>
      <h2 className='m-20 text-4xl font-bold text-[#211334]'>{featureData.heading}</h2>
      <div className='flex flex-col gap-20'>
        {featureData.cards.map((data, index) => (
          <section key={index}
            className="relative h-[80vh] ml-20 mr-20 rounded-3xl bg-cover bg-center text-white"
              style={{ backgroundImage: `url(${data.bgImage})` }}
          >

            <div className="absolute z-10 text-left left-20 bottom-30 w-[40%] flex flex-col gap-3">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h2>
              <p className="text-lg text-[#F0F0F0] md:text-xl mb-6 ">{data.description}</p>
              <div><a
                href="/how-it-works"
                className="px-8 py-3 bg-[#FFFFFF] text-[#211334] text-lg font-medium rounded-full shadow hover:bg-green-700 transition"
              >
                Get Started
              </a></div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default featureSection
