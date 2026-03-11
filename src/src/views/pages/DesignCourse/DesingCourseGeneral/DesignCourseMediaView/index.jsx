import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import DesignCourseMediaSections from '../DesignCourseGeneralComponents/DesignCourseMediaViewSections';
import DesignCourseMediaViewLessons from '../DesignCourseGeneralComponents/DesignCourseMediaViewLessons';
import VideoProgramMediaViewLessons from '../DesignCourseGeneralComponents/VideoProgramMediaViewLessons';
// import VideoProgramMediaViewSections from '../DesignCourseGeneralComponents/VideoProgramMediaViewSections';

const DesignCourseMediaView = ({
   sections, onCreate, selectedSection, setSelectedSection, addLesson, onReorder, onReorderLessons,
   goTo, setSelectedSectionSettings, setSelectedLessonSettings, course, deleteLesson, searchLessonValue,
   handleSaveLesson,
}) => {
   const { isMobile } = useWindowSizeChange();
   const [isOpenCreateSection, setIsOpenSectionPopup] = useState(false);

   useEffect(() => {
      if (isMobile) {
         if (sections.length && !selectedSection.id) {
            setSelectedSection(sections[0]);
         }
      }
   }, [sections]);

   const handleChangeOpenSection = (bool) => {
      setIsOpenSectionPopup(bool);
   };

   const getViewLessonsComp = () => {
      if ((selectedSection.id && course.type !== '1') || isOpenCreateSection) {
         return (
            <DesignCourseMediaViewLessons
               isVideoProgram={ course.type === '1' }
               onReorder={ onReorderLessons }
               currentSection={ selectedSection }
               addLesson={ addLesson }
               goTo={ goTo }
               onSelectLessonSettings={ setSelectedLessonSettings }
               deleteLesson={ deleteLesson }
               handleSaveLesson={ handleSaveLesson }
               course={ course }
            />
         );
      }
   };

   return (
      <>
         <div className={ course.type !== '1' ? 'design__course__media__view' : 'design__course__media__view__video' }>
            {(course.type !== '1') && (
               <DesignCourseMediaSections
                  selectedSection={ selectedSection }
                  setSelectedSection={ setSelectedSection }
                  onReorder={ onReorder }
                  sections={ sections }
                  onSelecteSectionSettings={ setSelectedSectionSettings }
                  onCreateSection={ onCreate }
                  isVideoProgram={ course.type === '1' }
                  handleChangeOpenSection={ handleChangeOpenSection }
                  isOpenCreateSection={ isOpenCreateSection }
                  isMobile={ isMobile }
               />
            )}
            {getViewLessonsComp()}
            {/* { course.type === '1' && (
               <VideoProgramMediaViewSections
                  selectedSection={ selectedSection }
                  setSelectedSection={ setSelectedSection }
                  onReorder={ onReorder }
                  sections={ sections }
                  onSelecteSectionSettings={ setSelectedSectionSettings }
                  onCreateSection={ onCreate }
                  isVideoProgram={ course.type === '1' }
               />
            )} */}
            {selectedSection.id && course.type === '1' && (
               <VideoProgramMediaViewLessons
                  isVideoProgram={ course.type === '1' }
                  onReorder={ onReorderLessons }
                  currentSection={ selectedSection }
                  addLesson={ (sectionId, format) => addLesson(sectionId, format, true) }
                  goTo={ goTo }
                  onSelectLessonSettings={ setSelectedLessonSettings }
                  deleteLesson={ deleteLesson }
                  searchLessonValue={ searchLessonValue }
                  handleSaveLesson={ handleSaveLesson }
                  course={ course }
               />
            )}
         </div>
      </>
   );
};

DesignCourseMediaView.propTypes = {
   course: PropTypes.object,
   sections: PropTypes.array,
   onCreate: PropTypes.func,
   selectedSection: PropTypes.any,
   setSelectedSection: PropTypes.func,
   onReorder: PropTypes.func,
   addLesson: PropTypes.func,
   onReorderLessons: PropTypes.func,
   setSelectedSectionSettings: PropTypes.func,
   goTo: PropTypes.func,
   setSelectedLessonSettings: PropTypes.func,
   deleteLesson: PropTypes.func,
   searchLessonValue: PropTypes.string,
   handleSaveLesson: PropTypes.func,
};

export default DesignCourseMediaView;
