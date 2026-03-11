import React from 'react';
import './index.mob.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import videoPlayer from 'assets/images/video-player.png';
import TotalReport from 'components/elements/dashboard/TotalReport';
import TotalXReport from 'components/elements/dashboard/TotalXReport';

const VideosEdit = () => {
   return (
      <div className='mob-videosEdit'>
         <Text
            type={ TextType.bold }
            size={ TextSize.medium }
            inner='Entrepreneur Overwhelm Training'
         />
         <div className='mob-videosEdit__video'>
            <img src={ videoPlayer } alt='video player' />
         </div>
         <div className='mob-videosEdit__total'>
            <TotalXReport
               title='64 Total Plays'
               data={ [
                  { first: '12', second: 'Unique Plays' },
                  { first: '4', second: 'Completed Plays' },
               ] }
               icon='Book'
            />
         </div>
         <div className='m-b-m' />
         <TotalReport
            bold='7%'
            regular='Ave. Engagement'
            icon='Complitions'
         />
      </div>
   );
};

export default VideosEdit;
