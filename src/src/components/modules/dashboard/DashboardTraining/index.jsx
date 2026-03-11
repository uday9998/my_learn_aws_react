import React, { useEffect, useState } from 'react';
import Text, { TYPES as types } from 'components/elements/TextNew';

import training from 'assets/images/dashboard/training.png';
import trainingMobile from 'assets/images/dashboard/education__mobile.png';

import './index.scss';

const DashboardTraining = () => {
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
      <>
         {/* {
            !isMobile && (
               <Text
                  inner='Education'
                  type={ types.medium }
                  style={ {
                     color: '#131F1E',
                  } }
               />
            )
         } */}
         <div className='welcomeDashboardTraining' onClick={ () => window.open('https://miestrouniversity.miestro.com/admin', '_blank') } role='presentation'>
            <img src={ isMobile ? trainingMobile : training } alt='training' />
         </div>
      </>
   );
};

DashboardTraining.propTypes = {

};

export default DashboardTraining;
