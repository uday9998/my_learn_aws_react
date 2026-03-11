import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { priceInitialData } from 'constants/pricing';
import { getPriceType } from 'utils/pricing';

import leftBackgroundImage from 'assets/images/pricing/left__background__image.png';
import rightBackgroundImage from 'assets/images/pricing/right__background__image.png';
import PricingTop from './components/PricingTop';
import PricingCards from './components/PricingCards';
import PricingFeatures from './components/PricingFeatures';

import './index.scss';

const PricingList = ({
   plans,
   currency,
   handleChangePlanType,
}) => {
   const [type, setType] = useState('monthly');
   const location = useLocation();
   const [pricingCardData, setPricingCardData] = useState(priceInitialData);

   const handleChangeType = (type) => {
      setType(type);
      handleChangePlanType(type);

      setPricingCardData(prevState => {
         return getPriceType(prevState, type);
      });
   };

   useEffect(() => {
      const adminContent = document.querySelector('.adminContent');
      if (location.pathname.includes('account')) {
         adminContent.style.background = '#fff';
         adminContent.style.height = 'auto';
         adminContent.style.maxWidth = '100%';
      }

      return () => {
         // adminContent.style.height = 'calc(100% + 0px)';
         adminContent.style.visibility = 'visible';
         adminContent.style.background = '#F4F7F7';
         adminContent.style.maxWidth = '1440px';
         adminContent.style.paddingBottom = '50px';
      };
   }, []);

   return (
      <div
         style={ {
            backgroundImage: `url(${ rightBackgroundImage }), url(${ leftBackgroundImage })`,
            backgroundPosition: 'calc(91%) 14%, 104px 280px', 
            backgroundRepeat: 'no-repeat, no-repeat',
         } }
         className='pricing_list_wrapper'>
         <PricingTop
            type={ type }
            handleChangeType={ handleChangeType }
         />
         <PricingCards currency={ currency } type={ type } pricingCardData={ pricingCardData } plans={ plans } />
         <PricingFeatures currency={ currency } plans={ plans } handleChangeType={ handleChangeType } type={ type } />
      </div>
   );
};

PricingList.propTypes = {
   plans: PropTypes.object,
   currency: PropTypes.object,
   handleChangePlanType: PropTypes.func,
};

export default PricingList;