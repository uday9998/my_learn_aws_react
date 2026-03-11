import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button, { THEMES as themes, SIZES as btinSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import IconNew from 'components/elements/iconsSize';
import IconButton from 'components/elements/buttons/IconButton';
import UnsavedPopup from 'components/elements/checkoutPopup';

export const SchoolRoomThemeHeader = ({
   undo, redo, updateTempSchoolRoom, setViewMode, viewMode, save, templateName, sections,
}) => {
   const [stringifySections, setStringifySections] = useState(JSON.stringify(sections));
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [pathname, setPathname] = useState(null);
   const history = useHistory();
   const [isSaved, setIsSaved] = useState(false);

   const handleBack = () => {
      if (JSON.stringify(sections) !== stringifySections && !isSaved) {
         setIsOpenModal(true);
         return;
      }
      history.push('/admin/portal', { portalName: history.location.pathname.includes('template1') });
   };

   const handleYes = () => {
      if (pathname) {
         history.push(pathname);
      } else {
         history.goBack();
      }

      setIsOpenModal(false);
   };

   const handleCloseModal = () => {
      setIsOpenModal(false);
   };

   const handleSave = () => {
      save();
      setIsSaved(true);
   };

   const handlePreviewPortal = () => {
      if (templateName === 'Ballerina') {
         localStorage.setItem('templateName', 'template2');
      } else if (templateName === 'Yoga') {
         localStorage.setItem('templateName', 'template3');
      } else {
         localStorage.setItem('templateName', 'template1');
      }
      updateTempSchoolRoom();
   };

   return (
      <div className='schoolroomTheme-save'>
         {
            isOpenModal && (
               <UnsavedPopup
                  handleCloseModal={ handleCloseModal }
                  handleYes={ handleYes }
               />
            )
         }
         <div className='schoolroomTheme-save-left'>
            <IconButton
               name='arrowLeftL'
               onClick={ handleBack }
            />
            <Text
               inner={ `Edit ${ templateName }` }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
         </div>
         <div className='schoolroomTheme-save-sizes'>
            <div className={ `schoolroomTheme-save-sizes-temp${ viewMode === '' ? ' schoolroomTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('') }>
               <IconNew name='CheckoutDesktopM' />
            </div>
            {/* <div className={ `schoolroomTheme-save-sizes-temp${ viewMode === 'tablet' ? ' schoolroomTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('tablet') }>
               <IconNew name='CheckoutTabletM' />
            </div> */}
            <div className={ `schoolroomTheme-save-sizes-temp${ viewMode === 'phone' ? ' schoolroomTheme-save-sizes-active-temp' : '' }` } role='presentation' onClick={ () => setViewMode('phone') }>
               <IconNew name='CheckoutPhoneM' />
            </div>
         </div>
         <div className='schoolroomTheme-save-actions'>
            <div className='schoolroomTheme-save-actions-undo'>
               <div
                  className='schoolroomTheme-save-actions-button'
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
                  className='schoolroomTheme-save-actions-button'
               >
                  <IconNew
                     name='CheckoutRedoM'
                  />
               </div>
            </div>
            <div className='schoolroomTheme-save-actions-line' />
            <Button
               iconName='CheckoutActiveEyeM'
               isIconRight={ true }
               text='Preview Portal'
               theme={ themes.secondary }
               size={ btinSizes.small }
               style={ { maxHeight: '44px' } }
               onClick={ () => handlePreviewPortal() }
            />
            <Button
               text='Save'
               theme={ themes.secondary }
               size={ btinSizes.small }
               style={ { minHeight: '44px' } }
               onClick={ handleSave }
            />
            <Button
               text='Save & Exit'
               style={ { minHeight: '44px' } }
               size={ btinSizes.small }
               onClick={ () => save(true) }
            />
         </div>
      </div>
   );
};

SchoolRoomThemeHeader.propTypes = {
   undo: PropTypes.func,
   redo: PropTypes.func,
   setViewMode: PropTypes.func,
   viewMode: PropTypes.string,
   save: PropTypes.func,
   updateTempSchoolRoom: PropTypes.func,
   templateName: PropTypes.string,
   sections: PropTypes.string,
};
