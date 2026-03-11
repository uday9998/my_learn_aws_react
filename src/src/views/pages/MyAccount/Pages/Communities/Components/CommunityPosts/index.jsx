import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CommunityPost from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPost';
import { MyAccountContext } from 'containers/pages/member/account';

const CommunityPosts = ({
   posts, handleLikePost, handlePostCommentReply, hadnlePostComment, handlePostCommentLike, postCommentDelete,
   community,
}) => {
   const { user } = React.useContext(MyAccountContext);
   return (
      <div className='account__community__posts'>
         {posts && posts.map((e) => {
            return (
               <CommunityPost
                  goToCourse={ () => {} }
                  user={ user }
                  commentReplyPost={ (postId, commentId, text) => handlePostCommentReply(e, commentId, text) }
                  commentPost={ (id, text) => hadnlePostComment(e, text) }
                  key={ e.id }
                  goToMemberProfile={ () => {} }
                  postLike={ () => handleLikePost(e) }
                  post={ { ...e, author: user } }
                  // onDeleteComment={ onDeleteComment }
                  commentType={ 1 }
                  handleUserVote={ () => {} }
                  postCommentLike={ (postId, commentId) => handlePostCommentLike(e, commentId) }
                  postCommentDelete={ (comment, isReplay) => postCommentDelete(comment, e.room_id, isReplay) }
                  community={ community }
               />
            );
         })}
      </div>
   );
};

CommunityPosts.propTypes = {
   posts: PropTypes.array,
   handleLikePost: PropTypes.func,
   handlePostCommentReply: PropTypes.func,
   hadnlePostComment: PropTypes.func,
   handlePostCommentLike: PropTypes.func,
   postCommentDelete: PropTypes.func,
   community: PropTypes.object,
};

export default CommunityPosts;
