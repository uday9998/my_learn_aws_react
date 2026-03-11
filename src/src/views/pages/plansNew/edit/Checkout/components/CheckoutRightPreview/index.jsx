import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import Button from 'components/elements/buttons/BaseButtonNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { revertToDefaultCheckoutTemplate } from 'api';

const CheckoutRightPreview = ({
   selectedCheckoutId, planId, image, onEdit, onPreview, isActive, makeActiveLanding,
}) => {
   const [revertCheckoutTemplate] = useSubmitForm(revertToDefaultCheckoutTemplate, {
      successMessage: 'Revert to default',
   });

   const handleRevertToDefault = () => {
      revertCheckoutTemplate({ planId, selectedCheckoutId });
   };

   return (
      <div className='plan__edit__checkout__right'>
         <div className='plan__edit__checkout__right__top'>
            <Text
               inner='Preview'
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            <div className='plan__edit__checkout__right__top__right'>
               <Button
                  text='Revert to default'
                  onClick={ handleRevertToDefault }
               />
               <IconButton
                  name='CheckoutEditM'
                  onClick={ () => onEdit() }
               />
               <IconButton
                  name='CheckoutPreviewM'
                  onClick={ () => onPreview() }
               />
               <Button
                  text={ isActive ? 'Applied' : 'Apply' }
                  onClick={ makeActiveLanding }
                  disabled={ isActive }
               />
            </div>
         </div>
         <img src={ image } alt='checkout template' />
      </div>
   );
};

CheckoutRightPreview.propTypes = {
   onPreview: PropTypes.func,
   onEdit: PropTypes.func,
   isActive: PropTypes.bool,
   image: PropTypes.any,
   makeActiveLanding: PropTypes.func,
   selectedCheckoutId: PropTypes.number,
   planId: PropTypes.number,
};

export default CheckoutRightPreview;