import React from 'react';
import { storiesOf } from '@storybook/react';
import NavBar from 'components/modules/designCourse/header/NavBar';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse', module)
   .addDecorator(withKnobs)
   .add('NavBar', () => {
      return (
         <div className='storybook-element__wrapper'>
            <NavBar />
         </div>
      );
   });
