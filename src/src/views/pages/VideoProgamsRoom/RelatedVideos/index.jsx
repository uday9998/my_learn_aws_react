import React from 'react';
// import PropTypes from 'prop-types';
import './index.scss';
import { useApiQuery } from 'utils/hooks/useQuery';
import PropTypes from 'prop-types';
import { relatedVideos } from 'api/AuthApi';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import withLoading from 'utils/withLoading';
import ImageWithIcons from 'components/elements/ImageWithIcons';
import { videoRealtedImg } from 'utils/videoImg';

const RelatedVideo = withLoading('div');

const RelatedVideos = ({ course }) => {
   const {
      data: videos, loading,
   } = useApiQuery(relatedVideos, [course.catId]);


   const goToCourse = (catLink, video) => {
      if (video.is_playlist) {
         window.open(`/programs/${ course.course_url }/playlists/${ video.link }`, '_blank');
      } else {
         window.open(`/programs/${ course.course_url }/${ catLink }?video=${ video.id }`, '_blank');
      }
   };

   return (
      <RelatedVideo className='relatedVideos' isLoading={ loading }>
         { videos && !!videos.length && (
            <>
               <div>
                  <Text
                     inner=' Related Videos'
                     type={ textType.medium160 }
                     size={ textSize.xlarge }
                  />
               </div>
               <div className='relatedVideos__content'>
                  {videos.map(video => {
                     return (
                        <div
                           key={ video.id }
                           role='presentation'
                           onClick={ () => goToCourse(video.category_link, video) }>
                           <ImageWithIcons
                              src={ videoRealtedImg(video) }
                              lesson={ !course.joined && video }
                           />
                           <div className='relatedVideos__text'>
                              <Text
                                 inner={ video.name }
                                 type={ textType.medium160 }
                                 size={ textSize.small_14 }
                              />
                           </div>
                        </div>
                     );
                  })
                  }
               </div>
               <div className='grey_line' />
            </>
         )}
      </RelatedVideo>
   );
};

RelatedVideos.propTypes = {
   course: PropTypes.object,
};

export default RelatedVideos;
