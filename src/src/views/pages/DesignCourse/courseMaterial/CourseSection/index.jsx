import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import NewSection from 'components/modules/designCourse/courseMaterial/NewSection';
import CourseSectionModule from 'components/modules/designCourse/courseMaterial/CourseSection';
import AudioLesson from 'components/modules/designCourse/courseMaterial/AudioLesson';
import LessonSettings from 'components/modules/designCourse/courseMaterial/LessonSettings';
import LessonResources from 'components/modules/designCourse/courseMaterial/LessonResources';
import LessonComments from 'components/modules/designCourse/courseMaterial/LessonComments';
import VideoLesson from 'components/modules/designCourse/courseMaterial/VideoLesson';
import FileLesson from 'components/modules/designCourse/courseMaterial/FileLesson';
import PdfLesson from 'components/modules/designCourse/courseMaterial/PdfLesson';
import PptLesson from 'components/modules/designCourse/courseMaterial/PptLesson';
import QuizLesson from 'components/modules/designCourse/courseMaterial/QuizLesson';
import TextLesson from 'components/modules/designCourse/courseMaterial/TextLesson';
import ImageLesson from 'components/modules/designCourse/courseMaterial/ImageLesson';

const CourseSection = ({
   lessons, addLesson, selectedLessons, deleteLesson, selectLesson, activeLesson, onReorderLessons,
}) => {
   const renderLesson = () => {
      switch (activeLesson.name) {
         case 'Audio':
            return (
               <>
                  <AudioLesson />
                  <div className='m-t-exs'>
                     <LessonSettings isOpen />
                  </div>
                  <div className='m-t-exs'>
                     <LessonResources />
                  </div>
                  <div className='m-t-exs'>
                     <LessonComments />
                  </div>
               </>
            );
         case 'Video':
            return <VideoLesson />;
         case 'Text':
            return <TextLesson />;
         case 'PDF':
            return <PdfLesson />;
         case 'PowerPoint':
            return <PptLesson />;
         case 'Image':
            return <ImageLesson />;
         case 'Quiz':
            return <QuizLesson />;
         case 'Multimedia':
            return <FileLesson />;
         default:
            return (
               <NewSection
                  sectionAdded={ true }
                  sectionName='Welcome! Start Here'
               />
            );
      }
   };

   return (
      <div className='d-courseSection flex w-full'>
         <div className='content_left'>
            <div className='m-r-exl'>
               <CourseSectionModule
                  lessons={ lessons }
                  addLesson={ addLesson }
                  selectedLessons={ selectedLessons }
                  deleteLesson={ deleteLesson }
                  selectLesson={ selectLesson }
                  onReorderLessons={ onReorderLessons }
               />
            </div>
         </div>
         <div className='content_right'>
            <div className='m-l-exl'>
               { renderLesson() }
            </div>
         </div>
      </div>
   );
};

export default CourseSection;

CourseSection.propTypes = {
   lessons: PropTypes.array,
   addLesson: PropTypes.func,
   selectLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   selectedLessons: PropTypes.array,
   activeLesson: PropTypes.object,
   onReorderLessons: PropTypes.func,
};
