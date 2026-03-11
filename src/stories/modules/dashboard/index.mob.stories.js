import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import DashboardWelcome from 'components/modules/dashboard/DashboardWelcome/index.mob';
import GetStarted from 'components/modules/dashboard/GetStarted/index.mob';

storiesOf('App|Modules/dashboard/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Wellcome', () => {
      return (
         <div className='s-mob-dashboardWelcome'>
            <DashboardWelcome />
         </div>
      );
   })
   .add('Get Started', () => {
      return (
         <div className=''>
            <GetStarted />
         </div>
      );
   });
