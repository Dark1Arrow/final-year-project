import React from 'react'
import HeroSection from "./heroSection"
import FeatureSection from "./featureSection"
import StepsSection from "./stepsSection"
import Faq from "./faq"

const landing = () => {
    return (
        <div className=''>
            <HeroSection />
            <FeatureSection/>
            <StepsSection/>
            <Faq/>
        </div>
    )
}

export default landing
