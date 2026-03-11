import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
// import {  } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SimpleStatus from 'components/elements/SimpleStatus';
import Router from 'routes/router';
import DeleteModal from 'components/elements/DeleteModal';
import ApproveModal from 'components/elements/ApproveModal';
// import CommunityTop from '../community/communityCommponents/CommunityTop';
import { communityButtonColors } from 'utils/communityButtonColors';
import CommunityLeftEmpty from '../community/communityCommponents/CommunityLeftEmpty';
import CommunityPostsRight from './CommunityPostsComponents/CommunityPostsRight';
import './index.scss';
import CommunityPost from './CommunityPostsComponents/CommunityPost';
import CommunityPostTopCreate from './CommunityPostsComponents/CommunityPostTopCreate';

const CommunityPosts = ({
   room, goToPostCreatePage, onInviteMember, handleDeleteRoom,
   selectedTab, setSelectedTab, handleChangeTab, initialPostsLength, user, commentPost,
   commentReplyPost, postLike, postCommentLike, goToCourse, communityId, community, createPost,
   saveNotification, handleUserVote, goToRoomSettings, goToMemberProfile, openRoomMembers, markAsRead,
   role, searchValue, setSearchValue, handleDeletePost, postCommentDelete, goToMessenger, handlePinPost, goToRoom,
}) => {
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const [isOpenPostCreatPopup, setIsOpenPostCreatPopup] = useState(false);
   const [editaBlePost, setEditablePost] = useState({});


   const isAllowedButton = () => {
      if ((role === 'subadmin' || room.allow_create) && !community.userSuspended) {
         return true;
      }
      if (room.author && room.author.id === user.id && !community.userSuspended) {
         return true;
      }
      return false;
   };


   const isAuthorOfRoom = () => {
      if ((room.author && room.author.id === user.id && !community.userSuspended)) {
         return true;
      }
      return false;
   };

   const history = useHistory();
   
   const goToMembers = () => {
      history.push(Router.route('ADMIN_COMMUNITY_MEMBERS').getCompiledPath({
         id: community.id,
      }));
   };

   const editPost = (post) => {
      setEditablePost(post);
      setIsOpenPostCreatPopup(true);
   };

   const onCloseCommunityPostModal = () => {
      setIsOpenPostCreatPopup(false);
      setEditablePost({});
   };


   return (
      <div className='community__view'>
         {/* <CommunityTop
            onInviteMember={ onInviteMember }
            searchValue={ searchValue }
            saveNotification={ saveNotification }
            markAsRead={ markAsRead }
            room={ room }
            role={ role }
            user={ user }
            openSettings={ () => goToRoomSettings(room.id) }
            handleDeleteRoom={ handleDeleteRoom }
            handleInputChange={ (name, value) => setSearchValue(value) }
            community={ community }
            goToMessenger={ goToMessenger }
         /> */}

         {/* <div className='community__view__tabs'>
            <Tabs
               variants={ variants }
               selectedVariant={ selectedTab }
               onSelect={ (tab) => {
                  setSelectedTab(tab);
                  handleChangeTab(tab);
               } }
               isButton={ false }
               hasIcon={ true }
            />
         </div> */}
         <div className='community__view__bottom'>
            <div className='community__view__bottom__left'>
               <div className='community__view__name'>
                  <div className='community__view__name__container'>
                     <Text
                        inner={ `# ${ room.name }` }
                        type={ types.regularMin }
                        size={ sizes.xxlarge }
                     />
                     {room.room_category && room.room_category.name
                  && (
                     <SimpleStatus color='grey' text={ room.room_category.name } size='medium' />
                  )}
                  </div>
                  {/* {(room.allow_create || role === 'admin' || room.author ? (room.author ? room.author.id : null) : user.id === null) && (
               <Button
                  text='New Posts'
                  onClick={ () => goToPostCreatePage() }
               />
            )} */}
                  <div className='community__sidebar__right'>
                     <div className='community__sidebar__preview__members'>
                        <div className='community__sidebar__preview__members__left'>
                           <Text
                              inner='Members'
                              type={ types.regular }
                              size={ sizes.small_14 }
                              style={ { color: '#444C4B', whiteSpace: 'nowrap', cursor: 'pointer' } }
                              onClick={ () => openRoomMembers() }
                           />
                           {
                              room.room_member && (
                                 <TextWithIcon
                                    inner={ room.members_count }
                                    iconName='UsersCommunityS'
                                    type={ types.regular148 }
                                    size={ sizes.xsmall }
                                    generalStyles={ { gap: '4px' } }
                                    style={ { color: '#727978' } }
                                 />
                              )
                           }
                        </div>
                        <div className='community__sidebar__preview__members__right'>
                           {room && room.room_member.slice(0, 3).map((e, index) => {
                              return (
                                 <div className='community__sidebar__preview__member' style={ { marginLeft: index === 0 ? '0px' : '-20px' } } key={ index }>
                                    <img
                                       style={ {
                                          background: '#000',
                                       } }
                                       src={ e.picture_src || e.picture_full_src }
                                       alt='' />
                                 </div>
                              );
                           })}
                           {room.members_count > 0 && (
                              <div className='community__sidebar__preview__members__right__button'>
                                 <Text
                                    inner='See All'
                                    type={ types.medium150 }
                                    size={ sizes.small_12 }
                                    onClick={ () => openRoomMembers(community.id) }
                                    style={ { color: '#131F1E', background: 'white' } }
                                 />
                              </div>
                           )}
                        </div>
                     </div>
                     {(isAllowedButton() || role === 'admin') && (
                        <>
                           {role === 'admin' && (
                              <div className='invite_member' onClick={ () => onInviteMember() } role='presentation'>
                                 <IconNew name='CommunityInvite' />
                              </div>
                           )}
                           {/* {isAuthorOfRoom() && (
                        <div
                           className='community__top__action community__top__action__spacing'
                           role='presentation'
                           onClick={ () => goToRoomSettings(room.id) }
                        >
                           <IconNew name='settingsCommunityM' />
                        </div>
                     )} */}
                           {isAuthorOfRoom() && !room.is_default && (
                              <div
                                 className='community__top__action community__top__action__delete community__top__action__spacing'
                                 role='presentation'
                                 onClick={ () => setIsOpenDeletePopup(true) }
                              >
                                 <IconNew name='deleteCommunityM' />
                              </div>
                           )}
                           {/* <div className='verticalLine' />
                           <Button
                              text='New Post'
                              style={ {
                                 width: '77px', maxHeight: '36px', minHeight: '36px', fontSize: '12px', borderRadius: '12px', padding: '18px 38px', ...communityButtonColors(community, role),
                              } }
                              onClick={ () => setIsOpenPostCreatPopup(true) }
                           /> */}
                        </>
                     )}
                  </div>
               </div>
           
               {(room.posts && room.posts.length > 0) ? (
                  <div className='community__view__bottom__posts'>
                     {(((role === 'subadmin' || room.allow_create) && !community.userSuspended) || role === 'admin') && (

                        <CommunityPostTopCreate
                           user={ user }
                           community={ community }
                           roomId={ room.id }
                           openEditor={ isOpenPostCreatPopup === true ? false : undefined }
                           createPost={ createPost }
                           communityId={ communityId }
                        />
                     )}
                     {room.posts && room.posts.length && (
                        <div className='community__view__bottom__posts__items'>
                           <div className='community__view__bottom__posts__items__filter'>
                              <Text
                                 inner='Post Feeds'
                                 type={ types.medium153 }
                                 size={ sizes.large }
                              />
                           </div>
                           <div className='community__view__bottom__posts__items__list'>
                              {room.posts.map((post) => {
                                 return (
                                    <CommunityPost
                                       goToCourse={ goToCourse }
                                       user={ user }
                                       commentReplyPost={ commentReplyPost }
                                       commentPost={ commentPost }
                                       key={ post.id }
                                       goToMemberProfile={ (id) => goToMemberProfile(id) }
                                       postLike={ postLike }
                                       post={ post }
                                       handleUserVote={ (...params) => handleUserVote(post.id, ...params) }
                                       postCommentLike={ postCommentLike }
                                       role={ role }
                                       handleDeletePost={ handleDeletePost }
                                       postCommentDelete={ postCommentDelete }
                                       community={ community }
                                       handlePinPost={ handlePinPost }
                                       editPost={ editPost }
                                    />
                                 );
                              })}
                           </div>
                        </div>
                     )}
                  </div>
               ) : (
                  <>
                     {!searchValue 
                     && (
                        <CommunityLeftEmpty
                           isFromPostPage={ true }
                           role={ role }
                           allowedButton={ isAllowedButton() }
                           createPost={ () => setIsOpenPostCreatPopup(true) }
                           onInviteMember={ onInviteMember }
                           community={ community }
                        />
                     )}
                     {searchValue 
                     && (
                        <Text
                           inner='No Results Found'
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: 'rgba(19, 31, 30, 0.6)', width: '100%', textAlign: 'center' } }
                        />
                     )}
                  </>
               )}
            </div>
            <CommunityPostsRight
               room={ room }
               openRoomMembers={ openRoomMembers }
               trendingPosts={ room.posts.filter(post => !!post.is_pinned) }
               mostUsers={ room.popular_members }
               goToMemberProfile={ goToMemberProfile }
               community={ community }
               role={ role }
               user={ user }
               handlePinPost={ handlePinPost }
               goToRoom={ goToRoom }
            />
         </div>
         {isOpenDeletePopup && (
            <DeleteModal
               onDelete={ () => handleDeleteRoom(room.id)
               }
               onCancel={ () => setIsOpenDeletePopup(null) }
               deleteText='Delete'
               title='Are you sure you want to delete this room?'
            />
         )}
         {
            isOpenPostCreatPopup && (
               <ApproveModal
                  title='Post Details'
                  btnText=''
                  cancelText=''
                  withoutCancel={ true }
                  className='communityPostsModalWidth'
                  withoutSave={ true }
                  isCommunity={ true }
                  onCloseCommunity={ () => onCloseCommunityPostModal(false) }
                  // dontCancelOnClickOutside
                  // onClickOutside={ () => setIsOpenPostCreatPopup(false) }

               >
                  <CommunityPostTopCreate
                     user={ user }
                     community={ community }
                     roomId={ room.id }
                     createPost={ createPost }
                     communityId={ communityId }
                     openEditor={ isOpenPostCreatPopup }
                     onCancel={ () => onCloseCommunityPostModal(false) }
                     editaBlePost={ editaBlePost }
                  />
               </ApproveModal>
            )
         }
      </div>
   );
};

CommunityPosts.propTypes = {
   goToPostCreatePage: PropTypes.func,
   room: PropTypes.object,
   onInviteMember: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   handleDeleteRoom: PropTypes.func,
   selectedTab: PropTypes.string,
   setSelectedTab: PropTypes.func,
   handleChangeTab: PropTypes.func,
   initialPostsLength: PropTypes.number,
   handleUserVote: PropTypes.func,
   markAsRead: PropTypes.func,
   openRoomMembers: PropTypes.func,
   user: PropTypes.object,
   commentReplyPost: PropTypes.func,
   commentPost: PropTypes.func,
   postLike: PropTypes.func,
   goToCourse: PropTypes.func,
   postCommentLike: PropTypes.func,
   communityId: PropTypes.any,
   goToRoomSettings: PropTypes.func,
   community: PropTypes.object,
   createPost: PropTypes.func,
   saveNotification: PropTypes.func,
   role: PropTypes.string,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
   handleDeletePost: PropTypes.func,
   postCommentDelete: PropTypes.func,
   goToMessenger: PropTypes.func,
   handlePinPost: PropTypes.func,
   goToRoom: PropTypes.func,
};

export default CommunityPosts;
