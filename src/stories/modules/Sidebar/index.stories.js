import React from 'react';
import { storiesOf } from '@storybook/react';
import Sidebar from 'components/modules/Sidebar';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules', module)
   .addDecorator(withKnobs)
   .add('Sidebar', () => {
      return (
         <div className='sidebar-item_storybook'>
            <Sidebar />
         </div>
      );
   });
