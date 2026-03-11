import React from 'react';
import PropTypes from 'prop-types';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getMyAccountCommunity, postCommentDelete, postCommentFront, postCommentLikeFront, postLikeFront,
   postReplyCommentFront,
} from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import Tabs from 'components/elements/tabs';
import moment from 'moment';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import CommunityPosts from '../CommunityPosts';
import CommunityComments from '../CommunityComments';

const MyAccountCommunity = ({ id, goBackToList }) => {
   const [sortingType, setSortingType] = React.useState('newest');
   const { data: community = {}, setData, loading } = useApiQuery(getMyAccountCommunity, [[id]]);
   const [update] = useSubmitForm(getMyAccountCommunity);
   const [selectedTab, setSelectedTab] = React.useState('posts');
   const [handleLike] = useSubmitForm(postLikeFront);
   const [handleReplyComment] = useSubmitForm(postReplyCommentFront);
   const [handleComment] = useSubmitForm(postCommentFront);
   const [handleCommentLike] = useSubmitForm(postCommentLikeFront);
   const [deleteComment] = useSubmitForm(postCommentDelete);

   const allPosts = community && community.owner && community.owner.user_posts;
   const posts = community.rooms ? community.rooms.reduce((prev, next) => {
      return [...prev, ...(next.posts || [])];
   }, []) : [];
   const tabVariants = [
      { value: 'posts', key: `Posts (${ posts ? posts.length : 0 })`, iconName: 'MyAccountPostsM' },
      { value: 'comments', key: `Comments (${ community.comments && community.comments.length })`, iconName: 'MyAccountCommentsM' },
   ];
   const getSinceDate = () => {
      if (community.owner) {
         return moment(community.owner.created_at).format('MMMM D, YYYY');
      }
      return null;
   };

   // const { data } = await postComment(communityId, groupId, roomId, postId, text);

   // const { data } = await postReplyComment(communityId, groupId, roomId, postId, commentId, text);

   // const { data } = await postLike(communityId, groupId, roomId, postId);
   //         await postCommentLike(communityId, groupId, roomId, postId, commentId);

   const handleLikePost = (post) => {
      handleLike([community.id, community.room_groups[0].id, post.room_id, post.id], () => {
         update([id], (newData) => setData(newData));
      });
   };

   const handlePostCommentReply = (post, commentId, text) => {
      handleReplyComment([community.id, community.room_groups[0].id, post.room_id, post.id, commentId, text], () => {
         update([id], (newData) => setData(newData));
      });
   };

   const handleCommentReply = (comment, text) => {
      handleReplyComment([community.id, community.room_groups[0].id, comment.room.id, comment.post_id, comment.id, text], () => {
         update([id], (newData) => setData(newData));
      });
   };

   const hadnlePostComment = (post, text) => {
      handleComment([community.id, community.room_groups[0].id, post.room_id, post.id, text], () => {
         update([id], (newData) => setData(newData));
      });
   };

   const handlePostCommentLike = (post, commentId, isFromComments) => {
      if (isFromComments) {
         const room = community.rooms.find((e) => {
            const ids = e.posts.map((a) => a.id);
            if (ids.includes(post)) {
               return true;
            }
            return false;
         });
         deleteComment([community.id, community.room_groups[0].id, room.id, post, commentId], () => {
            update([id], (newData) => setData(newData));
         });
         return;
      }
      handleCommentLike([community.id, community.room_groups[0].id, post.room_id, post.id, commentId], () => {
         update([id], (newData) => setData(newData));
      });
   };

   const getCommentBetweenDate = () => {
      if (community.owner) {
         const currentDate = moment();
         const createdAtDate = moment(community.owner.last_login_at);
         const diffInMinutes = currentDate.diff(createdAtDate, 'minute');
         if (diffInMinutes > 60) {
            const diffInHours = currentDate.diff(createdAtDate, 'hour');
            if (diffInHours > 60) {
               const diffInDays = currentDate.diff(createdAtDate, 'day');
               return `${ diffInDays } day`;
            }
            return `${ diffInHours } hour`;
         }
         return `${ diffInMinutes } min`;
      }
      return null;
   };


   const handleSortComments = (newSortingType) => {
      setSortingType(newSortingType);
      update([id, newSortingType], (newData) => setData(newData));
   };

   const openCommunity = () => {
      window.open(`/portal/community/${ community.id }`, '_blank');
   };

   const handleDeletePostComment = async (comment, roomId, isReplay) => {
      try {
         await deleteComment([community.id, community.room_groups[0].id, roomId, comment.post_id, comment.id]);
         if (isReplay) {
            setData({
               ...community,
               comments: community.comments.map(com => {
                  const filteredChilds = com.childs.filter(child => child.id !== comment.id);
                  return {
                     ...com,
                     childs: filteredChilds,
                  };
               }),
               rooms: community.rooms.map(room => {
                  if (room.id === roomId) {
                     return {
                        ...room,
                        posts: room.posts.map(post => {
                           if (post.id === comment.post_id) {
                              return {
                                 ...post,
                                 comments: post.comments.map(com => ({
                                    ...com,
                                    childs: com.childs.filter(child => child.id !== comment.id),
                                 })),
                              };
                           }
                           return post;
                        }),
                     };
                  }
                  return room;
               }),
            });
         } else {
            setData({
               ...community,
               comments: community.comments.filter(com => com.id !== comment.id),
               rooms: community.rooms.map(room => {
                  if (room.id === roomId) {
                     return {
                        ...room,
                        posts: room.posts.map(post => {
                           if (post.id === comment.post_id) {
                              return {
                                 ...post,
                                 comments: post.comments.filter(com => com.id !== comment.id),
                              };
                           }
                           return post;
                        }),
                     };
                  }
                  return room;
               }),
            });
         }
      } catch (error) {
      }
   };

   return (
      <ComponentProgress loading={ loading }>
         <div className='my__account__community'>
            <div className='my__account__community__top'>
               <TextWithIcon
                  inner={ community.name }
                  iconProps={ {
                     style: { cursor: 'pointer' },
                     onClick: () => goBackToList(),
                  } }
                  type={ types.regularDefaultSmall }
                  size={ sizes.size_28 }
               />
               <Button
                  text='Go To Community'
                  onClick={ () => openCommunity() }
               />
            </div>
            <Tabs
               variants={ tabVariants }
               isButton={ false }
               selectedVariant={ selectedTab }
               hasIcon={ true }
               onSelect={ (tab) => setSelectedTab(tab) }
            />
            <div className='my__account__community__bottom'>
               <div className='my__account__community__bottom__left'>
                  {selectedTab === 'posts' ? (
                     <CommunityPosts
                        posts={ posts }
                        handlePostCommentReply={ handlePostCommentReply }
                        handleLikePost={ handleLikePost }
                        handlePostCommentLike={ handlePostCommentLike }
                        hadnlePostComment={ hadnlePostComment }
                        postCommentDelete={ handleDeletePostComment }
                     />
                  ) : (
                     <CommunityComments
                        sortingType={ sortingType }
                        onDeleteComment={ handleDeletePostComment }
                        handleCommentReply={ handleCommentReply }
                        onSort={ handleSortComments }
                        comments={ community.comments }
                        handlePostCommentLike={ handlePostCommentLike }
                     />
                  )}
               </div>
               <div className='my__account__community__bottom__right'>
                  <Text
                     inner='General Info'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <div className='my__account__community__bottom__right__line'>
                     <Text
                        inner='Member Since'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ getSinceDate() }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
                  <div className='my__account__community__bottom__right__line'>
                     <Text
                        inner='Activity'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ `Active ${ getCommentBetweenDate() } ago` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
                  <div className='my__account__community__bottom__right__flex'>
                     <div className='item'>
                        <Text
                           inner='Followers'
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { color: '#444C4B' } }
                        />
                        <Text
                           inner={ community.owner ? community.owner.user_following.length : 0 }
                           type={ types.mediumSmall }
                           size={ sizes.xxlarge }
                           style={ { color: '#444C4B' } }
                        />
                     </div>
                     <div className='item'>
                        <Text
                           inner='Following'
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { color: '#444C4B' } }
                        />
                        <Text
                           inner={ community.owner ? community.owner.user_followers.length : 0 }
                           type={ types.mediumSmall }
                           size={ sizes.xxlarge }
                           style={ { color: '#444C4B' } }
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ComponentProgress>
   );
};

MyAccountCommunity.propTypes = {
   id: PropTypes.number,
   goBackToList: PropTypes.func,
};

export default MyAccountCommunity;
