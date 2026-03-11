import React from 'react';
import useState from 'storybook-addon-state';
import { storiesOf } from '@storybook/react';
import Input from 'components/elements/inputNew';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Input', () => {
      const [valued, setValued] = useState('date', '');
      return (
         <div className='storybook-element__wrapper'>
            <Input
               placeholder={ text('placeholder', '') }
               value={ valued }
               onChange={ (name, values) => {
                  setValued(values);
               } }
               isPassword={ boolean('isPassword', false) }
               disabled={ boolean('disabled', false) }
               type={ text('type', 'text') }
               onSearch={ (e) =>  }
               isAnimatedLabel={ boolean('animation', true) }
               label={ text('label', 'test') }
               helpText={ text('prefiled', 'prefiled') }
               data={ [
                  { status: 'error', message: 'valid error' },
                  { status: 'success', message: 'valid success' },
                  { status: 'success', message: 'valid success' },
                  { status: 'success', message: 'valid success' },
                  { status: 'danger', message: 'valid warning' },
               ] }
               isError={ boolean('isError', true) }
               name={ text('name', 'input') }
               id={ text('id', 'test') }
            />
         </div>
      );
   });
