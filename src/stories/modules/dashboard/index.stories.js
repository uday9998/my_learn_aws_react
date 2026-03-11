import React from 'react';
import { storiesOf } from '@storybook/react';
import AddCoursePopup from 'components/modules/dashboard/AddCoursePopup';
import CardContainer from 'components/modules/dashboard/CardContainer';
import CourseReport from 'components/modules/dashboard/CourseReport';
import ChooseCoursePopup from 'components/modules/dashboard/ChooseCoursePopup';
import DashboardWelcome from 'components/modules/dashboard/DashboardWelcome';
import GetStarted from 'components/modules/dashboard/GetStarted';
import UpdatesCardsContainer from 'components/modules/dashboard/UpdatesCardsContainer';
import { withKnobs, text } from '@storybook/addon-knobs';
import 'index.scss';
import { courses } from './propOptions';

storiesOf('App|Modules/dashboard/desktop', module)
   .addDecorator(withKnobs)
   .add('AddCoursePopup', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <AddCoursePopup />
         </div>
      );
   })
   .add('CardContainer', () => {
      return (
         <div className='card-container_storybook'>
            <CardContainer />
         </div>
      );
   })
   .add('ChooseCoursePopup', () => {
      return (
         <div className='storybook-element__wrapper' style={ { display: 'inline-block' } }>
            <ChooseCoursePopup
               title={ text('title', 'Choose Your Course Path') }
               courses={ courses }
            />
         </div>
      );
   })
   .add('CourseReport', () => {
      return (
         <div className='card-container_storybook'>
            <CourseReport />
         </div>
      );
   })
   .add('DashboardWelcome', () => {
      return (
         <div className='dashboard-welcome_storybook'>
            <DashboardWelcome />
         </div>
      );
   })
   .add('GetStarted', () => {
      return (
         <div className='card-container_storybook'>
            <GetStarted />
         </div>
      );
   })
   .add('UpdatesCardsContainer', () => {
      return (
         <div className='card-container_storybook'>
            <UpdatesCardsContainer />
         </div>
      );
   });
