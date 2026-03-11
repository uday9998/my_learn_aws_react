import React, { useEffect, useState } from 'react';

import onboardingCallImage from 'assets/images/dashboard/onboardingcall.png';
import bannerMobile from 'assets/images/dashboard/mobile__banner.png';

const OnboardingCall = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 678);

   const handleResize = () => {
      setIsMobile(window.innerWidth < 678);
   };

   useEffect(() => {
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className='welcomeDashboardTraining'>
         <img src={ isMobile ? bannerMobile : onboardingCallImage } alt='training' />
      </div>
   );
};

export default OnboardingCall;