import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import PropTypes from 'prop-types';
import PlansTable from 'components/elements/plans/PlansTable';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { getProperlyPlanName } from 'utils/Plans';

const PlanSubscriptionHistory = ({ history }) => {
   const body = history && history.map(({
      plan, amount_date: amountDate, amount, status,
   }) => {
      return [getProperlyPlanName(plan), amountDate, amount, status];
   });
   const table = {
      head: ['Plan', 'Amount Date', 'Price', 'status'],
      body,
   };
   return (
      <SelectedWrapper hasShadow>
         <div className='planSubscriptionHistory'>
            <div className='planSubscription__header m-b-m'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='History'
               />
            </div>
            <div className='plantableContainer'>
               <PlansTable table={ table } isHistory={ true } />
            </div>
         </div>
      </SelectedWrapper>
   );
};

PlanSubscriptionHistory.propTypes = {
   history: PropTypes.array,
};

export default PlanSubscriptionHistory;
