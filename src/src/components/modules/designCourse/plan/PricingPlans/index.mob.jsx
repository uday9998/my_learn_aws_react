import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import PlansTable from 'components/elements/designCourse/plan/PlansTable';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';


const PricingPlans = ({ plans, checkedId }) => {
   return (
      <ItemWrapper>
         <div className='mob-pricingPlans'>
            <div>
               <div className='w-full flex justify-start'>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.normal }
                     inner='PRICING PLANS'
                  />
               </div>
               {
                  plans.map(plan => (
                     <div className='w-full m-t-m'>
                        <PlansTable
                           plans={ [plan] }
                           checkedId={ checkedId }
                        />
                     </div>
                  ))
               }
            </div>
            <div className='w-full flex align-center justify-end m-t-exl'>
               <BaseButton
                  theme={ buttonTheme.blueBordered }
                  size={ buttonSizes.full }
                  text='Add Plan'
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

PricingPlans.propTypes = {
   plans: PropTypes.array,
   checkedId: PropTypes.number,
};

export default PricingPlans;
