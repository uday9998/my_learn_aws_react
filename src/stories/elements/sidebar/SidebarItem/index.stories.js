import React from 'react';
import { storiesOf } from '@storybook/react';
import SidebarGroup from 'components/elements/sidebar/SidebarGroup';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { icons } from './propOption';
import 'index.scss';

storiesOf('App|Elements/Sidebar', module)
   .addDecorator(withKnobs)
   .add('SidebarGroup', () => {
      return (
         <div className='sidebar-item_storybook'>
            <SidebarGroup
               icon={ select(...icons) }
               text={ text('text', 'Dashboard') }
            />
         </div>
      );
   });
