/* eslint-disable array-callback-return */
import React from 'react';
import './index.scss';
// import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
// import { useSubmitForm } from 'utils/hooks/useSubmitForm';
// import {
//    createLessonNote, getLessonNotes, getAllNotes, deleteLessonNote, getBookmarks,
// } from 'api/AuthApi';
// import classNames from 'classnames';
// import Bookmarks from './Bookmarks';
import Comments from './Comments';
// import Notes from './Notes';


const VideoSidebar = ({
   // changeLesson, activeLesson,
   // course,
   lesson, getLessonInProgress,
   // bookmarks, setBookmarks, removeBookmark, loadingBookmark,
   commentsData, commentsCount,
   active,
   // primaryButton, isMobile, openNavBar, setOpenNavBar,
}) => {
   // const t = useTranslate();
   // const [showAll, setShowAll] = useState(false);
   // const [lessonNotes, setLessonNotes] = useState([]);
   // const [lessonAllNotes, setLessonAllNotes] = useState([]);
   // const [sidebarMenu, setSidebarMenu] = useState('comments');
   // const [notes, setNotes] = useState({
   //    title: '',
   //    description: '',
   // });

   // const [searchValue, setSearchValue] = useState('');
   // const [sortingValue, setSortingValue] = useState('newest');

   // const [createLessonNoteFunc, { loading: loadingNote }] = useSubmitForm(createLessonNote, {
   //    successMessage: 'Note has been created.',
   // });

   // const [getBookmarksFunc, { loading: loadingBookmarkGet }] = useSubmitForm(getBookmarks);


   // const [deleteLessonNoteFunc, { loading: loadingNoteDelete }] = useSubmitForm(deleteLessonNote, {
   //    successMessage: 'Note has been deleted.',
   // });


   // const [getAllNotesFunc, { loading: loadingAllNotes }] = useSubmitForm(getAllNotes);


   // const [getLessonNotesFunc, { loading: loadingLessonNote }] = useSubmitForm(getLessonNotes);

   // const onFilter = (value) => {
   //    setSortingValue(value);
   //    getAllNotesFunc({ courseId: course.id, sort_by: value, search_by: searchValue }, (res) => {
   //       setLessonAllNotes(res);
   //    });
   // };

   // const onSearch = (value) => {
   //    setSearchValue(value);
   //    getAllNotesFunc({ courseId: course.id, sort_by: sortingValue, search_by: value }, (res) => {
   //       setLessonAllNotes(res);
   //    });
   // };

   // const addNote = () => {
   //    createLessonNoteFunc({ notes: { lesson_id: activeLesson, ...notes }, course_id: course.id }, (res) => {
   //       setNotes({
   //          title: '',
   //          description: '',
   //       });
   //       lessonNotes.push(res);
   //       setLessonNotes(lessonNotes);
   //    });
   // };

   // const handleGetLessonNotesFunc = () => {
   //    getLessonNotesFunc({ lessonId: activeLesson, courseId: course.id }, (res) => {
   //       setLessonNotes(res);
   //    });
   // };

   // const handleGetBookmarksFunc = () => {
   //    getBookmarksFunc({ courseId: course.id }, (res) => {
   //       setBookmarks(res);
   //    });
   // };

   // const handleGetAllNotesFunc = () => {
   //    getAllNotesFunc({ courseId: course.id }, (res) => {
   //       setLessonAllNotes(res);
   //    });
   // };

   // const handleDeleteLessonNoteFunc = (i, noteId) => {
   //    deleteLessonNoteFunc({ noteId, courseId: course.id }, () => {
   //       const notesd = lessonNotes.filter(note => note.id !== noteId);
   //       const notesAll = lessonAllNotes.filter(note => note.id !== noteId);
   //       setLessonNotes(notesd);
   //       setLessonAllNotes(notesAll);
   //    });
   // };

   // useEffect(() => {
   //    if (sidebarMenu === 'notes' && !getLessonInProgress) {
   //       if (showAll) {
   //          handleGetAllNotesFunc();
   //       } else {
   //          handleGetLessonNotesFunc();
   //       }
   //    } else if (sidebarMenu === 'bookmarks' && !getLessonInProgress) {
   //       handleGetBookmarksFunc();
   //    }
   // }, [sidebarMenu, showAll]);

   // useEffect(() => {
   //    if (!getLessonInProgress) {
   //       if (lesson.comment_status === 0) {
   //          setSidebarMenu('notes');
   //       } else {
   //          setSidebarMenu('comments');
   //       }
   //    }
   // }, [lesson]);

   const style = {};

   return (
      <>
         {/* <div className={ lesson.comment_status !== 0 ? 'videoBottom' : 'videoBottom videoBottomNoComment' }>
            {lesson.comment_status !== 0 && (
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  iconGap={ 0 }
                  iconName=''
                  inner='Comments'
                  style={ { cursor: 'pointer' } }
                  onClick={ () => { setSidebarMenu('comments'); if (isMobile && sidebarMenu === 'comments') { setOpenNavBar(!openNavBar); } } }
                  classNameActive={
                     classNames(
                        {
                           videoBottomMenuActive: sidebarMenu === 'comments',
                        })
                  }
               />
            )}
             <Text
               type={ TextType.regularDefault }
               iconGap={ 0 }
               size={ TextSize.small }
               iconName=''
               inner='Notes'
               style={ { cursor: 'pointer' } }
               onClick={ () => { setSidebarMenu('notes'); if (isMobile && sidebarMenu === 'notes') { setOpenNavBar(!openNavBar); } } }
               classNameActive={
                  classNames(
                     {
                        videoBottomMenuActive: sidebarMenu === 'notes',
                     })
               }
            />
             <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               iconGap={ 0 }
               iconName=''
               inner='Bookmarks'
               style={ { cursor: 'pointer' } }
               onClick={ () => { setSidebarMenu('bookmarks'); if (isMobile && sidebarMenu === 'bookmarks') { setOpenNavBar(!openNavBar); } } }
               classNameActive={
                  classNames(
                     {
                        videoBottomMenuActive: sidebarMenu === 'bookmarks',
                     })
               }
            />
         </div> */}
         <div className='studentsRoom-sidebar-content styled_scrollbar initialHide' style={ style }>
            {/* {sidebarMenu === 'notes' && (
               <Notes
                  notes={ notes }
                  setNotes={ setNotes }
                  addNote={ addNote }
                  showAll={ showAll }
                  setShowAll={ setShowAll }
                  primaryButton={ primaryButton }
                  lessonNotes={ lessonNotes }
                  lessonAllNotes={ lessonAllNotes }
                  lesson={ lesson }
                  handleDeleteLessonNoteFunc={ handleDeleteLessonNoteFunc }
                  searchValue={ searchValue }
                  setSearchValue={ onSearch }
                  onFilter={ onFilter }
                  sortingValue={ sortingValue }
                  noteLoading={ loadingNote || loadingNoteDelete || loadingAllNotes || loadingLessonNote }
               />
            )}
            {sidebarMenu === 'bookmarks' && (
               <Bookmarks
                  bookmarks={ bookmarks }
                  removeBookmark={ removeBookmark }
                  primaryButton={ primaryButton }
                  changeLesson={ changeLesson }
                  lesson={ lesson }
                  loadingBookmark={ loadingBookmark || loadingBookmarkGet }
               />
            )} */}
            { !getLessonInProgress && lesson && lesson.id && (
               <Comments
                  commentsData={ commentsData }
                  lesson={ lesson }
                  commentsCount={ commentsCount }
                  active={ active }
               />
            )}

         </div>

      </>
   );
};

VideoSidebar.propTypes = {
   // changeLesson: PropTypes.func,
   // activeLesson: PropTypes.number,
   // course: PropTypes.object,
   lesson: PropTypes.object,
   getLessonInProgress: PropTypes.bool,
   // bookmarks: PropTypes.array,
   // setBookmarks: PropTypes.func,
   // removeBookmark: PropTypes.func,
   // loadingBookmark: PropTypes.bool,
   commentsCount: PropTypes.any,
   commentsData: PropTypes.object,
   // primaryButton: PropTypes.object,
   active: PropTypes.number,
   // isMobile: PropTypes.bool,
   // openNavBar: PropTypes.bool,
   // setOpenNavBar: PropTypes.func,
};

VideoSidebar.defaultProps = {
   // changeLesson: () => {},
   // activeLesson: 1,
};
export default VideoSidebar;
