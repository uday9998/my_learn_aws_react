import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/comments/selectors';
import * as operations from 'state/modules/comments/operations';
import CommentFeed from 'views/pages/Comments/CommentFeed';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { appSelector } from 'state/modules/common/selectors';
import socketIOClient from 'socket.io-client';
import SiteHeader from 'containers/modules/siteheader/index.mob';

const CourseComments = ({
   user, match, init, comment, isLoading, replyComment, app,
}) => {
   const history = useHistory();
   const socket = useRef(null);

   //    const location = useLocation();
   const bindSocketEvents = () => {
      socket.current.on('course.comment.add', (data) => {
         if (data.comment.parent_id && data.comment.parent_id === Number.parseFloat(match.params.id)) {
            // socketAddComment(data.comment, true);
            const id = match.params.id;
            const course = match.params.courseId;
            init(course, id);
         }
      });
   };
   useEffect(() => {
      const id = match.params.id;
      const course = match.params.courseId;
      init(course, id);
      const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ app.uuid }`;
      socket.current = socketIOClient(socketUrl);
      bindSocketEvents();
      socket.current.emit('subscribe');
   }, []);
   return (
      <AdminContainer>
         <AdminContainer.Header>
            <>
               <SiteHeader
                  goBack
                  isLeftAction
               // setIsOpenMobSearch={ this.setIsOpenMobSearch }
               // isMobSearchOpen={ isMobSearchOpen }
               />
               <HeaderTypeFirst
                  title={ `Feed #${ match.params.id }` }
                  goBack={ () => history.goBack() }
               />
            </>
         </AdminContainer.Header>
         {isLoading || !comment ? (
            <LoaderSpinner />
         ) : (
            <AdminContainer.Content>
               <CommentFeed
                  comment={ comment }
                  replies={ comment.childs }
                  courseId={ match.params.courseId }
                  userImage={ user.picture_src ? user.picture_src : user.picture_full_src }
                  onReply={ (text) => replyComment(match.params.courseId, match.params.id, text) }
               />
            </AdminContainer.Content>
         )}
      </AdminContainer>
   );
};

CourseComments.propTypes = {
   user: PropTypes.object,
   match: PropTypes.object,
   init: PropTypes.func,
   comment: PropTypes.object,
   replyComment: PropTypes.func,
   isLoading: PropTypes.bool,
   app: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      isProgress: selectors.commentGetProgressSelector(state),
      comment: selectors.commentSelector(state),
      app: appSelector(state),
      isLoading: selectors.commentGetProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (courseId, commentId) => dispatch(operations.getCommentOperation(courseId, commentId)),
      replyComment: (courseId, commentId, text) => {
         dispatch(operations.replyCommentOperation(courseId, commentId, text));
      },
      socketAddComment: (data, type) => dispatch(operations.socketAddCommentOperation(data, type)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseComments);
