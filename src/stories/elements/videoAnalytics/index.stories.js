import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import PagePagination from 'components/elements/videoAnalytics/PagePagination';
import VideoListHeader from 'components/elements/videoAnalytics/VideoListHeader';
import VideoTimeCard from 'components/elements/videoAnalytics/VideoTimeCard';

storiesOf('App|Elements/videoAnalytics', module)
   .addDecorator(withKnobs)
   .add('PagePagination', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PagePagination />
         </div>
      );
   })
   .add('VideoListHeader', () => {
      return (
         <div className='storybook-element__wrapper' style={ { background: '#ffffff' } }>
            <VideoListHeader />
         </div>
      );
   })
   .add('VideoTimeCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '233px' } }>
            <VideoTimeCard />
         </div>
      );
   });
