import React, { useState, useEffect } from 'react';
import './index.scss';
import { TextWithIcon, TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
  createLessonNote, getLessonNotes, getAllNotes, deleteLessonNote, getBookmarks,
} from 'api/AuthApi';
import classNames from 'classnames';
import Bookmarks from './Bookmarks';
import Lessons from './Lessons';
import Comments from './Comments';
import Notes from './Notes';

const StudentsRoomSidebar = ({
  changeLesson, activeLesson, sections, lessons, courseComplatePercent, textColor,
  course, darkMode, hasCertificate, joinedStatus, lesson, getLessonInProgress,
  bookmarks, setBookmarks, removeBookmark, loadingBookmark, commentsData, commentsCount,
  active, primaryButton, isMobile, openNavBar, setOpenNavBar, isUnreadComments,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [lessonNotes, setLessonNotes] = useState([]);
  const [lessonAllNotes, setLessonAllNotes] = useState([]);
  const [sidebarMenu, setSidebarMenu] = useState(isUnreadComments ? 'comments' : 'lessons');
  const [notes, setNotes] = useState({
    title: '',
    description: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState('newest');

  const [createLessonNoteFunc, { loading: loadingNote }] = useSubmitForm(createLessonNote, {
    successMessage: 'Note has been created.',
  });

  const [getBookmarksFunc, { loading: loadingBookmarkGet }] = useSubmitForm(getBookmarks);

  const [deleteLessonNoteFunc, { loading: loadingNoteDelete }] = useSubmitForm(deleteLessonNote, {
    successMessage: 'Note has been deleted.',
  });

  const [getAllNotesFunc, { loading: loadingAllNotes }] = useSubmitForm(getAllNotes);

  const [getLessonNotesFunc, { loading: loadingLessonNote }] = useSubmitForm(getLessonNotes);

  const onFilter = (value) => {
    setSortingValue(value);
    getAllNotesFunc({ courseId: course.id, sort_by: value, search_by: searchValue }, (res) => {
      setLessonAllNotes(res);
    });
  };

  const onSearch = (value) => {
    setSearchValue(value);
    getAllNotesFunc({ courseId: course.id, sort_by: sortingValue, search_by: value }, (res) => {
      setLessonAllNotes(res);
    });
  };

  const addNote = () => {
    createLessonNoteFunc({ notes: { lesson_id: activeLesson, ...notes }, course_id: course.id }, (res) => {
      setNotes({
        title: '',
        description: '',
      });
      setLessonNotes([...lessonNotes, res]);
    });
  };

  const handleGetLessonNotesFunc = () => {
    getLessonNotesFunc({ lessonId: activeLesson, courseId: course.id }, (res) => {
      setLessonNotes(res);
    });
  };

  const handleGetBookmarksFunc = () => {
    getBookmarksFunc({ courseId: course.id }, (res) => {
      setBookmarks(res);
    });
  };

  const handleGetAllNotesFunc = () => {
    getAllNotesFunc({ courseId: course.id }, (res) => {
      setLessonAllNotes(res);
    });
  };

  const handleDeleteLessonNoteFunc = (i, noteId) => {
    deleteLessonNoteFunc({ noteId, courseId: course.id }, () => {
      const notesd = lessonNotes.filter(note => note.id !== noteId);
      const notesAll = lessonAllNotes.filter(note => note.id !== noteId);
      setLessonNotes(notesd);
      setLessonAllNotes(notesAll);
    });
  };

  useEffect(() => {
    if (sidebarMenu === 'notes' && !getLessonInProgress) {
      if (showAll) {
        handleGetAllNotesFunc();
      } else {
        handleGetLessonNotesFunc();
      }
    } else if (sidebarMenu === 'bookmarks' && !getLessonInProgress) {
      handleGetBookmarksFunc();
    }
  }, [sidebarMenu, showAll, activeLesson]);

  // Handle menu item click
  const handleMenuClick = (menuType) => {
    setSidebarMenu(menuType);
    if (isMobile && sidebarMenu === menuType) {
      setOpenNavBar(!openNavBar);
    }
  };

  const isMenuActive = (menuType) => classNames({
    sidebarBottomMenuActive: sidebarMenu === menuType && (isMobile ? openNavBar : true),
  });

  return (
    <>
      <div className="studentsRoom-sidebar-content styled_scrollbar" role="complementary">
        {sidebarMenu === 'lessons' && (
          <Lessons
            course={course}
            changeLesson={changeLesson}
            activeLesson={activeLesson}
            sections={sections}
            lessons={lessons}
            courseComplatePercent={courseComplatePercent}
            textColor={textColor}
            darkMode={darkMode}
            hasCertificate={hasCertificate}
            joinedStatus={joinedStatus}
            primaryButton={primaryButton}
            isMobile={isMobile}
            setOpenNavBar={setOpenNavBar}
          />
        )}
        {sidebarMenu === 'notes' && lesson.status !== 3 && (
          <Notes
            notes={notes}
            setNotes={setNotes}
            addNote={addNote}
            showAll={showAll}
            setShowAll={setShowAll}
            primaryButton={primaryButton}
            lessonNotes={lessonNotes}
            lessonAllNotes={lessonAllNotes}
            lesson={lesson}
            handleDeleteLessonNoteFunc={handleDeleteLessonNoteFunc}
            searchValue={searchValue}
            setSearchValue={onSearch}
            onFilter={onFilter}
            sortingValue={sortingValue}
            noteLoading={loadingNote || loadingNoteDelete || loadingAllNotes || loadingLessonNote}
          />
        )}
        {sidebarMenu === 'bookmarks' && lesson.status !== 3 && (
          <Bookmarks
            bookmarks={bookmarks}
            removeBookmark={removeBookmark}
            primaryButton={primaryButton}
            changeLesson={changeLesson}
            lesson={lesson}
            loadingBookmark={loadingBookmark || loadingBookmarkGet}
          />
        )}
        {sidebarMenu === 'comments' && lesson.status !== 3 && (
          <Comments
            commentsData={commentsData}
            lesson={lesson}
            commentsCount={commentsCount}
            active={active}
          />
        )}
      </div>
      
      <div className={classNames('sidebarBottom', {
        'sidebarBottomNoComment': lesson.comment_status === 0
      })}>
        <TextWithIcon
          type={TextType.regularDefault}
          size={TextSize.small}
          iconGap={4}
          iconName="CourseM"
          inner="Lessons"
          style={{ cursor: 'pointer' }}
          onClick={() => handleMenuClick('lessons')}
          classNameActive={isMenuActive('lessons')}
        />

        {lesson.status !== 3 && (
          <TextWithIcon
            type={TextType.regularDefault}
            iconGap={4}
            size={TextSize.small}
            iconName="DocM"
            inner="Notes"
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('notes')}
            classNameActive={isMenuActive('notes')}
          />
        )}

        {lesson.comment_status !== 0 && lesson.status !== 3 && (
          <TextWithIcon
            type={TextType.regularDefault}
            size={TextSize.small}
            iconGap={4}
            iconName="CommentM"
            inner="Comments"
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('comments')}
            classNameActive={isMenuActive('comments')}
          />
        )}

        {lesson.status !== 3 && (
          <TextWithIcon
            type={TextType.regularDefault}
            size={TextSize.small}
            iconGap={4}
            iconName="BookMarkM"
            inner="Bookmarks"
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('bookmarks')}
            classNameActive={isMenuActive('bookmarks')}
          />
        )}
      </div>
    </>
  );
};

StudentsRoomSidebar.propTypes = {
  changeLesson: PropTypes.func,
  activeLesson: PropTypes.number,
  sections: PropTypes.array,
  lessons: PropTypes.array,
  courseComplatePercent: PropTypes.number,
  textColor: PropTypes.string,
  course: PropTypes.object,
  lesson: PropTypes.object,
  darkMode: PropTypes.bool,
  hasCertificate: PropTypes.bool,
  joinedStatus: PropTypes.number,
  getLessonInProgress: PropTypes.bool,
  bookmarks: PropTypes.array,
  setBookmarks: PropTypes.func,
  removeBookmark: PropTypes.func,
  loadingBookmark: PropTypes.bool,
  commentsCount: PropTypes.any,
  commentsData: PropTypes.object,
  primaryButton: PropTypes.object,
  isUnreadComments: PropTypes.bool,
  active: PropTypes.number,
  isMobile: PropTypes.bool,
  openNavBar: PropTypes.bool,
  setOpenNavBar: PropTypes.func,
};

StudentsRoomSidebar.defaultProps = {
  sections: {},
  lessons: [],
  changeLesson: () => {},
  activeLesson: 1,
  courseComplatePercent: 0,
};

export default StudentsRoomSidebar;