import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';
import { useTranslate } from 'react-polyglot';
import moment from 'moment';
import IconNew from 'components/elements/iconsSize';
import { showUserTimeZone } from 'utils/showUserTimeZone';

const Field = ({
   avatar, name, comment, hasDeleteAccess, actions, showReply, primaryTheme, commentStatus, defaultColor,
}) => {
   const t = useTranslate();
   let commentLikeText = comment.liked ? 'Liked' : 'Like';
   if (comment.likes_count) {
      commentLikeText = `${ commentLikeText }`;
      if (comment.likes_count > 1) {
         commentLikeText = `${ comment.likes_count } Likes`;
      }
   }

   return (
      <div className={ classnames(
         'commentField__main',
         { 'commentField__main-reply': !!comment.parent_id }
      ) }
      >
         <div className='commentField__header'>
            <div className='commentField__header__left'>
               <div className='commentField_avatar'>
                  <img src={ avatar } alt='avatar' />
               </div>
               <div className='commentField__title'>
                  <Text
                     size={ textSize.size_14 }
                     type={ textType.mediumLarge }
                     inner={ name }
                  />
                  <Text
                     size={ textSize.xsmall }
                     type={ textType.regularDefaultGrey }
                     inner={ showUserTimeZone(comment.created_at) }
                  />
               </div>
            </div>
            {hasDeleteAccess && (
               <div
                  className='deleteAction'
                  onClick={ commentStatus === 2 ? () => {} : () => {
                     actions.deleteComment(comment.id, comment.parent_id);
                  } }
                  role='presentation'
               >
                  <IconNew name='TrashSettingsM' />
                  {/* <Text
                        size={ textSize.small }
                        type={ textType.regular }
                        inner={ t('delete') }
                     //   style={ { fontFamily: primaryTheme, color: defaultColor } }
                     /> */}
               </div>
            )}
         </div>


         <div className='commentField__content'>
            {comment.text_with_mentions ? (
               <div dangerouslySetInnerHTML={ { __html: `<span>${ comment.text_with_mentions }</span>` } } style={ { color: 'var(--textColor70)' } } />
            ) : (
               <Text
                  size={ textSize.size_14 }
                  type={ textType.regular }
                  inner={ comment.text }
                  style={ { color: 'var(--textColor70)' } }
               />
            )}
            <div className='commentActions'>
               {!comment.parent_id && (
                  <div className='replyAction' onClick={ commentStatus === 2 ? () => {} : showReply } role='presentation'>
                     <IconNew name='ReplyM' color='var(--buttonBgcolor)' />
                     <Text
                        size={ textSize.small }
                        type={ textType.regular }
                        inner={ t('reply') }
                        style={ { color: 'var(--buttonBgcolor)' } }
                     />
                  </div>
               )}
               <div
                  className='likeAction'
                  onClick={ commentStatus === 2 ? () => {} : () => {
                     actions.toggleLikeComment(comment.id, comment.parent_id);
                  } }
                  role='presentation'
               >
                  <Icon
                     name={ comment.liked ? 'Like' : 'LikeNotFilled' }
                     color={ comment.liked ? 'var(--buttonBgcolor)' : '#ffffff' }
                     backColor={ comment.liked ? '#ffffff' : 'var(--buttonBgcolor)' }
                  />
                  <Text
                     size={ textSize.small }
                     type={ textType.regular }
                     inner={ comment.likes_count > 1 ? commentLikeText : '' }
                     style={ { color: 'var(--buttonBgcolor)' } }
                  //   style={ { fontFamily: primaryTheme, color: defaultColor } }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

Field.propTypes = {
   avatar: PropTypes.string,
   name: PropTypes.string,
   comment: PropTypes.object,
   hasDeleteAccess: PropTypes.bool,
   actions: PropTypes.object,
   showReply: PropTypes.func,
   primaryTheme: PropTypes.string,
   commentStatus: PropTypes.number,
   defaultColor: PropTypes.string,
};

export default Field;
