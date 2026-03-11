/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './index.scss';
import Text, {
   TYPES as types, SIZES as sizes, TextWithIcon, 
} from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import ModalNew from 'components/elements/ModalNew';
import DeleteModal from 'components/elements/DeleteModal';
import { connect, useSelector } from 'react-redux';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import { push } from 'connected-react-router';
import QueryParams from 'utils/QueryParams';
import Router from 'routes/router';
import Line from 'components/elements/Line';
import { useHistory } from 'react-router-dom';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { communityButtonColors } from 'utils/communityButtonColors';
import CommunitySelectItem from '../CommunitySelectItem';
// import communityLogo from './community_logo.png';

export const clearHash = () => QueryParams.setHash('');

const CommunitySideBar = ({
   community,
   goToRoomCreate,
   selectedRoom,
   deleteExternalLink,
   createExternalLink,
   handleSelectRoom,
   goToGeneralSettings,
   goToCommunity,
   selectCourse,
   role,
   goToMessenger,
   goToMembers,
   goToPricings,
   goToCreatePricing,
   user,
   goToInviteMember,
   goToRoomSettings,
   menuTab,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [isOpenLink, setIsOpenLink] = useState(false);
   const history = useHistory();
   
   const [linkContent, setLinkContent] = useState({
      text: '',
      url: '',
   });
   const [isOpenSideBar, setIsOpenSideBar] = useState(true);
   const eventDefaultQuery = '?type=events&status=upcoming';
   const postDefaultQuery = '?type=posts&status=community';
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const [toDeleteId, setToDeleteId] = useState(null);
   const [errorMessages, setErrorMessages] = useState({});
   
   const clearErrorMessages = () => {
      setErrorMessages({});
   };

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   const isActiveSettings = window.location.href.includes('settings') && !window.location.href.includes('room');
   const isActivePricing = window.location.href.includes('pricing') && !window.location.href.includes('room');
   const isActiveMessenger = window.location.href.includes('messenger') && window.location.href.includes('community');
   const isActiveAccount = false;
   const goToMyAccount = () => {
      window.open(role === 'admin' ? '/admin/settings#general' : '/my-account#settings', '_blank');
   };
   const items = role === 'admin' ? [
      {
         isActive: isActiveMessenger, iconName: 'messengerCommunitySidebarS', name: 'Messenger', goTo: () => goToMessenger(community.id),
      },
      {
         isActive: isActiveSettings, iconName: isActiveSettings ? 'settingsCommunitySidebarSActive' : 'settingsCommunitySidebarS', name: 'Settings', goTo: () => goToGeneralSettings(community.id),
      },
      {
         isActive: isActivePricing, iconName: isActivePricing ? 'PricingPLanMActive' : 'PricingPLanM', name: 'Price', goTo: community.plan_id ? () => goToPricings(community.id, community.plan_id) : () => goToCreatePricing(community.id, community.owner_course?.id),
      },
      {
         isActive: isActiveAccount, iconName: 'PersonalTabM', name: 'My Account', goTo: () => goToMyAccount(),
      },
   ] : [
      {
         isActive: isActiveMessenger, iconName: 'messengerCommunitySidebarS', name: 'Messenger', goTo: () => goToMessenger(community.id),
      },
      {
         isActive: isActiveMessenger, iconName: 'PersonalTabM', name: 'My Account', goTo: () => goToMyAccount(),
      },
   ];
   const linkTextInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setLinkContent({
         ...linkContent,
         [name]: value,
      });
   };
   const handleRemoveLink = (id, callBack) => {
      deleteExternalLink(community.id, community.room_groups[2].id, id, callBack);
   };

   const handleAddLink = (content, callBack) => {
      createExternalLink(community.id, community.room_groups[2].id, content, callBack, addErrorsFromQuery);
   };

   const onSelectRoom = (room) => {
      // if (window.location.pathname.includes('admin')) {
      // goToCommunity(community.id);
      // }
      if (menuTab) {
         menuTab();
      }
      handleSelectRoom(
         community.id,
         room.id,
         community.room_groups[0].id,
         room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
      );
   };

   const clickCourse = (course) => {
      const isFromSchoolRoom = window.location.href.includes('offers');
      if (isFromSchoolRoom) {
         window.open(`/programs/${ course.url }`);
         return;
      }
      if (course.community_id) {
         goToCommunity(course.community_id);
      } else {
         selectCourse(course.id);
      }
   };

   const getRoomId = () => {
      const location = window.location.href;
      if (location.includes('create') || isActiveMessenger || location.includes('settings') || location.includes('room')
      || location.includes('member')) {
         return null;
      }
      const hash = QueryParams.getHash();
      if (location.includes('invite') || location.includes('home')) {
         if (!hash) {
            return null;
         }
         return Number.parseFloat(hash);
      }
      return selectedRoom.id;
   };

   const getSideBarItems = () => {
      if (role !== 'admin') {
         return community.rooms;
      }
      // return [{ name: 'Welcome', id: 'welcome' }, ...community.rooms] || [{ name: 'Welcome', id: 'welcome' }];
      return community.rooms;
   };

   const trialHeader = document.querySelector('.trial');

   const height = (window.location.pathname.includes('settings') || window.location.pathname.includes('messenger') || window.location.pathname.includes('pricing')) ? 'calc(100vh - 72px)' : '100%';

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <>
         {isOpenDeletePopup && (
            <div className='m-popup'>
               <DeleteModal
                  onDelete={ () => {
                     handleRemoveLink(toDeleteId, () => setIsOpenDeletePopup(false));
                  } }
                  onCancel={ () => setIsOpenDeletePopup(false) }
                  deleteText='Delete'
                  title='Are you sure you want to delete the link?'
               />
            </div>
         )}
         {
            showPopup && createPortal(<PricingPopup handleClosePopup={ handleClosePopup } />, document.body)
         }
         {isOpenLink && (
            <ModalNew
               onCloseModal={ () => {
                  clearErrorMessages();
                  setIsOpenLink(false);
                  setLinkContent({
                     text: '',
                     url: '',
                  });
               } }
            >
               <div className='trix__add__link'>
                  <div className='trix__add__link__top'>
                     <Text
                        inner='Add Link'
                        type={ types.medium160 }
                        size={ sizes.xlarge }
                     />
                     <Input
                        label='Link Text'
                        name='text'
                        errorMessages={ errorMessages.text }
                        value={ linkContent.text }
                        onChange={ linkTextInputChange }
                        placeholder='Input link display text here'
                     />
                     <Input
                        label='Link'
                        name='url'
                        errorMessages={ errorMessages.url }
                        placeholder='https://miestro.com'
                        value={ linkContent.url }
                        onChange={ linkTextInputChange }
                     />
                  </div>
                  <div className='trix__add__link__button'>
                     <Button
                        onClick={ () => {
                           handleAddLink(linkContent, () => {
                              setLinkContent({});
                              setIsOpenLink(false);
                           });
                        } }
                        text='Apply'
                        style={ communityButtonColors(community) }
                        disabled={ (linkContent && !linkContent.url?.trim()) 
                           || (linkContent && !linkContent.text?.trim()) }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         <div
            className={ `community__sidebar${ isActiveSettings ? ' community__sidebar__full' : '' } opened` }
            style={ {
               minHeight: trialHeader ? 'calc(100vh - 109px)' : height,
               maxHeight: trialHeader ? 'calc(100vh - 109px)' : height,
            } }
         >
            <div className='community__sidebar__preview'>
               {/* <div className='community__sidebar__preview__logo'> */}
               {/* <img src={ community.file_id ? community.file_id : communityLogo } alt='' /> */}
               {/* <img src={ community.file_id ? community.file_id : process.env.REACT_APP_COMMUNITY_DEFAULT } alt='' /> */}
               {/* <img src={ communityLogo } alt='community_logo' /> */}
               {/*  </div> */}
               {/* <div className='community__sidebar__preview__texts'> */}
        
               {/* <div className='community__sidebar__preview__box'> */}
               {/* <Text
                        inner={ community.name }
                        type={ types.bold }
                        size={ sizes.xlarge_new }
                     /> */}
               {/* <IconNew name='ArrowRightCommunity' /> */}
               {/* </div> */}
               {/* {community.description && (
                     <TextWithTooltip
                        inner={ community.description }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        tooltipWithoutIcon={ community.description }
                        nameLength={ 60 }
                     />
                  )} */}
               {/* </div> */}
               {/* <Line /> */}
               {/* {role === 'admin' && window.location.pathname.includes('admin') && (
                  <div
                     className='community__sidebar__preview__home'
                     onClick={ () => goToHome(community.id) }
                     role='presentation'
                     style={ { backgroundColor: history.location.pathname.includes('home') ? '#E8F2F1' : 'inherit' } }
                  >
                     <IconNew name='CommunityHome' />
                     <Text
                        inner='Home'
                        type={ types.regular148 }
                        size={ sizes.small }
                        style={ { color: '#444C4B' } }
                     />
                  </div>
               )} */}
               {/* <div 
                  className='community__sidebar__preview__members' 
                  onClick={ () => goToMembers(community.id) }
                  role='presentation' 
                  style={ { backgroundColor: history.location.pathname.includes('members') ? '#E8F2F1' : 'inherit' } }
               >
                  <div className='community__sidebar__preview__members__left'>
                     {
                        community.community_member && (
                           <IconNew name='UsersCommunityM' />
                        )
                     }
                     <Text
                        inner='Members'
                        type={ types.regular148 }
                        size={ sizes.small }
                        style={ { color: '#444C4B', whiteSpace: 'nowrap' } }
                     />
                  </div>
                  <div className='community__sidebar__preview__members__right'>
                     {role === 'admin' && (
                        <Text
                           inner={ community.community_member.length }
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                        />
                     )}
                  </div>
               </div> */}
               {community && community.community_courses && community.community_courses.length > 0 && (
                  <>
                     <Line />
                     <div className='community__sidebar__preview__programs'>
                        {community.community_courses.map((e, index) => {
                           return (
                              <div
                              // eslint-disable-next-line react/no-array-index-key
                                 key={ index }
                                 role='presentation'
                                 className='community__sidebar__preview__program'
                                 onClick={ () => clickCourse(e) }
                              >
                                 <TextWithIcon
                                    inner={ e.name }
                                    iconName='ProgramCommunityS'
                                    type={ types.medium150 }
                                    size={ sizes.xsmall }
                                    style={ { color: '#444C4B' } }
                                 />
                                 <div className='community__sidebar__preview__program__icon'>
                                    <IconNew name='ArrowRightCommunityS' />
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </>
               )}

               {/* <div
                  className='community_sidebar_switcher'
                  role='presentation'
                  onClick={ () => setIsOpenSideBar(!isOpenSideBar) }
               >
                  <IconNew name='ChevronLeftL' style={ !isOpenSideBar ? { transform: 'rotate(180deg)' } : {} } />
               </div> */}

            </div>
            <div className='community__sidebar__top'>
               <div className='community__sidebar__sections'>
                  <CommunitySelectItem
                     title='Rooms'
                     onInviteMember={ goToInviteMember }
                     role={ role }
                     isHavePlus={ role === 'admin' || ((role === 'subadmin' || community.allow_create_room === 1) && !community.userSuspended) }
                     onClick={ (item) => {
                        setIsOpenSideBar(false);
                        onSelectRoom(item);
                     } }
                     onPlus={ () => {
                        clearHash();
                        goToRoomCreate(community.id);
                     } }
                     selectedId={ getRoomId() }
                     iconName='wave'
                     items={ getSideBarItems() }
                     community={ community }
                     user={ user }
                     goToRoomSettings={ goToRoomSettings }
                  />
                  <CommunitySelectItem
                     title='External Sources'
                     isHavePlus={ role === 'admin' }
                     onPlus={ () => {
                        clearHash();
                        setIsOpenLink(true);
                     } }
                     iconName='LinkCommunityM'
                     isHaveDelete={ role === 'admin' }
                     selectedId={ null }
                     onClick={ (item) => window.open(item.url, '_blank') }
                     onDelete={ (id) => {
                        setToDeleteId(id);
                        setIsOpenDeletePopup(true);
                     } }
                     items={ community?.room_groups?.[2]?.external_source || [] }
                  />
                  {/* {role === 'admin' && (
                        <IconNew name='plusSelectorM' />
                     )} */}
               </div>
            </div>
            {/* {items.length !== 0 && (
               <div className='community__sidebar__bottom'>
                  {items.map((i) => {
                     return (
                        <div
                           key={ uniqueId() }
                           style={ {
                              background: i.isActive ? '#E8F2F1' : 'inherit',
                           } }
                           className='community__sidebar__bottom__item'
                        >
                           <TextWithIcon 
                              iconName={ i.iconName }
                              inner={ i.name }
                              iconColor={ i.isActive ? '#24554E' : null }
                              type={ types.regularDefaultSmall }
                              size={ sizes.small }
                              onClick={ () => {
                                 if (!Array.isArray(permissions)) {
                                    if (i.name === 'Messenger' && permissions.commmunities.direct_messaging) {
                                       i.goTo();
                                    } else if (i.name === 'Settings' && permissions.commmunities.customization) {
                                       i.goTo();
                                    } else if (i.name !== 'Messenger' && i.name !== 'Settings') {
                                       i.goTo();
                                    } else {
                                       setShowPopup(true);
                                    }
                                 } else {
                                    i.goTo();
                                 }
                              } }
                              style={ { color: i.isActive ? '#24554E' : '#444C4B' } }
                              generalStyles={ {
                                 cursor: 'pointer',
                              } }
                           />
                           {i.name === 'Messenger' && community.count_unread_messages > 0 && (
                              <div className='community__sidebar__bottom__item__unread'>
                                 <Text
                                    inner={ community.count_unread_messages }
                                    type={ types.medium150 }
                                    size={ sizes.xsmall }
                                    style={ { color: '#fff' } }
                                 />
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            )} */}
         </div>
      </>

   );
};

const mapStateToProps = state => {
   return {
      community: selectors.communitySelector(state),
      role: selectors.selectLoginedUserRole(state),
      progress: selectors.communityProgressSelector(state),
      selectedRoom: selectors.selectedRoomSelector(state),
      initialEventsLength: selectors.initialEventsLengthSelector(state),
      isFetchingRoom: selectors.isFetchingRoomSelector(state),
      sortingOptions: selectors.sortingOptionsSelector(state),
      selectedEvent: selectors.selectedEventSelector(state),
      locationCounts: selectors.locationCountsStateSelector(state),
      accessCounts: selectors.accessCountsStateSelector(state),
      initialPostsLength: selectors.initialPostsLengthSelector(state),
      initialEvents: selectors.initialEventsSelector(state),
   };
};

const mapDispatchToProps = dispatch => {
   return {
      goToRoomCreate: id => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getCompiledPath({
                  id,
               })
            )
         );
      },
      goToInviteMember: (id, roomId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getCompiledPath({
                  id,
               }) }${ roomId ? `#${ roomId }` : '' }`
            )
         );
      },
      goToGeneralSettings: (communityId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_SETTINGS').getCompiledPath({
                  id: communityId,
               })
            )
         );
      },
      goToPricings: (id, communityPlanId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_PRICING').getCompiledPath({
                  planId: communityPlanId,
                  id,
               }) }#main`
            )
         );
      },
      goToCreatePricing: (id, courseId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_PRICING_CREATE').getCompiledPath({
                  id,
                  courseId,
               }) }`
            )
         );
      },
      goToMessenger: (communityId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MESSENGAR').getCompiledPath({
                  id: communityId,
               })
            )
         );
      },
      goToMembers: (communityId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBERS').getCompiledPath({
                  id: communityId,
               })
            )
         );
      },
      goToCommunity: id => {
         dispatch(push(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id })));
      },
      handleSelectRoom: (communityId, roomId, groupId, query) => {
         dispatch(
            operations.getRoomAndFilterOperation(communityId, roomId, groupId, query)
         );
      },
      createExternalLink: (communityId, groupId, inputs, callBack, onError) => {
         dispatch(operations.createExternalLinkOperation(communityId, groupId, inputs, callBack, onError));
      },
      deleteExternalLink: (communityId, groupId, id, callBack) => {
         dispatch(operations.deleteExternalLinkOperation(communityId, groupId, id, callBack));
      },
      selectCourse: (id) => {
         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id })));
      },
      goToRoomSettings: (id, roomId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_SETTINGS').getCompiledPath({
                  id,
                  roomId,
               })
            )
         );
      },
   };
};


CommunitySideBar.propTypes = {
   goToRoomCreate: PropTypes.func,
   selectedRoom: PropTypes.object,
   handleSelectRoom: PropTypes.func,
   selectCourse: PropTypes.func,
   community: PropTypes.object,
   createExternalLink: PropTypes.func,
   deleteExternalLink: PropTypes.func,
   goToGeneralSettings: PropTypes.func,
   goToCommunity: PropTypes.func,
   role: PropTypes.string,
   goToMessenger: PropTypes.func,
   goToMembers: PropTypes.func,
   goToPricings: PropTypes.func,
   goToCreatePricing: PropTypes.func,
   user: PropTypes.object,
   goToInviteMember: PropTypes.func,
   goToRoomSettings: PropTypes.func,
   menuTab: PropTypes.func,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CommunitySideBar);
