import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { BreadCrumb } from 'components/modules/breadcrumbs';
// import Input from 'components/elements/inputNew';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';
// import CommunityPostsRight from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPostsRight';
import Pagination from 'components/elements/Pagination';
import { getMemberRole } from 'utils/getMemberRoleCommunity';
// import { Popover } from '@material-ui/core';
import IconNew from 'components/elements/iconsSize';
import Button, { THEMES as themes, SIZES as buttonSizes } from 'components/elements/buttons/BaseButtonNew';
import DropTriggle from 'components/elements/newDropTriggle';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import Auth from 'utils/Auth';
import * as selectors from 'state/modules/community/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { communityButtonColors } from 'utils/communityButtonColors';
import RoomMemberEmpty from './RoomMembersComponents/RoomMemembersLeft/RoomMemberEmpty';
import RoomMembersLeft from './RoomMembersComponents/RoomMemembersLeft';

const options = {
   newest: 'Recently Added',
   oldest: 'Oldest First',
   A_Z: 'Name A to Z',
   Z_A: 'Name Z to A',
};

const firstOtions = {
   0: 'All Users',
   1: 'Online Members',
   2: 'Admins',
};


const Members = ({
   community, room, members, searchInput, setSearchInput, onInviteMember, user, data, filterOptions, setFilterOptions,
   handleChangePage, initialCount, goToMemberProfile, followUnfollow, deleteMember, handleReport, onlineUsers,
   suspendMember, banMember, goToMessenger, showPopup, setShowPopup, popupTitle, exportMembersCSV,
   setImportMembersModalOpen, updateMemberData,
}) => {
   const role = useSelector((state) => selectors.selectLoginedUserRole(state));

   const getOnlineCount = () => {
      return members.filter(e => onlineUsers.includes(e.id)).length;
   };
   const memberRole = getMemberRole(community.community_member, user.id);
   const actions = {
      isAdminView: community.user_id === user.id,
      banMember,
      suspendMember,
      userSubscribe: id => followUnfollow(id),
      isHiddenActions: (id) => id !== user.id,
      onReport: (id, text) => handleReport(community.id, id, text),
      onDelete: (id) => deleteMember(id),
      goToMemberProfile: (id) => goToMemberProfile(id),
      checkUserFollowing: (followers) => followers 
      && followers.filter((e) => e.follower_user_id === user.id).length > 0,
   };

   const [viewMode, setViewMode] = useState('list');

   // const [isOpenPersonMenu, setIsOpenPersonMenu] = useState(false);
   // const [anchorEl, setAnchorEl] = useState(null);
   // const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

   // const [isOpen, setIsOpen] = useState(true);
   // const init = useSelector(authUserSelector);

   // const onOpenPersonMenu = (e) => {
   //    setIsOpenPersonMenu(true);
   //    setAnchorEl(e.currentTarget);
   // };

   // const onClosePersonMenu = () => {
   //    setIsOpenPersonMenu(false);
   // };

   // const history = useHistory();

   // const goToMyAccount = () => {
   //    window.open(user.role === 1 ? '/admin/settings#general' : '/my-account#settings', '_blank');
   // };

   // const goToPricings = (id, communityPlanId) => {
   //    history.push(`/admin/community/${ id } /pricing/${ communityPlanId }`);
   // };

   // const goToCreatePricing = (id, courseId) => {
   //    history.push(`/admin/community/${ id }/pricing/${ courseId }/create`);
   // };
   
   // const goToGeneralSettings = (id) => {
   //    if (role === 'member') {
   //       history.push('/my-account#settings');
   //       return;
   //    }
   //    history.push(`/admin/community/${ id }/settings#general`);
   // };

   // const accountClick = () => {
   //    Auth.logout();
   //    history.push('/admin/suspended');
   // };

   // const handleNavigateMessanger = (comId) => {
   //    if (Array.isArray(permissions)) {
   //       goToMessenger(comId);
   //    } else if (permissions.direct_messaging) {
   //       goToMessenger(comId);
   //    } else {
   //       setShowPopup(true);
   //       setPopupTitle('Messaging');
   //    }
   // };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   // const goToBridge = (id) => {
   //    history.push(`/admin/community/${ id }/bridge`);
   // };


   const accountOptions = [
      {
         trash: false, iconName: 'BulkImport', name: 'Bulk Import', onClick: () => setImportMembersModalOpen(true),
      },
      {
         trash: false, iconName: 'ExportCsv', name: 'Export CSV', onClick: () => exportMembersCSV(),
      },
      // {
      //    trash: true, iconName: 'TrashSettingsM', name: 'Delete All Users', onClick: () => {},
      // },
   ];
   
   
   return (
      <div className='room__members__view'>
         {
            showPopup && createPortal(<PricingPopup
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         {/* <div className='community__top'> */}
         {/* <div className='room__members__view__top room__members__view__top__flex'> */}
         {/* <BreadCrumb
               links={ [{
                  text: community.name,
                  goTo: () => {},
               }] }
            /> */}
         {/* {initialCount !== 1 && (
                  <Input
                     placeholder='Search'
                     name='search'
                     type='search'
                     value={ searchInput }
                     onChange={ (name, value) => setSearchInput(value) }
                  />
               )} */}
         {/* <div className='community__top__actions'>
                  <div className='community__white__background'>
                     <div
                        className='community__top__action'
                        onClick={ () => handleNavigateMessanger(community.id) }
                        style={ { cursor: 'pointer' } }
                        role='presentation'
                     >
                        <TextWithIcon 
                           iconName='messengerCommunitySidebarS'
                           inner='Messenger'
                           iconColor='#24554E'
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           className='community_message_with_icon'
                           style={ { color: '#36796f', fontSize: '12px' } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                     </div>
                     <div className='community_person community__top__action' onClick={ onOpenPersonMenu } role='presentation'>
                        <img src={ init.picture_full_src } alt='avatar' />
                        <span className='community_person_name'>{init.name}</span>
                        <div style={ { transform: `rotate(${ isOpen ? '180deg' : '0deg' })` } }>
                           <IconNew name='ArrowSelectorS' />
                        </div>
                     </div>
                     <Popover
                        open={ isOpenPersonMenu }
                        anchorEl={ anchorEl }
                        onClose={ onClosePersonMenu }
                        className='notification-popover'
                        elevation={ 24 }
                        anchorOrigin={ {
                           vertical: 'bottom',
                           horizontal: 'center',
                        } }
                        transformOrigin={ {
                           vertical: 'top',
                           horizontal: 'center',
                        } }
                        PaperProps={ {
                           style: { width: '237px', left: '1266px !important' },
                        } }
                     >
                        <TextWithIcon 
                           iconName='PersonalTabM'
                           inner='My Profile'
                           iconColor={ false }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           onClick={ () => goToMyAccount() }
                           style={ { color: '#444C4B' } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                        {role !== 'member' && (
                           <TextWithIcon 
                              iconName='PricingPLanM'
                              inner='Billing'
                              iconColor={ false }
                              type={ types.regularDefaultSmall }
                              size={ sizes.small }
                              onClick={ () => {
                                 if (community.plan_id) {
                                    goToPricings(community.id, community.plan_id);
                                 } else {
                                    goToCreatePricing(community.id, community.owner_course?.id);
                                 }
                              } }
                              style={ { color: '#444C4B' } }
                              generalStyles={ {
                                 cursor: 'pointer',
                              } }
                           />
                        )}
                        {role === 'admin' && (
                           <TextWithIcon 
                              iconName='BridgeM'
                              inner='Bridge'
                              iconColor={ false }
                              type={ types.regularDefaultSmall }
                              size={ sizes.small }
                              onClick={ () => {
                                 goToBridge(community.id);
                              } }
                              style={ { color: '#444C4B' } }
                              generalStyles={ {
                                 cursor: 'pointer',
                              } }
                           />
                        )}
                        {role !== 'member' && (
                           <TextWithIcon 
                              iconName='settingsCommunitySidebarS'
                              inner='Account Settings'
                              iconColor={ false }
                              type={ types.regularDefaultSmall }
                              size={ sizes.small }
                              onClick={ () => {
                                 goToGeneralSettings(community.id);
                              } }
                              style={ { color: '#444C4B' } }
                              generalStyles={ {
                                 cursor: 'pointer',
                              } }
                           />
                        )}
                        <TextWithIcon 
                           iconName='AdminPopup'
                           inner='Log out'
                           iconColor={ false }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           onClick={ () => {
                              accountClick();
                           } }
                           style={ { color: '#444C4B' } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                     </Popover>
                  </div>
               </div> */}
         {/* </div> */}
         {/* </div> */}
         <div className='room__members__view__bottom'>
            <div className='room__members__view__bottom__content'>
               <div className='room__members__view__bottom__filter'>
                  {initialCount === 1 ? (
                     <Text
                        inner='1 Member'
                        type={ types.bold }
                        size={ sizes.size_28 }
                     />
                  ) : (
                     <Text
                        inner={ `${ getOnlineCount() } / ${ members.length } Members` }
                        type={ types.bold }
                        size={ sizes.size_28 }
                     />
                  )}
                  {initialCount !== 1 && (
                     <div className='right'>
                        <div className='viewMode'>
                           <div className={ `viewModeBox ${ viewMode === 'square' ? 'viewModeActive' : '' }` } onClick={ () => setViewMode('square') } role='presentation'>
                              <IconNew name='CommunitySquareMenu' />
                           </div>
                           <div className={ `viewModeBox ${ viewMode === 'list' ? 'viewModeActive' : '' }` } onClick={ () => setViewMode('list') } role='presentation'>
                              <IconNew name='CommunityHamburger' />
                           </div>
                        </div>
                        <div className='verticalLine' />
                        <SortButton
                           value={ filterOptions.filter }
                           filterType='Filter'
                           iconName='CommunityFilter'
                           options={ firstOtions }
                           onFilter={ (value) => setFilterOptions({ ...filterOptions, filter: value }) }
                           buttonStyles={ {
                              padding: '0px 12px',
                              fontSize: '12px',
                           } }
                        />
                        <SortButton
                           value={ filterOptions.sorting }
                           onFilter={ (value) => setFilterOptions({ ...filterOptions, sorting: value }) }
                           options={ options }
                           buttonStyles={ {
                              padding: '0px 12px',
                              fontSize: '12px',
                           } }
                        />
                        {role !== 'member' 
                        && (
                           <>
                              <div className='verticalLine' />
                              <Button
                                 text='Invite User'
                                 iconName='CommunityAddUserWhite'
                                 onClick={ () => { onInviteMember(community.id); } }
                                 isIconRight={ true }
                                 theme={ types.primary }
                                 size={ buttonSizes.xsmall }
                                 iconColor={ community?.community_settings?.branding?.color || '#fff' }
                                 isHidenDiv={ true }
                                 style={ {
                                    padding: '0px 14px', ...communityButtonColors(community),
                                 } }
                              />
                              <DropTriggle 
                                 activeStyles={ { 
                                    boxShadow: '0px 0px 4px #54938B', 
                                    background: '#A6C9C5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '7px',
                                 } } 
                                 options={ accountOptions } 
                              />
                           </>
                        )}
                     </div>
                  )}
               </div>
               {initialCount === 1 ? (
                  <RoomMemberEmpty
                     goToMemberProfile={ () => goToMemberProfile(members[0].id) }
                     member={ members[0] }
                     role={ memberRole }
                     room={ { name: 'Course Discusion' } }
                     onInviteMember={ onInviteMember }
                  />
               ) : (
                  <div className='room__members__view__bottom__content__left'>
                     <RoomMembersLeft
                        onlineUsers={ onlineUsers }
                        actions={ actions }
                        members={ members }
                        community={ community }
                        viewMode={ viewMode } 
                        updateMemberData={ updateMemberData }
                     />
                     {data.total > 1 && (
                        <Pagination
                           totalRecords={ data.total }
                           pageLimit={ 20 }
                           pageNeighbours={ 1 }
                           onPageChanged={ ({ currentPage }) => handleChangePage(currentPage) }
                        />
                     )}
                  </div>
               )}
            </div>
         </div>

      </div>
   );
};

Members.propTypes = {
   room: PropTypes.object,
   searchInput: PropTypes.string,
   user: PropTypes.object,
   setSearchInput: PropTypes.func,
   members: PropTypes.array,
   community: PropTypes.object,
   initialCount: PropTypes.number,
   data: PropTypes.object,
   deleteMember: PropTypes.func,
   handleReport: PropTypes.func,
   handleChangePage: PropTypes.func,
   onInviteMember: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   filterOptions: PropTypes.object,
   onlineUsers: PropTypes.array,
   followUnfollow: PropTypes.func,
   setFilterOptions: PropTypes.func,
   suspendMember: PropTypes.func,
   banMember: PropTypes.func,
   goToMessenger: PropTypes.func,
   setShowPopup: PropTypes.func, 
   updateMemberData: PropTypes.func, 
   showPopup: PropTypes.bool,
   popupTitle: PropTypes.string,
   exportMembersCSV: PropTypes.func,
   setImportMembersModalOpen: PropTypes.func,
};

export default Members;
