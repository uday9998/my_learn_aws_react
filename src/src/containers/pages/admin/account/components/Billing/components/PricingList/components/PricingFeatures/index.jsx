import React from 'react';
import PropTypes from 'prop-types';

import { featuresLimits } from 'constants/pricing';

import FeaturesTop from './components/FeaturesTop';
import FeaturesLimits from './components/FeaturesLimits';

import './index.scss';

const PricingFeatures = ({
   type,
   handleChangeType,
   plans,
   currency,
}) => {
   return (
      <div className='list__wrapper'>
         <FeaturesTop currency={ currency } plans={ plans } handleChangeType={ handleChangeType } type={ type } />
         {
            featuresLimits.map(limit => {
               return <FeaturesLimits limitData={ limit } />;
            })
         }
      </div>
   );
};

PricingFeatures.propTypes = {
   type: PropTypes.string,
   handleChangeType: PropTypes.func,
   plans: PropTypes.object,
   currency: PropTypes.object,
};

export default PricingFeatures;