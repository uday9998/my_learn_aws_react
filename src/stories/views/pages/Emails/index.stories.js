import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import SiteHeader from 'views/layout/SiteHeader';
import Emails from 'views/pages/Emails';

storiesOf('App|Views/pages/Emails/desktop', module)
   .addDecorator(withKnobs)
   .add('Emails', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Emails' hasArrow />
               <div className='design-course__content'>
                  <Emails />
               </div>
            </div>
         </div>
      );
   });
