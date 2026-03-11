import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from 'views/pages/Dashboard';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import BackdropFilter from 'components/elements/BackdropFilter';
import ChooseCoursePopup from 'components/modules/dashboard/ChooseCoursePopup';
import AddCoursePopup from 'components/modules/dashboard/AddCoursePopup';
import { pathCourses, typeCourses } from './propOptions';

storiesOf('App|Views/pages/Dashboard/desktop', module)
   .addDecorator(withKnobs)
   .add('General', () => {
      return (
         <Dashboard />
      );
   })
   .add('Course Path model', () => {
      return (
         <BackdropFilter active>
            <Dashboard />
            <div className='popupCardWrapper'>
               <ChooseCoursePopup
                  title='Choose Your Course Path'
                  courses={ pathCourses }
               />
            </div>
         </BackdropFilter>
      );
   })
   .add('Start From Stratch', () => {
      return (
         <BackdropFilter active>
            <Dashboard />
            <div className='popupCardWrapper popupCard__size-default'>
               <AddCoursePopup />
            </div>
         </BackdropFilter>
      );
   })
   .add('Course Type model', () => {
      return (
         <BackdropFilter active>
            <Dashboard />
            <div className='popupCardWrapper'>
               <ChooseCoursePopup
                  title='Choose Your Course Path'
                  courses={ typeCourses }
               />
            </div>
         </BackdropFilter>
      );
   });
