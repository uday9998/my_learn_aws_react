import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoAnalyticsCard from 'components/modules/videoAnalytics/VideoAnalyticsCard';
import VideosTable from 'components/modules/videoAnalytics/VideosTable';
import VideosTableCard from 'components/modules/videoAnalytics/VideosTableCard';
import VideoStatisticsCard from 'components/modules/videoAnalytics/VideoStatisticsCard';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/videoAnalytics', module)
   .addDecorator(withKnobs)
   .add('VideoAnalyticsCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { } }>
            <VideoAnalyticsCard />
         </div>
      );
   })
   .add('VideosTable', () => (
      <div className='storybook-element__wrapper'>
         <VideosTable />
      </div>
   ))
   .add('VideosTableCard', () => (
      <div className='storybook-element__wrapper'>
         <VideosTableCard />
      </div>
   ))
   .add('VideoStatisticsCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '1128px' } }>
            <VideoStatisticsCard />
         </div>
      );
   });
