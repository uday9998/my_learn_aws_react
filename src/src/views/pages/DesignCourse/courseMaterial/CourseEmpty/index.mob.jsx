import React from 'react';
import './index.mob.scss';
import AddFirstSection from 'components/modules/designCourse/courseMaterial/AddFirstSection';
import AddSectionTutorial from 'components/modules/designCourse/courseMaterial/AddSectionTutorial';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const CourseEmpty = () => {
   return (
      <div className='mob-courseEmpty'>
         <AddFirstSection />
         <div className='m-t-exl'>
            <AddSectionTutorial />
         </div>
         <div className='m-t-m'>
            <BaseButton
               theme={ btnType.darkGreen }
               size={ btnSize.full }
               text='Save Class'
            />
         </div>
         <div className='m-t-m'>
            <BaseButton
               theme={ btnType.grey }
               size={ btnSize.full }
               text='Preview'
            />
         </div>
      </div>
   );
};

export default CourseEmpty;
