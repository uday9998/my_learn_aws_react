import React from 'react';
import { storiesOf } from '@storybook/react';
import { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Select', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Select
               theme={ btnTheme.secondary }
               size={ btnSizes.medium }
               selectedItem={ text('value', 'asd') }
               onChange={ (name, value) => {
               } }
               options={ [
                  {
                     name: 'forAsd', text: 'asd', value: 'ddd', disabled: false,
                  }, {
                     name: 'forAsd', text: 'asd', value: 'ddd', disabled: false,
                  }, {
                     name: 'forAsd', text: 'asd', value: 'ddd', disabled: false,
                  }, {
                     name: 'forAsd', text: 'asd', value: 'ddd', disabled: false,
                  }, {
                     name: 'forAsd', text: 'asd', value: 'ddd', disabled: false,
                  },
                  {
                     name: 'forAsd2', text: 'asd', value: 'ddd', disabled: false,
                  },
               ] }
               isDisabled={ boolean('disabled', false) }
            />
         </div>
      );
   });
