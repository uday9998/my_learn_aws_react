import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

const UpsellEmpty = ({ goToCreatePage }) => {
   const handleNavigateCreatePage = () => {
      goToCreatePage();
   };

   return (
      <div className='upsel__plan__empty'>
         <IconNew name='RocketImageM' />
         <Text
            inner='Want to offer your students something else? Add Upsells for your plan.'
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <Text
            inner=' This is a great opportunity to notify people about your unique offer.'
            type={ types.regularMin }
            size={ sizes.size_28 }
         />
         <Button
            text='Add Upsell'
            onClick={ handleNavigateCreatePage }
         />
      </div>
   );
};

UpsellEmpty.propTypes = {
   goToCreatePage: PropTypes.func,
};

export default UpsellEmpty;
