import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PreviewVideo = ({
   previewSrc, poster, isLesson,
}) => {
   let interval = null;
   const [loaded, setLoaded] = useState(true);
   const [width, setWidth] = useState(0);

   useEffect(() => {
      return () => {
         clearInterval(interval);
      };
   }, []);

   const onLoadedData = () => {
      interval = setTimeout(() => {
         setWidth(100);
      }, 10);
      interval = setTimeout(() => {
         setLoaded(false);
         setWidth(0);
      }, 710);
   };

   return (
      <>
         {
            loaded && !isLesson && (
               <div
                  style={ {
                     height: '3px',
                     background: 'var(--buttonBgcolor)',
                     width: `${ width }%`,
                     transition: 'all 0.75s ease-out',
                     position: 'absolute',
                     top: '0px',
                  } }
               />
            )
         }
         <div>
            <video
               style={ {
                  transition: 'visibility 0.2s',
                  visibility: `${ loaded ? 'hidden' : 'visible' }`,
               } }
               onLoadedData={ onLoadedData }
               muted={ true }
               autoPlay={ true }
               loop
               playsInline
               poster={ poster || '' }
            >
               <source src={ previewSrc } type='video/mp4' />
               <source src={ previewSrc } type='video/ogg' />
               Your browser does not support the video tag.
               <track
                  kind='captions'
               />
            </video>
         </div>
      </>
   );
};

PreviewVideo.propTypes = {
   previewSrc: PropTypes.string,
   poster: PropTypes.string,
   isLesson: PropTypes.bool,
};

export default PreviewVideo;
