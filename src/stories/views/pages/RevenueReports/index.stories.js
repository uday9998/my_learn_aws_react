/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import Select from 'components/elements/form/Select';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import TotalReport from 'components/elements/dashboard/TotalReport';

import SiteHeader from 'views/layout/SiteHeader';


const RevenueHeader = () => {
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

const data = [
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
];

storiesOf('App|Views/pages/RevenueReports/desktop', module)
   .addDecorator(withKnobs)
   .add('Revenue Reports', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <RevenueHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <div className='w-full flex'>
                     <div style={ { maxWidth: '552px' } } className='m-r-exl w-full'>
                        <TotalXReport
                           title='$588.87 Total Sales'
                           icon='Sales'
                           data={ data }
                        />
                     </div>
                     <div style={ { maxWidth: '264px' } } className='w-full'>
                        <TotalReport />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });
