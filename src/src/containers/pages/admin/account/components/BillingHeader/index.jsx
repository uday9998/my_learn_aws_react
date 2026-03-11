import React from 'react';
import PropTypes from 'prop-types';

import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const BillingHeader = ({
   title,
   handleShowPricingList,
}) => {
   return (
      <div className='header_wrapper'>
         <IconNew name='LeftArrowL' onClick={ handleShowPricingList } />
         <Text 
            inner={ title }
         />
      </div>
   );
};

BillingHeader.propTypes = {
   title: PropTypes.string,
   handleShowPricingList: PropTypes.func,
};

export default BillingHeader;