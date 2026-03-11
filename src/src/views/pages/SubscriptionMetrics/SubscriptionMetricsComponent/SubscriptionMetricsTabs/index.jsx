import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';

const SubscriptionMetricsTabs = ({ isMrr, onChange }) => {
   return (
      <div className='subscription-metric-tabs'>
         <div role='presentation' onClick={ () => onChange() } className={ `subscription-metric-tabs-item ${ isMrr ? 'subscription-metric-tabs-item-active' : '' }` }>
            <Text
               inner='MRR'
               type={ txtTypes.regularLarge }
               size={ txtSizes.xsmall }
            />
         </div>
         <div role='presentation' onClick={ () => onChange() } className={ `subscription-metric-tabs-item ${ !isMrr ? 'subscription-metric-tabs-item-active purple-color' : '' }` }>
            <Text
               inner='Churn Rate'
               type={ txtTypes.regularLarge }
               size={ txtSizes.xsmall }
            />
         </div>
      </div>
   );
};


SubscriptionMetricsTabs.propTypes = {
   isMrr: PropTypes.bool,
   onChange: PropTypes.func,
};

export default SubscriptionMetricsTabs;
