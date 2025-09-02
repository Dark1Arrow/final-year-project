import React from 'react'

const HeroSection = () => {
    return (
        <div>
            <section className="relative bg-gray-50 min-h-[90vh] flex items-center">
                <div className="bg-[#000000] absolute top-0 left-0 h-[100%] w-[100%] z-0 overflow-hidden ">
                    <div className="absolute left-[20%] bottom-[-70%] w-[1500px] h-[1500px] bg-[#171717] rounded-full flex items-center justify-center">
                        {/* Second Circle */}
                        <div className="w-[1000px] h-[1000px] bg-[#343434] rounded-full flex items-center justify-center">
                            {/* Third Circle */}
                            <div className="w-[500px] h-[500px] bg-[#686868] rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-[5%] right-[5%] h-[100%] boarder border-2 z-1 max-w-[90%] px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center text-left">

                    {/* Left Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[white]">
                            Nutrition tracking
                            for <span className="text-green-500">Real life</span> Starts Here
                        </h1>
                        <p className="text-[white] mt-4 text-lg">
                            Make progress with the all-in-one food, exercise, and calorie tracker.
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <a
                                href="/how-it-works"
                                className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="hidden md:flex justify-center">
                        <img
                            src="https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Flogged-out-v2%2Fhero-phone-large.png&w=512&q=75"
                            alt="Fitness Illustration"
                            className="w-[150px] md:w-[150px]"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection
