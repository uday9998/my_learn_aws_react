import React from 'react';
import PropTypes from 'prop-types';
import './index.mob.scss';
import VideoLessonModule from 'components/modules/designCourse/courseMaterial/VideoLesson';

const VideoLesson = ({ lessonAdded }) => {
   return (
      <div className='mob-videoLesson'>
         <VideoLessonModule
            lessonAdded={ lessonAdded }
         />
      </div>
   );
};

VideoLesson.propTypes = {
   lessonAdded: PropTypes.bool,
};

VideoLesson.defaultProps = {
   lessonAdded: false,
};


export default VideoLesson;
