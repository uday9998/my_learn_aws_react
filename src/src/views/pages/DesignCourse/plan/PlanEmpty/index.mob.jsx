import React from 'react';
import './index.mob.scss';
import AddFirstPlan from 'components/modules/designCourse/plan/AddFirstPlan';
import AddPlanTutorial from 'components/modules/designCourse/plan/AddPlanTutorial';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const PlanEmpty = () => {
   return (
      <div className='mob-planEmpty'>
         <AddFirstPlan />
         <div className='m-t-exl'>
            <AddPlanTutorial />
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

export default PlanEmpty;
