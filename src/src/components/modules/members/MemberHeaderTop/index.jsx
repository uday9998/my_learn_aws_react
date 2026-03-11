import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import Modal from 'components/elements/Modal';
import ImportMembersModalContent from 'components/modules/members/ImportMembersModalContent';
import { useHistory } from 'react-router-dom';


function MemberHeaderTop({
   switchToAddingMember, exportMembersCSV, handleUploadCSVClick, tooltip, isOpenBulk,
}) {
   const history = useHistory();
   const [importMemberModalOpen, setImportMembersModalOpen] = useState(false);
   return (
      <div className='memberHeaderTop'>
         <div className='memberHeaderTop__title'>
            {(
               // eslint-disable-next-line jsx-a11y/no-static-element-interactions
               <div
                  className='m-r-exs left-icon'
                  onClick={ () => history.goBack() }
               >
                  <Icon
                     name='Left'
                  />
               </div>
            )}
            <Text
               type={ textType.normal }
               size={ textSizes.large }
               inner='Members'
            />
            <div className='hint-block'>
               <div className='m-l-exs hint-icon'>
                  <Icon
                     name='Hint'
                  />
               </div>
               {tooltip && (
                  <div className='hint-text'>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner={ tooltip }
                     />
                  </div>
               )}
            </div>
         </div>
         <div className='memberHeaderTop__buttons'>
            {!!isOpenBulk && (
               <div className='import__btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSizes.medium }
                     text='Bulk Import'
                     onClick={ () => setImportMembersModalOpen(true) }
                  />
               </div>
            )}
            {
               importMemberModalOpen && (
                  <Modal
                     blurColor='rgba(63, 79, 101, 0.6)'
                     contentBgColor='white'
                     contentPosition='center'
                     closeOnClickOutside={ true }
                     onClose={ () => setImportMembersModalOpen(false) }
                  >
                     <ImportMembersModalContent
                        setImportMembersModalOpen={ setImportMembersModalOpen }
                        handleUploadCSVClick={ handleUploadCSVClick }
                     />
                  </Modal>
               )
            }
            <div className='addmember__btn'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.medium }
                  text='Add Member'
                  onClick={ () => switchToAddingMember(true) }
               />
            </div>
            <div className='export__btn'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.medium }
                  text='Export CSV'
                  onClick={ () => exportMembersCSV() }
               />
            </div>
         </div>
      </div>
   );
}

MemberHeaderTop.propTypes = {
   switchToAddingMember: PropTypes.func,
   exportMembersCSV: PropTypes.func,
   handleUploadCSVClick: PropTypes.func,
   tooltip: PropTypes.string,
   isOpenBulk: PropTypes.any,
};

export default MemberHeaderTop;
