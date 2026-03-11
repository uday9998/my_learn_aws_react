import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Switch from 'components/elements/form/Switch';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import moment from 'moment';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import Modal from 'components/elements/Modal';
import Router from 'routes/router';

function AutomationItem({
   automation, handleDeleteAutomation, goTo, handleStatusChange,
}) {
   const [deleteAutomationModalIsOpen, setDeleteAutomationModalIsOpen] = useState(false);
   const [automationId, setAutomationId] = useState(0);

   const delAutomationModalClick = (id) => {
      setAutomationId(id);
      setDeleteAutomationModalIsOpen(true);
   };

   const delAutomationModalApproveClick = () => {
      handleDeleteAutomation(automationId);
      setDeleteAutomationModalIsOpen(false);
   };
   return (
      <div className='automation__item'>
         <div className='automation_table_content'>
            <div>
               <Text
                  type={ textType.normal }
                  size={ textSizes.extraSmall }
                  inner={ automation.name }
               />
            </div>
            <div>
               <Text
                  type={ textType.regular }
                  size={ textSizes.extraSmall }
                  inner={ moment(automation.created_at).format('MM-DD-YYYY') }
               />
            </div>
            <div>
               <Switch
                  checked={ !!automation.status }
                  onChange={ () => handleStatusChange(automation.id, !automation.status) }
                  isCommentPage={ true }
               />
            </div>
            <div className='actions'>
               <div className='edit' title='edit' role='presentation' onClick={ () => { goTo(`${ Router.route('ADMIN_AUTOMATION_EDIT').getCompiledPath({ id: automation.id }) }`); } }>
                  <Icon name='EditItem' />
               </div>
               <div className='delete' title='delete' role='presentation' onClick={ () => delAutomationModalClick(automation.id) }>
                  <Icon name='DeleteItem' />
               </div>
               {/* <BaseButton
                  theme={ btnTheme.lightBlue }
                  size={ btnSizes.medium }
                  text={ automation.status ? 'Make Inactive' : 'Make Active' }
                  onClick={ () => handleStatusChange(automation.id, !automation.status) }
               /> */}
            </div>
         </div>
         {
            deleteAutomationModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteAutomationModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteAutomationModalIsOpen(false) }
                        onApprove={ () => delAutomationModalApproveClick() }
                        title='Delete Automation'
                        content='Are you sure you want to delete this automation?'
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
}

AutomationItem.propTypes = {
   automation: PropTypes.object,
   handleDeleteAutomation: PropTypes.func,
   goTo: PropTypes.func,
   handleStatusChange: PropTypes.func,
};

export default AutomationItem;
