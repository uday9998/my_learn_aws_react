/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import Select from 'components/elements/form/Select';

import SiteHeader from 'views/layout/SiteHeader';
import CourseReports from 'views/pages/CourseReports';


const Header = () => {
   return (
      <SiteHeader
         style={ { padding: '20px 32px' } }
         title='Reports'
         right={ (
            <div style={ { maxWidth: '264px', flex: '1 1' } }>
               <Select
                  typeOval
                  icon='TriangleDown'
                  hasBorder
                  padding='7px 16px 7px 24px'
                  placeholder='All courses'
               />
            </div>
         ) }
      />
   );
};

storiesOf('App|Views/pages/CourseReports/desktop', module)
   .addDecorator(withKnobs)
   .add('Course Reports', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <Header />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <CourseReports />
               </div>
            </div>
         </div>
      );
   });
