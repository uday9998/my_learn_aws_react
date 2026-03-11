import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router-dom';
import CommentsTabs from 'components/modules/comments/CommentsTabs';
import Comments from 'views/pages/Comments/CommentsView';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/comments/selectors';
import * as operations from 'state/modules/comments/operations';
import { useLocation } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import socketIOClient from 'socket.io-client';
import { appSelector } from 'state/modules/common/selectors';
import QueryParams from 'utils/QueryParams';
import SiteHeader from 'containers/modules/siteheader/index.mob';


const CourseComments = ({
   user, sortingVersion, match, init, comments, loading, isSearching, searchData,
   handleSearch, feed, deleteComment, restoreComment, markComment, reply, app, openMemberProfile,
   openAdminProfile,
}) => {
   const history = useHistory();
   const location = useLocation();
   const [activeTab, setActiveTab] = useState('unread');
   const [search, setSearch] = useState('');
   const [selectedSection, setSelectedSection] = useState(null);
   const [selectedLesson, setSelectedLesson] = useState(null);
   const [checkedCommentIds, setCheckedCommentIds] = useState([]);
   const socket = useRef(null);
   const sortingTypes = {
      'Newest': 1,
      'Oldest': 0,
   };
   const tabsTypes = {
      unread: 1,
      read: 2,
      mentioned: 3,
      reported: 4,
      deleted: 5,
   };

   const bindSocketEvents = () => {
      socket.current.on('course.comment.add', () => {
         init(match.params.id, tabsTypes[QueryParams.getHash()], sortingTypes[sortingVersion] === 1 ? 0 : 1, sortingTypes[sortingVersion] === 1 ? 'Oldest' : 'Newest');
      });
   };
   useEffect(() => {
      setActiveTab(location.hash.replaceAll('#', ''));
      const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ app.uuid }`;
      socket.current = socketIOClient(socketUrl);
      socket.current.removeAllListeners();
      bindSocketEvents();
      socket.current.emit('subscribe');
   }, []);

   useEffect(() => {
      if (search.length > 0) {
         handleSearch(match.params.id, search, tabsTypes[activeTab]);
         return;
      }
      setSelectedLesson(null);
      setSelectedSection(null);
      setCheckedCommentIds([]);
      init(match.params.id, tabsTypes[activeTab], sortingTypes[sortingVersion] === 1 ? 0 : 1, sortingTypes[sortingVersion] === 1 ? 'Oldest' : 'Newest');
   }, [activeTab]);
   useEffect(() => {
      if (selectedSection && comments.sections.length) {
         const updatedVersion = comments.sections.filter((sec) => sec.id === selectedSection.id)[0];
         setSelectedSection(updatedVersion);
         if (selectedLesson) {
            const updatedLesson = updatedVersion.lessons.filter((les) => les.id === selectedLesson.id)[0];
            setSelectedLesson(updatedLesson);
         }
         return;
      }
      setSelectedSection(null);
      setCheckedCommentIds([]);
      setSelectedLesson(null);
   }, [comments]);

   return (
      <AdminContainer className='commentContainer'>
         <AdminContainer.Header>
            <SiteHeader
               goBack
               isLeftAction
               // setIsOpenMobSearch={ this.setIsOpenMobSearch }
               // isMobSearchOpen={ isMobSearchOpen }
            />
         </AdminContainer.Header>
         <HeaderTypeFirst
            title='Comments'
            goBack={ () => history.goBack() }
         />
         <AdminContainer.Content>
            <div className='comments__view'>
               <CommentsTabs
                  TabConsumer={ {
                     activeTab,
                     switchTab: (tab) => {
                        setActiveTab(tab);
                        QueryParams.setHash(tab);
                     },
                  } }
                  commentsCount={ {
                     unread: comments ? comments.all_counts.unRead_count : 0,
                     mentioned: comments ? comments.all_counts.mentioned_count : 0,
                     reported: comments ? comments.all_counts.reported_count : 0,
                     deleted: comments ? comments.all_counts.deleted_count : 0,
                     read: comments ? comments.all_counts.read_count : 0,
                  } }
               />
               {(loading || !comments) ? (
                  <LoaderSpinner />
               ) : (
                  <Comments
                     courseId={ match.params.id }
                     selectedSection={ selectedSection }
                     selectedLesson={ selectedLesson }
                     setSelectedLesson={ setSelectedLesson }
                     checkedCommentIds={ checkedCommentIds }
                     openAdminProfile={ openAdminProfile }
                     setCheckedCommentIds={ setCheckedCommentIds }
                     openMemberProfile={ openMemberProfile }
                     setSelectedSection={ setSelectedSection }
                     comments={ comments }
                     markComment={ (ids) => markComment(match.params.id, ids, {
                        search,
                        tab: tabsTypes[activeTab],
                        sort: sortingTypes[sortingVersion],
                        newSort: sortingVersion,
                     }) }
                     search={ search }
                     setSearch={ setSearch }
                     restoreComment={ (ids) => restoreComment(match.params.id, ids, {
                        search,
                        tab: tabsTypes[activeTab],
                        sort: sortingTypes[sortingVersion],
                        newSort: sortingVersion,
                     }) }
                     activeTab={ activeTab }
                     isSearching={ isSearching }
                     deleteComment={ (ids) => deleteComment(match.params.id, ids, {
                        search,
                        tab: tabsTypes[activeTab],
                        sort: sortingTypes[sortingVersion],
                        newSort: sortingVersion,

                     }) }
                     reply={ (id, text) => reply(match.params.id, id, text, {
                        search,
                        tab: tabsTypes[activeTab],
                        sort: sortingTypes[sortingVersion],
                        newSort: sortingVersion,

                     }) }
                     handleFeed={ (id) => feed(id, match.params.id) }
                     searchData={ searchData }
                     handleSearch={ (text) => handleSearch(match.params.id, text, tabsTypes[activeTab]) }
                     user={ user }
                     handleSort={
                        () => init(match.params.id, tabsTypes[activeTab], sortingTypes[sortingVersion] === 1 ? 0 : 1, sortingTypes[sortingVersion] === 1 ? 'Oldest' : 'Newest')
                     }
                     sortingVersion={ sortingVersion }
                  />
               )}
            </div>
         </AdminContainer.Content>
      </AdminContainer>
   );
};

CourseComments.propTypes = {
   user: PropTypes.object,
   sortingVersion: PropTypes.string,
   match: PropTypes.object,
   init: PropTypes.func,
   comments: PropTypes.any,
   loading: PropTypes.bool,
   isSearching: PropTypes.bool,
   handleSearch: PropTypes.func,
   searchData: PropTypes.array,
   feed: PropTypes.func,
   restoreComment: PropTypes.func,
   deleteComment: PropTypes.func,
   markComment: PropTypes.func,
   reply: PropTypes.func,
   app: PropTypes.object,
   openMemberProfile: PropTypes.func,
   openAdminProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      app: appSelector(state),
      sortingVersion: selectors.SortingVersionSelector(state),
      comments: selectors.commentsSelector(state),
      loading: selectors.loadingSelector(state),
      isSearching: selectors.searchingProgressSelector(state),
      searchData: selectors.searchDataSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (courseId, tab, sortingCount, newSort) => {
         dispatch(operations.getCommentsOperation(courseId, tab, sortingCount, newSort));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
      handleSearch: (courseId, text, tab) => dispatch(operations.searchCommentsOperation(courseId, text, tab)),
      feed: (id, courseId) => {
         dispatch(push({
            pathname: Router.route('ADMIN_COMMENT_FEED').getCompiledPath({ id, courseId }),
         }));
      },
      openMemberProfile: (id) => {
         dispatch(push(Router.route('ADMIN_MEMBER_VIEW').getCompiledPath({ id })));
      },
      openAdminProfile: (id) => {
         dispatch(push({
            pathname: Router.route('ADMIN_ACCOUNT').getCompiledPath({ id }),
            hash: 'billing',
         }));
      },
      deleteComment: (courseId, ids, refreshParams) => dispatch(operations.commentChangesOperation('delete', ids, courseId, 'Comment deleted successfully.', refreshParams)),
      restoreComment: (courseId, ids, refreshParams) => dispatch(operations.commentChangesOperation('restore', ids, courseId, 'Comment restored successfully.', refreshParams)),
      markComment: (courseId, ids, refreshParams) => dispatch(operations.commentChangesOperation('mark', ids, courseId, 'Changes saved successfully..', refreshParams)),
      reply: (courseId, id, text, refreshParams) => {
         dispatch(operations.replyCommentsOperation(courseId, id, text, refreshParams));
      },
      socketAddComment: (data, type) => dispatch(operations.socketAddCommentOperation(data, type)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseComments);
