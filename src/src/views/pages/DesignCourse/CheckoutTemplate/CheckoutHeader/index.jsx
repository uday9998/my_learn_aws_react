import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button, { THEMES as themes, SIZES as btinSizes } from 'components/elements/buttons/BaseButtonNew';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import IconNew from 'components/elements/iconsSize';
import UnsavedPopup from '../../../../../components/elements/checkoutPopup';

const CheckoutHeader = ({
   undo, redo, updateTempCheckout, setViewMode, viewMode, saveCheckout, sections,
}) => {
   const [stringifyData, setStringifyData] = useState(sections);
   const [isSaved, setIsSaved] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const history = useHistory();

   const handleBack = () => {
      if (stringifyData !== sections && !isSaved) {
         setIsOpenModal(true);
      } else {
         history.goBack();
      }
   };

   const handleYes = () => {
      history.goBack();

      setIsOpenModal(false);
   };

   const handleCloseModal = () => {
      setIsOpenModal(false);
   };

   const handleSave = () => {
      saveCheckout();
      setIsSaved(true);
   };

   return (
      <div className='checkoutTheme-save'>
         {
            isOpenModal && (
               <UnsavedPopup
                  handleYes={ handleYes }
                  handleCloseModal={ handleCloseModal }
               />
            )
         }
         <TextWithIcon
            inner='Mega Template'
            onClick={ handleBack }
            type={ types.regular160 }
            size={ sizes.xlarge }
         />
         <div className='checkoutTheme-save-sizes'>
            <div className={ `checkoutTheme-save-sizes-temp${ viewMode === '' ? ' checkoutTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('') }>
               <IconNew name='CheckoutDesktopM' />
            </div>
            {/* <div className={ `checkoutTheme-save-sizes-temp${ viewMode === 'tablet' ? ' checkoutTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('tablet') }>
               <IconNew name='CheckoutTabletM' />
            </div> */}
            <div className={ `checkoutTheme-save-sizes-temp${ viewMode === 'phone' ? ' checkoutTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('phone') }>
               <IconNew name='CheckoutPhoneM' />
            </div>
         </div>
         <div className='checkoutTheme-save-actions'>
            <div className='checkoutTheme-save-actions-undo'>
               <div
                  className='checkoutTheme-save-actions-button'
                  role='presentation'
                  onClick={ () => undo() }
               >
                  <IconNew
                     name='CheckoutUndoM'
                  />
               </div>
               <div
                  role='presentation'
                  onClick={ () => redo() }
                  className='checkoutTheme-save-actions-button'
               >
                  <IconNew
                     name='CheckoutRedoM'
                  />
               </div>
            </div>
            <div className='checkoutTheme-save-actions-line' />
            <Button
               iconName='CheckoutActiveEyeM'
               isIconRight={ true }
               text='Preview Checkout'
               theme={ themes.secondary }
               size={ btinSizes.small }
               style={ { minHeight: '36px' } }
               onClick={ () => updateTempCheckout() }
            />
            <Button
               text='Save'
               theme={ themes.secondary }
               size={ btinSizes.small }
               style={ { minHeight: '36px' } }
               onClick={ handleSave }
            />
            <Button
               text='Save & Exit'
               style={ { minHeight: '36px' } }
               size={ btinSizes.small }
               onClick={ () => saveCheckout(true) }
            />
         </div>
      </div>
   );
};

CheckoutHeader.propTypes = {
   undo: PropTypes.func,
   redo: PropTypes.func,
   setViewMode: PropTypes.func,
   viewMode: PropTypes.string,
   saveCheckout: PropTypes.func,
   updateTempCheckout: PropTypes.func,
   sections: PropTypes.string,
};

export default CheckoutHeader;
