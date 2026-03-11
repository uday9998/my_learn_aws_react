import React from 'react';
import PropTypes from 'prop-types';
import { PLANS__DATA } from 'constants/pricing';
import { getPlanType } from 'utils/pricing';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const SummaryMobile = ({
   plans,
}) => {
   const planData = getPlanType(plans);

   return (
      <div className='summary__mobile__wrapper'>
         <div className='top__wrapper'>
            <Text 
               inner='Miestro Starter Plan'
               size={ sizes.large }
               type={ types.bold700 }
               style={ {
                  color: '#3060BD',
               } }
            />
            <div className='price__type'>
               <span>Free Plan</span>
            </div>
         </div>
         <div className='summary__texts__wrapper'>
            {
               PLANS__DATA[planData.summaryTextsKey]?.texts.map((text, i) => {
                  return (
                     <div key={ i } className='texts__wrapper'>
                        <div
                           className='icon'
                           style={ {
                              background: PLANS__DATA[planData.summaryTextsKey].iconColor,
                           } } />
                        <Text 
                           inner={ text }
                           size={ sizes.small14_500 }
                        />
                     </div>
                  );
               })
            }
         </div>
      </div>
   );
};

SummaryMobile.propTypes = {
   plans: PropTypes.object,
};

export default SummaryMobile;