import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import CloseIcon from 'assets/images/close.png';
import classnames from 'classnames';
import { useTranslate } from 'react-polyglot';
import Field from './field';

const CommentField = ({
   avatar, name, comment, hasDeleteAccess, actions, replyCommentText,
   handleOnChange, showReplyForm, setReplyComment, handleOnCreate, user, primaryTheme, commentStatus, defaultColor,
}) => {
   const t = useTranslate();
   const [visibleReply, setVisibleReply] = useState(false);
   const [visibleReplyComments, setVisibleReplyComments] = useState(false);
   const showReply = () => {
      setReplyComment(comment.id);
      setVisibleReply(true);
   };
   // const handleKeyDown = (e) => {
   //    if (e.keyCode === 13) {
   //       if (!e.shiftKey) {
   //          if (replyCommentText && replyCommentText.trim()) {
   //             if (comment.id) {
   //                setVisibleReplyComments(true);
   //             }
   //             handleOnCreate(e, comment.id);
   //          }
   //       }
   //    }
   // };
   return (
      <div className='commentField'>
         <Field
            showReply={ showReply }
            avatar={ avatar }
            comment={ comment }
            name={ name }
            hasDeleteAccess={ hasDeleteAccess }
            actions={ actions }
            primaryTheme={ primaryTheme }
            commentStatus={ commentStatus }
         />
         { comment.childs && comment.childs.length > 0 && (
            <div
               className='m-t-s m-l-exl commentField__reply-row'
               onClick={ () => setVisibleReplyComments(!visibleReplyComments) }
               role='presentation'
            >
               <Text
                  size={ textSize.size_14 }
                  type={ textType.regularDefaultGrey }
                  inner={ `${ visibleReplyComments ? 'Hide' : 'Show' } ${ comment.childs.length } ${ comment.childs.length > 1 ? 'replies' : 'reply' }` }
                  style={ { fontFamily: primaryTheme, color: 'var(--textColor70' } }
               />
            </div>
         ) }
         <div className={ classnames(
            'commentField__reply',
            { 'commentField__reply-show': visibleReply && showReplyForm }
         ) }
         >
            <div className='commentField__reply-header'>
               <div>
                  <Text
                     size={ textSize.small }
                     type={ textType.medium }
                     inner={ `Replying to ${ name }` }
                     color='#cddaf1'
                     style={ { fontFamily: primaryTheme } }
                  />
               </div>
               <div onClick={ () => setVisibleReply(false) } role='presentation'>
                  <img src={ CloseIcon } alt='close-icon' />
               </div>
            </div>
            <div className='commentField__reply-main'>
               <form onSubmit={ (e) => {
                  e.preventDefault();

                  if (replyCommentText && replyCommentText.trim()) {
                     setVisibleReplyComments(true);
                     handleOnCreate(e, comment.id);
                  }
               } }
               >
                  <TextArea
                     value={ replyCommentText }
                     label=''
                     style={ {
                        height: '80px',
                        borderRadius: '12px',
                        // border: 'none',
                        // color: '#8a94a2', fontFamily: primaryTheme,
                     } }
                     hasFocus={ false }
                     onChange={ (key, value) => handleOnChange(key, value) }
                     // handleOnKeyDown={ handleKeyDown }
                     name='replyCommentText'
                  />
                  <BaseButton
                     size={ btnSize.large }
                     theme={ btnTheme.purple }
                     text='Post Comment'
                     type='submit'
                     style={ {
                        background: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)',
                     } }
                  />
               </form>
            </div>
         </div>
         { visibleReplyComments && comment.childs.map(child => {
            return (
               <div
                  key={ child.id }
                  className={ classnames({
                     'commentsBlock__newComment': child.new,
                     'commentsBlock_deleteComment': child.delete,
                  }) }
               >
                  <Field
                     avatar={ child.user.picture_full_src }
                     name={ child.user.name }
                     comment={ child }
                     hasDeleteAccess={ user.id === child.user_id || user.role === 1 }
                     showReply={ showReply }
                     actions={ actions }
                     primaryTheme={ primaryTheme }
                     commentStatus={ commentStatus }
                  />
               </div>
            );
         }) }
      </div>
   );
};

CommentField.propTypes = {
   avatar: PropTypes.string,
   name: PropTypes.string,
   comment: PropTypes.object,
   hasDeleteAccess: PropTypes.bool,
   actions: PropTypes.object,
   replyCommentText: PropTypes.string,
   handleOnChange: PropTypes.func,
   showReplyForm: PropTypes.bool,
   setReplyComment: PropTypes.func,
   handleOnCreate: PropTypes.func,
   user: PropTypes.object,
   primaryTheme: PropTypes.string,
   commentStatus: PropTypes.number,
   defaultColor: PropTypes.string,
};

CommentField.defaultProps = {
   avatar: '',
   name: 'Name',
   comment: 'Comment...',
};

export default CommentField;
