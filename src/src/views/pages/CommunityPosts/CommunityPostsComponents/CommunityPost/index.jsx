import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import moment from 'moment';
import IconNew from 'components/elements/iconsSize';
import CommunityPoll from 'views/pages/community/communityCommponents/CommunityPoll';
import { uniqueId } from 'lodash';
import DropTriggle from 'components/elements/newDropTriggle';
import { formatLastActiveTime } from 'utils/formatLastActiveTime';
import DeleteModal from 'components/elements/DeleteModal';
import { PostLeaveComment } from '../CommunityLeaveComment';
import { CommunityPostComments } from '../CommunityPostComments';

const CommunityPost = ({
   post, commentPost, user, commentReplyPost, postLike, postCommentLike,
   goToCourse, handleUserVote, goToMemberProfile, commentType, role, handleDeletePost, postCommentDelete,
   community, handlePinPost, editPost,
}) => {
   const refs = useRef(null);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenComments, setIsOpenComments] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);

   // Function to strip HTML tags and get plain text
   const getPlainText = (html) => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
   };

   // Function to truncate post content
   const truncateContent = (content, maxLength = 250) => {
      const plainText = getPlainText(content);
      if (plainText.length <= maxLength) return { truncated: content, needsReadMore: false };

      // Find a good breaking point (end of sentence or word)
      const truncatedText = plainText.substr(0, maxLength);
      const lastPeriod = truncatedText.lastIndexOf('.');
      const lastSpace = truncatedText.lastIndexOf(' ');
      const breakPoint = lastPeriod > maxLength - 50 ? lastPeriod + 1 : lastSpace;

      return {
         truncated: plainText.substr(0, breakPoint) + '...',
         needsReadMore: true
      };
   };

   const { truncated, needsReadMore } = truncateContent(post.content);

   return (
      <div className='community__post' id={ post.id }>
         {post.courses && !!post.courses.length && (
            <div className='community__post__course'>
               <div className='community__post__course__left'>
                  <IconNew name='CommunityCourseL' />
                  <Text
                     inner='Connected to the course '
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ post.courses[0].name }
                     type={ types.mediumLarge }
                     style={ { cursor: 'pointer' } }
                     onClick={ () => goToCourse(post.courses[0].id) }
                     size={ sizes.small }
                  />
               </div>
               <div className='community__post__course__right' role='presentation' onClick={ () => goToCourse(post.courses[0].id) }>
                  <IconNew name='CommunityArrowRightL' />
               </div>
            </div>
         )}
         {!!post.cover && (
            <div className='community__post__image'>
               <img src={ post.cover } alt='' />
            </div>
         )}
         <div className='community__post__top'>
            <div className='community__post__top__td'>
               <div className='community__post__top__user' role='presentation' onClick={ () => goToMemberProfile(post.author.id) }>
                  <div
                     className='community__post__top__user__left'
                  >
                     <img
                        src={ post.author && (post.author.picture_src || post.author.picture_full_src) }
                        alt=''
                     />
                     <div className='community__post__top__user__left__desc'> 
                        <Text
                           inner={ post.author && post.author.name }
                           type={ types.medium }
                           style={ { maxWidth: '100%' } }
                           size={ sizes.small }
                        />
                        <Text
                           style={ { color: '#727978' } }
                           inner={ formatLastActiveTime(Date.now(), post.created_at, true) }
                           type={ types.regularLarge }
                           size={ sizes.xsmall }
                        />
                     </div>
                  </div>
               </div>
               <div className='community__post__top__user__right'>
                  <div className='community__post__top__user__right__actions'>
                     {
                        (role === 'admin' || (user && user.id === post.author.id)) && handlePinPost && (
                           <div role='presentation' onClick={ (e) => { e.stopPropagation(); handlePinPost(post.id, !post.is_pinned); } }>
                              { post.is_pinned ? <IconNew name='CommunityPinFillM' /> : <IconNew name='CommunityPinM' />}
                           </div>
                        )
                     }
                     {
                        (role === 'admin' || (user && user.id === post.author.id)) && handleDeletePost && (
                           <div>
                              <DropTriggle options={ [
                                 {
                                    trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { editPost(post); },
                                 },
                                 {
                                    trash: true, iconName: 'deleteCommunityM', name: 'Delete', onClick: () => { setIsOpenDeleteModal(true); },
                                 },
                              ] }
                              />
                           </div>
                        )
                     }
                  </div>
               </div>
            </div>

         </div>
         {/* Category Tag */}
         {(post.room || post.category) && (
            <div className='community__post__category'>
               <span className='category-tag'>
                  {post.room?.name || post.category || 'General'}
               </span>
            </div>
         )}
         {/* Post Title with SemiBold */}
         <div className='community__post__title'>
            <Text
               inner={ post.title }
               type={ types.semiBold }
               size={ sizes.large }
            />
         </div>
         {/* Post Content with Truncation */}
         <div
            ref={ refs }
            className={ `community__post__content ${!isExpanded && needsReadMore ? 'truncated' : ''}` }
         >
            {!isExpanded && needsReadMore ? (
               <Text
                  inner={ truncated }
                  type={ types.regularDefault }
                  size={ sizes.medium }
               />
            ) : (
               <div dangerouslySetInnerHTML={ { __html: post.content } } />
            )}
         </div>
         {/* Read More Button */}
         {needsReadMore && (
            <div className='community__post__read-more'>
               <button
                  className='read-more-btn'
                  onClick={ () => setIsExpanded(!isExpanded) }
               >
                  <Text
                     inner={ isExpanded ? 'Show less' : 'Read more →' }
                     type={ types.medium }
                     size={ sizes.small }
                  />
               </button>
            </div>
         )}
         {/* <CommunityPoll
            isActive={ true }
            onClick={ (id) =>  }
            isView={ true }
            poll={ {
               title: 'Is there a place',
               subTitle: 'Casas',
               options: [
                  { id: 1, name: 'asdas', votes: 21 },
                  { id: 2, name: 'asdas2', votes: 23 },
                  { id: 3, name: 'asdas3', votes: 11 },
               ],
               votes: 55,
            } }
         />
         <CommunityPoll
            onClick={ (id) => handleUserVote(17, 24) }
            isView={ true }
            poll={ {
               title: 'Is there a place',
               subTitle: 'Casas',
               options: [
                  { id: 1, name: 'asdas', prsentage: '50%' },
                  { id: 2, name: 'asdas2', prsentage: '40%' },
                  { id: 3, name: 'asdas3', prsentage: '10%' },
               ],
            } }
         /> */}
         {post.posts_poll && post.posts_poll.map((e) => {
            return (
               <CommunityPoll
                  key={ uniqueId() }
                  onClick={ (id) => handleUserVote(e.id, id) }
                  isView={ true }
                  isActive={ e.voted_options !== null }
                  poll={ e }
               />
            );
         })}
         <div className='community__post__actions'>
            <div className='community__post__actions__left'>
               <TextWithIcon
                  iconName='PostCommentCount'
                  inner={ post.comments ? post.comments.length : 0 }
                  type={ types.regularDefaultSmall }
                  size={ sizes.small }
                  // style={ { color: '#24554E' } }
                  onClick={ () => (commentReplyPost ? setIsOpenComments(!isOpenComments) : {}) }
                  generalStyles={ { cursor: 'pointer', background: 'inherit' } }
                  // generalStyles={ { cursor: 'pointer', background: isOpenComments ? '#A6C9C5' : 'inherit' } }
               />
               {community && !community.userSuspended && (
                  <TextWithIcon
                     iconName={ post.liked || post.isLiked ? 'PostLikesCountActive' : 'PostLikesCount' }
                     inner={ post.likes.length }
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     onClick={ () => (postLike ? postLike(post.id) : {}) }
                     // style={ { color: '#24554E' } }
                     generalStyles={ { cursor: 'pointer' } }
                  />
               )}
               <TextWithIcon
                  iconName='PostViewsCount'
                  inner={ post.views_count }
                  type={ types.regularDefaultSmall }
                  size={ sizes.small }
                  // style={ { color: '#24554E' } }
               />
               {post.comments.length > 0 && (
                  <div>
                     <Text
                        inner={ `New comment ${ formatLastActiveTime(Date.now(), post.comments[post.comments.length - 1].created_at, true) }` }
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                     />
              
                  </div>
               )}
            </div>
            {/* <div className='community__post__actions__right'>
               <TextWithIcon
                  iconName='PostShare'
                  inner='Share'
                  isIconRight={ true }
                  type={ types.regularDefaultSmall }
                  size={ sizes.small }
                  generalStyles={ { cursor: 'pointer' } }
                  style={ { color: '#24554E' } }
               />
            </div> */}
         </div>
         {isOpenComments && post.comments.length > 0 && (
            <CommunityPostComments
               commentReplyPost={ (commentId, text) => commentReplyPost(post.id, commentId, text) }
               user={ user }
               goToMemberProfile={ goToMemberProfile }
               comments={ post.comments }
               onDelete={ postCommentDelete }
               commentType={ commentType }
               onLike={ (id, parentId) => postCommentLike(post.id, id, parentId) }
               showReplyes
               role={ role }
               community={ community }
            />
         )}
         {user && community && !community.userSuspended 
         && (
            <PostLeaveComment
               user={ {
                  picture_src: user.picture_src || user.picture_full_src,
               } }
               onPost={ (text) => commentPost(post.id, text) }
               community={ community }
            />
         )}
         {isOpenDeleteModal && (
            <DeleteModal
               onDelete={ () => handleDeletePost(post.id)() }
               onCancel={ () => setIsOpenDeleteModal(false) }
               maxWidth={ 414 }
               deleteText='Delete'
               description=''
               title='Are you sure you want to delete this post?'
            />
         )}
      </div>
   );
};

CommunityPost.propTypes = {
   post: PropTypes.object,
   user: PropTypes.object,
   commentPost: PropTypes.func,
   handleUserVote: PropTypes.func,
   postCommentLike: PropTypes.func,
   commentReplyPost: PropTypes.func,
   postLike: PropTypes.func,
   goToCourse: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   commentType: PropTypes.number,
   role: PropTypes.string,
   handleDeletePost: PropTypes.func,
   postCommentDelete: PropTypes.func,
   community: PropTypes.object,
   handlePinPost: PropTypes.func,
   editPost: PropTypes.func,
};

export default CommunityPost;
