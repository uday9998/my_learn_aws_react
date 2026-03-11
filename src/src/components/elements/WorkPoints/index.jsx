import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import YoutubeVideoPlayer from 'components/elements/YoutubeVideoPlayer';
import './index.scss';

const WorkPoints = ({ videoUrl, points, thumbnail }) => {
   const [isOpenVideoPlay, setIsOpenVideoPlayer] = useState(false);
   return (
      <div className='work__points'>
         <div className='work__points__left' role='presentation' onClick={ () => setIsOpenVideoPlayer(true) }>
            <img src={ thumbnail } alt='' />
         </div>
         {isOpenVideoPlay && (
            <YoutubeVideoPlayer
               onClose={ () => setIsOpenVideoPlayer(false) }
               src={ videoUrl }
            />
         )}
         <div className='work__points__right'>
            <Text
               inner='See how it works'
               type={ TextType.mediumSmall }
               size={ TextSize.xlarge }
            />
            <div className='work__points__flex'>
               <div className='work__points__flex__item'>
                  <div className='item'>
                     <Text
                        inner='1.'
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                     <Text
                        inner={ points[0] }
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                  </div>
                  <div className='item'>
                     <Text
                        inner='2.'
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                     <Text
                        inner={ points[1] }
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                  </div>
               </div>
               <div className='work__points__flex__item'>
                  <div className='item'>
                     <Text
                        inner='3.'
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                     <Text
                        inner={ points[2] }
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                  </div>
                  <div className='item'>
                     <Text
                        inner='4.'
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                     <Text
                        inner={ points[3] }
                        type={ TextType.mediumLarge }
                        size={ TextSize.small }
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

WorkPoints.propTypes = {
   thumbnail: PropTypes.any,
   videoUrl: PropTypes.string,
   points: PropTypes.array,
};

export default WorkPoints;
