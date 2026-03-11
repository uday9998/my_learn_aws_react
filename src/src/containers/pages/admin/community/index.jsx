/* eslint-disable max-len */
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Router from 'routes/router';
import CommunityView from 'views/pages/community';
// import CommunityWelcomePage from 'views/pages/community/communityWelcome';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
// import CommunityWelcomePage from 'views/pages/community/communityWelcome';
import { changeSortOptions, resetSelectedRoomAction, updateSearchInput } from 'state/modules/community/actions';
import QueryParams from 'utils/QueryParams';
import { isTodayBeforeCreatedAt } from 'utils/isTodayBeforeCreatedAt';
import CommunityPosts from 'views/pages/CommunityPosts';
import { useSearch } from 'utils/hooks/useSearch';
import CommunityHeader from 'components/modules/community/CommunityHeader';
import { setPrimaryColors } from 'utils/pageBuilder/schoolRoomColor';
import { siteInfoSelector } from 'state/modules/common/selectors';
import CommunityMenu from 'containers/pages/admin/community/menu';
import CommunityMenuFooter from 'containers/pages/admin/community/menuFooter';
import CommunityBanner from 'views/pages/community/banner';
import BridgeInformation from 'views/pages/DesignCourse/BridgeInformation';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   generateCheckoutToken, enrollMemberToFreeOffer,
   apiUrl,
} from 'api';
import UserModal from 'components/elements/UserModal';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import classNames from 'classnames';
import {
   changeAuth,
} from 'state/modules/common/actions';
import socketIOClient from 'socket.io-client';
import Members from 'containers/pages/admin/community/members';
import { appSelector } from '../../../../state/modules/common/selectors';
import CommunityProducts from './products';
import EventsCalendar from './EventsCalendar';

export const clearHash = () => QueryParams.setHash('');

const Community = ({
   match,
   goToRoomCreate,
   getCommunity,
   progress,
   community,
   eventProgress,
   goToInviteMember,
   goToEvent,
   user,
   selectedRoom,
   handleSelectRoom,
   handlePinOrUnPin,
   handleArchive,
   handleDuplicate,
   isFetchingRoom,
   handleSortOptionsChange,
   sortingOptions,
   handleSelectEvent,
   selectedEvent,
   accessCounts,
   initialEventsLength,
   handleFilter,
   openEventSettingsPage,
   locationCounts,
   handleBulkRemove,
   handleDeleteRoom,
   initialPostsLength,
   goToPostCreate,
   initialEvents,
   commentPost,
   commentReplyPost,
   postCommentLike,
   postLike,
   selectCourse,
   createPost,
   createExternalLink,
   deleteExternalLink,
   goToRoomSettings,
   notificationChangeSave,
   goToGeneralSettings,
   userVote,
   goToMemberProfile,
   handleOpenRoomMembers,
   markAsRead,
   role,
   goToProducts,
   searchValue,
   setSearchValue,
   commentEvent,
   eventCommentLike,
   postDelete,
   eventReplyComment,
   postCommentDelete,
   eventCommentDelete,
   resetSelectedRoom,
   goToCommunity,
   goToMessenger,
   changeCommunityBanner,
   bannerProgress,
   createBridge,
   goToLogin,
   handlePostPinOrUnPin,
   changeAuthAction,
   uuid,
   handleEventSave,
   eventSettingsProgress,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [notificationsCount, setNotificationsCount] = useState(0);

   const { isMobile } = useWindowSizeChange();

   const [userPopup, setUserPopup] = useState(user && user.picture_src && !user.picture_src.includes('account/user.png'));
   const [
      attachMemberToFreeOffer,
      { loading: isLoadingAttachMemberToFreeOffer },
   ] = useSubmitForm(enrollMemberToFreeOffer);

   const goToCheckout = async (data) => {
      if (data.pricings && data.pricings[0] && data.plan_id) {
         if (data.pricings[0].pricing_type === 0 && data.pricings.length === 1) {
            if (user) {
               attachMemberToFreeOffer(data.plan_id, () => {
                  getCommunity(match.params.id, user?.id, null, goToCheckout);
               });
            } else {
               goToLogin();
            }
         } else {
            let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ data?.checkout_url?.url || siteInfo.site_uuid }/${ user?.id || 0 }/${ data.plan_id }`;
            if (user) {
               const { data: checkoutToken } = await generateCheckoutToken({ planId: data.plan_id, pricingId: data.pricings[0].id });
               url = `${ process.env.REACT_APP_CHECKOUT_URL }${ data?.checkout_url?.url || siteInfo.site_uuid }/${ user?.id || 0 }/${ data.plan_id }?jwt=${ checkoutToken }`;
            }
            window.open(url, '_self');
         }
      } else {
         goToProducts();
      }
   };

   useEffect(() => {
      getCommunity(match.params.id, user?.id, null, goToCheckout);
      setPrimaryColors(siteInfo);
      return () => {
         resetSelectedRoom();
      };
   }, [match.params.id]);

   const [getIds, setGetIds] = useState({
      groupId: null,
      communityId: null,
   });


   const [selectedEventTab, setSelectedEventTab] = useState('upcoming');
   const [selectedPostTab, setSelectedPostTab] = useState('community');
   const [date, setDate] = useState();

   const eventDefaultQuery = `?type=events&status=${ selectedEventTab }`;
   const postDefaultQuery = `?type=posts&status=${ selectedPostTab }`;

   useEffect(
      () => {
         if (!progress) {
            setGetIds({
               groupId: community.room_groups[0].id,
               communityId: match.params.id,
            });
            if (!match.path.includes('calendar') && !match.path.includes('products') && !match.path.includes('bridge') && !match.path.includes('members')) {
               const initialRoomId = QueryParams.getHash().split('-');
               if (!isMobile && !initialRoomId[1] && (!selectedRoom || selectedRoom.id === 'welcome') && community.rooms[0]) {
                  handleSelectRoom(
                     match.params.id,
                     community.rooms[0].id,
                     community.room_groups[0].id,
                     community.rooms[0].type === 'posts' ? postDefaultQuery : eventDefaultQuery
                  );
               }
            }
         }
      },
      [community]
   );

   useEffect(() => {
      const socketClient = socketIOClient(`${ apiUrl }/chat`, {
         autoConnect: true,
         path: '/websocket',
         transports: ['websocket', 'polling'],
         forceNew: true,
         reconnectionDelay: 50,
         auth: (cb) => {
            cb({
               token: `${ localStorage.getItem('authToken') }:${ uuid }`,
               communityId: match.params.id,
            });
         },
      });

      socketClient.connect();
      socketClient.on('connect', () => {
         socketClient.emit('online');
      });

      socketClient.on('message:send', () => {
         setNotificationsCount(prevState => prevState += 1);
      });

      return () => {
         socketClient.disconnect();   
      };
   }, []);

   useEffect(() => {
      const initialRoomId = QueryParams.getHash().split('-');
      if (initialRoomId[1]) {
         handleSelectRoom(
            match.params.id,
            initialRoomId[0],
            initialRoomId[1],
            initialRoomId[2] === 'posts' ? postDefaultQuery : eventDefaultQuery
         );
      }
   }, []);

   useEffect(() => {
      setNotificationsCount((community.unread_count + community.count_unread_messages) || 0);
   }, [community]);

   useEffect(
      () => {
         if (community && community.rooms && community.rooms[0] && !match.path.includes('products') && !match.path.includes('bridge') 
            && !match.path.includes('calendar') && !match.path.includes('members')) {
            const initialRoomId = QueryParams.getHash().split('-');
            if (!isMobile && !initialRoomId[1] && (!selectedRoom || selectedRoom.id === 'welcome') && community.rooms[0]) {
               handleSelectRoom(
                  match.params.id,
                  community.rooms[0].id,
                  community.room_groups[0].id,
                  community.rooms[0].type === 'posts' ? postDefaultQuery : eventDefaultQuery
               );
            }
         }
      },
      [match.path]
   );


   const handleEventsFilter = (tab, search) => {
      if (!getIds.communityId) return null;
      let query = '';
      if (selectedEventTab || tab) {
         query = `?status=${ tab || selectedEventTab }`;
      }
      if (sortingOptions.eventAccess.length) {
         query = `${ query }&access=${ sortingOptions.eventAccess.join(',') }`;
      }
      if (sortingOptions.locationTypes.length) {
         query = `${ query }&location_type=${ sortingOptions.locationTypes.join(
            ','
         ) }`;
      }
      if (sortingOptions.date.length) {
         query = `${ query }&sort_by=${ sortingOptions.date }`;
      }
      if (searchValue) {
         query = `${ query }&search=${ search }`;
      }
      if (date) {
         query = `${ query }&date=${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
      }
      handleFilter(
         getIds.communityId,
         selectedRoom.id,
         getIds.groupId,
         `${ query }&type=events`
      );
      return '';
   };

   useEffect(() => {
      handleEventsFilter();
   }, [date, sortingOptions]);

   const handlePostsFilter = (tab, search) => {
      let query = '';
      if (selectedPostTab || tab) {
         query = `?status=${ tab || selectedPostTab }`;
      }
      if (search) {
         query = `?search=${ search }`;
      }
      handleFilter(
         getIds.communityId,
         selectedRoom.id,
         getIds.groupId,
         `${ query }&type=posts`
      );
   };

   const getRoomAfterChange = () => {
      handleEventsFilter();
   };

   const deleteEvents = (ids, closeModal) => {
      handleBulkRemove(
         getIds.communityId,
         ids,
         closeModal()
      );
   };
   useSearch(searchValue, (value) => {
      if (value === null) {
         return null;
      }
      if (selectedRoom.type === 'posts') {
         handlePostsFilter(null, value);
         return;
      }
      handleEventsFilter(null, value);
   }, !!getIds.groupId);

   const likeComment = (postId, commentId, parentId) => {
      postCommentLike(getIds.communityId, getIds.groupId, selectedRoom.id, postId, commentId, parentId);
   };

   const handleDeletePost = (postId) => {
      postDelete(getIds.communityId, getIds.groupId, selectedRoom.id, postId);
   };

   const createPostFunc = (...params) => {
      const postId = params[4];
      const inputs = {
         ...params[3], 
         mentions: params[3].mentions || [],
         polls: params[3].polls || [],
         files: params[3].files || [],
      };
      createPost(params[0], params[1], params[2], inputs, handlePostsFilter, postId);
   };

   const handleUserVote = (postId, pollId, optionId) => {
      userVote(
         getIds.communityId,
         getIds.groupId,
         selectedRoom.id,
         postId, pollId, optionId
      );
   };

   const openRoomMembers = () => {
      handleOpenRoomMembers(getIds.communityId, selectedRoom.id, getIds.communityId, selectedRoom.type);
   };

   const goToRoom = (room) => {
      goToCommunity(getIds.communityId);
      handleSelectRoom(
         getIds.communityId,
         room.id,
         getIds.groupId,
         room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
      );
   };

   const menuTab = () => {
      if (match.path.includes('products')) {
         return 1;
      } if (match.path.includes('bridge')) {
         return 3;
      } if (match.path.includes('members')) {
         return 2;
      } if (match.path.includes('calendar')) {
         return 4;
      }
      return 0;
   };


   const handlePinPost = (postId, value) => {
      handlePostPinOrUnPin(community.id, selectedRoom.id, community.room_groups[0].id, postId, value);
   };


   const isMainPage = (isShow) => {
      if (isMobile) {
         if (isShow) {
            return window.location.pathname === Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: match.params.id }) && window.location.hash === '';
         } 
         return !(window.location.pathname === Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: match.params.id }) && window.location.hash === '');
      }
      return true;
   };


   const hasMobileMenu = () => {
      if (isMobile) {
         if (window.location.pathname === Router.route('ADMIN_COMMUNITY_BRIDGE').getCompiledPath({ id: match.params.id })
            || window.location.pathname === Router.route('ADMIN_COMMUNITY_PORTAL').getCompiledPath({ id: match.params.id })
            || window.location.pathname === Router.route('ADMIN_COMMUNITY_MEMBERS').getCompiledPath({ id: match.params.id })
            || (window.location.pathname === Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: match.params.id }) && window.location.hash === '')) {
            return true;
         }
      }

      return false;
   };

   return (
      <div className='community'>
         {!progress && (
            <CommunityHeader
               goBack={ () => {
                  // history.goBack();
                  // handleSelectRoom(
                  //    getIds.communityId,
                  //    'welcome',
                  //    getIds.groupId
                  // );
                  goToProducts();
               } }
               title={ community.name }
            />
         )}
         {!progress && (isMainPage(true) || hasMobileMenu()) && (
            <CommunityMenu
               notificationsCount={ notificationsCount }
               user={ user }
               role={ role }
               community={ community }
               permissions={ permissions }
               setPopupTitle={ setPopupTitle }
               setShowPopup={ setShowPopup }
               siteInfo={ siteInfo }
               isMobile={ isMobile }
               markAsRead={ markAsRead }
               room={ selectedRoom }
               tabValue={ menuTab() }
               searchInput={ searchValue }
               setSearchInput={ setSearchValue }
               initialCount={ selectedRoom.type === 'posts' ? selectedRoom.posts?.length : selectedRoom.events?.length }
               goToMemberProfile={ (memberId) => goToMemberProfile(match.params.id, memberId) }
               showSearch={ !match.path.includes('products') && selectedRoom.id !== 'welcome' && !match.path.includes('bridge') && !match.path.includes('members') }
            />
         )}
         {!match.path.includes('members') 
         && (
            <>
               {(progress || isLoadingAttachMemberToFreeOffer) ? (
                  <LoaderSpinner />
               ) : (
                  <div 
                     className={
                        classNames(
                           'community__bottom',
                           {
                              'community__sidebar__mobile__other': isMainPage(false) && !hasMobileMenu(),
                              'community__sidebar__mobile': hasMobileMenu(),
                           })
                     }
                     
                  >
              
                     {!match.path.includes('products') && !match.path.includes('bridge') && isMainPage(true) && (
                        <CommunitySideBar
                           user={ user }
                           community={ community }
                           onPlus={ () => {
                              clearHash();
                              goToRoomCreate(getIds.communityId);
                           } }
                           menuTab={ menuTab }
                           onInviteMember={ () => goToInviteMember(getIds.communityId) }
                           // onSelectRoom={ room => {
                           //    handleSelectRoom(
                           //       getIds.communityId,
                           //       room.id,
                           //       getIds.groupId,
                           //       room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
                           //    );
                           // } }
                           selectedRoom={ selectedRoom }
                           handleAddLink={ (content, callBack) => {
                              createExternalLink(getIds.communityId, community.room_groups[2].id, content, callBack);
                           } }
                           handleRemoveLink={ (id, callBack) => {
                              deleteExternalLink(getIds.communityId, community.room_groups[2].id, id, callBack);
                           } }
                           openSettings={ () => goToGeneralSettings(getIds.communityId) }
                        />
                     )}
                     <div className='community__bottom__with__banner'>
                        {!!bannerProgress && <LoaderSpinner />}
                        {/* {!match.path.includes('calendar') && !match.path.includes('products') && !match.path.includes('bridge') && isMainPage(false) && (
                           <CommunityBanner 
                              community={ community }
                              changeCommunityBanner={ changeCommunityBanner }
                              role={ role } />
                        )} */}
                        {isFetchingRoom && (
                           <LoaderSpinner />
                        )} 
                        {eventProgress && (
                           <LoaderSpinner />
                        )}
                        {eventSettingsProgress && (
                           <LoaderSpinner />
                        )}
                        {match.path.includes('calendar') && (
                           <EventsCalendar                            
                              initialEvents={ initialEvents } 
                              room={ selectedRoom }
                              eventProgress={ eventSettingsProgress }
                              community={ community } 
                              role={ role }
                              user={ user }
                              handleBulkRemove={ deleteEvents }
                              handleEventSave={ handleEventSave }
                           />
                        ) }  
                        {!isFetchingRoom && !match.path.includes('calendar') && (
                           <>
                              {(match.path.includes('products'))
                           && (
                              <CommunityProducts
                                 role={ role }
                                 community={ community }
                              />
                           )}
                              {isMainPage(false) 
                           && (
                              <>
                                 {!match.path.includes('products') && selectedRoom.id !== 'welcome' && !match.path.includes('bridge') 
                           && (
                              <>
                                 {selectedRoom.type === 'posts' ? (
                                    <CommunityPosts
                                       goToPostCreatePage={ () => goToPostCreate(match.params.id, selectedRoom.id) }
                                       room={ selectedRoom }
                                       goToRoom={ goToRoom }
                                       communityId={ getIds.communityId }
                                       community={ community }
                                       role={ role }
                                       openRoomMembers={ openRoomMembers }
                                       createPost={ createPostFunc }
                                       goToRoomSettings={ (id) => goToRoomSettings(getIds.communityId, id) }
                                       handleUserVote={ handleUserVote }
                                       initialPostsLength={ initialPostsLength }
                                       markAsRead={ markAsRead }
                                       goToMemberProfile={ (memberId) => goToMemberProfile(getIds.communityId, memberId) }
                                       handleChangeTab={ tab => {
                                          handlePostsFilter(tab);
                                       } }
                                       postLike={ (postId) => {
                                          postLike(getIds.communityId, getIds.groupId, selectedRoom.id, postId);
                                       } }
                                       onInviteMember={ () => {
                                          goToInviteMember(getIds.communityId, selectedRoom.id);
                                       } }
                                       postCommentLike={ (postId, commentId, parentId) => {
                                          likeComment(postId, commentId, parentId);
                                       } }
                                       commentPost={ (postId, text) => {
                                          commentPost(getIds.communityId, getIds.groupId, selectedRoom.id, postId, text);
                                       } }
                                       user={ user }
                                       searchValue={ searchValue }
                                       setSearchValue={ setSearchValue }
                                       handleDeleteRoom={ (id) => handleDeleteRoom(getIds.communityId, getIds.groupId, id) }
                                       setSelectedTab={ setSelectedPostTab }
                                       commentReplyPost={ (postId, commentId, text) => {
                                          commentReplyPost(
                                             getIds.communityId, getIds.groupId, selectedRoom.id, postId, commentId, text);
                                       } }
                                       selectedTab={ selectedPostTab }
                                       goToCourse={ (id) => selectCourse(id) }
                                       saveNotification={ (inputs) => {
                                          notificationChangeSave(getIds.communityId, getIds.groupId, selectedRoom.id, inputs);
                                       } }
                                       handleDeletePost={ handleDeletePost }
                                       postCommentDelete={ (comment) => {
                                          const isReplay = Boolean(comment.parent_id);
                                          postCommentDelete(getIds.communityId, getIds.groupId, selectedRoom.id, comment.post_id, comment.id, isReplay);
                                       } }
                                       goToMessenger={ goToMessenger }
                                       handlePinPost={ handlePinPost }
                                    />
                                 ) : (
                                    <CommunityView
                                       goToMessenger={ goToMessenger }
                                       initialEvents={ initialEvents }
                                       goToRoom={ goToRoom }
                                       onInviteMember={ () => {
                                          goToInviteMember(getIds.communityId, selectedRoom.id);
                                       } }
                                       role={ role }
                                       community={ community }
                                       handleDeleteRoom={ (id) => handleDeleteRoom(getIds.communityId, getIds.groupId, id) }
                                       locationCounts={ locationCounts }
                                       selectedTab={ selectedEventTab }
                                       openRoomMembers={ openRoomMembers }
                                       handleSearch={ (value) => {
                                          handleEventsFilter(null, value);
                                       } }
                                       markAsRead={ markAsRead }
                                       date={ date }
                                       user={ user }
                                       setDate={ (i) => {
                                          setDate(i);
                                       } }
                                       accessCounts={ accessCounts }
                                       setSelectedTab={ setSelectedEventTab }
                                       handleSortOptionsChange={ handleSortOptionsChange }
                                       room={ selectedRoom }
                                       searchValue={ searchValue }
                                       setSearchValue={ setSearchValue }
                                       handleFilter={ handleEventsFilter }
                                       initialEventsLength={ initialEventsLength }
                                       handleChangeTab={ tab => {
                                          handleEventsFilter(tab);
                                       } }
                                       eventSettings={ id => {
                                          openEventSettingsPage(
                                             getIds.communityId,
                                             selectedRoom.id,
                                             id,
                                             getIds.groupId
                                          );
                                       } }
                                       eventProgress={ eventProgress }
                                       selectedEvent={ selectedEvent }
                                       sortingOptions={ sortingOptions }
                                       goToEventView={ event => {
                                          handleSelectEvent(event);
                                       } }
                                       onDuplicate={ ids => {
                                          handleDuplicate(
                                             getIds.communityId,
                                             selectedRoom.id,
                                             getIds.groupId,
                                             ids,
                                             getRoomAfterChange
                                          );
                                       } }
                                       handleBulkRemove={ deleteEvents }
                                       onArchive={ ids => {
                                          handleArchive(
                                             getIds.communityId,
                                             selectedRoom.id,
                                             getIds.groupId,
                                             ids,
                                             getRoomAfterChange
                                          );
                                       } }
                                       onPin={ eventId => {
                                          handlePinOrUnPin(
                                             getIds.communityId,
                                             selectedRoom.id,
                                             getIds.groupId,
                                             eventId,
                                             1,
                                             getRoomAfterChange
                                          );
                                       } }
                                       onUnPin={ eventId => {
                                          handlePinOrUnPin(
                                             getIds.communityId,
                                             selectedRoom.id,
                                             getIds.groupId,
                                             eventId,
                                             0,
                                             getRoomAfterChange
                                          );
                                       } }
                                       goToEvent={ () => goToEvent(match.params.id, selectedRoom.id)
                                       }
                                       saveNotification={ (inputs) => {
                                          notificationChangeSave(getIds.communityId, getIds.groupId, selectedRoom.id, inputs);
                                       } }
                                       goToRoomSettings={ (id) => goToRoomSettings(getIds.communityId, id) }
                                       commentEvent={ (eventId, data) => {
                                          commentEvent(getIds.communityId, getIds.groupId, selectedRoom.id, eventId, data);
                                       } }
                                       eventCommentLike={ (eventId, commentId, parentId) => {
                                          eventCommentLike(getIds.communityId, getIds.groupId, selectedRoom.id, eventId, commentId, parentId);
                                       } }
                                       eventReplyComment={ (eventId, commentId, text) => {
                                          eventReplyComment(
                                             getIds.communityId, getIds.groupId, selectedRoom.id, eventId, commentId, text);
                                       } }
                                       goToMemberProfile={ (memberId) => goToMemberProfile(getIds.communityId, memberId) }
                                       eventCommentDelete={ (comment) => {
                                          const isReplay = Boolean(comment.parent_id);
                                          eventCommentDelete(getIds.communityId, getIds.groupId, selectedRoom.id, comment.event_id, comment.id, isReplay);
                                       } }
                                    />
                                 )}
                              </>
                           )}
                              </>
                           )}
                              {match.path.includes('bridge') && (
                                 <BridgeInformation
                                    course={ { ...community.owner_course, pricings: community.pricings, communityId: community.id } }
                                    community={ community }
                                    site={ siteInfo }
                                    // isLoading={ updateCourseProgress }
                                    // tabId='bridge'
                                    isCommunity={ true }
                                    createBridge={ createBridge }
                                 />
                              ) }
                           </>
                        )}
                     </div>
                  </div>
               )}
            </>
         )}
         
         {!progress && window.location.pathname.includes('members') && <Members match={ match } /> }

         {!progress && isMobile && (
            <CommunityMenuFooter
               notificationsCount={ notificationsCount }
               user={ user }
               role={ role }
               community={ community }
               permissions={ permissions }
               setPopupTitle={ setPopupTitle }
               setShowPopup={ setShowPopup }
               siteInfo={ siteInfo }
               isMobile={ isMobile }
               markAsRead={ markAsRead }
               room={ selectedRoom }
               tabValue={ menuTab() }
               searchInput={ searchValue }
               setSearchInput={ setSearchValue }
               initialCount={ selectedRoom.type === 'posts' ? selectedRoom.posts?.length : selectedRoom.events?.length }
               goToMemberProfile={ (memberId) => goToMemberProfile(match.params.id, memberId) }
               showSearch={ !match.path.includes('products') && selectedRoom.id !== 'welcome' && !match.path.includes('bridge') && !match.path.includes('members') }
               isMainPage={ isMainPage(true) }
            />
         )}
         {user && !userPopup && user.role !== 1 && isTodayBeforeCreatedAt(user) && (
            <UserModal
               setUserPopup={ setUserPopup }
               className='communityUserPopup'
               userData={ user }
               changeAuth={ changeAuthAction }
            />
         )}
      </div>
   );
};

const mapStateToProps = state => {
   return {
      user: state.common.authUser,
      role: selectors.selectLoginedUserRole(state),
      community: selectors.communitySelector(state),
      progress: selectors.communityProgressSelector(state),
      selectedRoom: selectors.selectedRoomSelector(state),
      eventProgress: selectors.eventProgressSelector(state),
      initialEventsLength: selectors.initialEventsLengthSelector(state),
      isFetchingRoom: selectors.isFetchingRoomSelector(state),
      sortingOptions: selectors.sortingOptionsSelector(state),
      selectedEvent: selectors.selectedEventSelector(state),
      locationCounts: selectors.locationCountsStateSelector(state),
      accessCounts: selectors.accessCountsStateSelector(state),
      initialPostsLength: selectors.initialPostsLengthSelector(state),
      initialEvents: selectors.initialEventsSelector(state),
      app: appSelector(state),
      searchValue: selectors.searchCommunitySelector(state),
      bannerProgress: selectors.bannerProgressSelector(state),
      uuid: state.common?.authUser?.uuid,
      eventSettingsProgress: selectors.eventSettingsProgressSelector(state),
      
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
      goToProducts: () => {
         dispatch(
            push(
               Router.route('ADMIN_COURSES').getCompiledPath()
            )
         );
      },
      goToLogin: () => {
         dispatch(
            push(
               Router.route('LOGIN').getCompiledPath()
            )
         );
      },
      goToPostCreate: (id, roomId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_POST').getCompiledPath({
                  id, roomId,
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
      goToEvent: (id, roomId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_EVENT').getCompiledPath({
                  id,
                  roomId,
               })
            )
         );
      },
      goToEventView: (id, eventId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_EVENT_VIEW').getCompiledPath({
                  id,
                  eventId,
               })
            )
         );
      },
      openEventSettingsPage: (id, roomId, eventId, groupId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_EVENT_SETTINGS').getCompiledPath({
                  id,
                  roomId,
                  eventId,
                  groupId,
               })
            )
         );
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
      goToMemberProfile: (id, memberId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getCompiledPath({
                  id,
                  memberId,
               })
            )
         );
      },
      getCommunity: (id, userId, isMessenger, callback) => {
         dispatch(operations.getCommunityOperation(id, userId, isMessenger, callback));
      },
      createBridge: (id, inputs) => {
         dispatch(operations.createBridgeOperation(id, inputs));
      },
      handleSelectRoom: (communityId, roomId, groupId, query) => {
         dispatch(
            operations.getRoomAndFilterOperation(communityId, roomId, groupId, query)
         );
      },
      handlePinOrUnPin: (communityId, roomId, groupId, eventId, num) => {
         dispatch(
            operations.eventPinUnpinOperation(communityId, roomId, groupId, eventId, num)
         );
      },
      handlePostPinOrUnPin: (communityId, roomId, groupId, eventId, num) => {
         dispatch(
            operations.postPinUnpinOperation(communityId, roomId, groupId, eventId, num)
         );
      },
      handleArchive: (communityId, roomId, groupId, ids, callBack) => {
         dispatch(
            operations.archiveEventsOperation(communityId, roomId, groupId, ids, callBack)
         );
      },
      handleDuplicate: (communityId, roomId, groupId, ids, callBack) => {
         dispatch(
            operations.multiDuplicateOperation(communityId, roomId, groupId, ids, callBack)
         );
      },
      handleSortOptionsChange: options => {
         dispatch(changeSortOptions(options));
      },
      handleSelectEvent: event => {
         dispatch(operations.handleSelectEventOperation(event));
      },
      handleFilter: (communityId, room, groupId, query) => {
         dispatch(operations.filterRoomOperation(communityId, room, groupId, query));
      },
      handleBulkRemove: (communityId, ids, callBack) => {
         dispatch(operations.deleteEventOperation(communityId, ids, callBack));
      },
      handleDeleteRoom: (communityId, groupId, roomId) => {
         dispatch(operations.deleteRoomCommunity(communityId, groupId, roomId));
      },
      commentPost: (communityId, groupId, roomId, postId, text) => {
         dispatch(operations.postCommentOperation(communityId, groupId, roomId, postId, text));
      },
      commentReplyPost: (communityId, groupId, roomId, postId, commentId, text) => {
         dispatch(operations.postReplyCommenOperation(communityId, groupId, roomId, postId, commentId, text));
      },
      postLike: (communityId, groupId, roomId, postId) => {
         dispatch(operations.postLikeOperation(communityId, groupId, roomId, postId));
      },
      postDelete: (communityId, groupId, roomId, postId) => {
         dispatch(operations.postDeleteOperation(communityId, groupId, roomId, postId));
      },
      postCommentLike: (communityId, groupId, roomId, postId, commentId) => {
         dispatch(operations.postCommentLikeOperation(communityId, groupId, roomId, postId, commentId));
      },
      selectCourse: (id) => {
         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id })));
      },
      createPost: (communityId, groupId, roomId, inputs, callBack, postId) => {
         dispatch(operations.createPostOperation(communityId, groupId, roomId, inputs, callBack, postId));
      },
      createExternalLink: (communityId, groupId, inputs, callBack) => {
         dispatch(operations.createExternalLinkOperation(communityId, groupId, inputs, callBack));
      },
      deleteExternalLink: (communityId, groupId, id, callBack) => {
         dispatch(operations.deleteExternalLinkOperation(communityId, groupId, id, callBack));
      },
      notificationChangeSave: (communityId, groupId, roomId, inputs) => {
         dispatch(operations.notificationsChangesOperation(communityId, groupId, roomId, inputs));
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
      userVote: (...params) => {
         dispatch(operations.userVoteOperation(...params));
      },
      handleOpenRoomMembers: (id, roomId, groupId, type) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').getCompiledPath({
                  id,
                  roomId,
                  type,
                  groupId,
               })
            )
         );
      },
      markAsRead: (ids) => {
         dispatch(operations.markAsReadOperation(ids));
      },
      setSearchValue: (value) => {
         dispatch(updateSearchInput(value));
      },
      commentEvent: (communityId, groupId, roomId, eventId, text) => {
         dispatch(operations.commentEventOperation(communityId, groupId, roomId, eventId, text));
      },
      eventCommentLike: (communityId, groupId, roomId, eventId, commentId, parentId) => {
         dispatch(operations.eventCommentLikeOperation(communityId, groupId, roomId, eventId, commentId, parentId));
      },
      eventReplyComment: (communityId, groupId, roomId, eventId, commentId, text) => {
         dispatch(operations.eventReplyCommentOperation(communityId, groupId, roomId, eventId, commentId, text));
      },
      postCommentDelete: (communityId, groupId, roomId, postId, commentId, isReplay) => {
         dispatch(operations.postCommentDeleteOperation(communityId, groupId, roomId, postId, commentId, isReplay));
      },
      eventCommentDelete: (communityId, groupId, roomId, eventId, commentId, isReplay) => {
         dispatch(operations.eventCommentDeleteOperation(communityId, groupId, roomId, eventId, commentId, isReplay));
      },
      resetSelectedRoom: () => dispatch(resetSelectedRoomAction()),
      goToCommunity: id => {
         dispatch(push(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id })));
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
      changeCommunityBanner: (communityId, bannerImage) => {
         dispatch(operations.changeCommunityBannerImage(communityId, bannerImage));
      },
      changeAuthAction: (data) => {
         dispatch(changeAuth(data));
      },
      handleEventSave: (communityId, eventId, data, callBack) => {
         dispatch(operations.putEventSettingsOperation(communityId, eventId, data, callBack));
      },
   };
};

Community.propTypes = {
   goToRoomCreate: PropTypes.func,
   uuid: PropTypes.string,
   selectedRoom: PropTypes.object,
   match: PropTypes.object,
   handleSelectRoom: PropTypes.func,
   getCommunity: PropTypes.func,
   eventProgress: PropTypes.bool,
   goToInviteMember: PropTypes.func,
   goToEvent: PropTypes.func,
   user: PropTypes.object,
   handlePinOrUnPin: PropTypes.func,
   handleDuplicate: PropTypes.func,
   progress: PropTypes.bool,
   handleSortOptionsChange: PropTypes.func,
   community: PropTypes.object,
   handleArchive: PropTypes.func,
   sortingOptions: PropTypes.object,
   isFetchingRoom: PropTypes.bool,
   handleSelectEvent: PropTypes.func,
   selectedEvent: PropTypes.object,
   initialEventsLength: PropTypes.number,
   handleFilter: PropTypes.func,
   openEventSettingsPage: PropTypes.func,
   locationCounts: PropTypes.object,
   accessCounts: PropTypes.object,
   handleBulkRemove: PropTypes.func,
   handleDeleteRoom: PropTypes.func,
   goToPostCreate: PropTypes.func,
   initialPostsLength: PropTypes.number,
   initialEvents: PropTypes.array,
   commentPost: PropTypes.func,
   commentReplyPost: PropTypes.func,
   postLike: PropTypes.func,
   postCommentLike: PropTypes.func,
   selectCourse: PropTypes.func,
   createPost: PropTypes.func,
   createExternalLink: PropTypes.func,
   deleteExternalLink: PropTypes.func,
   notificationChangeSave: PropTypes.func,
   goToGeneralSettings: PropTypes.func,
   userVote: PropTypes.func,
   goToRoomSettings: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   handleOpenRoomMembers: PropTypes.func,
   markAsRead: PropTypes.func,
   role: PropTypes.string,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
   goToProducts: PropTypes.func,
   commentEvent: PropTypes.func,
   eventCommentLike: PropTypes.func,
   eventReplyComment: PropTypes.func,
   postDelete: PropTypes.func,
   postCommentDelete: PropTypes.func,
   eventCommentDelete: PropTypes.func,
   resetSelectedRoom: PropTypes.func,
   goToCommunity: PropTypes.func,
   goToMessenger: PropTypes.func,
   changeCommunityBanner: PropTypes.func,
   bannerProgress: PropTypes.bool,
   createBridge: PropTypes.func,
   goToLogin: PropTypes.func,
   handlePostPinOrUnPin: PropTypes.func,
   changeAuthAction: PropTypes.func,
   handleEventSave: PropTypes.func,
   eventSettingsProgress: PropTypes.bool,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Community);
