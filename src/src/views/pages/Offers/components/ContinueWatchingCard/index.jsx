import PropTypes from 'prop-types';
import { videoImg } from 'utils/videoImg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import './index.scss';

const ContinueWatchingCard = ({
   watchingData,
}) => {
   const history = useHistory();

   const handleGoToVideoPage = () => {
      if (watchingData.lesson.is_playlist) {
         history.push(`/programs/${ watchingData.course.url }/playlists/${ watchingData.lesson.link }?video=${ watchingData.lesson_id }`);
      } else {
         history.push(`/programs/${ watchingData.course.url }/${ watchingData.category.link }?video=${ watchingData.lesson_id }`);
      }
   };

   return (
      <div role='presentation' onClick={ handleGoToVideoPage } className='continue__card'>
         {/* <div
            className='video__picture'
            style={ {
               backgroundImage: `url(${ videoImg(watchingData.lesson) })`,
            } } /> */}
         <img src={ videoImg(watchingData.lesson) } alt='' />
         <div className='info__section'>
            <div className='info__wrapper'>
               <Text
                  inner={ watchingData.lesson.name }
                  size={ sizes.large_new }
                  style={ {
                     color: 'var(--newTextColor)',
                  } }
               />
               {/* <Text
                  inner={ watchingData.lesson.description ? watchingData.lesson.description : '' }
                  size={ sizes.small14 }
                  style={ {
                     color: 'rgb(156 156 156)',
                  } }
               /> */}
            </div>
            <div className='progress__wrapper'>
               <div
                  style={ {
                     width: Math.ceil((watchingData.duration / watchingData.video.duration) * 100) === 100 ? '43px' : Math.ceil((watchingData.duration / watchingData.video.duration) * 100) > 9 ? '36px' : 'max-content',
                  } }
                  className='precent__wrapper'>
                  <Text 
                     inner={ `${ !Number(watchingData.video.duration) ? watchingData.video.duration : Math.ceil((watchingData.duration / watchingData.video.duration) * 100) }%` }
                     size={ sizes.small14 }
                     style={ {
                        color: 'var(--textColor)',
                     } }
                  />
               </div>
               <div className='progress'>
                  <div
                     style={ {
                        width: `${ !Number(watchingData.video.duration) ? watchingData.video.duration : Math.ceil((watchingData.duration / watchingData.video.duration) * 100) }%`,
                     } }
                     className='progress__fill' />
               </div>
            </div>
         </div>
      </div>
   );
};

ContinueWatchingCard.propTypes = {
   watchingData: PropTypes.object,
};

export default ContinueWatchingCard;