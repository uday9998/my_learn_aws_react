import React from 'react';

import { storiesOf } from '@storybook/react';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Radio from 'components/elements/form/RadioNew';
import {
   withKnobs, boolean, text, select,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements/form', module)
   .addDecorator(withKnobs)
   .add('Checkbox', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CheckBox
               checked={ boolean('checked', false) }
               disabled={ boolean('disabled', false) }
               label={ text('label', 'label text') }
               labelPosition={ select('label position', { left: 'left', right: 'right' }, 'right') }
            />
         </div>
      );
   })
   .add('Radio', () => (
      <div className='storybook-element__wrapper'>
         <Radio
            checked={ boolean('checked', false) }
            disabled={ boolean('disabled', false) }
            label={ text('label', 'label text') }
            labelPosition={ select('label position', { left: 'left', right: 'right' }, 'right') }
            theme={ select('Theme', { light: 'light', dark: 'dark' }, 'light') }
         />
      </div>
   ));
