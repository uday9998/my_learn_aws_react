import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';


const LessonMember = ({
   member, active, onChooseMember, handleDeleteMember,
}) => {
   const lastLogin = member.last_login_at ? moment(member.last_login_at).format('MM/DD/YYYY') : 'Not logged in yet';

   const [popupIsOpen, setPopupIsOpen] = useState(false);
   const [deleteMemberModalIsOpen, setDeleteMemberModalIsOpen] = useState(false);

   function openPopup(e) {
      e.stopPropagation();
      setPopupIsOpen(!popupIsOpen);
   }

   const delMemberModalClick = (e) => {
      e.stopPropagation();
      setDeleteMemberModalIsOpen(true);
      setPopupIsOpen(false);
   };

   const delMemberModalApproveClick = (e) => {
      e.stopPropagation();
      handleDeleteMember(e);
      setDeleteMemberModalIsOpen(false);
   };

   return (
      <SelectedWrapper active={ active } hasSelected>
         <div
            className='lessonMember w-full flex justify-between align-start'
            role='presentation'
            onClick={ () => onChooseMember(member.id) }
         >
            <div className='memberData'>
               <div className='flex align-start m-r-m'>
                  <div className='lessonMember__avatar'>
                     <img src={ member.picture_full_src } alt='use' />
                  </div>
               </div>
               <div className='memberData__text'>
                  <div>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.medium }
                        inner={ member.name }
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.small }
                        inner={ member.email }
                        color='#8a94a2'
                        bold
                        style={ { marginTop: '4px' } }
                     />
                  </div>
                  <div className='w-full flex m-t-exs'>
                     <div className='m-r-exs'>
                        <Icon name='Role' color={ lastLogin === 'Not logged in yet' ? '#8a94a2' : '#7cb740' } />
                     </div>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.small }
                        inner={ lastLogin }
                        color='#8a94a2'
                        bold
                        style={ { fontSize: '12px' } }
                     />
                  </div>
               </div>
            </div>
            <div className='memberSettings flex align-start'>
               <div
                  role='presentation'
                  className='member__openDelete'
                  onClick={ (e) => openPopup(e) }
               >
                  <Icon name='Dotes' />
               </div>
               {/*
                  deletePopupIsOpen && (
                     <div
                        className='member__deletePopup'
                        role='presentation'
                        onClick={ (e) => handleDeleteMember(e) }
                     >
                        <Text
                           style={ { fontSize: '12px' } }
                           type={ textType.normal }
                           inner='delete'
                        />
                     </div>
                  ) */
               }
               {
                  popupIsOpen && (
                     <div className='showQuiz__popup'>
                        <div
                           className='flex align-center m-t-exs'
                           role='presentation'
                           onClick={ (e) => delMemberModalClick(e) }
                        >
                           <ClickOutside onClick={ (e) => openPopup(e) }>
                              <div>
                                 <Icon name='DeleteItem' />
                              </div>
                              <div className='m-l-m'>
                                 <Text
                                    type={ textType.normal }
                                    size={ textSizes.small }
                                    inner='Delete'
                                 />
                              </div>
                           </ClickOutside>
                        </div>
                     </div>
                  )
               }
               {
                  deleteMemberModalIsOpen && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                        onClose={ () => setDeleteMemberModalIsOpen(false) }
                     >
                        <div>
                           <DeleteModalContent
                              onCancel={ () => setDeleteMemberModalIsOpen(false) }
                              onApprove={ (e) => delMemberModalApproveClick(e) }
                              title='Delete User'
                              content='Are you sure you want to delete this user?'
                           />
                        </div>
                     </Modal>
                  )
               }

            </div>
         </div>
      </SelectedWrapper>
   );
};

LessonMember.propTypes = {
   member: PropTypes.object,
   active: PropTypes.bool,
   onChooseMember: PropTypes.func,
   handleDeleteMember: PropTypes.func,
};

LessonMember.defaultProps = {
   active: false,
   onChooseMember: () => {},
   member: {
      last_login_at: Date.now(),
      picture_src: '',
      name: 'John Doe',
      email: 'example@domain.com',
   },
};

export default LessonMember;
