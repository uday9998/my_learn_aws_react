import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import TrackingPageRight from './components/trackingRight';

const PlanTrackingPage = ({ plan: { setting }, onChange }) => {
   const settings = [
      {
         title: 'Header Code',
         description: 'Add custom code in the header of each checkout page',
         value: setting.header_script,
         name: 'header_script',
         placeholder: 'header',
      },
      {
         title: 'Body Code',
         description: 'Add custom code within the body of each checkout page',
         value: setting.body_script,
         name: 'body_script',
         placeholder: 'body',
      },
      {
         title: 'Footer Code',
         description: 'Add custom code at the end of each checkout page',
         value: setting.footer_script,
         name: 'footer_script',
         placeholder: 'footer',
      },
   ];
   const handleInputChange = (name, value) => {
      const newInputs = {
         ...(setting || {}),
         [name]: value,
      };
      onChange('setting', newInputs);
   };

   return (
      <div className='plan__tracking__page'>
         <div className='plan__tracking__page__left'>
            <Text
               inner='Order Tracking'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Add your tracking code to monitor customer behavior during the purchasing process.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         <TrackingPageRight
            settings={ settings }
            handleInputChange={ handleInputChange }
         />
      </div>
   );
};

PlanTrackingPage.propTypes = {
   plan: PropTypes.object,
   onChange: PropTypes.func,
};

export default PlanTrackingPage;
