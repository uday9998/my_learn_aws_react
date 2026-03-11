import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';

import './index.scss';

const UnsavedPopup = ({
   handleYes, handleCloseModal, navigateFunc, e, 
}) => {
   const handleOnYes = () => {
      if (navigateFunc && e) {
         navigateFunc(e);
      } else {
         handleYes();
      }
   };

   return (
      <div className='checkout__popup__wrapper'>
         <div className='inner__wrapper'>
            <div className='texts__wrapper'>
               <Text
                  inner='Discard changes?'
                  type={ types.bold }
                  size={ sizes.size_28 }
               />
               <Text 
                  inner='You have unsaved changes, are you sure you want to leave the page?'
                  type={ types.medium140 }
                  size={ sizes.size_14 }
               />
            </div>
            <div className='buttons__wrapper'> 
               <BaseButton 
                  text='Yes'
                  onClick={ handleOnYes }
               />
               <BaseButton 
                  text='Cancel'
                  onClick={ handleCloseModal }
               />
            </div>
         </div>
      </div>
   );
};

UnsavedPopup.propTypes = {
   handleYes: PropTypes.func,
   handleCloseModal: PropTypes.func,
   navigateFunc: PropTypes.func,
   e: PropTypes.any,
};

export default UnsavedPopup;