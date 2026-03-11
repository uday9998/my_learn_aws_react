import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import SiteHeader from 'views/layout/SiteHeader';
import EmailTemplates from 'views/pages/EmailTemplates';

storiesOf('App|Views/pages/EmailTemplates/desktop', module)
   .addDecorator(withKnobs)
   .add('Welcome', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 1 } />
               </div>
            </div>
         </div>
      );
   })
   .add('Enrollment', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 2 } />
               </div>
            </div>
         </div>
      );
   })
   .add('Completion', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 3 } />
               </div>
            </div>
         </div>
      );
   })
   .add('Subscription', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 4 } />
               </div>
            </div>
         </div>
      );
   })
   .add('Affiliate Welcome', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 5 } />
               </div>
            </div>
         </div>
      );
   })
   .add('Refund', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content' style={ { height: 'calc(100vh - 80px)' } }>
                  <EmailTemplates active={ 6 } />
               </div>
            </div>
         </div>
      );
   });
