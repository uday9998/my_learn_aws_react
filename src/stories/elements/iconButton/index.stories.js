import React from 'react';
import { storiesOf } from '@storybook/react';
import IconButton, { THEMES as iconTheme } from 'components/elements/buttons/IconButton';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('IconButton', () => {
      return (
         <div className='storybook-element__wrapper'>
            <IconButton
               theme={ text('theme', iconTheme.light) }
               wBorder={ boolean('w-border', true) }
               name={ text('icon name', 'DownNew') }
               onClick={ () => {
               } }
               disabled={ boolean('disabled', true) }
            />
         </div>
      );
   });
