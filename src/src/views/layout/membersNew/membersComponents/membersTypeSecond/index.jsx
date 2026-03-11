import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { getFilteredMembers } from 'utils/getFilteredMember';
import DeleteModal from 'components/elements/DeleteModal';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import Member from './Member';
import Admin from './Admin';

export const MembersTypeSecond = ({
   onMoreInfo, members, onCheck, checkedMembers, handleDeleteMember, handleSelect, showOnlyMembers,
   onOpenEditPopup, onMemberPause, checkedAdmins, onCheckAll, bulkDelete, total, isMobile, onlineUsers,
}) => {
   let teamMembers = [];

   if (showOnlyMembers) {
      teamMembers = [];
   } else {
      teamMembers = getFilteredMembers(members);
   }
   const users = members.filter(member => member.role === 0);
   const admins = members.filter(member => member.role !== 0);
   const [modalInfo, setModalInfo] = useState({
      isOpen: false,
      type: 'member',
   });
   const getModalDeleteText = () => {
      if (modalInfo.type === 'admin') {
         const names = checkedAdmins.map(({ id }) => {
            const admin = members.find(member => member.id === id);
            return admin.name;
         });
         return `Are you sure you want to delete the [${names.join(',')}] Team Members?`;
      }
      const names = checkedMembers.map(({ id }) => {
         const admin = members.find(member => member.id === id);
         return admin.name;
      });
      return `Are you sure you want to delete the [${names.join(',')}] Members?`;
   };
   return (
      <div className='members__table__column'>
         {modalInfo.isOpen && (
            <DeleteModal
               deleteText='Delete'
               title={ getModalDeleteText() }
               onDelete={ () => {
                  bulkDelete(modalInfo.type);
                  setModalInfo({
                     isOpen: false,
                     type: 'admin',
                  });
               } }
               onCancel={ () => setModalInfo({ isOpen: false, type: 'admin' }) }
            />
         )}
         {teamMembers.length > 0 ? (
            <div className='members__count'>
               <CheckBox
                  checked={ checkedAdmins.length === admins.length }
                  onChange={ () => onCheckAll('admin') }
               />
               <div>
                  <Text
                     inner={ teamMembers.length > 0 ? `${teamMembers.length} of ${teamMembers.length} Team Members` : '0 Team Member' }
                     type={ txtTypes.regularDefaultSmallX }
                     size={ txtSizes.small }
                  />
               </div>
               {checkedAdmins.length > 0 && (
                  <>
                     <div className='divider' />
                     <div className='members__count__actions'>
                        <Text
                           inner='Actions: '
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                        <IconButton
                           name='CertificatesDeleteS'
                           wBorder={ true }
                           onClick={ () => {
                              setModalInfo({
                                 isOpen: true,
                                 type: 'admin',
                              });
                           } }
                           theme={ iconThemes.delete }
                           title='Delete'
                        />
                     </div>
                  </>
               )}
            </div>
         ) : <div />
         }
         {teamMembers.map((member) => {
            return (
               <Admin
                  onCheck={ (check) => onCheck(check, 'admin') }
                  isChecked={ (checkedAdmins.filter((e) => e.email === member.email)).length }
                  key={ member.id }
                  member={ member }
                  handleSelect={ handleSelect }
                  handleDeleteMember={ handleDeleteMember }
                  onMoreInfo={ onMoreInfo }
                  onGrant={ () => onOpenEditPopup(member, 'grant') }
                  onNote={ () => onOpenEditPopup(member, 'note') }
                  onTag={ () => onOpenEditPopup(member, 'tag') }
                  onPause={ () => onMemberPause(member) }
                  isMobile={ isMobile }
                  // status={ onlineUsers.includes(member.id) ? 'Active' : 'Inactive' }
                  status={
                     onlineUsers.length > 0 ? (onlineUsers.includes(member.id) ? 'Active' : 'Inactive') : (member.online ? 'Active' : 'Inactive')
                  }
               />
            );
         })}
         {users.length > 0 ? (
            <div className='members__count'>
               <CheckBox
                  checked={ checkedMembers.length === users.length }
                  onChange={ () => onCheckAll('member') }
               />
               <div>
                  <Text
                     inner={ `1-${users.length} of ${users.length} ${users.length === 1 ? 'Member' : 'Members'}` }
                     type={ txtTypes.regularDefaultSmallX }
                     size={ txtSizes.small }
                  />
               </div>
               {checkedMembers.length > 0 && (
                  <>
                     <div className='divider' />
                     <div className='members__count__actions'>
                        <Text
                           inner='Actions: '
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                        <IconButton
                           name='CertificatesDeleteS'
                           wBorder={ true }
                           onClick={ () => {
                              setModalInfo({
                                 isOpen: true,
                                 type: 'member',
                              });
                           } }
                           theme={ iconThemes.delete }
                           title='Delete'
                        />
                     </div>
                  </>
               )}
            </div>
         ) : <div />
         }
         {users.length > 0 && users.map((member) => {
            return (
               <Member
                  onCheck={ (check) => onCheck(check, 'member') }
                  isChecked={ (checkedMembers.filter((e) => e.email === member.email)).length }
                  key={ member.id }
                  member={ member }
                  handleSelect={ handleSelect }
                  handleDeleteMember={ handleDeleteMember }
                  onMoreInfo={ onMoreInfo }
                  onGrant={ () => onOpenEditPopup(member, 'grant') }
                  onNote={ () => onOpenEditPopup(member, 'note') }
                  onTag={ () => onOpenEditPopup(member, 'tag') }
                  onPause={ () => onMemberPause(member) }
                  isMobile={ isMobile }
                  // status={ onlineUsers.includes(member.id) ? 'Active' : 'Inactive' }
                  status={
                     onlineUsers.length > 0 ? (onlineUsers.includes(member.id) ? 'Active' : 'Inactive') : (member.online ? 'Active' : 'Inactive')
                  }
               />
            );
         })}
      </div>
   );
};

MembersTypeSecond.propTypes = {
   checkedMembers: PropTypes.array,
   handleDeleteMember: PropTypes.func,
   handleSelect: PropTypes.func,
   members: PropTypes.any,
   onMoreInfo: PropTypes.func,
   onCheck: PropTypes.func,
   showOnlyMembers: PropTypes.bool,
   onMemberPause: PropTypes.func,
   bulkDelete: PropTypes.func,
   onOpenEditPopup: PropTypes.func,
   onCheckAll: PropTypes.func,
   checkedAdmins: PropTypes.array,
   total: PropTypes.number,
   isMobile: PropTypes.bool,
   onlineUsers: PropTypes.array,
};
