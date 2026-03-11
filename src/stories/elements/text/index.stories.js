import React from 'react';

import { storiesOf } from '@storybook/react';
import Text from 'components/elements/TextNew';
import {
   withKnobs, text, select,
} from '@storybook/addon-knobs';
import 'index.scss';
import { TextType, TextSize } from './propOptions';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Text', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Text
               inner={ text('inner', 'test') }
               type={ select(...TextType) }
               size={ select(...TextSize) }
            />
         </div>
      );
   });
