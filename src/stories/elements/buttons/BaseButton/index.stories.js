import React from 'react';

import { storiesOf } from '@storybook/react';
import Button from 'components/elements/buttons/BaseButtonNew';
import {
   withKnobs, boolean, text, select,
} from '@storybook/addon-knobs';
import 'index.scss';
import { THEMES } from './propOptions';

storiesOf('App|Elements/buttons', module)
   .addDecorator(withKnobs)
   .add('Button', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Button
               disabled={ boolean('disabled', false) }
               text={ text('text', 'primary') }
               iconName={ text('icon name', 'Plus') }
               theme={ select(...THEMES) }
            />
         </div>
      );
   });
