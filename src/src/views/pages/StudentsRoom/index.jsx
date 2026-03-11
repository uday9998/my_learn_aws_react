import React, { useEffect, useState } from 'react';
import './index.scss';
import StudentsRoomSideBar from 'components/modules/studentsRoom/StudentsRoomSidebar';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import LessonView from 'components/modules/studentsRoom/LessonView';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import DripContent from 'components/modules/studentsRoom/dripContent';
import LessonWithNoPermission from 'components/modules/studentsRoom/LessonWithNoPermission';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import ClassHeaderNav from 'components/modules/mainHub/ClassHeaderNav';
import IconNew from 'components/elements/iconsSize';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   addBookmark as addBookmarkAction,
} from 'api/AuthApi';
import { useHistory } from 'react-router';
import { getWindowSize } from 'utils/getWindowSize';
import { portalId } from 'utils/constants';
// import OffersHeaderContainer from 'containers/pages/mixed/OffersHeaderContainer';

const StudentsRoom = ({
   active, course, changeLesson, activeLesson, courseComplatePercent,
   sections, lessons, author, lesson, activeLessonPrev, activeLessonNext, prevButtonShow,
   activeQuestionNext, questions, defaultQuestionId, activeQuestion,
   getLessonInProgress, onChangeChecked, isChecked, disableNext, questionNextText, commentsData,
   authUser, textColor, gotToDashboard, commentsCount, primaryTheme, siteInfo, onAddNoCompletedVideoView,
   onAddCompletedVideoView, onJoin, joinedStatus, isUnreadComments, isFreeCourse,
}) => {
   const { innerWidth } = getWindowSize();
   const isMobile = innerWidth < 1024;

   const history = useHistory();
   const [addBookmarkFunc, { loading: loadingBookmark }] = useSubmitForm(addBookmarkAction, {
      successMessage: 'Lesson has been added to bookmarks.',
   });

   const [openNavBar, setOpenNavBar] = useState(!isMobile);
   const [removeBookmarkFunc, { loading: loadingBookmarkRemove }] = useSubmitForm(addBookmarkAction, {
      successMessage: 'Lesson has been deleted from bookmarks.',
   });

   const [isBookmarked, setIsBookmarked] = useState(lesson.is_bookmarked_count);
   const [bookmarks, setBookmarks] = useState([]);

   const addBookmark = (id, lessonn) => {
      setIsBookmarked(!isBookmarked);
      if (!isBookmarked) {
         addBookmarkFunc({ courseId: course.id, id }, () => {
            setBookmarks([
               ...bookmarks, lessonn,
            ]);
         });
      } else {
         removeBookmarkFunc({ courseId: course.id, id }, () => {
            const bookmarksNew = bookmarks.filter(bookmarkSingle => bookmarkSingle.id !== id);
            setBookmarks(bookmarksNew);
         });
      }
   };

   const removeBookmark = (id) => {
      removeBookmarkFunc({ courseId: course.id, id }, () => {
         const bookmarksNew = bookmarks.filter(bookmarkSingle => bookmarkSingle.id !== id);
         setBookmarks(bookmarksNew);
         if (lesson.id === id) {
            setIsBookmarked(false);
         }
      });
   };

   const darkMode = false;
   const defaultColor = darkMode ? '#fff' : '#3f4f65';
   const { user_certificate: userCertificate = {} } = course || {};
   const { certificate_status: certificateStatus } = userCertificate || {};
   useEffect(() => {
      document.body.classList.add('styled_scrollbar');
      if (darkMode) {
         document.body.style.backgroundColor = '#141414';
      }
      return () => {
         document.body.classList.remove('styled_scrollbar');
         document.body.style.backgroundColor = undefined;
      };
   }, [darkMode]);

   useEffect(() => {
      setIsBookmarked(lesson.is_bookmarked_count);
   }, [lesson]);

   useEffect(() => {
      document.body.style.setProperty('--scrollbar-color', 'var(--buttonBgcolor)');
   }, []);
   let lessonArrowBtns = [
      <BaseButton
         size={ btnSize.medium }
         theme={ btnTheme.purple }
         text='Complete and Continue'
         onClick={ () => activeLessonNext() }
         disabled={ (!(defaultQuestionId === 0 || disableNext)) || courseComplatePercent === 100 }
         className='studentRoom_menu_link'
         style={ { backgroundColor: 'var(--buttonBgcolor)', color: 'var(--textColor)', borderColor: 'var(--buttonBgcolor)' } }
         // style={ { borderRadius: '4px', fontFamily: primaryTheme || 'Avenir Next DemiBold', backgroundColor: textColor } }
      />,
   ];
   if (prevButtonShow) {
      lessonArrowBtns = [
         <div>
            <BaseButton
               size={ btnSize.medium }
               theme={ btnTheme.lightPurple }
               text='Previous Lesson'
               onClick={ () => activeLessonPrev() }
               disabled={ !(defaultQuestionId === 0 || disableNext) }
               className='studentRoom_menu_link'
               style={ { color: 'var(--secondaryTextColor)', backgroundColor: 'var(secondaryButtonBgcolor', borderColor: 'var(--secondaryTextColor)' } }
               //  style={ { borderRadius: '4px', fontFamily: primaryTheme || 'Avenir Next DemiBold', backgroundColor: textColor } }
            />
         </div>,
         ...lessonArrowBtns];
   }

   const closeSidebar = () => {
      setOpenNavBar(!openNavBar);
   };

   return (
      <>
         {/* <OffersHeaderContainer /> */}
         <ClassHeaderNav
            loggedIn={ !!authUser }
            authUser={ authUser }
            showLogo={ siteInfo.remove_branding !== '1' }
            links={ siteInfo.custom_links && siteInfo.custom_links.items }
            color={ defaultColor }
            logo={ course.logo }
            isStudentRoom
            backgroundColor={ !darkMode ? '#fff' : '#141414' }
            itemsList={ lessonArrowBtns }
            primaryTheme={ primaryTheme }
            siteInfo={ siteInfo }
            darkMode={ darkMode }
            // onGoBack={ () => history.push(Router.route('OFFERS').getCompiledPath(portalId)) }
            onGoBack={ () => history.push('/portal/onlinecourse') }
         />
         <div className={ isMobile ? 'studentsRoom studentsRoomMobile' : 'studentsRoom' } style={ { backgroundColor: 'var(--mainBgColor)' } }>
            <div className={ !openNavBar ? 'studentsRoom-sidebar studentsRoom-sidebar-mob' : 'studentsRoom-sidebar' } style={ openNavBar ? { position: 'absolute', transform: 'translate(0%)' } : { position: 'absolute', transform: 'translate(-100%)' } }>
               <StudentsRoomSideBar
                  authUser={ authUser }
                  isMobile={ isMobile }
                  openNavBar={ openNavBar }
                  setOpenNavBar={ setOpenNavBar }
                  course={ course }
                  hasCertificate={ certificateStatus === 'generated' }
                  sections={ sections }
                  darkMode={ darkMode }
                  defaultColor={ defaultColor }
                  lessons={ lessons }
                  changeLesson={ changeLesson }
                  lesson={ lesson }
                  activeLesson={ activeLesson }
                  courseComplatePercent={ courseComplatePercent }
                  textColor={ textColor }
                  gotToDashboard={ gotToDashboard }
                  primaryTheme={ primaryTheme }
                  author={ author }
                  joinedStatus={ joinedStatus }
                  getLessonInProgress={ getLessonInProgress }
                  bookmarks={ bookmarks }
                  setBookmarks={ setBookmarks }
                  removeBookmark={ removeBookmark }
                  loadingBookmark={ loadingBookmark || loadingBookmarkRemove }
                  commentsData={ commentsData }
                  commentsCount={ commentsCount }
                  active={ active }
                  isUnreadComments={ isUnreadComments }
               />
            </div>
            {getLessonInProgress && (<LoaderSpinner />)}
            <div className='studentsRoom__main' style={ !openNavBar || isMobile ? { marginLeft: '0px' } : { marginLeft: '416px' } }>
               <div className='sidebar__arrow' onClick={ () => closeSidebar() } role='presentation'>
                  <IconNew name='ChevronLeftL' style={ !openNavBar ? { transform: 'rotate(180deg)' } : {} } />
               </div>

               {
                  lesson.status === 1 && !getLessonInProgress && (
                     <>
                        {lesson && !lesson.is_free_lesson && lesson.is_drip_turned_on && lesson.is_driplesson
                           ? <DripContent lesson={ lesson } darkMode={ darkMode } />
                           : (
                              <div>
                                 {!getLessonInProgress && (
                                    <LessonView
                                       lesson={ lesson }
                                       course={ course }
                                       questions={ questions }
                                       defaultQuestionId={ defaultQuestionId }
                                       activeQuestion={ activeQuestion }
                                       activeQuestionNext={ activeQuestionNext }
                                       onChangeChecked={ onChangeChecked }
                                       isChecked={ isChecked }
                                       questionNextText={ questionNextText }
                                       primaryTheme={ primaryTheme }
                                       textColor={ textColor }
                                       isMobile={ isMobile }
                                       defaultColor={ defaultColor }
                                       onAddNoCompletedVideoView={ onAddNoCompletedVideoView }
                                       onAddCompletedVideoView={ onAddCompletedVideoView }
                                       darkMode={ darkMode }
                                       addBookmark={ addBookmark }
                                       isBookmarked={ isBookmarked }
                                       setIsBookmarked={ setIsBookmarked }
                                       openNavBar={ openNavBar }
                                    />
                                 )
                                 }
                              </div>
                           )
                        }
                     </>
                  )}
               {lesson.status === 3 && !getLessonInProgress && (
                  <LessonWithNoPermission
                     defaultColor={ defaultColor }
                     primaryTheme={ primaryTheme }
                     textColor={ textColor }
                     onJoin={ onJoin }
                     isFreeCourse={ isFreeCourse }
                     lessonName={ lesson.name }
                     course={ course }
                     authUser={ authUser }
                     lesson={ lesson }
                  />
               )}
            </div>
         </div>
      </>
   );
};

StudentsRoom.propTypes = {
   lessons: PropTypes.array,
   lesson: PropTypes.object,
   author: PropTypes.object,
   sections: PropTypes.array,
   active: PropTypes.number,
   course: PropTypes.object,
   changeLesson: PropTypes.func,
   activeLesson: PropTypes.number,
   activeLessonPrev: PropTypes.func,
   activeLessonNext: PropTypes.func,
   courseComplatePercent: PropTypes.number,
   prevButtonShow: PropTypes.bool,
   isChecked: PropTypes.array,
   activeQuestionNext: PropTypes.func,
   questions: PropTypes.array,
   defaultQuestionId: PropTypes.number,
   activeQuestion: PropTypes.number,
   getLessonInProgress: PropTypes.bool,
   onChangeChecked: PropTypes.func,
   disableNext: PropTypes.bool,
   questionNextText: PropTypes.string,
   textColor: PropTypes.string,
   commentsData: PropTypes.object,
   authUser: PropTypes.object,
   gotToDashboard: PropTypes.func,
   onAddNoCompletedVideoView: PropTypes.func,
   onAddCompletedVideoView: PropTypes.func,
   onJoin: PropTypes.func,
   commentsCount: PropTypes.any,
   primaryTheme: PropTypes.string,
   siteInfo: PropTypes.object,
   joinedStatus: PropTypes.number,
   isUnreadComments: PropTypes.bool,
   isFreeCourse: PropTypes.func,
};

StudentsRoom.defaultProps = {
   active: 1,
   activeLesson: 1,
   courseComplatePercent: 0,
   isChecked: [],
   gotToDashboard: () => {},
   changeLesson: () => {},
   activeLessonPrev: () => {},
   activeLessonNext: () => {},
   onChangeChecked: () => {},
   textColor: '#7cb740',
   // darkMode: false,

};

export default StudentsRoom;
