/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
// import Select from 'components/elements/form/Select';
import SiteHeader from 'views/layout/SiteHeader';
import VideosTableCard from 'components/modules/videoAnalytics/VideosTableCard';
import VideoStatisticsCard from 'components/modules/videoAnalytics/VideoStatisticsCard';
import VideoAnalyticsCard from 'components/modules/videoAnalytics/VideoAnalyticsCard';

storiesOf('App|Views/pages/VideoAnalytics/desktop', module)
   .addDecorator(withKnobs)
   .add('My Videos', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='My Videos' />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)', paddingBottom: '16px' } }>
                  <div className='w-full'>
                     <VideosTableCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Edit', () => {
      return (
         <>
            <div className='container videoAnalyticsContainer'>
               <div>
                  <SideBar />
               </div>
               <div className='design-course'>
                  <SiteHeader title='Entrepreneur Overwhelm Training' hasArrow />
                  <div className='design-course__content'>
                     <div className='w-full'>
                        <VideoStatisticsCard />
                     </div>
                  </div>
               </div>
            </div>
            <div className='videoAnalyticsCard__container'>
               <VideoAnalyticsCard />
            </div>
         </>
      );
   });
