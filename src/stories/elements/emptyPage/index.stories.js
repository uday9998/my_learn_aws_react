import React from 'react';
import { storiesOf } from '@storybook/react';
import EmptyPage from 'components/modules/emptyPage';
import img from 'assets/images/forTestEmptyPage.png';
import {
   text,
   withKnobs,
} from '@storybook/addon-knobs';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('emptyPage', () => {
      return (
         <div className='storybook-element__wrapper'>
            <EmptyPage
               title={ text('title', 'test') }
               subTitle={ text('subititle', 'test for') }
               src={ img }
            />
         </div>
      );
   });
