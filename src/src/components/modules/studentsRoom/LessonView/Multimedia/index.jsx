/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const Multimedia = ({
   lesson,
}) => {
   const src = lesson.multimedia && lesson.multimedia.src;

   const [isLoaded, setIsLoaded] = useState(false);

   if (!src) {
      return null;
   }

   return (
      <div className='LessonIframe'>
         <div className='embed-container'>
            {!isLoaded && <LoaderSpinner />}
            <iframe
               src={ lesson.multimedia ? src : '' }
               frameBorder='0'
               style={ {
                  width: '100%', height: '100%',
               } }
               onLoad={ () => {
                  setIsLoaded(true);
               } }
               title={ lesson.name }
               allowFullScreen
            />
         </div>
         {/* {
            lesson.files && lesson.files.description && (
               <div
                  dangerouslySetInnerHTML={ { __html: lesson.files.description } }
                  style={ { fontFamily: primaryTheme } }
               />
            )
         } */}
      </div>

   );
};
Multimedia.propTypes = {
   lesson: PropTypes.object,
};

Multimedia.defaultProps = {
   lesson: {},
};

export default Multimedia;
