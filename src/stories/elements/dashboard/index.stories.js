import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from 'components/elements/dashboard/Card';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import CourseType from 'components/elements/dashboard/CourseType';
import MiestroStep from 'components/elements/dashboard/MiestroStep';
import TotalReport from 'components/elements/dashboard/TotalReport';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import UpdatesCard from 'components/elements/dashboard/UpdatesCard';
import 'index.scss';
import img from 'assets/images/dashboard/painting-dashboard.png';
import bitmap from 'assets/images/bitmap.jpg';

storiesOf('App|Elements/dashboard', module)
   .addDecorator(withKnobs)
   .add('Card', () => {
      return (
         <div style={ { width: '288px', height: '288px' } }>
            <Card
               icon={ text('icon', 'Rocket') }
               text={ text('text', 'Start a new course in five easy steps and start by adding new course information to get started.') }
               title={ text('title', 'title') }
               buttonText={ text('Button', 'View More') }
            />
         </div>
      );
   })
   .add('CourseType', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CourseType
               img={ img }
               title={ text('title', 'Start From Scratch') }
               text={ text('text', 'Choose to start a course completely from scratch ') }
            />
         </div>
      );
   })
   .add('MiestroStep', () => {
      return (
         <div style={ { width: '300px' } }>
            <MiestroStep
               text={ text('text', 'Finished stepp miestro') }
               finished={ boolean('Finished', false) }
            />
         </div>
      );
   })
   .add('TotalReport', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '264px' } }>
            <TotalReport />
         </div>
      );
   })
   .add('TotalXReport', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <TotalXReport
               title='$588.87 Total Sales'
               icon='Sales'
               data={ [
                  {
                     first: '$1230',
                     second: 'Monthly',
                  },
                  {
                     first: '$480',
                     second: 'Weekly',
                  },
                  {
                     first: '$110',
                     second: 'Daily',
                  },
               ] }
            />
         </div>
      );
   })
   .add('UpdatesCard', () => {
      return (
         <div style={ { width: '288px' } }>
            <UpdatesCard
               text={ text('text', 'Start a new course in five easy steps and start by adding new course information to get started.') }
               title={ text('title', 'title') }
               imageSrc={ bitmap }
            />
         </div>
      );
   });
