import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CourseCreateHeader from './CourseCreateHeader';
import CourseCreateContent from './CourseCreateContent';
import ProgramCreatetion from './ProgramCreatetion';
import OnlineCourseCreatetion from './OnlineCourseCreatetion';
import CommunityCreatetion from './CommunityCreatetion';

const DesignCourseCreate = ({
   goBack, onCreate, courses, step, setStep, setSelectedLessonType, selectedLessonType,
   integrations, goToIntegrations, errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage
}) => {
   useEffect(() => {
      setStep(1);
   }, [selectedLessonType]);
   const handleBack = () => {
      if (selectedLessonType) {
         setSelectedLessonType(null);
         return;
      }
      goBack();
   };
   const [options, setOptions] = useState([]);
   useEffect(() => {
      const op = courses.map(((el) => ({ label: el.name, value: el.id })));
      setOptions(op);
   }, [courses]);

   return (
      <div className='course__create'>
         <CourseCreateHeader
            isDesingedStep={ step !== 1 }
            isFinishCommunityStep={ step === 4 }
            goBack={ handleBack }
         />
         {!selectedLessonType && (
            <CourseCreateContent 
               courses={ courses }
               onCreate={ onCreate }
               onSelect={ (type) => setSelectedLessonType(type) }
            />
         )}
         {selectedLessonType === 'program' && (
            <ProgramCreatetion
               goBack={ handleBack }
               onCreate={ onCreate }
               step={ step }
               setStep={ setStep }
               integrations={ integrations }
               goToIntegrations={ goToIntegrations }
               errorMessages={ errorMessages }
               clearErrorMessages={ clearErrorMessages }
               removeErrorMessage={ removeErrorMessage }
               addTemporaryErrorMessage={ addTemporaryErrorMessage }
            />
         )}
         {selectedLessonType === 'onlineCourse' && (
            <OnlineCourseCreatetion
               goBack={ handleBack }
               onCreate={ onCreate }
               step={ step }
               setStep={ setStep }
               integrations={ integrations }
               goToIntegrations={ goToIntegrations }
               errorMessages={ errorMessages }
               clearErrorMessages={ clearErrorMessages }
               removeErrorMessage={ removeErrorMessage }
               addTemporaryErrorMessage={ addTemporaryErrorMessage }
            />
         )}
         {selectedLessonType === 'community' && (
            <CommunityCreatetion
               goBack={ handleBack }
               onCreate={ onCreate }
               step={ step }
               options={ options }
               setStep={ setStep }
               integrations={ integrations }
               goToIntegrations={ goToIntegrations }
               errorMessages={ errorMessages }
               clearErrorMessages={ clearErrorMessages }
               removeErrorMessage={ removeErrorMessage }
               addTemporaryErrorMessage={ addTemporaryErrorMessage }
            />
         )}
      </div>
   );
};

DesignCourseCreate.propTypes = {
   goBack: PropTypes.func,
   onCreate: PropTypes.func,
   courses: PropTypes.array,
   step: PropTypes.number,
   setStep: PropTypes.func,
   setSelectedLessonType: PropTypes.func,
   selectedLessonType: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default DesignCourseCreate;
