import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconButton, { THEMES as iconButtonThems } from 'components/elements/buttons/IconButton';
import ReplyComment from 'components/elements/ReplyComment';
import moment from 'moment';
import SearchText from 'components/elements/searchText';
import DeleteModal from 'components/elements/DeleteModal';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Line from 'components/elements/Line';

const CommentTemplate = ({
   title, image, date, description, comment,
   repliesCount, onReply, search, isFromSearch,
   id, adminImage, activeTab, isHidenActions, courseId,
   isAdminComment, titleClick, openAdminProfile, onDelete,
   onCheck, isChecked, onLike, isReplyHaveLike, userId, role,
   community,
}) => {
   const [isOpenReply, setIsOpenReply] = useState(false);
   const [isOpenFeed, setIsOpenFeed] = useState(false);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenReplyDeleteModal, setIsOpenReplyDeleteModal] = useState({
      isOpen: false,
      id: null,
   });
   const isLiked = comment.likes && comment.likes.filter((e) => e.user_id === comment.user_id).length;
   
   const checkLikedChild = (likes, uId) => {
      const isLike = likes.find((e) => e.user_id === uId);
      return !!isLike;
   };

   return (
      <div className='comment__template'>
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to delete the comment?'
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  onDelete(comment, false);
                  setIsOpenDeleteModal(false);
               } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         {isOpenReplyDeleteModal.isOpen && (
            <DeleteModal
               title='Are you sure you want to delete the comment?'
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  // onDelete(isOpenReplyDeleteModal.id, true);
                  onDelete(comment.childs.find(child => child.id === isOpenReplyDeleteModal.id), true);
                  if (comment.childs.length === 1) {
                     setIsOpenFeed(false);
                  }
                  setIsOpenReplyDeleteModal({ isOpen: false });
               } }
               onCancel={ () => setIsOpenReplyDeleteModal({ isOpen: false }) }
            />
         )}
         {onCheck && (
            <div className='comment__template__left'>
               <CheckBox
                  checked={ isChecked }
                  onChange={ () => onCheck(isChecked, id) }
               />
            </div>
         )}
         <div className='comment__template__right'>
            <div className='comment__template__right__top'>
               <div className='comment__template__right__top__left'>
                  <img src={ image } alt='' />
                  <div className='comment__template__right__top__left__right'>
                     {isAdminComment ? (
                        <Text
                           inner={ title }
                           type={ types.mediumLarge }
                           style={ { cursor: 'pointer' } }
                           onClick={ () => openAdminProfile(id) }
                           size={ sizes.small }
                        />
                     ) : (
                        <Text
                           inner={ comment.user.name }
                           style={ { cursor: 'pointer' } }
                           onClick={ () => titleClick() }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     )}
                     <Text
                        inner={ moment(date).format('MMM D / HH:mm a') }
                        type={ types.regular148 }
                        style={ { color: '#727978' } }
                        size={ sizes.xsmall }
                     />
                  </div>
               </div>
               {!isHidenActions && (
                  <div className='comment__template__right__top__right'>
                     {!community?.userSuspended && onDelete && (comment?.user_id === userId || role === 'admin') && (
                        <IconButton
                           theme={ iconButtonThems.inherit }
                           name='DeleteCommentM'
                           onClick={ () => setIsOpenDeleteModal(true) }
                        />
                     )}
                  </div>
               )}
            </div>
            <div className='comment__template__right__content'>
               {isFromSearch ? (
                  <SearchText
                     textProps={ {
                        inner: description,
                        type: types.regularDefault,
                        size: sizes.small,
                     } }
                     searchText={ search }
                     activeColor='rgba(0,176,255,0.2)'
                  />
               ) : (
                  <>
                     {(activeTab === 'mentioned' && comment.text_with_mentions) ? (
                        <div dangerouslySetInnerHTML={ { __html: `<span>${ comment.text_with_mentions }</span>` } } />
                     ) : (
                        <Text
                           inner={ description }
                           size={ sizes.small }
                           type={ types.regularDefault }
                        />
                     )}
                  </>
               )}
            </div>
            {!isHidenActions && (
               <div className='comment__template__right__actions'>
                  <div className='comment__template__right__actions__left'>
                     {activeTab !== 'deleted' && !comment.parent_id && community && !community.userSuspended && (
                        <TextWithIcon
                           iconName='ReplyCommentM'
                           inner='Reply'
                           type={ types.select }
                           size={ sizes.small }
                           generalStyles={ {
                              cursor: 'pointer',
                              // background: isOpenReply ? '#A6C9C5' : 'inherit',
                              background: 'inherit',
                              borderRadius: '4px',
                              gap: '6px',
                           } }
                           onClick={ () => setIsOpenReply(!isOpenReply) }
                           style={ { color: '#24554E' } }
                        />
                     )}
                     {community && !community.userSuspended && (
                        <TextWithIcon
                           inner='Like'
                           style={ { color: '#24554E' } }
                           iconName={ comment.liked_user || isLiked || comment.user_liked ? 'PostCommentLikeActiveM' : 'PostCommentLikeM' }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           onClick={ () => onLike(comment.id) }
                           generalStyles={ { cursor: 'pointer' } }
                        />
                     )}
                     {(repliesCount !== 0 && !comment.parent_id) && (
                        <TextWithIcon
                           iconName='FeedCommentM'
                           inner={ isOpenFeed ? 'Hide Feed' : 'Show Feed' }
                           type={ types.select }
                           size={ sizes.small }
                           generalStyles={ {
                              cursor: 'pointer',
                              gap: '6px',
                           } }
                           onClick={ () => setIsOpenFeed(!isOpenFeed) }
                           style={ { color: '#24554E' } }
                        />
                     )}

                  </div>
                  <Text
                     inner={ `${ repliesCount } replies` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978', cursor: 'pointer' } }
                     onClick={ (repliesCount !== 0 && !comment.parent_id) ? () => setIsOpenFeed(!isOpenFeed)
                        : () => {} }
                  />
               </div>
            )}
            {isOpenFeed && (
               <div className='comment__template__feed'>
                  <Line />
                  {comment.childs && comment.childs.map((child) => {
                     return (
                        <div className='comments__post__view' key={ child.id }>
                           <div className='comments__post__view__top'>
                              <div className='comments__post__view__top__left' role='presentation' onClick={ () => {} }>
                                 <img src={ child.user ? child.user.picture_src || child.user.picture_full_src : null } alt='' />
                                 <div style={ { display: 'flex', flexDirection: 'column', gap: '4px' } }>
                                    <Text
                                       inner={ child.user ? child.user.name : 'Tez' }
                                       type={ types.mediumLarge }
                                       size={ sizes.small }
                                    />
                                    <Text
                                       style={ { color: '#727978' } }
                                       inner={ moment(child.created_at).format('MMM D / LT ') }
                                       type={ types.regularLarge }
                                       size={ sizes.xsmall }
                                    />
                                 </div>
                              </div>
                              <div className='comments__post__view__top__right'>
                                 {isReplyHaveLike && (
                                    <IconButton
                                       name={ child.liked_user || checkLikedChild(child.likes, child.user.id) || child.user_liked ? 'PostCommentLikeActiveM' : 'PostCommentLikeM' }
                                       onClick={ () => onLike(child.id) }
                                    />
                                 )}
                                 {!community?.userSuspended && onDelete && (child.user_id === userId || role === 'admin') && (
                                    <IconButton
                                       theme={ iconButtonThems.inherit }
                                       name='DeleteCommentM'
                                       onClick={ () => {
                                          setIsOpenReplyDeleteModal({
                                             isOpen: true,
                                             id: child.id,
                                          });
                                       } }
                                    />
                                 )}
                              </div>
                           </div>
                           <Text
                              inner={ child.text }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </div>
                     );
                  })}
               </div>
            )}
            {isOpenReply && (
               <ReplyComment
                  image={ adminImage }
                  onCancel={ () => setIsOpenReply(false) }
                  onReply={ (text) => onReply(id, text) }
                  courseId={ courseId }
                  community={ community }
               />
            )}
         </div>
      </div>
   );
};

CommentTemplate.defaultProps = {
   titleClick: () => {},
};

CommentTemplate.propTypes = {
   title: PropTypes.string,
   image: PropTypes.string,
   date: PropTypes.string,
   description: PropTypes.string,
   repliesCount: PropTypes.any,
   onReply: PropTypes.func,
   openAdminProfile: PropTypes.func,
   id: PropTypes.number,
   adminImage: PropTypes.string,
   isAdminComment: PropTypes.bool,
   activeTab: PropTypes.string,
   isHidenActions: PropTypes.bool,
   isFromSearch: PropTypes.func,
   search: PropTypes.string,
   courseId: PropTypes.number,
   comment: PropTypes.object,
   titleClick: PropTypes.func,
   onDelete: PropTypes.func,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   onLike: PropTypes.func,
   isReplyHaveLike: PropTypes.bool,
   userId: PropTypes.number,
   role: PropTypes.string,
   community: PropTypes.object,
};

export default CommentTemplate;
