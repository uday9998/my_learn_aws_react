import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/elements/pageTitle';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const MembersHeaderTop = ({
   exportCSV, openBulkModal, openAddUserModal, initialLength, isOpenBulk,
}) => {
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const { permissions } = useSelector(siteInfoSelector);

   const handleExportCSV = () => {
      if (Array.isArray(permissions)) {
         exportCSV();
      } else if (!permissions.export_contacts) {
         setShowPopup(true);
         setPopupTitle('Export CSV');
      } else {
         exportCSV();
      }
   };

   const handleBulkImport = () => {
      if (Array.isArray(permissions)) {
         if (!permissions.import_contacts) {
            setShowPopup(true);
            setPopupTitle('Builk Import');
         } else {
            openBulkModal();
         }
      } else {
         openBulkModal();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='members__header__top'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         <PageTitle title='Members' />
         {initialLength !== 0 && (
            <div className='members__header__top__left'>
               {!!isOpenBulk && (
                  <BaseButton
                     text='Bulk Import'
                     theme={ btnTheme.secondary }
                     size={ btnSizes.medium }
                     iconName='Bulk'
                     isIconRight={ true }
                     onClick={ handleBulkImport }
                  />
               )}
               <BaseButton
                  text='Export CSV'
                  theme={ btnTheme.secondary }
                  isIconRight={ true }
                  size={ btnSizes.medium }
                  iconName='ExportCSVM'
                  onClick={ handleExportCSV }
                  className='export_csv_btn'
               />
               <BaseButton
                  text='Add Member'
                  iconName='PluseNewL'
                  isIconRight={ true }
                  theme={ btnTheme.primary }
                  // size={ btnSizes.medium }
                  onClick={ openAddUserModal }
               />
            </div>
         )}
      </div>
   );
};

MembersHeaderTop.propTypes = {
   exportCSV: PropTypes.func,
   openBulkModal: PropTypes.func,
   initialLength: PropTypes.number,
   openAddUserModal: PropTypes.func,
   isOpenBulk: PropTypes.bool,
};

export default MembersHeaderTop;
