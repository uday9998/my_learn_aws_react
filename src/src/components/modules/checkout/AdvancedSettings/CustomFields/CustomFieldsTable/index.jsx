import React, { useState } from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.scss';

const CustomFieldsTable = ({ customFields, handleDeleteCustomFieldFunc, chooseCustomField }) => {
   const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
   const [customFieldId, setCustomFieldId] = useState(0);

   const delModalClick = (id) => {
      setCustomFieldId(id);
      setDeleteModalIsOpen(true);
   };

   const delModalApproveClick = () => {
      handleDeleteCustomFieldFunc(customFieldId);
      setDeleteModalIsOpen(false);
   };
   return (
      <div className='customFieldsTable'>
         <div className='settings-footer-container'>
            <div className='footer-container-title'>
               <div className='header-1'>
                  <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.avenir }
                     inner='Name'
                     color='#333333'
                  />
               </div>
               <div className='header-2'>
                  <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.avenir }
                     inner='Date'
                     color='#333333'
                  />
               </div>
               <div className='header-3'>
                  <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.avenir }
                     inner='Actions'
                     color='#333333'
                  />
               </div>
            </div>
            {customFields.map((customField) => {
               return (
                  <div className='footer-container-list' key={ customField.id }>
                     <div className='left-line' />
                     <div className='right-list-container'>
                        <div className='list-name'>
                           <Text
                              size={ TextSize.extraSmall }
                              type={ TextType.avenir }
                              inner={ customField.name }
                              color='#333333'
                           />
                        </div>
                        <div className='list-date'>
                           <Text
                              size={ TextSize.extraSmall }
                              type={ TextType.avenir }
                              inner={ moment(customField.created_at).format('MM-DD-YYYY') }
                              color='#333333'
                           />
                        </div>
                        <div className='list-action'>
                           <div className='edit-button'>
                              <BaseButton
                                 theme={ btnTheme.lightBlue }
                                 size={ btnSize.extraSmall }
                                 text='Edit'
                                 onClick={ () => chooseCustomField(customField) }
                              />
                           </div>
                           <div className='delete-button' role='presentation' onClick={ () => delModalClick(customField.id) } title='delete'>
                              <Icon name='Delete' />
                           </div>

                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         {
            deleteModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteModalIsOpen(false) }
                        onApprove={ () => delModalApproveClick() }
                        title='Delete Custom Field'
                        content='Are you sure you want to delete this custom field?'
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

CustomFieldsTable.propTypes = {
   customFields: PropTypes.array,
   handleDeleteCustomFieldFunc: PropTypes.func,
   chooseCustomField: PropTypes.func,
};

export default CustomFieldsTable;
