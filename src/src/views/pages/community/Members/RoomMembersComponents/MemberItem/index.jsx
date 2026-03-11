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
import SimpleStatus from 'components/elements/SimpleStatus';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';
import moment from 'moment';
import IconNew from 'components/elements/iconsSize';
import { useHistory } from 'react-router-dom';
import IToolTipNew from 'components/elements/IToolTipNew';
import { formatLastActiveTime } from 'utils/formatLastActiveTime';
import IToolTIpText from 'components/elements/IToolTIpText';

import './index.scss';

const reportOptions = [
   { title: 'Harassment', value: 'harassment', description: 'Disparaging or adversarial towards a person or group' },
   { title: 'Content is Spam', value: 'spam', description: 'Undisclosed promotion for a link or product' },
   { title: 'Plagiarism', value: 'plagiarism', description: 'Reusing content without attribution' },
   { title: 'Question Policy', value: 'policy', description: 'Repeatedly asking insincere or otherwise policy-violating questions' },
   { title: 'Another Reason', value: 'another', description: null },
];

const MemberItem = ({
   member, isAdminView, isHiddenActions, onDelete, onReport, userSubscribe, roomName, checkUserFollowing,
   goToMemberProfile, isOnline, banMember, suspendMember, community, updateMemberData,
}) => {
   const [changeCommunityUserRole] = useSubmitForm(changeUserRole);
   const [showPopup, setShowPopup] = useState(false);
   const history = useHistory();
   const options = useRef({});
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenReportModal, setIsOpenReportModal] = useState(false);
   const [selectedOption, setSelectedOption] = useState('harassment');
   const [showVisit, setShowVisit] = useState(false);
   const anotherInputRef = useRef(null);
   const isFollower = checkUserFollowing(member.user_followers);
   const [isAdmin, setIsAdmin] = useState(member.pivot.user_type === 'admin');
   
   const handleChangeRole = () => {
      changeCommunityUserRole({
         communityId: member.pivot.community_id,
         memberId: member.id,
         pivotId: member.pivot.id,
         userRole: isAdmin ? 'member' : 'admin',
      }, () => {
         updateMemberData(member.id, isAdmin ? 'member' : 'admin');
      });
      setIsAdmin(prevState => !prevState);
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
   } else if (member.pivot.user_type === 'admin') {
      options.current = [
         {
            trash: false, iconName: member.pivot?.is_suspended ? 'CommunityPlay' : 'CommunityPause', name: member.pivot?.is_suspended ? 'Resume Member' : 'Suspend Member', onClick: () => suspendMember(member.id),
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

   // const handleGoTomemberProfile = (id) => {
   //    if (!Array.isArray()) {
   //       if (permissions.commmunities.member_profile) {
   //          goToMemberProfile(id);
   //       } else {
   //          setPopupTitle('Member Profile')
   //          setShowPopup(true);
   //       }
   //    } else {
   //       goToMemberProfile(id);
   //    }
   // };

   const handleClosePopup = () => {
      setShowPopup(false);
   };
   const goToMessenger = (uuid, role) => history.push({ pathname: 'messenger', state: { uuid, role } });

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
         <div className='member__item' onMouseEnter={ () => setShowVisit(true) } onMouseLeave={ () => setShowVisit(false) }>
            {
               showPopup && createPortal(<PricingPopup 
                  handleClosePopup={ handleClosePopup }
               />, document.body)
            }
            <div className='member__item__left' role='presentation' onClick={ () => goToMemberProfile(member.id) }>
               <div className='member__item__left__image'>
                  <img src={ member.picture_src || member.picture_full_src } alt='' />
                  {isOnline && (
                     <div className='member__item__left__image__status' />
                  )}
               </div>
               <div className='member__item__left__text'>
                  <div>
                     <Text
                        inner={ member.name }
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                     {!!member.pivot?.is_banned && (
                        <IToolTipNew tooltip='Banned Member' iconName='CommunityBan' color='rgb(209, 45, 54)' id={ `${ member }banned` } />
                     )}
                     {!!member.pivot?.is_suspended && (
                        <IToolTipNew tooltip='Suspended Member' iconName='CommunityPause' color='rgb(209, 45, 54)' id={ `${ member }suspended` } />
                     )}
                     {member?.pivot?.user_type === 'admin' && <SimpleStatus color={ member.role === 0 ? 'black' : 'green' } text={ member.role === 0 ? 'Administrator' : 'Owner' } />}
                     {
                        showVisit && (
                           <div className='memberProfile'>
                              <span className='memberProfileTitle'>Visit Profile</span>
                              <IconNew name='ArrowRight' />
                           </div>
                        )
                     }
                  </div>
                  <div>
                     {(!member.room || member.room?.length < 33) && (
                        <Text
                           inner={ `Access to: ${ member.room ? member.room : 'All rooms' }` }
                           type={ types.regularDefault }
                           size={ sizes.small14 }
                        />
                     )}
                     {member.room && member.room.length > 32
                      && (
                         <div className='communityAccess'>
                            <IToolTIpText title='' tooltip={ member.room } isStatus={ true }>
                               <Text
                                  inner={ `Access to: ${ member.room ? member.room : 'All rooms' }` }
                                  type={ types.regularDefault }
                                  size={ sizes.small14 }
                               />
                            </IToolTIpText>
                         </div>
                      )}
                  </div>
               </div>
            </div>
            {isHiddenActions(member.id) && (
               <div className='member__item__right'>
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
                           minWidth: '88px', width: '88px', height: '32px', fontSize: '14px', ...communitySecondaryButtonColors(community),
                        } }
                        onClick={ () => userSubscribe(member.id) }
                     />
                  )}
                  {/* {(isAdminView || (member.role !== 0)) && ( */}
                     <Button
                        text='Message'
                        onClick={ () => goToMessenger(member.uuid, member.role ? 'admin' : 'member') }
                        theme={ types.primary }
                        size={ buttonSizes.small }
                        style={ {
                           minWidth: '88px', width: '88px', fontSize: '14px', ...communityButtonColors(community), 
                        } }
                     />
                  {/* )} */}
                  <DropTriggle
                     activeStyles={ { 
                        boxShadow: '0px 0px 4px #54938B', 
                        background: '#A6C9C5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '9px', 
                     } }
                     options={ options.current }
                  />
               </div>
            )}
            <div className='member_item_info'>
               <div className='memberSince'>
                  <IconNew name='Calendar' />
                  <Text
                     inner='Member Since:'
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                  />
                  <Text
                     inner={ moment(member.created_at).format('MMMM DD, YYYY') }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: '#727978' } }
                  />
               </div>
               <div className='memberActivity'>
                  <IconNew name='Clock' />
                  <Text
                     inner='Activity:'
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                  />
                  <Text
                     inner={ formatLastActiveTime(Date.now(), member.last_login_at) }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: '#727978' } }
                  />
               </div>
            </div>
         </div>
      </>
   );
};

MemberItem.propTypes = {
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
   updateMemberData: PropTypes.func,
   suspendMember: PropTypes.func,
   community: PropTypes.object,
};

export default MemberItem;
