import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import MemberContainer from 'views/newLayout/members';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import MemberGeneralPage from 'components/modules/memberPages/General';
import MemberTransactionsPage from 'components/modules/memberPages/Transactions';
import MemberClassesPage from 'components/modules/memberPages/Classes';
import Notes from 'components/modules/memberPages/Notes';
import MemberTagPage from 'components/modules/memberPages/Tags';
import QueryParam from 'utils/QueryParams';
import MemberCommunityPage from 'components/modules/memberPages/Community';
import { Popover } from '@material-ui/core';
import IconNew from 'components/elements/iconsSize';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { changeMemberPassword, sendPassword } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import MemberChangePasswordModal from 'views/layout/membersNew/membersComponents/memberChangePasswordModal';
import CurrentMemberTop from './memberComponents/memberTop';


const MemberView = ({
   currentMember, goBack, pauseCurrentMemberCourse, updateNote, deleteNote, sortedVersionClasses,
   removeMemberCourse, createNote, addTag, atachTag, detachTag, filterMemberClasses, onClassFilter,
   isLoadingCommunity, selectedCommunity, onSelectCommunity, handleResetSelectedCommunity, handleMemberActions,
   onlineUsers,
}) => {
   const [selectedPage, setSelectedPage] = useState('general');
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [changePassword] = useSubmitForm(changeMemberPassword);
   const [sendPasswordToMember] = useSubmitForm(sendPassword);
   const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = React.useState(false);
   const [passwordInputs, setPasswordInputs] = React.useState({
      password: '',
      password_confirmation: '',
   });
   const { isMobile } = useWindowSizeChange();
   const handleInputChange = (name, value) => {
      setPasswordInputs({
         ...passwordInputs,
         [name]: value,
      });
   };
   useEffect(() => {
      if (QueryParam.getHash()) {
         setSelectedPage(QueryParam.getHash());
      }
   }, []);
   const onClickButton = (e) => {
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };
   const onChangeTab = (tab) => {
      if (tab !== 'community') {
         handleResetSelectedCommunity();
      }
      QueryParam.setHash(tab);
      setSelectedPage(tab);
   };
   const onClose = () => {
      setIsOpen(false);
   };

   const handleChangePassword = () => {
      return changePassword(
         [currentMember.id, passwordInputs],
         () => {
            if (isPrint('The member has been updated.')) {
               toast.success('The member has been updated.');
            }
            setPasswordInputs({});
            setIsOpenChangePasswordModal(false);
         },
         () => true
      );
   };

   const handleSendPassword = () => {
      sendPasswordToMember([currentMember.id], () => {
         if (isPrint('The password sent successfully.')) {
            toast.success('The password sent successfully.');
         }
      });
   };

   const getActivePage = () => {
      switch (selectedPage) {
         case 'general':
            return (<MemberGeneralPage currentMember={ currentMember } isMobile={ isMobile } />);
         case 'classes':
            return (
               <MemberClassesPage
                  member={ currentMember }
                  sort={ sortedVersionClasses }
                  filterMemberClasses={ filterMemberClasses }
                  onPause={ pauseCurrentMemberCourse }
                  removeMemberCourse={ removeMemberCourse }
                  classes={ currentMember.courses }
               />
            );
         case 'community':
            return (
               <MemberCommunityPage
                  onSelectCommunity={ onSelectCommunity }
                  goBack={ handleResetSelectedCommunity }
                  isLoadingCommunity={ isLoadingCommunity }
                  selectedCommunity={ selectedCommunity }
                  communities={ currentMember.communities }
               />
            );
         case 'tags':
            return (
               <MemberTagPage
                  atachTag={ atachTag }
                  detachTag={ detachTag }
                  addTag={ addTag }
                  currentMember={ currentMember }
               />
            );
         case 'transactions':
            return (
               <MemberTransactionsPage
                  currentMember={ currentMember }
                  onClassFilter={ onClassFilter }
               />
            );
         default:
            return (
               <Notes
                  onUpdate={ updateNote }
                  onDelete={ deleteNote }
                  onAdd={ createNote }
                  currentMember={ currentMember }
               />
            );
      }
   };
   return (
      <MemberContainer>
         <div className='member'>
            <div className='member__header'>
               <div className='member__header__left'>
                  <div className='member__header__back' role='presentation' onClick={ () => goBack() }>
                     <Icon name='ArrowLeftLarge' />
                  </div>
                  <Text inner={ currentMember.name } type={ txtTypes.medium } size={ txtSizes.size_28 } />
               </div>
               <BaseButton
                  theme={ btnTheme.primary }
                  text='Actions'
                  onClick={ onClickButton }
               />
            </div>
            <CurrentMemberTop
               selectedPage={ selectedPage }
               setSelectedPage={ onChangeTab }
               currentMember={ currentMember }
               status={
                  onlineUsers.length > 0 ? (onlineUsers.includes(currentMember.id) ? 'Active' : 'Inactive') : (currentMember.online ? 'Active' : 'Inactive')
               }
            />
            {getActivePage()}
            {isOpenChangePasswordModal && (
               <MemberChangePasswordModal 
                  handleInputChange={ handleInputChange }
                  inputs={ passwordInputs }
                  onCloseModal={ () => {
                     setIsOpenChangePasswordModal(false);
                     setPasswordInputs({});
                  } }
                  onConfirm={ () => handleChangePassword() }
               />
            )}
            <Popover
               open={ isOpen }
               anchorEl={ anchorEl }
               onClose={ onClose }
               className='custom-popover'
               elevation={ 24 }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center',
               } }
               transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'center',
               } }
            >
               <div className='drop__new__content'>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        onClose();
                        handleMemberActions('grant');
                     } }
                  >
                     <Icon name='PopupGrant' />
                     <Text
                        inner='Grant Access'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        onClose();
                        handleMemberActions('note');
                     } }
                  >
                     <Icon name='PopupNoteMini' />
                     <Text
                        inner='Add Note'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        onClose();
                        handleMemberActions('tags');
                        //  setIsOpenChangePasswordModal(true);
                     } }
                  >
                     <Icon name='PopupTag' />
                     <Text
                        inner='Add Tags'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        setIsOpenChangePasswordModal(true);
                        onClose();
                     } }
                  >
                     <IconNew name='ChangePasswordM' />
                     <Text
                        inner='Change Password'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        handleSendPassword();
                        onClose();
                     } }
                  >
                     <IconNew name='ChangePasswordM' />
                     <Text
                        inner='Send Password'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item'
                     role='presentation'
                     onClick={ () => {
                        handleMemberActions('role');
                        onClose();
                     } }
                  >
                     <IconNew name='MemberM' />
                     <Text
                        inner='Change Role'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div
                     className='drop__new__content__item drop__new__content__delete'
                     role='presentation'
                     onClick={ () => {
                        handleMemberActions('delete');
                        onClose();
                     } }
                  >
                     <Icon name='TrashMember' color='#d12d36' />
                     <Text
                        inner='Delete'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#d12d36' } }
                     />
                  </div>
               </div>
            </Popover>
         </div>
      </MemberContainer>
   );
};

MemberView.propTypes = {
   goBack: PropTypes.func,
   deleteNote: PropTypes.func,
   createNote: PropTypes.func,
   sortedVersionClasses: PropTypes.number,
   filterMemberClasses: PropTypes.func,
   addTag: PropTypes.func,
   updateNote: PropTypes.func,
   removeMemberCourse: PropTypes.func,
   currentMember: PropTypes.object,
   pauseCurrentMemberCourse: PropTypes.func,
   atachTag: PropTypes.func,
   detachTag: PropTypes.func,
   onClassFilter: PropTypes.func,
   isLoadingCommunity: PropTypes.bool,
   selectedCommunity: PropTypes.object,
   onSelectCommunity: PropTypes.func,
   handleResetSelectedCommunity: PropTypes.func,
   handleMemberActions: PropTypes.func,
   onlineUsers: PropTypes.array,
};

export default MemberView;
