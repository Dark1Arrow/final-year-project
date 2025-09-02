import React from 'react'

const stepsSection = () => {
    return (
        <div>
            <section className="m-20">
                <h2 className=' mb-20 text-4xl font-bold text-[#211334]'>How It Works</h2>

                <div className="grid md:grid-cols-2 gap-8 ml-32 mr-32">
                    {/* Step 1 – Full width */}
                    <div className="md:col-span-2 bg-gray-100 rounded-xl flex flex-col md:flex-row justify-between pl-20 pr-20 items-center">
                        <img src="https://www.fittr.com/static-content/tailor_made_plans_326e72bd7f.webp" alt="Step 1" className="w-40 md:w-[500px] mb-4 md:mb-0 md:mr-6" />
                        <div className='w-[50%]'>
                            <h3 className="text-3xl font-bold mb-2">Step 1: Start with a Quiz</h3>
                            <p className="text-[#404040] text-lg font-semibold">
                                We ask simple questions about your lifestyle, body, and fitness goals. Our plans are made for your individual needs.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className=" text-center bg-gray-100 rounded-xl flex flex-col-reverse justify-between p-20 items-center">
                        <img src="https://www.fittr.com/static-content/sustainable_habits_124af7fc55.webp" alt="Step 2" className="w-40 md:w-[500px] mb-4 md:mb-0 md:mr-6" />
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Step 2: Personalized Plan is Generated</h3>
                            <p className="text-[#404040] text-lg font-semibold">
                                Get your unique workout + diet plan based on your answers — no guesswork.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center bg-gray-100 rounded-xl flex flex-col-reverse justify-between p-20 items-center">
                        <img src="https://www.fittr.com/static-content/sustainable_habits_124af7fc55.webp" alt="Step 3" className="w-[500px]md:w-56 mb-4 md:mb-0 md:mr-6" />
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Step 3: Track Daily Habits</h3>
                            <p className="text-[#404040] text-lg font-semibold">
                                Log your water, sleep, steps and stay on track every day with reminders.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 – Full width */}
                    <div className="md:col-span-2 bg-gray-100 rounded-xl flex flex-col md:flex-row-reverse justify-between pl-20 pr-20 items-center">
                        <img src="https://www.fittr.com/static-content/tailor_made_plans_326e72bd7f.webp" alt="Step 1" className="w-40 md:w-[500px] mb-4 md:mb-0 md:mr-6" />
                        <div className='w-[50%]'>
                            <h3 className="text-3xl font-bold mb-2">Step 4: See Your Progress </h3>
                            <p className="text-[#404040] text-lg font-semibold">We ask simple questions about your lifestyle, body, and fitness goals.their nutrition and training plans won’t work for you either. Our plans are made for your individual needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default stepsSection
