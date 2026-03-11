import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';


const AccountInputEdit = ({
   domainEdit, setDomainEdit, deleteAccountDomain, isSubdomain,
}) => {
   const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
   const [deleteDomainModalIsOpen, setDeleteDomainModalIsOpen] = useState(false);

   function openPopup() {
      setEditPopupIsOpen(!editPopupIsOpen);
   }

   const delDomainModalClick = (e) => {
      e.stopPropagation();
      setDeleteDomainModalIsOpen(true);
   };

   const delDomainModalApproveClick = (e) => {
      e.stopPropagation();
      deleteAccountDomain();
      setDeleteDomainModalIsOpen(false);
   };

   return (
      <div className='accountInputEdit'>
         {!domainEdit && (
            <div className='morevertical'>
               <DropTriggle options={ [
                  {
                     trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { setDomainEdit(true); openPopup(); },
                  },
                  !isSubdomain && {
                     trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: (e) => { delDomainModalClick(e); openPopup(); },
                  },
               ] }
               />
            </div>
         )}
         {
            deleteDomainModalIsOpen && (
               <DeleteModal
                  title='Are you sure you want to delete custom domain?'
                  deleteText='Delete'
                  onDelete={ (e) => { delDomainModalApproveClick(e); } }
                  onCancel={ () => setDeleteDomainModalIsOpen(false) }
               />
            )
         }
      </div>

   );
};

AccountInputEdit.propTypes = {
   domainEdit: PropTypes.bool,
   setDomainEdit: PropTypes.func,
   deleteAccountDomain: PropTypes.func,
   isSubdomain: PropTypes.bool,
};

AccountInputEdit.defaultProps = {
   deleteAccountDomain: () => {},
   isSubdomain: false,
};

export default AccountInputEdit;
