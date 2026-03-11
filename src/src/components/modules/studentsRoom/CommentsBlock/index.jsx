/* eslint-disable eqeqeq */

import React, { useRef, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CommentField from 'components/elements/studentsRoom/CommentField';
import MemberComment from 'components/elements/studentsRoom/MemberComment';
import classnames from 'classnames';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const CommentsBlock = ({
   comments, user, handleOnChange, commentText, handleOnCreate, goToTop, handleOnScroll, loading, actions,
   replyCommentText, replyCommentId, setReplyComment, textColor, primaryTheme, commentStatus, defaultColor,
}) => {
   const commentsBlock = useRef(null);
   useEffect(() => {
      if (commentsBlock.current.scrollTop > 0) {
         if (goToTop) {
            commentsBlock.current.scrollTo({
               top: commentsBlock.current.scrollTop > 100 ? 100 : commentsBlock.current.scrollTop,
            });
            commentsBlock.current.scrollTo({
               top: 0,
               behavior: 'smooth',
            });
         }
      }
   }, [goToTop]);

   return (
      <div className='commentsBlock'>
         {commentStatus === 2 && <div className='commentsLocked' />}
         <div
            className='commentsBlock__comments'
            ref={ commentsBlock }
            onScroll={ handleOnScroll }
         >
            {comments && comments.map(comment => {
               return (
                  <div
                     key={ comment.id }
                     className={ classnames({
                        'commentsBlock__newComment': comment.new,
                        'commentsBlock_deleteComment': comment.delete,
                     }) }
                  >
                     <CommentField
                        avatar={ comment.user.picture_full_src }
                        name={ comment.user.name }
                        comment={ comment }
                        hasDeleteAccess={ user.id == comment.user_id || user.role == 1 }
                        actions={ actions }
                        defaultColor={ defaultColor }
                        replyCommentText={ replyCommentText }
                        showReplyForm={ replyCommentId === comment.id }
                        setReplyComment={ setReplyComment }
                        handleOnChange={ handleOnChange }
                        handleOnCreate={ handleOnCreate }
                        user={ user }
                        primaryTheme={ primaryTheme }
                        commentStatus={ commentStatus }
                     />
                  </div>
               );
            }) }
            { loading && (<LoaderSpinner />)}
         </div>
         {commentStatus === 1 && (
            <div className='m-t-s'>
               <MemberComment
                  textColor={ textColor }
                  avatar={ user.picture_full_src }
                  name={ user.name }
                  handleOnChange={ handleOnChange }
                  defaultColor={ defaultColor }
                  handleOnCreate={ handleOnCreate }
                  comment={ commentText }
                  primaryTheme={ primaryTheme }
               />
            </div>
         )}
         {commentStatus === 2 && <div className='lockedText' style={ { fontFamily: primaryTheme, color: defaultColor } }>The comment section is locked</div>}
      </div>
   );
};

CommentsBlock.propTypes = {
   comments: PropTypes.array,
   user: PropTypes.object,
   handleOnChange: PropTypes.func,
   commentText: PropTypes.string,
   handleOnCreate: PropTypes.func,
   goToTop: PropTypes.bool,
   handleOnScroll: PropTypes.func,
   loading: PropTypes.bool,
   actions: PropTypes.object,
   replyCommentText: PropTypes.string,
   replyCommentId: PropTypes.number,
   setReplyComment: PropTypes.func,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   commentStatus: PropTypes.number,
   defaultColor: PropTypes.string,
};

CommentsBlock.defaultProps = {
   comments: [],
   user: {},
   textColor: '#7cb740',
};

export default CommentsBlock;
