import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import ImageWithIcons from 'components/elements/ImageWithIcons';

import './index.scss';

const NewLessonBlock = ({ modalLesson }) => {
   return (
      <div className='new_lesson_block'>
         <div className='image_wrapper'>
            <div className='info_wrapper'>
               <div
                  className='offer__lesson__block__left__image'
               >
                  <ImageWithIcons
                     src={ modalLesson.file ? modalLesson.file.src : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' }
                     lesson={ modalLesson }
                  />
               </div>
               <Text
                  inner={ modalLesson.name }
                  size={ sizes.large }
                  type={ types.medium }
                  style={ { color: 'var(--textColor)' } }
               />
            </div>
            <div className='instructor_wrapper'>
               <Text
                  inner='Instructor:'
                  size={ sizes.medium }
                  type={ types.medium }
                  style={ { color: 'var(--subtitleTextColor060)' } }
               />
               <Text
                  inner={ modalLesson.name }
                  size={ sizes.medium }
                  type={ types.medium }
                  style={ { color: 'var(--textColor)' } }
               />
            </div>
         </div>
      </div>
   );
};

NewLessonBlock.propTypes = {
   modalLesson: PropTypes.object,
};

export default NewLessonBlock;
