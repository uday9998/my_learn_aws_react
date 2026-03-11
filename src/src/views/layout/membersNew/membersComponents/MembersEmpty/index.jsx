import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const MemberEmptyPage = ({ openBulkModal, openAddMemberModal, isOpenBulk }) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);

   const isOpenBulkFunc = () => {
      if (Array.isArray(permissions)) {
         if (isOpenBulk) {
            openBulkModal(true);
         } else if (isPrint('Please contact support to do a bulk import.')) {
            toast.error('Please contact support to do a bulk import.');
         }
      } else if (!permissions.import_contacts) {
         setShowPopup(true);
         setPopupTitle('Import Contacts');
      } else if (isOpenBulk) {
         openBulkModal(true);
      } else if (isPrint('Please contact support to do a bulk import.')) {
         toast.error('Please contact support to do a bulk import.');
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='members__empty'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         <div className='members__empty__top'>
            <IconNew name='MemberEmptyM' />
            <Text
               inner="You don't have members yet"
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { marginTop: '16px' } }
            />
            <Text
               inner="Let's start adding new members."
               type={ types.regularDefaultSmall }
               size={ sizes.xlarge }
            />
         </div>
         <div className='members__empty__buttons'>
            <BaseButton
               text='Bulk Import'
               theme={ btnTheme.secondary }
               size={ btnSizes.medium }
               iconName='Bulk'
               isIconRight={ true }
               onClick={ isOpenBulkFunc }
            />
            <BaseButton
               text='Add Member'
               iconName='PluseNewL'
               isIconRight={ true }
               theme={ btnTheme.primary }
               size={ btnSizes.medium }
               onClick={ openAddMemberModal }
            />
         </div>
      </div>
   );
};

MemberEmptyPage.propTypes = {
   openBulkModal: PropTypes.func,
   openAddMemberModal: PropTypes.func,
   isOpenBulk: PropTypes.bool,
};

export default MemberEmptyPage;
