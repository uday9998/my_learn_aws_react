import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
// import { SliceAndConnectText } from 'utils/getSplitedText';
// import LessonSortableList from 'components/modules/reorderLessons/LessonSortableList';
// import Icon from 'components/elements/Icon';
import Router from 'routes/router';
// import LessonRight from 'views/pages/DesignCourse/DesingCourseGeneral/DesignCourseGeneralComponents/VideoProgramMediaViewLessons/LessonRight';
import CategorySortableList from 'components/modules/reorderCourses/CategorySortableList';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useApiLazyQuery } from 'utils/hooks/useApiLazyQuery';
import Input from 'components/elements/inputNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import DeleteModal from 'components/elements/DeleteModal';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { useDispatch } from 'react-redux';
import {
   deleteLessonComplete,
} from 'state/modules/designCourse/edit/actions';
import {
   getLessonCategories, reorderCategoriesLessons, deleteLessonVideo,
   saveLessonSettingsVideo,
} from 'api/AuthApi';

const VideoProgramMediaViewLessons = ({
   currentSection, addLesson, goTo, onSelectLessonSettings,
   searchLessonValue, course,
}) => {
   const dispatch = useDispatch();
   const { data: lessonCategories, loading: loadingLessons } = useApiQuery(getLessonCategories, {
      successMessage: 'Custom field has been created.',
   });

   const [getLessonCategoriesFunc, { loading: updateLoadingLesson }] = useSubmitForm(getLessonCategories);
   const [deleteLessonFunc, { loading: updateLoadingLessonDelete }] = useSubmitForm(deleteLessonVideo);
   const [saveLessonSettings, { loading: updateLoadingLessonSettings }] = useSubmitForm(saveLessonSettingsVideo);

   const [reorderCourses] = useApiLazyQuery(reorderCategoriesLessons, { });
   const [categories, setCategories] = useState([]);
   const [lessonIdNew, setLessonIdNew] = useState('');
   const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);

   const [search, setSearch] = useState('');

   useEffect(() => {
      const objectToArray = Array.isArray(categories) ? categories : Object.values(categories);
      setCategories(objectToArray);
   }, [loadingLessons]);

   useEffect(() => {
      getLessonCategoriesFunc(search, (res) => {
         const objectToArray = Array.isArray(res) ? res : Object.values(res);
         setCategories(objectToArray);
      });
   }, [search]);

   const onSave = (datas) => {
      const inputs = datas.map((category) => (
         {
            id: category.id,
            lessons: category.lessons.map((lesson) => (
               lesson.id
            )).map((id) => id).reverse(),
         }
      ));
      const requestInputs = { categories: inputs };
      reorderCourses(requestInputs);
      setCategories(datas);
   };

   const goToLesson = (lesson) => {
      if (lesson.is_playlist !== 1) {
         goTo(Router.route('ADMIN_LESSON_CREATE').getCompiledPath(
            {
               id: currentSection.course_id, sectionId: currentSection.id, lessons: course.type === '1' ? 'videos' : 'lessons', lessonId: lesson.id, 
            }));
      } else {
         goTo(Router.route('ADMIN_PLAYLIST').getCompiledPath(
            { id: currentSection.course_id, sectionId: currentSection.id, playlistId: lesson.id }));
      }
   };


   const handleDeleteLessonVideo = (sectionId, lessonId) => {
      setLessonIdNew(lessonId);
      setDeleteLessonModalOpen(!deleteLessonModalOpen);
   };

   const deleteLessonApproved = () => {
      deleteLessonFunc({ courseId: course.id, sectionId: course.sections[0]?.id, lessonId: lessonIdNew }, () => {
         dispatch(deleteLessonComplete(course.sections[0]?.id, lessonIdNew));
         getLessonCategoriesFunc('', (res) => {
            const objectToArray = Array.isArray(res) ? res : Object.values(res);
            setCategories(objectToArray);
         });
         setLessonIdNew('');
         setDeleteLessonModalOpen(!deleteLessonModalOpen);
      });
   };

   const handleSaveLesson = (isLessonListing, data, lesson) => {
      let changedLesson = {
         ...lesson,
         is_published: data.type ? '2' : '1',
      };
      if (data.data) {
         const time = moment(`${ data.data.time } ${ data.data.timeType }`, ['h:mm A']).format('HH:mm:ss');
         const dripDayTime = `${ moment(data.data.date).format('YYYY-MM-DD ') }${ time }`;
         const userTimeZone = momentTimezone.tz.guess();
         const dateUserTimeZone = momentTimezone.tz(dripDayTime, userTimeZone);
         const dateUTC = dateUserTimeZone.utc().format('YYYY-MM-DD, HH:mm:ss z');
         changedLesson = {
            ...lesson,
            is_published: data.type,
            drip_day_type: data.data.type,
            count: data.data.count,
            drip_date: dateUTC,
            time: data.data.time,
            timeType: data.data.timeType,
         };
      }
      saveLessonSettings({
         courseId: course.id,
         sectionId: course.sections[0]?.id,
         lessonId: lesson.id,
         params: changedLesson,
      }, () => {
         getLessonCategoriesFunc('', (res) => {
            const objectToArray = Array.isArray(res) ? res : Object.values(res);
            setCategories(objectToArray);
         });
      });
   };

   return (
      <>
         {(updateLoadingLesson || updateLoadingLessonDelete || updateLoadingLessonSettings) && (
            <LoaderSpinner />
         ) }
         {/* {!!currentSection.lessons.length && (
            <div className='design__course__general__filter'>
               <Input
                  type='search'
                  isCloseHidenOnEmpty={ true }
                  value={ search }
                  // onChange={ (name, value) => searchLesson(value) }
                  onChange={ (name, value) => setSearch(value) }
                  name='search'
                  placeholder='Search video'
               />
            </div>
         )} */}
         <div className='design__course__media__lessons'>
            <div className='design__course__media__lessons__top'>
            <h2 style={{color: '#24554e'}}>{ course.type === '1' ? 'Videos' : 'Lessons' } ({ currentSection.lessons.filter(lesson => lesson.is_playlist !== 1).length })</h2>
               {/* <Text
                  inner={ course.type === '1' ? 'Videos' : 'Lessons' }
                  size={ sizes.xxlarge }
                  type={ types.regularDefault }
                  miniText={ `${ currentSection.lessons.filter(lesson => lesson.is_playlist !== 1).length }` }
               /> */}
               {!!currentSection.lessons.length && (
                 <button 
                 onClick={() => addLesson(currentSection.id, { is_published: 0 })}
                 className="add__button"
                 style={{ 
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px',
                   color: '#fff',
                   background: '#24554e',
                   border: 'none',
                   cursor: 'pointer',
                   padding: '12px 18px',
                   fontSize: '14px'
                 }}
               >
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
                 {course.type === '1' ? 'Add Video' : 'Add Lesson'}
               </button>
               )}
            </div>
            {!!currentSection.lessons.length && !loadingLessons && categories && !!categories.length
            && !updateLoadingLesson && (
               <CategorySortableList
                  categoryProps={ {
                     // attach,
                     // detach,
                     // rename,
                     // deleteCategory,
                     // getDettachedCourses,
                     // detachedCourses,
                  } }
                  categories={ categories }
                  isAdminVideo={ true }
                  onChange={ onSave }
                  isVideo={ true }
                  videoProps={ {
                     course,
                     deleteLesson: handleDeleteLessonVideo,
                     handleSaveLesson,
                     onSelectLessonSettings,
                     currentSection,
                     goToLesson,
                  }
                  }
               />
            )}
            {/* <LessonSortableList lessons={ currentSection.lessons } onChange={ onReorder }>
            {(provided, snapshot, lesson, getItemStyle, index) => {
               return (
                  <div
                     ref={ provided.innerRef }
                     { ...provided.draggableProps }
                     className='design__course__media__lesson'
                     style={ {
                        ...getItemStyle(
                           snapshot.isDragging,
                           provided.draggableProps.style
                        ),
                     } }
                     onClick={
                        () => goTo(Router.route('ADMIN_LESSON_CREATE').getCompiledPath(
                           { id: currentSection.course_id, sectionId: currentSection.id, lessonId: lesson.id })) }
                     role='presentation'
                  >
                     <div className='left'>
                        <div className='lesson__dragHandle'>
                           <span
                              className='dragHandleIcon'
                              { ...provided.dragHandleProps }
                           >
                              <Icon name='Dragdrop' />
                           </span>
                        </div>
                        <IconNew name='VideoM' />
                        <div
                           className='lesson__name'
                           onClick={
                              () => goTo(Router.route('ADMIN_LESSON_CREATE').getCompiledPath(
                                 { id: currentSection.course_id, sectionId: currentSection.id, lessonId: lesson.id })) }
                           role='presentation'
                        >
                           <Text
                              inner={ `${ index + 1 }. ${ SliceAndConnectText(lesson.name, 100) }` }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </div>
                     </div>
                     <LessonRight
                        lesson={ lesson }
                        course={ course }
                        deleteLesson={ deleteLesson }
                        handleSaveLesson={ handleSaveLesson }
                        onSelectLessonSettings={ onSelectLessonSettings }
                        currentSection={ currentSection }
                     />
                  </div>
               );
            }}
         </LessonSortableList> */}
            {!currentSection.lessons.length && (
               <div className='video__program__media__lessons__empty'>
                  <div>
                     <IconNew name='EmojiProgram' />
                  </div>
                  <div className='video__program__media__lessons__empty__text'>
                     <div>
                        <Text
                           type={ types.regularDefault }
                           size={ sizes.small }
                           inner={ searchLessonValue ? 'Videos not found' : "You don't have videos yet" }
                        />
                     </div>
                     {!searchLessonValue && (
                        <div>
                           <Text
                              type={ types.regularDefaultSmallX }
                              size={ sizes.size_28 }
                              inner="Let's start creating your first video program."
                           />
                        </div>
                     )}
                  </div>
                  {!searchLessonValue && (
                     <div className='video__program__media__lessons__empty__btn'>
                        <Button
                           text='Create Video Membership'
                           onClick={ () => addLesson(currentSection.id, { is_published: 0 }) }
                        />
                     </div>
                  )}
               </div>
            )}

         </div>
         {
            deleteLessonModalOpen && (
               <DeleteModal
                  title='Are you sure you want to delete this video?'
                  deleteText='Delete'
                  maxWidth={ 345 }
                  onDelete={ deleteLessonApproved }
                  onCancel={ () => setDeleteLessonModalOpen(false) }
               />
            )
         }
      </>
   );
};

VideoProgramMediaViewLessons.propTypes = {
   currentSection: PropTypes.object,
   addLesson: PropTypes.func,
   onSelectLessonSettings: PropTypes.func,
   goTo: PropTypes.func,
   searchLessonValue: PropTypes.string,
   course: PropTypes.func,
};

export default VideoProgramMediaViewLessons;
