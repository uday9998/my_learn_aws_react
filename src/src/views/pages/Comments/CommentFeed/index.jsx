import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import { uniqueId } from 'lodash';
import ReplyComment from 'components/elements/ReplyComment';

const CommentFeed = ({
   comment, replies, userImage, onReply, courseId,
}) => {
   if (!`${ comment.id }`) {
      return null;
   }
   return (
      <div className='comment__feed'>
         <div className='comment__feed__top'>
            <div className='comment__feed__comment'>
               <div className='comment__feed__comment__top'>
                  <div className='comment__feed__comment__top__left'>
                     <img src={ comment.user ? comment.user.picture_full_src || comment.user.picture_src : '' } alt='' />
                  </div>
                  <div className='comment__feed__comment__top__right'>
                     <Text
                        inner={ comment.user.name }
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ moment(comment.user.created_at).format('MMM D / HH:mm a') }
                        type={ types.regular148 }
                        style={ { color: '#727978' } }
                        size={ sizes.xsmall }
                     />
                  </div>
               </div>
               <div className='comment__feed__comment__bottom'>
                  <Text
                     inner={ comment.text }
                     size={ sizes.small }
                     type={ types.regularDefault }
                  />
               </div>
            </div>
            <div className='comment__feed__comment__replies__count'>
               <Text
                  inner={ `${ replies.length } Replies` }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
                  type={ types.regularDefault }
               />
               <div className='comment__feed__comment__replies__count__line' />
            </div>
            <div className='comment__feed__comment__replies'>
               {replies.map((reply) => {
                  return (
                     <div className='comment__feed__comment' key={ uniqueId() }>
                        <div className='comment__feed__comment__top'>
                           <div className='comment__feed__comment__top__left'>
                              <img src={ reply.user.picture_src || reply.user.picture_full_src } alt='' />
                           </div>
                           <div className='comment__feed__comment__top__right'>
                              <Text
                                 inner={ reply.user.name }
                                 type={ types.mediumLarge }
                                 size={ sizes.small }
                              />
                              <Text
                                 inner={ moment(reply.user.created_at).format('MMM D / HH:mm a') }
                                 type={ types.regular148 }
                                 style={ { color: '#727978' } }
                                 size={ sizes.xsmall }
                              />
                           </div>
                        </div>
                        <div className='comment__feed__comment__bottom'>
                           {reply.text_with_mentions ? (
                              <div dangerouslySetInnerHTML={ { __html: `<span>${ reply.text_with_mentions }</span>` } } />
                           ) : (
                              <Text
                                 inner={ reply.text_with_mentions || reply.text }
                                 size={ sizes.small }
                                 type={ types.regularDefault }
                              />
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         <ReplyComment
            onReply={ (text) => onReply(text) }
            image={ userImage }
            courseId={ courseId }
         />
      </div>
   );
};

CommentFeed.propTypes = {
   comment: PropTypes.object,
   replies: PropTypes.array,
   userImage: PropTypes.string,
   onReply: PropTypes.func,
   courseId: PropTypes.number,
};

export default CommentFeed;
