import React from 'react'
import HeroSection from "./heroSection"
import FeatureSection from "./featureSection"
import StepsSection from "./stepsSection"
import Reserch from "./reserch"
import Faq from "./faq"
import Join from "./join"

const landing = () => {
    return (
        <div className=''>
            <HeroSection />
            <FeatureSection/>
            <StepsSection/>
            <Reserch/>
            <Faq/>
            <Join/>
        </div>
    )
}

export default landing
