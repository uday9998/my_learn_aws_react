import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { useHistory } from 'react-router';
import './index.scss';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import UnsavedPopup from 'components/elements/checkoutPopup';

const OtherPageEditorTop = ({
   selectedMod, handleUndo, handleRedo, handleSave, setSelectedMod, templateName, sections,
   generalProps,
}) => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [stringifySections, setStringifySections] = useState(JSON.stringify(sections));
   const history = useHistory();
   const [isSaved, setIsSaved] = useState(false);

   const handleBack = () => {
      if (stringifySections !== JSON.stringify(sections) && !isSaved) {
         setIsOpenModal(true);
         return;
      }

      history.goBack();
   };

   const handleYes = () => {
      history.goBack();
      setIsOpenModal(false);
   };

   const handleCloseModal = () => {
      setIsOpenModal(false);
   };

   const onSave = () => {
      handleSave();
      setIsSaved(true);
   };

   // const pageId = history.location.pathname.split('/').reverse()[0];

   return (
      <div className='other__checkout__header'>
         {
            isOpenModal && (
               <UnsavedPopup
                  handleCloseModal={ handleCloseModal }
                  handleYes={ handleYes }
               />
            )
         }
         <div className='other__checkout__header__left'>
            <div
               role='presentation'
               onClick={ handleBack }
               className='other__checkout__header__left__icon'
            >
               <IconNew name='arrowLeftL' />
            </div>
            <Text
               inner='Back To Templates'
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
         </div>
         <div className='other__checkout__header__mods'>
            <div className={ `other__checkout__header__mod${ selectedMod === 'desktop' ? ' other__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('desktop') }>
               <IconNew name='CheckoutDesktopM' />
            </div>
            {/* <div className={ `other__checkout__header__mod${ selectedMod === 'tablet' ? ' other__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('tablet') }>
               <IconNew name='CheckoutTabletM' />
            </div> */}
            <div className={ `other__checkout__header__mod${ selectedMod === 'phone' ? ' other__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('phone') }>
               <IconNew name='CheckoutPhoneM' />
            </div>
         </div>
         <div className='other__checkout__header__actions'>
            <div className='undoredo'>
               <div
                  className='undoredo__button'
                  role='presentation'
                  onClick={ () => handleUndo() }
               >
                  <IconNew
                     name='CheckoutUndoM'
                  />
               </div>
               <div
                  role='presentation'
                  onClick={ () => handleRedo() }
                  className='undoredo__button'
               >
                  <IconNew
                     name='CheckoutRedoM'
                  />
               </div>
            </div>
            <div className='liner' />
            {/* <Link to={ `/admin/other-pages/preview/${ templateName }` } target='_blank'> */}
            <Button
               iconName='CheckoutActiveEyeM'
               isIconRight={ true }
               text='Preview'
               theme={ themes.secondary }
               size={ btnSizes.small }
               style={ { maxHeight: '44px' } }
               onClick={ () => { const win = window.open(`/admin/other-pages/preview/${ templateName }`, '_blank'); win.otherPage = generalProps; } }
            />
            {/* </Link> */}
            <Button
               text='Save'
               theme={ themes.secondary }
               size={ btnSizes.small }
               style={ { maxHeight: '44px', minHeight: '44px' } }
               onClick={ onSave }
            />
            <Button
               text='Save & Exit'
               size={ btnSizes.small }
               style={ { maxHeight: '44px', minHeight: '44px' } }
               onClick={ () => handleSave(true) }
            />
         </div>
      </div>
   );
};

OtherPageEditorTop.propTypes = {
   selectedMod: PropTypes.string,
   handleUndo: PropTypes.func,
   handleRedo: PropTypes.func,
   handleSave: PropTypes.func,
   setSelectedMod: PropTypes.func,
   templateName: PropTypes.string,
   generalProps: PropTypes.object,
   sections: PropTypes.string,
};

export default OtherPageEditorTop;
