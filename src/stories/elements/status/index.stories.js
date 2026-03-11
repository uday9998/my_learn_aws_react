import React from 'react';

import { storiesOf } from '@storybook/react';
import Status from 'components/elements/statusNew';
import {
   withKnobs, text, select, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';
import { TYPES } from './propOptions';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Status', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Status
               text={ text('text', 'test') }
               type={ select(...TYPES) }
               icon={ text('icon', 'Publish') }
               disabled={ boolean('disabled', false) }
            />
         </div>
      );
   });
