/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as operations from 'state/modules/courseComments/operations';
import * as selectors from 'state/modules/courseComments/selectors';
import {
   sendCommentAction,
   deleteCommentAction as deleteCommentAct,
   resetCommentsNewFieldAction,
   setDeletedStatusAction,
   likeCommentAction,
} from 'state/modules/courseComments/actions';
import { appSelector, authUserSelector } from 'state/modules/common/selectors';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import CommentsBlock from 'components/modules/studentsRoom/CommentsBlock';
import CommentsVideoBlock from 'components/modules/studentsRoom/CommentsVideoBlock';
import NotFoundImg from 'assets/images/mobile/main-hub/artwork.png';
import LoaderSpinner from 'components/elements/LoaderSpiner';

class CourseCommentsContainer extends Component {
   filter={
      count: 10,
      page: 1,
   }

   static propTypes = {
      commentsData: PropTypes.object,
      fetchData: PropTypes.bool,
      fetchNewData: PropTypes.bool,
      getComments: PropTypes.func,
      getNewComments: PropTypes.func,
      courseId: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
      ]),
      sectionId: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
      ]),
      lessonId: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
      ]),
      courseName: PropTypes.string,
      user: PropTypes.object,
      createComment: PropTypes.func,
      sendComment: PropTypes.func,
      likeComment: PropTypes.func,
      deleteComment: PropTypes.func,
      toggleLikeComment: PropTypes.func,
      deleteCommentAction: PropTypes.func,
      resetCommentsNewField: PropTypes.func,
      setDeletedStatus: PropTypes.func,
      textColor: PropTypes.string,
      primaryTheme: PropTypes.string,
      showCommentsView: PropTypes.bool,
      commentStatus: PropTypes.number,
      app: PropTypes.object,
      defaultColor: PropTypes.string,
      isVideoProgram: PropTypes.bool,
   }

   state={
      commentText: '',
      replyCommentText: null,
      replyCommentId: null,
      goToCommentsBlockTop: false,
   }

   componentDidMount() {
      const {
         user: { app_id: appId }, courseId, sectionId, lessonId, courseName, getComments, app: { uuid },
      } = this.props;
      this.filter = {
         ...this.filter,
         page: 1,
         course_id: courseId,
         section_id: sectionId,
         lesson_id: lessonId,
      };
      const query = this.generateQuery();
      getComments(courseName, query);
      const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ appId || uuid }`;
      this.socket = socketIOClient(socketUrl);
      this.bindSocketEvents();
      this.socket.emit('subscribe');
   }

   componentDidUpdate(prevProps) {
      const {
         courseId, sectionId, lessonId, courseName, getComments,
      } = this.props;
      if (prevProps.courseId !== courseId || prevProps.sectionId !== sectionId || prevProps.lessonId !== lessonId) {
         this.filter = {
            ...this.filter,
            page: 1,
            course_id: courseId,
            section_id: sectionId,
            lesson_id: lessonId,
         };
         const query = this.generateQuery();
         getComments(courseName, query);
      }
   }

   componentWillUnmount() {
      this.socket.emit('unsubscribe');
   }

   bindSocketEvents = () => {
      this.socket.on('course.comment.add', data => {
         const {
            lessonId, user, sendComment, resetCommentsNewField,
         } = this.props;
         const { comment, lesson_id } = data;
         if (lessonId == lesson_id && user.id != comment.user_id) {
            sendComment(comment);
            setTimeout(() => {
               resetCommentsNewField();
            }, 2000);
         }
      });
      this.socket.on('course.comment.delete', data => {
         const {
            deleteCommentAction, setDeletedStatus, user, lessonId,
         } = this.props;
         const { lesson_id, user_id } = data;
         if (lessonId == lesson_id && user.id != user_id) {
            setDeletedStatus(data.id);
            setTimeout(() => {
               deleteCommentAction(data.id, data.parent_id);
            }, 500);
         }
      });
      this.socket.on('course.comment.toggleLike', data => {
         const {
            user, lessonId, likeComment,
         } = this.props;
         const {
            comment_id, user_id, lesson_id, parent_id, likes_count,
         } = data;
         if (lessonId == lesson_id && user.id != user_id) {
            likeComment(comment_id, likes_count, parent_id);
         }
      });
   }


   handleScroll = (e) => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (scrollHeight - scrollTop === clientHeight) {
         this.nextPage();
      }
   }

   nextPage = async () => {
      const {
         courseName, getNewComments, fetchNewData, commentsData: { current_page: currentPage, last_page: pages },
      } = this.props;
      let query = [];
      if (currentPage < pages && !fetchNewData) {
         this.filter = { ...this.filter, page: currentPage + 1 };
         query = this.generateQuery();
         await getNewComments(courseName, query);
      }
   }

   generateQuery = () => {
      const query = [];
      Object.keys(this.filter).forEach((key) => {
         if (key && this.filter[key]) {
            query.push(`${ key }=${ this.filter[key] }`);
         }
      });
      return query;
   };

   handleCommentChange = (name, value) => {
      this.setState({ [name]: value });
   }

   handleOnCreate = (e, commentId = null) => {
      e.preventDefault();
      const {
         createComment, courseId, sectionId, lessonId, resetCommentsNewField,
      } = this.props;
      const { commentText, replyCommentText } = this.state;

      if ((commentId && replyCommentText && replyCommentText.trim()) || commentText.trim()) {
         const data = {
            course_id: courseId,
            section_id: sectionId,
            parent_id: commentId,
            lesson_id: lessonId,
            text: commentId ? replyCommentText.trim() : commentText.trim(),
         };
         createComment(data);
         setTimeout(() => {
            resetCommentsNewField();
         }, 2000);
         if (commentId) {
            this.setState({ replyCommentText: null, replyCommentId: null });
         } else {
            this.setState({ commentText: '', goToCommentsBlockTop: true }, () => {
               setTimeout(() => {
                  this.setState({ goToCommentsBlockTop: false });
               }, 1000);
            });
         }
      }
   }

   onDeleteComment = (id, parentId = null) => {
      const { deleteComment, setDeletedStatus, courseName } = this.props;
      setDeletedStatus(id);
      setTimeout(() => {
         deleteComment(courseName, id, parentId);
      }, 500);
   }

   onTogglelIkeComment = (id, parentId = null) => {
      const { toggleLikeComment, courseName } = this.props;
      toggleLikeComment(courseName, id, parentId);
   }

   setReplyComment = (id) => {
      const {
         replyCommentId,
      } = this.state;
      if (id === replyCommentId) {
         this.setState({
            replyCommentId: id,
         });
      } else {
         this.setState({
            replyCommentId: id,
            replyCommentText: null,
         });
      }
   }

   render() {
      const {
         commentsData, fetchData, user, fetchNewData, textColor,
         primaryTheme, showCommentsView, commentStatus, defaultColor,
         isVideoProgram,
      } = this.props;
      const {
         commentText, replyCommentText, goToCommentsBlockTop, replyCommentId,
      } = this.state;
      if (!showCommentsView) {
         return null;
      }

      return (
         fetchData ? (
            (<LoaderSpinner background='transparent' />)
         ) : (
            <>
               {isVideoProgram && (
                  <CommentsVideoBlock
                     comments={ commentsData.data }
                     user={ user }
                     commentText={ commentText }
                     replyCommentText={ replyCommentText }
                     replyCommentId={ replyCommentId }
                     handleOnChange={ this.handleCommentChange }
                     handleOnCreate={ this.handleOnCreate }
                     goToTop={ goToCommentsBlockTop }
                     handleOnScroll={ this.handleScroll }
                     setReplyComment={ this.setReplyComment }
                     defaultColor={ defaultColor }
                     loading={ fetchNewData }
                     actions={ {
                        deleteComment: this.onDeleteComment,
                        toggleLikeComment: this.onTogglelIkeComment,
                     } }
                     textColor={ textColor }
                     primaryTheme={ primaryTheme }
                     commentStatus={ commentStatus }
                     isVideoProgram={ isVideoProgram }
                  />
               )}
               {!isVideoProgram && (
                  <CommentsBlock
                     comments={ commentsData.data }
                     user={ user }
                     commentText={ commentText }
                     replyCommentText={ replyCommentText }
                     replyCommentId={ replyCommentId }
                     handleOnChange={ this.handleCommentChange }
                     handleOnCreate={ this.handleOnCreate }
                     goToTop={ goToCommentsBlockTop }
                     handleOnScroll={ this.handleScroll }
                     setReplyComment={ this.setReplyComment }
                     defaultColor={ defaultColor }
                     loading={ fetchNewData }
                     actions={ {
                        deleteComment: this.onDeleteComment,
                        toggleLikeComment: this.onTogglelIkeComment,
                     } }
                     textColor={ textColor }
                     primaryTheme={ primaryTheme }
                     commentStatus={ commentStatus }
                     isVideoProgram={ isVideoProgram }
                  />
               )}
            </>
         )
      );
   }
}

const mapStateToProps = (state) => {
   return {
      commentsData: selectors.commentsDataSelector(state),
      user: authUserSelector(state),
      app: appSelector(state),
      fetchData: selectors.fetchDataSelector(state),
      fetchNewData: selectors.fetchNewDataSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getComments: (courseName, data) => dispatch(operations.getCommentsOperation(courseName, data)),
      getNewComments: (courseName, param) => dispatch(operations.getNewCommentsOperation(courseName, param)),
      createComment: (data) => dispatch(operations.createCommentOperation(data)),
      sendComment: (data) => dispatch(sendCommentAction(data)),
      deleteComment: (courseName, id, parentId) => {
         dispatch(operations.deleteCommentOperation(courseName, id, parentId));
      },
      deleteCommentAction: (id, parentId) => dispatch(deleteCommentAct(id, parentId)),
      toggleLikeComment: (courseName, id, parentId) => {
         dispatch(operations.toggleLikeCommentOperation(courseName, id, parentId));
      },
      resetCommentsNewField: () => dispatch(resetCommentsNewFieldAction()),
      setDeletedStatus: (id) => dispatch(setDeletedStatusAction(id)),
      likeComment: (id, likesCount, parentId) => dispatch(likeCommentAction(id, likesCount, parentId)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCommentsContainer);
