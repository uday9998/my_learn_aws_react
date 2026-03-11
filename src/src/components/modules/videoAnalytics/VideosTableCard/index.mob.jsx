/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.mob.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import img from 'assets/images/video-image.png';
import classnames from 'classnames';

const videos = [
   { title: 'Entrepreneur Overwhelm Training', text: 'Class Code Masterclass', img },
   { title: 'Create A Product In A Weekend', text: 'Class Code Masterclass', img },
   { title: 'Sales Funnel Masterclass', text: 'Class Code Masterclass', img },
   { title: 'Session 2- Reverse Audience Research', text: 'Class Code Masterclass', img },
   { title: 'Session 3- Landing Page Optimization', text: 'Class Code Masterclass', img },
   { title: 'Session 4- Ad Design', text: 'Class Code Masterclass', img },
   { title: 'Session 5-Campaign Structure', text: 'Class Code Masterclass', img },
   { title: 'Session 6- Metric Analysis', text: 'Class Code Masterclass', img },
   { title: 'Session 7- Scaling Strategy', text: 'Class Code Masterclass', img },
];

const VideosTableCard = () => {
   return (
      <div className='mob-videosTableCard'>
         <div className='mob-videosTableCard__title'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Videos on my Dashboard'
            />
            <div />
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner='4233 Total'
               color='#3333334d'
            />
         </div>
         <div className='mob-videosTable'>
            {videos.map((video, i) => {
               return (
                  <div className={ classnames('mob-videosTableItem', { 'mob-viedosTableItem-checked': i === 5 }) } key={ i }>
                     <img src={ video.img } alt='video' />
                     <div className='m-l-s'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner={ video.title }
                        />
                        <div />
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner={ video.text }
                        />
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default VideosTableCard;
