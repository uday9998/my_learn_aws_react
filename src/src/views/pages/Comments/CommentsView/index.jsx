import React, { useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CommentsBar from '../CommentsComponents/CommentsBar';
import CommenstLessonBar from '../CommentsComponents/CommentsLessonsBar';
import CommentsList from '../CommentsComponents/CommentsList';
import CommentsSearchView from '../CommentsComponents/CommentsSearchView';

const Comments = ({
   user, sortingVersion, activeTab, comments, handleSearch, searchData, isSearching,
   handleSort, search, setSearch, handleFeed, restoreComment, deleteComment, markComment,
   reply, selectedSection, setSelectedSection, selectedLesson, setSelectedLesson,
   checkedCommentIds, setCheckedCommentIds, courseId, openMemberProfile, openAdminProfile,
}) => {
   const handleCheck = (prev, id) => {
      if (prev) {
         setCheckedCommentIds(checkedCommentIds.filter((e) => e !== id));
         return;
      }
      setCheckedCommentIds([...checkedCommentIds, id]);
   };
   const checkAllComments = (val, data) => {
      const ids = data.map((i) => i.id);
      if (!val) {
         setCheckedCommentIds(Array.from(new Set([...checkedCommentIds, ...ids])));
         return;
      }
      setCheckedCommentIds(checkedCommentIds.filter((i) => !ids.includes(i)));
   };

   const getAllComments = () => {
      const data = comments.all_comments;
      return data;
   };

   useEffect(() => {
      if (search.length > 0) {
         handleSearch(search);
      }
   }, [search]);

   return (
      <div className='comments__view__content'>
         <Input
            value={ search }
            onChange={ (name, value) => setSearch(value) }
            placeholder='Search'
            type='search'
            isCloseHidenOnEmpty={ true }
         />
         {isSearching ? (
            <LoaderSpinner />
         ) : (
            <div className='comments__view__content__bottom'>
               {(search.length > 0 && searchData) ? (
                  <CommentsSearchView
                     data={ searchData }
                     handleCheck={ handleCheck }
                     userId={ user.id }
                     activeTab={ activeTab }
                     search={ search }
                     courseId={ courseId }
                     onCheckAll={ checkAllComments }
                     onFeed={ handleFeed }
                     deleteComment={ deleteComment }
                     openAdminProfile={ openAdminProfile }
                     onReply={ reply }
                     openMemberProfile={ openMemberProfile }
                     markComment={ markComment }
                     restoreComment={ restoreComment }
                     userImage={ user.picture_src }
                     checkedCommentIds={ checkedCommentIds }
                  />
               ) : (
                  <>
                     <CommentsBar
                        sections={ comments.sections }
                        selectedSection={ selectedSection }
                        onSelect={ (section) => {
                           setSelectedSection(section);
                           if (section) {
                              setSelectedLesson(section.lessons[0]);
                              return;
                           }
                           setSelectedLesson(null);
                        } }
                        commentsCount={ comments.all_comments_count }
                        commentsType={ comments.type }
                     />
                     {selectedSection && (
                        <CommenstLessonBar
                           lessons={ selectedSection.lessons }
                           onCheck={ handleCheck }
                           onCheckAll={ checkAllComments }
                           selectedLesson={ selectedLesson }
                           onSelectLesson={ (lesson) => setSelectedLesson(lesson) }
                        />
                     )}
                     <CommentsList
                        handleCheck={ handleCheck }
                        data={ selectedLesson ? selectedLesson.lessonComments : getAllComments() }
                        sortingVersion={ sortingVersion }
                        userId={ user.id }
                        onSort={ () => handleSort() }
                        openAdminProfile={ openAdminProfile }
                        courseId={ courseId }
                        activeTab={ activeTab }
                        deleteComment={ deleteComment }
                        openMemberProfile={ openMemberProfile }
                        restoreComment={ restoreComment }
                        onFeed={ handleFeed }
                        onReply={ reply }
                        markComment={ markComment }
                        onCheckAll={ checkAllComments }
                        checkedCommentIds={ checkedCommentIds }
                        userImage={ user.picture_src ? user.picture_src : user.picture_full_src }
                     />
                  </>
               )}
            </div>
         )}
      </div>
   );
};

Comments.propTypes = {
   user: PropTypes.object,
   sortingVersion: PropTypes.string,
   activeTab: PropTypes.string,
   comments: PropTypes.object,
   handleSearch: PropTypes.func,
   searchData: PropTypes.any,
   isSearching: PropTypes.bool,
   handleSort: PropTypes.func,
   setSearch: PropTypes.func,
   search: PropTypes.string,
   handleFeed: PropTypes.func,
   openAdminProfile: PropTypes.func,
   restoreComment: PropTypes.func,
   courseId: PropTypes.string,
   deleteComment: PropTypes.func,
   markComment: PropTypes.func,
   reply: PropTypes.func,
   selectedSection: PropTypes.any,
   setSelectedSection: PropTypes.func,
   selectedLesson: PropTypes.any,
   setSelectedLesson: PropTypes.func,
   checkedCommentIds: PropTypes.array,
   setCheckedCommentIds: PropTypes.func,
   openMemberProfile: PropTypes.func,
};

export default Comments;
