// import CommunitySideBar from 'components/modules/community/CommunitySideBar';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import CommunityView from 'views/pages/community';
// import LoaderSpinner from 'components/elements/LoaderSpiner';
// import CommunityWelcomePage from 'views/pages/community/communityWelcome';
// import QueryParams from 'utils/QueryParams';
// import CommunityPosts from 'views/pages/CommunityPosts';
// import { useSearch } from 'utils/hooks/useSearch';
// import CommunityHeader from 'components/modules/community/CommunityHeader';
// import { setPrimaryColors } from 'utils/pageBuilder/schoolRoomColor';
// import { siteInfoSelector } from 'state/modules/common/selectors';
// import { clearHash } from '.';

// export const Community = ({
//    match, goToRoomCreate, getCommunity, progress, community, eventProgress, goToInviteMember, goToEvent, user, selectedRoom, handleSelectRoom, handlePinOrUnPin, handleArchive, handleDuplicate, isFetchingRoom, handleSortOptionsChange, sortingOptions, handleSelectEvent, selectedEvent, accessCounts, initialEventsLength, handleFilter, openEventSettingsPage, locationCounts, handleBulkRemove, handleDeleteRoom, initialPostsLength, goToPostCreate, initialEvents, commentPost, commentReplyPost, postCommentLike, postLike, selectCourse, createPost, createExternalLink, deleteExternalLink, goToRoomSettings, notificationChangeSave, goToGeneralSettings, userVote, goToMemberProfile, handleOpenRoomMembers, markAsRead, role, goToProducts, searchValue, setSearchValue, commentEvent, eventCommentLike, postDelete, eventReplyComment, postCommentDelete, eventCommentDelete, resetSelectedRoom,
// }) => {
//    const siteInfo = useSelector(siteInfoSelector);

//    useEffect(() => {
//       if (user) {
//          getCommunity(match.params.id, user.id);
//       } else {
//          goToProducts();
//       }

//       setPrimaryColors(siteInfo);
//       return () => {
//          resetSelectedRoom();
//       };
//    }, [match.params.id]);
//    const [getIds, setGetIds] = useState({
//       groupId: null,
//       communityId: null,
//    });

//    useEffect(
//       () => {
//          if (!progress) {
//             setGetIds({
//                groupId: community.room_groups[0].id,
//                communityId: match.params.id,
//             });
//          }
//       },
//       [community]
//    );
//    const [selectedEventTab, setSelectedEventTab] = useState('upcoming');
//    const [selectedPostTab, setSelectedPostTab] = useState('community');
//    const [date, setDate] = useState();


//    const eventDefaultQuery = `?type=events&status=${ selectedEventTab }`;
//    const postDefaultQuery = `?type=posts&status=${ selectedPostTab }`;

//    useEffect(() => {
//       const initialRoomId = QueryParams.getHash().split('-');
//       if (initialRoomId[1]) {
//          handleSelectRoom(
//             match.params.id,
//             initialRoomId[0],
//             initialRoomId[1],
//             initialRoomId[2] === 'posts' ? postDefaultQuery : eventDefaultQuery
//          );
//       }
//    }, []);


//    const handleEventsFilter = (tab, search) => {
//       if (!getIds.communityId) return null;
//       let query = '';
//       if (selectedEventTab || tab) {
//          query = `?status=${ tab || selectedEventTab }`;
//       }
//       if (sortingOptions.eventAccess.length) {
//          query = `${ query }&access=${ sortingOptions.eventAccess.join(',') }`;
//       }
//       if (sortingOptions.locationTypes.length) {
//          query = `${ query }&location_type=${ sortingOptions.locationTypes.join(
//             ','
//          ) }`;
//       }
//       if (sortingOptions.date.length) {
//          query = `${ query }&sort_by=${ sortingOptions.date }`;
//       }
//       if (searchValue) {
//          query = `${ query }&search=${ search }`;
//       }
//       if (date) {
//          query = `${ query }&date=${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
//       }
//       handleFilter(
//          getIds.communityId,
//          selectedRoom.id,
//          getIds.groupId,
//          `${ query }&type=events`
//       );
//       return '';
//    };

//    useEffect(() => {
//       handleEventsFilter();
//    }, [date, sortingOptions]);

//    const handlePostsFilter = (tab, search) => {
//       let query = '';
//       if (selectedPostTab || tab) {
//          query = `?status=${ tab || selectedPostTab }`;
//       }
//       if (search) {
//          query = `?search=${ search }`;
//       }
//       handleFilter(
//          getIds.communityId,
//          selectedRoom.id,
//          getIds.groupId,
//          `${ query }&type=posts`
//       );
//    };

//    const getRoomAfterChange = () => {
//       handleEventsFilter();
//    };

//    const deleteEvents = (ids) => {
//       handleBulkRemove(
//          getIds.communityId,
//          selectedRoom.id,
//          getIds.groupId,
//          ids,
//          getRoomAfterChange()
//       );
//    };
//    useSearch(searchValue, (value) => {
//       if (value === null) {
//          return null;
//       }
//       if (selectedRoom.type === 'posts') {
//          handlePostsFilter(null, value);
//          return;
//       }
//       handleEventsFilter(null, value);
//    }, !!getIds.groupId);

//    const likeComment = (postId, commentId, parentId) => {
//       postCommentLike(getIds.communityId, getIds.groupId, selectedRoom.id, postId, commentId, parentId);
//    };

//    const handleDeletePost = (postId) => {
//       postDelete(getIds.communityId, getIds.groupId, selectedRoom.id, postId);
//    };

//    const createPostFunc = (...params) => {
//       createPost(...params, handlePostsFilter);
//    };

//    const handleUserVote = (postId, pollId, optionId) => {
//       userVote(
//          getIds.communityId,
//          getIds.groupId,
//          selectedRoom.id,
//          postId, pollId, optionId
//       );
//    };

//    const openRoomMembers = () => {
//       handleOpenRoomMembers(getIds.communityId, selectedRoom.id, getIds.communityId, selectedRoom.type);
//    };
//    return (
//       <div className='community'>
//          <CommunityHeader goBack={ () => {
//             // history.goBack();
//             // handleSelectRoom(
//             //    getIds.communityId,
//             //    'welcome',
//             //    getIds.groupId
//             // );
//             goToProducts();
//          } } />
//          {progress ? (
//             <LoaderSpinner />
//          ) : (
//             <div className='community__bottom'>
//                <CommunitySideBar
//                   community={ community }
//                   onPlus={ () => {
//                      clearHash();
//                      goToRoomCreate(getIds.communityId);
//                   } }
//                   onInviteMember={ () => goToInviteMember(getIds.communityId) }
//                   onSelectRoom={ room => {
//                      handleSelectRoom(
//                         getIds.communityId,
//                         room.id,
//                         getIds.groupId,
//                         room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
//                      );
//                   } }
//                   selectedRoom={ selectedRoom }
//                   handleAddLink={ (content, callBack) => {
//                      createExternalLink(getIds.communityId, community.room_groups[2].id, content, callBack);
//                   } }
//                   handleRemoveLink={ (id, callBack) => {
//                      deleteExternalLink(getIds.communityId, community.room_groups[2].id, id, callBack);
//                   } }
//                   openSettings={ () => goToGeneralSettings(getIds.communityId) } />
//                {isFetchingRoom ? (
//                   <LoaderSpinner />
//                ) : (
//                   <>
//                      {selectedRoom.id !== 'welcome'
//                         ? match.path.includes('home')
//                         : <CommunityHome />}
//                      (
//                      <>
//                         {selectedRoom.type === 'posts' ? (
//                            <CommunityPosts
//                               goToPostCreatePage={ () => goToPostCreate(match.params.id, selectedRoom.id) }
//                               room={ selectedRoom }
//                               communityId={ getIds.communityId }
//                               community={ community }
//                               role={ role }
//                               openRoomMembers={ openRoomMembers }
//                               createPost={ createPostFunc }
//                               goToRoomSettings={ (id) => goToRoomSettings(getIds.communityId, id) }
//                               handleUserVote={ handleUserVote }
//                               initialPostsLength={ initialPostsLength }
//                               markAsRead={ markAsRead }
//                               goToMemberProfile={ (memberId) => goToMemberProfile(getIds.communityId, memberId) }
//                               handleChangeTab={ tab => {
//                                  handlePostsFilter(tab);
//                               } }
//                               postLike={ (postId) => {
//                                  postLike(getIds.communityId, getIds.groupId, selectedRoom.id, postId);
//                               } }
//                               onInviteMember={ () => {
//                                  goToInviteMember(getIds.communityId, selectedRoom.id);
//                               } }
//                               postCommentLike={ (postId, commentId, parentId) => {
//                                  likeComment(postId, commentId, parentId);
//                               } }
//                               commentPost={ (postId, text) => {
//                                  commentPost(getIds.communityId, getIds.groupId, selectedRoom.id, postId, text);
//                               } }
//                               user={ user }
//                               searchValue={ searchValue }
//                               setSearchValue={ setSearchValue }
//                               handleDeleteRoom={ (id) => handleDeleteRoom(getIds.communityId, getIds.groupId, id) }
//                               setSelectedTab={ setSelectedPostTab }
//                               commentReplyPost={ (postId, commentId, text) => {
//                                  commentReplyPost(
//                                     getIds.communityId, getIds.groupId, selectedRoom.id, postId, commentId, text);
//                               } }
//                               selectedTab={ selectedPostTab }
//                               goToCourse={ (id) => selectCourse(id) }
//                               saveNotification={ (inputs) => {
//                                  notificationChangeSave(getIds.communityId, getIds.groupId, selectedRoom.id, inputs);
//                               } }
//                               handleDeletePost={ handleDeletePost }
//                               postCommentDelete={ (comment) => {
//                                  const isReplay = Boolean(comment.parent_id);
//                                  postCommentDelete(getIds.communityId, getIds.groupId, selectedRoom.id, comment.post_id, comment.id, isReplay);
//                               } } />
//                         ) : (
//                            <CommunityView
//                               initialEvents={ initialEvents }
//                               onInviteMember={ () => {
//                                  goToInviteMember(getIds.communityId, selectedRoom.id);
//                               } }
//                               role={ role }
//                               community={ community }
//                               handleDeleteRoom={ (id) => handleDeleteRoom(getIds.communityId, getIds.groupId, id) }
//                               locationCounts={ locationCounts }
//                               selectedTab={ selectedEventTab }
//                               openRoomMembers={ openRoomMembers }
//                               handleSearch={ (value) => {
//                                  handleEventsFilter(null, value);
//                               } }
//                               markAsRead={ markAsRead }
//                               date={ date }
//                               user={ user }
//                               setDate={ (i) => {
//                                  setDate(i);
//                               } }
//                               accessCounts={ accessCounts }
//                               setSelectedTab={ setSelectedEventTab }
//                               handleSortOptionsChange={ handleSortOptionsChange }
//                               room={ selectedRoom }
//                               searchValue={ searchValue }
//                               setSearchValue={ setSearchValue }
//                               handleFilter={ handleEventsFilter }
//                               initialEventsLength={ initialEventsLength }
//                               handleChangeTab={ tab => {
//                                  handleEventsFilter(tab);
//                               } }
//                               eventSettings={ id => {
//                                  openEventSettingsPage(
//                                     getIds.communityId,
//                                     selectedRoom.id,
//                                     id,
//                                     getIds.groupId
//                                  );
//                               } }
//                               eventProgress={ eventProgress }
//                               selectedEvent={ selectedEvent }
//                               sortingOptions={ sortingOptions }
//                               goToEventView={ event => {
//                                  handleSelectEvent(event);
//                               } }
//                               onDuplicate={ ids => {
//                                  handleDuplicate(
//                                     getIds.communityId,
//                                     selectedRoom.id,
//                                     getIds.groupId,
//                                     ids,
//                                     getRoomAfterChange
//                                  );
//                               } }
//                               handleBulkRemove={ deleteEvents }
//                               onArchive={ ids => {
//                                  handleArchive(
//                                     getIds.communityId,
//                                     selectedRoom.id,
//                                     getIds.groupId,
//                                     ids,
//                                     getRoomAfterChange
//                                  );
//                               } }
//                               onPin={ eventId => {
//                                  handlePinOrUnPin(
//                                     getIds.communityId,
//                                     selectedRoom.id,
//                                     getIds.groupId,
//                                     eventId,
//                                     1,
//                                     getRoomAfterChange
//                                  );
//                               } }
//                               onUnPin={ eventId => {
//                                  handlePinOrUnPin(
//                                     getIds.communityId,
//                                     selectedRoom.id,
//                                     getIds.groupId,
//                                     eventId,
//                                     0,
//                                     getRoomAfterChange
//                                  );
//                               } }
//                               goToEvent={ () => goToEvent(match.params.id, selectedRoom.id) }
//                               saveNotification={ (inputs) => {
//                                  notificationChangeSave(getIds.communityId, getIds.groupId, selectedRoom.id, inputs);
//                               } }
//                               goToRoomSettings={ (id) => goToRoomSettings(getIds.communityId, id) }
//                               commentEvent={ (eventId, text) => {
//                                  commentEvent(getIds.communityId, getIds.groupId, selectedRoom.id, eventId, text);
//                               } }
//                               eventCommentLike={ (eventId, commentId, parentId) => {
//                                  eventCommentLike(getIds.communityId, getIds.groupId, selectedRoom.id, eventId, commentId, parentId);
//                               } }
//                               eventReplyComment={ (eventId, commentId, text) => {
//                                  eventReplyComment(
//                                     getIds.communityId, getIds.groupId, selectedRoom.id, eventId, commentId, text);
//                               } }
//                               goToMemberProfile={ (memberId) => goToMemberProfile(getIds.communityId, memberId) }
//                               eventCommentDelete={ (comment) => {
//                                  const isReplay = Boolean(comment.parent_id);
//                                  eventCommentDelete(getIds.communityId, getIds.groupId, selectedRoom.id, comment.event_id, comment.id, isReplay);
//                               } } />
//                         )}
//                      </>
//                      ) : (
//                      <CommunityWelcomePage
//                         role={ role }
//                         community={ community }
//                         isVisibleRoom={ community.rooms && community.rooms.length < 1 }
//                         onInviteMember={ () => goToInviteMember(getIds.communityId) }
//                         onAddRoom={ () => goToRoomCreate(getIds.communityId) }
//                         userName={ user.name } />
//                      )}
//                   </>
//                )}
//             </div>
//          )}
//       </div>
//    );
// };
