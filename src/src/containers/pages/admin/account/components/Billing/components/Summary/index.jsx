import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { PLANS__DATA } from 'constants/pricing';
import { getPlanType, getSummaryKey, getConstantData } from 'utils/pricing';
import { mainAppSelector } from 'state/modules/common/selectors';


import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const Summary = ({
   plans,
   priceData,
}) => {
   const [planData, setPlanData] = useState({});
   const mainApp = useSelector(mainAppSelector);
   const [smummaryTextKey, setSummaryTextKey] = useState('');

   useEffect(() => {
      if (priceData && Object.keys(priceData).length > 0) {
         // Use the already computed priceData from parent component
         setPlanData(priceData);
      } else if (plans.currentSubscription) {
         // Fallback: Use the same logic as the main billing section to ensure consistency
         const constantData = getConstantData(mainApp.plan_name, plans, null);
         setPlanData(getPlanType(constantData, mainApp));
      } else {
         setSummaryTextKey(getSummaryKey(mainApp));
      }
   }, [plans, mainApp, priceData]);

   return (
      <div className='summary__wrapper'>
         <div className='summary__header'>
            <Text 
               inner='Summary'
               size={ sizes.large }
               type={ types.bold }
               style={ {
                  color: '#fff',
               } }
            />
         </div>
         <div className='summary__info__wrapper'>
            <div className='top__section__wrapper'>
               <div className='title__wrapper'>
                  <Text 
                     inner={ `Miestro ${ planData.title ? planData.title : smummaryTextKey.title } Plan` }
                     size={ sizes.large }
                     type={ types.bold }
                     style={ {
                        color: '#3060BD',
                     } }
                  />
               </div>
               {/* {
                  planData.summaryPrice && (
                     <div className='right__widget__wrapper'>
                        <Text 
                           inner={ planData.summaryPrice?.includes('$') ? planData.summaryPrice : `$${ planData.summaryPrice }` }
                           type={ types.bold }
                           size={ sizes.xsmall }
                           style={ {
                              color: '#36796F',
                           } }
                        />
                     </div>
                  )
               } */}
            </div>
            <div className='summary__texts__wrapper'>
               {
                  PLANS__DATA[smummaryTextKey.key || planData.summaryTextsKey]?.texts.map((text, i) => {
                     return (
                        <div key={ i } className='texts__wrapper'>
                           <div
                              className='icon'
                              id={ i + 1 === PLANS__DATA[smummaryTextKey.key || planData.summaryTextsKey].texts.length ? 'last__icon' : '' }
                              style={ {
                                 background: PLANS__DATA[smummaryTextKey.key || planData.summaryTextsKey].iconColor,
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
      </div>
   );
};

Summary.propTypes = {
   plans: PropTypes.object,
   priceData: PropTypes.object,
};

export default Summary;