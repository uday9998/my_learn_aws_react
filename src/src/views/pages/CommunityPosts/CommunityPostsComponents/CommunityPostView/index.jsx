import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import ReplyComment from 'components/elements/ReplyComment';

export const CommentsPostView = ({
   comment, onReply, onLike, user, goToMemberProfile, isReply, community,
}) => {
   const [isOpenReply, setIsOpenReply] = useState(false);
   return (
      <div
         className={ `comments__post__view ${ isReply ? 'isReply' : '' } ` }
      >
         <div className='comments__post__view__top'>
            <div className='comments__post__view__top__left' role='presentation' onClick={ () => goToMemberProfile(comment.user.id) }>
               <img src={ comment.user.picture_src || comment.user.picture_full_src } alt='' />
               <Text
                  inner={ comment.user.name }
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
            </div>
            <div className='comments__post__view__top__right'>
               <Text
                  style={ { color: '#727978' } }
                  inner={ moment(comment.created_at).format('MMM D / LT ') }
                  type={ types.regularLarge }
                  size={ sizes.xsmall }
               />
            </div>
         </div>
         <Text
            inner={ comment.text }
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <div className='comments__post__view__bottom'>
            <div className='comments__post__view__bottom__left'>
               {
                  !isReply && (
                     <TextWithIcon
                        inner='Reply'
                        style={ { color: '#24554E' } }
                        iconName='ReplyCommentM'
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        onClick={ () => setIsOpenReply(!isOpenReply) }
                        generalStyles={ { cursor: 'pointer', background: isOpenReply ? '#A6C9C5' : 'inherit' } }
                     />
                  )
               }
               <TextWithIcon
                  inner='Like'
                  style={ { color: '#24554E' } }
                  iconName={ comment.liked_user ? 'PostCommentLikeActiveM' : 'PostCommentLikeM' }
                  type={ types.regularDefaultSmall }
                  size={ sizes.small }
                  onClick={ () => onLike(comment.id, comment.parent_id) }
                  generalStyles={ { cursor: 'pointer' } }
               />
            </div>
            {
               !isReply && (
                  <Text
                     inner={ `${ comment.childs.length } replies` }
                     type={ types.regularDefaultGrey }
                     size={ sizes.small }
                  />
               )
            }
         </div>
         {isOpenReply && (
            <ReplyComment
               image={ user.picture_src || user.picture_full_src }
               onCancel={ () => setIsOpenReply(false) }
               onReply={ (text) => {
                  onReply(text.text);
                  setIsOpenReply(false);
               } }
               isCommunity={ true }
               community={ community }
            />
         )}
      </div>
   );
};

CommentsPostView.propTypes = {
   comment: PropTypes.object,
   onReply: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   user: PropTypes.object,
   onLike: PropTypes.func,
   isReply: PropTypes.bool,
   community: PropTypes.object,
};
