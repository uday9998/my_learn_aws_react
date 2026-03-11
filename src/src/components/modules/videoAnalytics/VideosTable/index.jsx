/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import videoImage from 'assets/images/video-image.png';
import Icon from 'components/elements/Icon';

export const header = [
   'Video Name', 'Class Name', 'Length', 'Analytics',
];

const VideosTable = ({ videoAnalytics, handleVideoAnalyticsEdit }) => {
   function secondToTime(videosecond) {
      const secNum = parseInt(videosecond, 10);
      let hours = Math.floor(secNum / 3600);
      let minutes = Math.floor((secNum - (hours * 3600)) / 60);
      let seconds = secNum - (hours * 3600) - (minutes * 60);

      if (hours < 10) { hours = `0${hours}`; }
      if (minutes < 10) { minutes = `0${minutes}`; }
      if (seconds < 10) { seconds = `0${seconds}`; }
      return `${hours}:${minutes}:${seconds}`;
   }


   return (
      <table className='videosTable'>
         <thead>
            <tr className='videosTable__row videosTable__header'>
               {header.map((title, i) => {
                  return (
                     <td key={ i } className='videosTable__title'>
                        { typeof title === 'string' ? (
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.extraSmall }
                              inner={ title }
                              color='rgba(51, 51, 51, 0.5)'
                           />
                        ) : title}
                     </td>
                  );
               }
               )}
            </tr>
         </thead>
         <tbody>
            {videoAnalytics && videoAnalytics.data && videoAnalytics.data.length !== 0 && videoAnalytics.data.map((video, i) => {
               return (
                  <tr key={ i } className={ classnames('videosTable__row') }>
                     <td className='videosTable__data'>
                        <div className='flex align-center'>
                           <img src={ videoImage } alt='' style={ { marginRight: '12px' } } />
                           <div className='elipses'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.extraSmall }
                                 inner={ video.video_name }

                              />
                           </div>
                        </div>

                     </td>
                     <td className='videosTable__data'>
                        <span className='elipses'>
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.extraSmall }
                              inner={ video.course_name }
                           />
                        </span>
                     </td>
                     <td className='videosTable__data'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner={ video.video_length ? `${secondToTime(video.video_length)}` : '-' }
                        />
                     </td>
                     <td className='videosTable__data'>
                        <div className='btnWrapper'>
                           <BaseButton
                              theme={ btnTheme.lightBlue }
                              size={ btnSize.medium }
                              text='View'
                              onClick={ () => handleVideoAnalyticsEdit(video.id) }
                           />
                        </div>
                        <div
                           className='view-video-details-mob'
                           onClick={ () => handleVideoAnalyticsEdit(video.id) }
                           role='presentation'
                        >
                           <Icon name='EyeSlashShow' />

                        </div>
                     </td>
                  </tr>
               );
            }) }
         </tbody>
      </table>
   );
};

VideosTable.propTypes = {
   // active: PropTypes.number,
   videoAnalytics: PropTypes.object,
   handleVideoAnalyticsEdit: PropTypes.func,
};

VideosTable.defaultProps = {
   // active: 6,
   handleVideoAnalyticsEdit: () => {},
};

export default VideosTable;
