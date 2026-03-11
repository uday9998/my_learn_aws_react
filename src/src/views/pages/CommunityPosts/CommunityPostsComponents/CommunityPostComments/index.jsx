import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CommentTemplate from 'views/pages/MyAccount/Pages/Communities/Components/CommentTemplate';

export const CommunityPostComments = ({
   comments,
   onLike,
   user,
   commentReplyPost,
   goToMemberProfile,
   onDelete,
   showReplyes,
   role,
   community,
}) => {
   return (
      <div className='community__post__comments'>
         {comments.map((comment) => {
            return (
               <CommentTemplate
                  title={ comment.user.name }
                  date={ comment.created_at }
                  comment={ comment }
                  id={ comment.id }
                  onReply={ (id, text) => {
                     commentReplyPost(comment.id, text.text);
                  } }
                  onDelete={ onDelete }
                  onLike={ (id) => onLike(id) }
                  repliesCount={ comment.childs.length }
                  adminImage={ user.picture_src || user.picture_full_src }
                  image={ comment.user.picture_src || comment.user.picture_full_src }
                  description={ comment.text }
                  key={ comment.id }
                  titleClick={ () => goToMemberProfile(comment.user_id) }
                  userId={ user && user.id }
                  role={ role }
                  community={ community }
               />
            );
         })}
      </div>
   );
};

CommunityPostComments.propTypes = {
   comments: PropTypes.array,
   onLike: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   user: PropTypes.object,
   onDelete: PropTypes.func,
   commentReplyPost: PropTypes.func,
   showReplyes: PropTypes.bool,
   role: PropTypes.string,
   community: PropTypes.object,
};
