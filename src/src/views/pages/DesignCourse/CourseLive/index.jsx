import React from 'react';
import LiveCard from 'components/modules/designCourse/courseLive/LiveCard';
import './index.scss';
import PropTypes from 'prop-types';

const CourseLive = ({
   handleCourseLive, settingsData, copyCodeToClipboard, copyView,
   handleApproveCourseLinks, handleCancelCourseLinks, handleCourseLinks,
   courseLinksModalOpen, handleInputChange, goTo, disableLive, authUser, app,
}) => {
   return (
      <div className='d-courseLive w-full'>
         <LiveCard
            handleCourseLive={ handleCourseLive }
            settingsData={ settingsData }
            copyCodeToClipboard={ copyCodeToClipboard }
            copyView={ copyView }
            handleApproveCourseLinks={ handleApproveCourseLinks }
            handleCancelCourseLinks={ handleCancelCourseLinks }
            handleCourseLinks={ handleCourseLinks }
            courseLinksModalOpen={ courseLinksModalOpen }
            handleInputChange={ handleInputChange }
            goTo={ goTo }
            disableLive={ disableLive }
            authUser={ authUser }
            app={ app }
         />
      </div>
   );
};

CourseLive.propTypes = {
   handleCourseLive: PropTypes.func,
   settingsData: PropTypes.object,
   courseLinksModalOpen: PropTypes.bool,
   handleCancelCourseLinks: PropTypes.func,
   goTo: PropTypes.func,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   handleApproveCourseLinks: PropTypes.func,
   handleCourseLinks: PropTypes.func,
   handleInputChange: PropTypes.func,
   disableLive: PropTypes.bool,
   authUser: PropTypes.object,
   app: PropTypes.object,
};

export default CourseLive;
