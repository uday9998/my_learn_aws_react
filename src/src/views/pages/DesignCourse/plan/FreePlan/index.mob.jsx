import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import PricingPlans from 'components/modules/designCourse/plan/PricingPlans/index.mob';

const FreePlan = ({ plans, checkedId }) => {
   return (
      <div className='mob-freePlan'>
         <PricingPlans
            plans={ plans }
            checkedId={ checkedId }
         />
      </div>
   );
};

export default FreePlan;

FreePlan.propTypes = {
   plans: PropTypes.array,
   checkedId: PropTypes.number,
};
