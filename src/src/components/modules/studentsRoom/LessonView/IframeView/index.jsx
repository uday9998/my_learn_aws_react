/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const IframeView = ({
   lesson, primaryTheme,
}) => {
   const [isLoaded, setIsLoaded] = useState(false);
   if (!(lesson.files && lesson.files[0] && lesson.files[0].src)) {
      return null;
   }
   let src = lesson.files && lesson.files[0] && lesson.files[0].src;
   if (lesson.lesson_format === 'Ppt') {
      src = `https://view.officeapps.live.com/op/embed.aspx?src=${ lesson.files[0].src }&embedded=true`;
   }

   if (lesson.lesson_format === 'Pdf') {
      const storageManager = src && src.substring(
         src.lastIndexOf('//') + 1,
         src.lastIndexOf('.com')
      );
      src = storageManager === '/ucarecdn' ? `${ src }-/inline/yes/` : src;
   }
   if (!src) {
      return null;
   }

   return (
      <div className='LessonIframe'>
         <div className='LessonView__iframe'>
            {!isLoaded && <LoaderSpinner />}
            <iframe
               src={ lesson.files ? src : '' }
               frameBorder='0'
               style={ {
                  width: '100%', height: '670px',
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
IframeView.propTypes = {
   lesson: PropTypes.object,
   primaryTheme: PropTypes.string,
};

IframeView.defaultProps = {
   lesson: {},
};

export default IframeView;
