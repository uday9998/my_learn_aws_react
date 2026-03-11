import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { changeUserRole } from 'api';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes, SIZES as buttonSizes } from 'components/elements/buttons/BaseButtonNew';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import Info from 'components/elements/messages/info';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import IToolTipNew from 'components/elements/IToolTipNew';
import { useHistory } from 'react-router-dom';

import './index.scss';
import SimpleStatus from 'components/elements/SimpleStatus';

const reportOptions = [
   { title: 'Harassment', value: 'harassment', description: 'Disparaging or adversarial towards a person or group' },
   { title: 'Content is Spam', value: 'spam', description: 'Undisclosed promotion for a link or product' },
   { title: 'Plagiarism', value: 'plagiarism', description: 'Reusing content without attribution' },
   { title: 'Question Policy', value: 'policy', description: 'Repeatedly asking insincere or otherwise policy-violating questions' },
   { title: 'Another Reason', value: 'another', description: null },
];

const MemberItemSquare = ({
   member, isAdminView, isHiddenActions, onDelete, onReport, userSubscribe, roomName, checkUserFollowing,
   goToMemberProfile, isOnline, banMember, suspendMember, updateMemberData,
}) => {
   const [changeCommunityUserRole] = useSubmitForm(changeUserRole);
   const history = useHistory();
   const options = useRef({});
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenReportModal, setIsOpenReportModal] = useState(false);
   const [selectedOption, setSelectedOption] = useState('harassment');
   const anotherInputRef = useRef(null);
   const isFollower = checkUserFollowing(member.user_followers);
   const [isAdmin, setIsAdmin] = useState(member.pivot.user_type === 'admin');

   const handleChangeRole = () => {
      setIsAdmin(prevState => !prevState);

      changeCommunityUserRole({
         communityId: member.pivot.community_id,
         memberId: member.id,
         pivotId: member.pivot.id,
         userRole: isAdmin ? 'member' : 'admin',
      }, () => {
         updateMemberData(member.id, isAdmin ? 'member' : 'admin');
      });
   };

   options.current = [
      {
         trash: false, iconName: member.pivot?.is_suspended ? 'CommunityPlay' : 'CommunityPause', name: member.pivot?.is_suspended ? 'Resume Member' : 'Suspend Member', onClick: () => suspendMember(member.id),
      },
      {
         trash: false, iconName: member.pivot?.is_banned ? 'CommunityPermit' : 'CommunityBan', name: member.pivot?.is_banned ? 'Permit Member' : 'Ban Member', onClick: () => banMember(member.id),
      },
      {
         trash: false, iconName: 'CommunityChange', name: member.pivot.user_type === 'admin' ? 'Change To Member' : 'Change To Admin', onClick: handleChangeRole,
      },
      // {
      //    trash: false, iconName: 'CommunityChange', name: 'Change Member Role', onClick: () => {},
      // },
      {
         trash: true, iconName: 'TrashSettingsM', name: 'Remove User', onClick: () => setIsOpenDeleteModal(true),
      },
   ];
   if (!isAdminView) {
      options.current = [
         // {
         //    trash: false, iconName: 'CommunitySettingsMemberMuteM', name: 'Mute', onClick: () => {},
         // },
         {
            trash: true, iconName: 'CommunityReportM', name: 'Report User', onClick: () => setIsOpenReportModal(true),
         },
      ];
   }

   const handleReport = () => {
      const data = {
         type: selectedOption,
         text: selectedOption,
      };
      if (selectedOption === 'another') {
         data.text = anotherInputRef.current.value;
      }
      onReport(member.id, data.text);
      setIsOpenReportModal(false);
      setSelectedOption('harassment');
      anotherInputRef.current.value = '';
   };

   const goToMessenger = () => history.push({ pathname: 'messenger', state: { id: member.id } });

   function formatLastActiveTime(currentTimeStr, lastActiveStr) {
      const currentTime = new Date(currentTimeStr);
      const lastActiveTime = new Date(lastActiveStr);
      const timeDiff = currentTime - lastActiveTime;
      if (timeDiff === 0) {
         return 'Online';
      }
      const absTimeDiff = Math.abs(timeDiff);
      const totalSeconds = absTimeDiff / 1000;
      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const remainingAfterDays = totalSeconds % (24 * 60 * 60);
      const hours = Math.floor(remainingAfterDays / (60 * 60));
      const remainingAfterHours = remainingAfterDays % (60 * 60);
      const minutes = Math.floor(remainingAfterHours / 60);
      if (days > 1) {
         return `Active ${ days } days ago`;
      } if (days === 1) {
         return 'Active 1 day ago';
      } if (hours >= 1) {
         return `Active ${ hours }h ago`;
      } 
      return `Active ${ minutes }m ago`;
   }

   return (
      <>
         {isOpenReportModal && (
            <ModalNew onCloseModal={ () => {
               setSelectedOption('harassment');
               setIsOpenReportModal(false);
            } }
            >
               <div className='member__item__report'>
                  <div className='member__item__report__top'>
                     <Text
                        inner='Report User'
                        type={ types.medium }
                        size={ sizes.xxlarge }
                     />
                     <div className='member__item__report__user'>
                        <div className='member__item__report__user__image'>
                           <img src={ member.picture_src || member.picture_full_src } alt='' />
                           {isOnline && (
                              <div className='member__item__report__user__status' />
                           )}
                        </div>
                        <Text
                           inner={ member.name }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </div>
                     <Info title='Select the reason you are reporting this user' isHaveCancel={ false } />
                  </div>
                  <div className='member__item__report__options'>
                     {reportOptions.map((e) => {
                        if (e.description) {
                           return (
                              <CheckboxCircle
                                 isChecked={ selectedOption === e.value }
                                 description={ e.description }
                                 onCheck={ () => setSelectedOption(e.value) }
                                 label={ e.title }
                              />
                           );
                        }
                        return (
                           <CheckboxCircle
                              isChecked={ selectedOption === e.value }
                              onCheck={ () => setSelectedOption(e.value) }
                              label={ e.title }
                              inputOptions={ {
                                 placeholder: 'Add your reason',
                                 inputRef: anotherInputRef,
                                 onChange: () => {},
                              } }
                           />
                        );
                     })}
                  </div>
                  <div className='member__item__report__buttons'>
                     <Button
                        text='Cancel'
                        theme={ themes.secondary }
                        onClick={ () => {
                           setSelectedOption('harassment');
                           setIsOpenReportModal(false);
                        } }
                     />
                     <Button
                        text='Repoort User'
                        theme={ themes.red }
                        onClick={ () => handleReport() }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to remove this user?'
               onCancel={ () => {
                  setIsOpenDeleteModal(false);
               } }
               onDelete={ () => {
                  onDelete(member.id);
                  setIsOpenDeleteModal(false);
               } }
               deleteText='Remove Member'
            />
         )}
         <div className='member__item__square'>
            <div className='member__item__left' role='presentation' onClick={ () => goToMemberProfile(member.id) }>
               <div className='member__item__left__image__square'>
                  <img src={ member.picture_src || member.picture_full_src } alt='' />
                  {isOnline && (
                     <div className='member__item__left__image__status' />
                  )}
               </div>
            </div>
            <div className='member__item__right'>
               <div className='member__item__title'>
                  <div className='member__item__title__icons'>
                     <Text
                        inner={ member.name }
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                     {member?.pivot?.user_type === 'admin' && <SimpleStatus color={ member.role === 0 ? 'black' : 'green' } text={ member.role === 0 ? 'Administrator' : 'Owner' } />}
                     {!!member.pivot?.is_banned && (
                        <IToolTipNew tooltip='Banned Member' iconName='CommunityBan' color='rgb(209, 45, 54)' id={ `${ member }banned` } />
                     )}
                     {!!member.pivot?.is_suspended && (
                        <IToolTipNew tooltip='Suspended Member' iconName='CommunityPause' color='rgb(209, 45, 54)' id={ `${ member }suspended` } />
                     )}
                  </div>
                  {isHiddenActions(member.id) 
               && (
                  <DropTriggle
                     activeStyles={ { boxShadow: '0px 0px 4px #54938B', background: '#E8F2F1', border: '1px solid #36796F' } }
                     options={ options.current }
                  />
               )}
               </div>
               <div>
                  <Text
                     inner={ `Access to: ${ member.room ? member.room : 'All rooms' }` }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                  />
               </div>
               {isHiddenActions(member.id) 
               && (
                  <div className='member__item__buttons'>
                     {isFollower ? (
                        <Button
                           text='Unfollow'
                           onClick={ () => userSubscribe(member.id) }
                           theme={ themes.error }
                           size={ buttonSizes.small }
                           style={ { minWidth: '88px', width: '88px', fontSize: '14px' } }
                        />
                     ) : (
                        <Button
                           text={ `Follow | ${ member.follow_count }` }
                           theme={ themes.secondary }
                           size={ buttonSizes.small }
                           style={ {
                              minWidth: '88px', width: '88px', height: '32px', fontSize: '14px',
                           } }
                           onClick={ () => userSubscribe(member.id) }
                        />
                     )}
                     {(isAdminView || (member.role !== 0)) && (
                        <Button
                           text='Message'
                           onClick={ () => goToMessenger(member.id) }
                           theme={ types.primary }
                           size={ buttonSizes.small }
                           style={ { minWidth: '88px', width: '88px', fontSize: '14px' } }
                        />
                     )}
                  </div>
               )
               }
            </div>
         </div>
      </>
   );
};

MemberItemSquare.propTypes = {
   member: PropTypes.object,
   userSubscribe: PropTypes.func,
   isAdminView: PropTypes.bool,
   goToMemberProfile: PropTypes.func,
   roomName: PropTypes.string,
   onDelete: PropTypes.func,
   onReport: PropTypes.func,
   checkUserFollowing: PropTypes.func,
   isOnline: PropTypes.bool,
   isHiddenActions: PropTypes.func,
   banMember: PropTypes.func,
   suspendMember: PropTypes.func,
   updateMemberData: PropTypes.func,
};

export default MemberItemSquare;
