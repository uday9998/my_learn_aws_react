import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CourseCard from 'components/elements/designCourse/CourseCard';
import CourseLinksModalContent from 'components/modules/designCourse/CourseLinksModalContent';
import withLoading from 'utils/withLoading';
import PagePagination from 'components/elements/designCourse/PagePagination';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import EmptyPage from 'components/modules/emptyPageNew';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import YourProductEmptyState from 'components/modules/yourProductEmptyState';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CoursesFilter from './CoursesFilter';

const CoursesLoading = withLoading(React.Fragment);

const DesignCourse = ({
   searchField, handleInternalInputChange, selectCourse,
   handleDuplicateCourse, handleDeleteCourse, deleteCourseModalOpen,
   handleCancelDeleteCourse, handleApproveDeleteCourse, handleCourseLinks,
   handleCancelCourseLinks, handleApproveCourseLinks, courseLinksModalOpen,
   currentCourse, goTo, copyCodeToClipboard, copyView, getCoursesInProgress,
   changeCoursePage, authUser, showCourse, app, isMultiSelected, onCheck, selectedCoursesIds, hideCourseHandle,
   createProduct, courses, totalCourses, isEmptyByFilter, isMobileTable, felteredCoursesInProgress,
}) => {

   return (
      <>
         {(courses && !courses.length && !isEmptyByFilter && !getCoursesInProgress) && (
            <div className='empty__comp__wrapper'>
               <YourProductEmptyState />
               <EmptyPage
                  subtitle="You don't have products yet"
                  title="Let's start creating your first product."
                  buttonName='Create Product'
                  iconName='productEmptyL'
                  handleAction={ createProduct }
                  courses={ courses }
               />
            </div>
         )}
         {(getCoursesInProgress || felteredCoursesInProgress) && <LoaderSpinner />}
         {courses && !!courses.length && !getCoursesInProgress && (
            <div className='d-designCourse'>
               {
                  !isEmptyByFilter ? (
                     <div className='designCourse__courses'>
                        <CoursesLoading isLoading={ getCoursesInProgress }>
                           { courses.map(course => (
                              <div className='designCourse__card' key={ course.id }>
                                 <CourseCard
                                    isMobileTable={ isMobileTable }
                                    image={ course.type === '2' ? ((course.communities && course.communities.file_id) || course.thumbnail_image) : course.thumbnail_image }
                                    title={ course.name }
                                    isPublished={ course.is_published }
                                    isShowCourse={ course.show_course }
                                    selectCourse={ () => selectCourse(course.type === '2' ? course.community_id : course.id, course.type === '2' ? 'community' : 'any', course) }
                                    showCourse={ (e) => showCourse(e, course.id, course.show_course) }
                                    handleDuplicateCourse={ (e) => handleDuplicateCourse(e, course.id) }
                                    handleDeleteCourse={ (e) => handleDeleteCourse(e, course.id) }
                                    handleCourseLinks={ (e) => handleCourseLinks(e, course.id) }
                                    count={ course.type == 2 ? course.communities?.members.length : (course.users_count || 0) }
                                    courseId={ course.id }
                                    search={ searchField || '' }
                                    courseType={ course.type }
                                    onCheck={ () => onCheck(course.id) }
                                    isChecked={ selectedCoursesIds.includes(course.id) }
                                    isMultiSelected={ isMultiSelected }
                                    hideCourseHandle={ hideCourseHandle }
                                    authUser={ authUser }
                                    siteInfo={ app }
                                    publishingDate={ course.publishing_date }
                                    allowDelete={ course.allow_delete }
                                    planNames={ course.plan_names }
                                    isCommunity={ Boolean(course.community_id) }
                                    course={ course }
                                    courses={ courses }
                                 />
                              </div>
                           ))
                           }
                           <div className='flex justify-center m-t-exl m-b-exl p-t-exs course-pagination'>
                              <PagePagination
                                 isLoading={ getCoursesInProgress }
                                 changePage={ changeCoursePage }
                                 total={ totalCourses }
                              />
                           </div>
                        </CoursesLoading>
                        {
                           deleteCourseModalOpen && (
                              <DeleteModal
                                 deleteText='Delete'
                                 onDelete={ () => handleApproveDeleteCourse() }
                                 onCancel={ () => handleCancelDeleteCourse() }
                                 title='Are you sure you want to delete this product?'
                              />
                           )
                        }
                        {
                           courseLinksModalOpen && (
                              <ModalNew
                                 onCloseModal={ () => handleCancelCourseLinks() }
                              >

                                 <CourseLinksModalContent
                                    onCancel={ () => handleCancelCourseLinks() }
                                    onApprove={ () => handleApproveCourseLinks() }
                                    currentCourse={ currentCourse }
                                    goTo={ goTo }
                                    handleInternalInputChange={ handleInternalInputChange }
                                    copyCodeToClipboard={ copyCodeToClipboard }
                                    copyView={ copyView }
                                    authUser={ authUser }
                                    app={ app }
                                 />

                              </ModalNew>
                           )
                        }
                     </div>
                  ) : (
                     <div className='empty_by_filter_wrapper'>
                        <IconNew name='productEmptyL' />
                        <Text
                           size={ textSize.small }
                           type={ textType.regularDefault }
                           inner='No results'
                        />
                     </div>
                  )
               }
            </div>
         )}
      </>
   );
};

DesignCourse.propTypes = {
   courses: PropTypes.array,
   searchField: PropTypes.string,
   handleInternalInputChange: PropTypes.func,
   selectCourse: PropTypes.func,
   handleDuplicateCourse: PropTypes.func,
   handleDeleteCourse: PropTypes.func,
   deleteCourseModalOpen: PropTypes.bool,
   handleCourseLinks: PropTypes.func,
   handleCancelDeleteCourse: PropTypes.func,
   handleApproveDeleteCourse: PropTypes.func,
   handleCancelCourseLinks: PropTypes.func,
   handleApproveCourseLinks: PropTypes.func,
   courseLinksModalOpen: PropTypes.bool,
   currentCourse: PropTypes.object,
   goTo: PropTypes.func,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   getCoursesInProgress: PropTypes.bool,
   changeCoursePage: PropTypes.func,
   totalCourses: PropTypes.number,
   authUser: PropTypes.object,
   showCourse: PropTypes.func,
   app: PropTypes.object,
   selectedCoursesIds: PropTypes.array,
   isMultiSelected: PropTypes.bool,
   onCheck: PropTypes.func,
   hideCourseHandle: PropTypes.func,
   createProduct: PropTypes.func,
   isEmptyByFilter: PropTypes.bool,
   isMobileTable: PropTypes.bool,
   felteredCoursesInProgress: PropTypes.bool,
};

DesignCourse.defaultValue = {
   courses: [],
   switchAddingCourse: () => {},
};

export default DesignCourse;
