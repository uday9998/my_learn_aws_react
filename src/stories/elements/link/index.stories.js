import React from 'react';

import { storiesOf } from '@storybook/react';
import Link from 'components/elements/links';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';

storiesOf('App|Elements/link', module)
   .addDecorator(withKnobs)
   .add('Link', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Link
               text={ text('text', 'asd') }
               href={ text('href', '') }
               disabled={ boolean('disabled', true) }
            />
         </div>
      );
   });
