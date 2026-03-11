import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textTypes, SIZES as textSizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { getFilteredMembers } from 'utils/getFilteredMember';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import { Member } from './Member';
import { Admin } from './Admin';


export const MemberTableHeader = ({
   isMember,
}) => (
   <div className='members__table__header members__table__tr'>
      <div className='members__table__check' />
      <div className='members__table__th col-1'>
         <Text
            inner='Member Name'
            size={ textSizes.small }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className={ `members__table__th ${ isMember ? 'col-2xm' : 'col-2xm' }` }>
         <Text
            inner='Roles'
            size={ textSizes.small }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className='members__table__th col-2m'>
         <Text
            inner='Status'
            size={ textSizes.small14_500 }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className='members__table__th col-3'>
         <Text
            inner='Email'
            size={ textSizes.small }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className='members__table__th col-2xm'>
         <Text
            inner='Date added'
            size={ textSizes.small }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className='members__table__th col-2xm'>
         <Text
            inner='Last activity'
            size={ textSizes.small }
            type={ textTypes.mediumLarge }
         />
      </div>
      <div className='members__table__end' />
   </div>
);

export const MembersTypeFirst = ({
   members, checkedMembers, onCheck, onOpenEditPopup, onCheckAll, onMoreInfo, handleDeleteMember, handleSelect,
   showOnlyMembers, onMemberPause, checkedAdmins, bulkDelete, total, onlineUsers,
}) => {
   let teamMembers = [];

   if (showOnlyMembers) {
      teamMembers = [];
   } else {
      teamMembers = getFilteredMembers(members);
   }

   const [modalInfo, setModalInfo] = useState({
      isOpen: false,
      type: 'member',
   });
   const users = members.filter(member => member.role === 0);
   const getModalDeleteText = () => {
      if (modalInfo.type === 'admin') {
         const names = checkedAdmins.map(({ id }) => {
            const admin = members.find(member => member.id === id);
            return admin.name;
         });
         return `Are you sure you want to delete the [${ names.join(',') }] Team Members?`;
      }
      const names = checkedMembers.map(({ id }) => {
         const admin = members.find(member => member.id === id);
         return admin.name;
      });
      return `Are you sure you want to delete the [${ names.join(',') }] Members?`;
   };
   return (
      <>
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
         {teamMembers.length > 0 && (
            <div className='members__count members__table__user__count'>
               <CheckBox
                  onChange={ () => onCheckAll('admin') }
                  checked={ checkedAdmins.length === teamMembers.length }
               />
               <div>
                  <Text
                     inner={ teamMembers.length > 0 ? `${ teamMembers.length } of ${ teamMembers.length } Team Members` : '0 Team Member' }
                     type={ textTypes.regularDefaultSmallX }
                     size={ textSizes.small }
                  />
               </div>
               {checkedAdmins.length > 0 && (
                  <>
                     <div className='divider' />
                     <div className='members__count__actions'>
                        <Text
                           inner='Actions: '
                           type={ textTypes.regularDefault }
                           size={ textSizes.small }
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
         )}
         {teamMembers.length > 0 && (
            <div className='members__table'>
               <MemberTableHeader onCheckAll={ onCheckAll } members={ members } checkedMembers={ checkedMembers } />
               <div className='members__table__body'>
                  {teamMembers.map((member) => {
                     return (
                        <Admin
                           onCheck={ (check) => onCheck(check, 'admin') }
                           isChecked={ (checkedAdmins.filter((e) => e.email === member.email)).length }
                           key={ member.id }
                           handleDeleteMember={ handleDeleteMember }
                           member={ member }
                           onMoreInfo={ onMoreInfo }
                           handleSelect={ handleSelect }
                           onGrant={ () => onOpenEditPopup(member, 'grant') }
                           onTag={ () => onOpenEditPopup(member, 'tag') }
                           onNote={ () => onOpenEditPopup(member, 'note') }
                           onPause={ () => onMemberPause(member) }
                           // status={ onlineUsers.includes(member.id) ? 'Active' : 'Inactive' }
                           status={
                              onlineUsers.length > 0 ? (onlineUsers.includes(member.id) ? 'Active' : 'Inactive') : (member.online ? 'Active' : 'Inactive')
                           }
                        />
                     );
                  })}
               </div>
               <div className='members__table__td' />
            </div>
         )}
         {users.length > 0 ? (
            <div className='members__count members__table__user__count'>
               <CheckBox
                  onChange={ () => onCheckAll('member') }
                  checked={ checkedMembers.length === users.length }
               />
               <div>
                  <Text
                     inner={ `1-${ users.length } of ${ users.length } ${ users.length === 1 ? 'Member' : 'Members' }` }
                     type={ textTypes.regularDefaultSmallX }
                     size={ textSizes.small }
                  />
               </div>
               {checkedMembers.length > 0 && (
                  <>
                     <div className='divider' />
                     <div className='members__count__actions'>
                        <Text
                           inner='Actions: '
                           type={ textTypes.regularDefault }
                           size={ textSizes.small }
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
         {users.length > 0 && (
            <div className='members__table'>
               <MemberTableHeader
                  isMember={ true }
                  onCheckAll={ onCheckAll }
                  members={ members }
                  checkedMembers={ checkedMembers }
               />
               <div className='members__table__body'>
                  {users.map((member) => {
                     return (
                        <Member
                           onCheck={ (check) => onCheck(check, 'member') }
                           isChecked={ (checkedMembers.filter((e) => e.email === member.email)).length }
                           key={ member.id }
                           handleDeleteMember={ handleDeleteMember }
                           member={ member }
                           handleSelect={ handleSelect }
                           onMoreInfo={ onMoreInfo }
                           onGrant={ () => onOpenEditPopup(member, 'grant') }
                           onNote={ () => onOpenEditPopup(member, 'note') }
                           onTag={ () => onOpenEditPopup(member, 'tag') }
                           onPause={ () => onMemberPause(member) }
                           // status={ onlineUsers.includes(member.id) ? 'Active' : 'Inactive' }
                           status={ onlineUsers.length > 0 ? (onlineUsers.includes(member.id) ? 'Active' : 'Inactive') : (member.online ? 'Active' : 'Inactive') }
                        />
                     );
                  })}
               </div>
               <div className='members__table__td' />
            </div>
         )}
      </>
   );
};

MembersTypeFirst.propTypes = {
   members: PropTypes.any,
   onCheckAll: PropTypes.func,
   onCheck: PropTypes.func,
   handleSelect: PropTypes.func,
   checkedMembers: PropTypes.array,
   handleDeleteMember: PropTypes.func,
   onMoreInfo: PropTypes.func,
   showOnlyMembers: PropTypes.bool,
   onOpenEditPopup: PropTypes.func,
   checkedAdmins: PropTypes.array,
   onMemberPause: PropTypes.func,
   bulkDelete: PropTypes.func,
   total: PropTypes.number,
   onlineUsers: PropTypes.array,
};

MemberTableHeader.propTypes = {
   isMember: PropTypes.bool,
};
