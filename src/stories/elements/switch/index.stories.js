import React from 'react';

import { storiesOf } from '@storybook/react';
import Switch from 'components/elements/switchNew';
import useState from 'storybook-addon-state';
import {
   withKnobs, text, select, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Switch', () => {
      const [value, setValue] = useState(false);
      return (
         <div className='storybook-element__wrapper'>
            <Switch
               value={ boolean('value', value) }
               disabled={ boolean('disabled', true) }
               label={ text('label', 'state') }
               onChange={ (e) => setValue(e) }
            />
         </div>
      );
   });
