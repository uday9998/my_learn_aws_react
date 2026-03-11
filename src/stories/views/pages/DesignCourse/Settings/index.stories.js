import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import CourseDetails from 'components/modules/designCourse/settings/CourseDetails';
import InstructorDetails from 'components/modules/designCourse/settings/InstructorDetails';
import Seo from 'components/modules/designCourse/settings/Seo';
import SiteChanges from 'components/modules/designCourse/settings/SiteChanges';

storiesOf('App|Views/pages/designCourse/Settings/desktop', module)
   .addDecorator(withKnobs)
   .add('Course Details', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <SettingItem
                           // active
                           text='Course Details'
                        />
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Instructor Details'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Seo'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Site Changes'
                           />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right' style={ { flex: '3' } }>
                     <div className='design-course__right-container' style={ { width: '70%' } }>
                        <CourseDetails />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Instructor Details', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <SettingItem
                           text='Course Details'
                        />
                        <div className='m-t-exs'>
                           <SettingItem
                              // active
                              text='Instructor Details'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Seo'
                           />
                        </div>
                        <div className='m-t-exs'>

                           <SettingItem
                              text='Site Changes'
                           />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right' style={ { flex: '3' } }>
                     <div className='design-course__right-container' style={ { width: '70%' } }>
                        <InstructorDetails />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('SEO', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <SettingItem
                           text='Course Details'
                        />
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Instructor Details'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              // active
                              text='Seo'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Site Changes'
                           />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right' style={ { flex: '3' } }>
                     <div className='design-course__right-container' style={ { width: '70%' } }>
                        <Seo />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Site Changes', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <SettingItem
                           text='Course Details'
                        />
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Instructor Details'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              text='Seo'
                           />
                        </div>
                        <div className='m-t-exs'>
                           <SettingItem
                              // active
                              text='Site Changes'
                           />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right' style={ { flex: '3' } }>
                     <div className='design-course__right-container' style={ { width: '70%' } }>
                        <SiteChanges />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });
