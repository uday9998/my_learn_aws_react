import React, { useEffect, useState } from 'react';

import courses from 'assets/images/dashboard/tutorials.png';
import coursesMobile from 'assets/images/dashboard/tutorials__mobile.png';

import './index.scss';


const DashboardTutorials = () => {
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

   const handleNavigate = () => {
      window.open('https://support.miestro.com/', '_blank');
   };

   return (
      <div className='welcomeDashboardTutorials__content__img' onClick={ handleNavigate } role='presentation'>
         <img src={ isMobile ? coursesMobile : courses } alt='courses' />
      </div>
   );
};

DashboardTutorials.propTypes = {

};

export default DashboardTutorials;