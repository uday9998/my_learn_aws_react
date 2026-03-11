import React from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';

import './index.scss';

const VideoAuthor = ({
   LessonAuthor,
}) => {
   if (!LessonAuthor) {
      return null;
   }
   return (
      <div className='videoProgramContent__right__author'>
         <div style={{display: 'none'}}>
            <img src={ LessonAuthor.picture_src } alt='author' />
         </div>
         <div>
            <div className='notranslate'>
               <Text
                  inner={ LessonAuthor.name }
                  type={ textType.regularDefault }
                  size={ textSize.small }
               />
            </div>
            {LessonAuthor.description && (
               <TextWithSeeMore text={ LessonAuthor.description } maxLength={ 100 } />
               // <Text
               //    inner={ LessonAuthor.description }
               //    type={ textType.regularDefault }
               //    size={ textSize.small14 }
               // />
            )}
         </div>
      </div>
   );
};


VideoAuthor.propTypes = {
   LessonAuthor: PropTypes.object,
};

VideoAuthor.defaultProps = {};

export default VideoAuthor;
