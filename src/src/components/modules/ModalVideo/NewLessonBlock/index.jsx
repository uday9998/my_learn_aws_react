import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import ImageWithIcon from 'components/modules/studentsRoom/LessonWithNoPermission/ImageWithIcon';
import VideoAuthor from 'views/pages/VideoProgamsRoom/VideoAuthor';
import moment from 'moment';
import './index.scss';

const VideoLessonBlock = ({
   modalLesson, course, videoImg, isSmall,
}) => {
   const LessonAuthor = modalLesson.author || (course && course.authors[0]);

   const getVideoTimeFromDuration = (seconds) => {
      const duration = moment.duration(seconds, 'seconds');
      return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
   };
   return (
      <div className='video_lesson_block'>
         <div className='image_wrapper'>
            <div className='info_wrapper'>
               <div
                  className='video_lesson_block__left__image'
               >
                  <ImageWithIcon
                     src={ videoImg(modalLesson) ? videoImg(modalLesson) : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' }
                     lesson={ modalLesson }
                     isSmall={ isSmall }
                  />
               </div>
               <div className={ isSmall ? 'instructor_wrapper_small' : 'instructor_wrapper' }>
                  <Text
                     inner={ modalLesson.name }
                     size={ sizes.large }
                     type={ types.medium }
                     style={ { color: 'var(--textColor)' } }
                  />
                  {!isSmall && !!modalLesson.duration && (
                     <Text
                        inner={ getVideoTimeFromDuration(modalLesson.duration) }
                        size={ sizes.xsmall }
                        type={ types.regularDefaultGrey150 }
                     />
                  )}
                  {!isSmall && (
                     <div>
                        <VideoAuthor LessonAuthor={ LessonAuthor } />
                     </div>
                  )}
               </div>

            </div>

         </div>
         {isSmall && (
            <div className='instructor__onlineCourse'>
               <Text
                  inner='Instructor: '
                  type={ types.regularDefaultGrey150 }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
               <Text
                  inner={ LessonAuthor.name }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
         )}
      </div>
   );
};

VideoLessonBlock.propTypes = {
   modalLesson: PropTypes.object,
   course: PropTypes.object,
   videoImg: PropTypes.func,
   isSmall: PropTypes.bool,
};

export default VideoLessonBlock;
