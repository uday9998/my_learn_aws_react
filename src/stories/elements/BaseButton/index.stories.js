import React from 'react';
import { storiesOf } from '@storybook/react';
import BaseButton from 'components/elements/buttons/BaseButton';
import {
   withKnobs, text, select, boolean,
} from '@storybook/addon-knobs';
import { btnTheme, btnSize } from './propOption';

storiesOf('App|Elements/BaseButton/desktop', module)
   .addDecorator(withKnobs)
   .add('Dark Green', () => (
      <div className='wrapperButtons'>
         <BaseButton
            text='Medium'
            theme='darkGreen'
            size='medium'
         />
         <BaseButton
            text='Large'
            theme='darkGreen'
            size='large'
         />
         <BaseButton
            text='Full'
            theme='darkGreen'
            size='full'
         />
         <BaseButton
            text={ text('text', 'Dark Green') }
            theme={ select(...btnTheme, 'darkGreen') }
            size={ select(...btnSize, 'large') }
            disabled={ boolean('disabled', false) }
         />
      </div>
   ))
   .add('Light Green', () => (
      <div className='wrapperButtons'>
         <BaseButton
            text='Medium'
            theme='lightGreen'
            size='medium'
         />
         <BaseButton
            text='Large'
            theme='lightGreen'
            size='large'
         />
         <BaseButton
            text='Full'
            theme='lightGreen'
            size='full'
         />
         <BaseButton
            text={ text('text', 'Light Green') }
            theme={ select(...btnTheme, 'lightGreen') }
            size={ select(...btnSize) }
            disabled={ boolean('disabled', false) }
         />
      </div>
   ))
   .add('Grey', () => (
      <div className='wrapperButtons'>
         <BaseButton
            text='Medium'
            theme='grey'
            size='medium'
         />
         <BaseButton
            text='Large'
            theme='grey'
            size='large'
         />
         <BaseButton
            text='Full'
            theme='grey'
            size='full'
         />
         <BaseButton
            text={ text('text', 'Grey') }
            theme={ select(...btnTheme, 'grey') }
            size={ select(...btnSize) }
            disabled={ boolean('disabled', false) }
         />
      </div>
   ))
   .add('Blue Bordered', () => (
      <div className='wrapperButtons'>
         <BaseButton
            text='Medium'
            theme='blueBordered'
            size='medium'
         />
         <BaseButton
            text='Large'
            theme='blueBordered'
            size='large'
         />
         <BaseButton
            text='Full'
            theme='blueBordered'
            size='full'
         />
         <BaseButton
            text={ text('text', 'Blue Bordered') }
            theme={ select(...btnTheme, 'blueBordered') }
            size={ select(...btnSize) }
            disabled={ boolean('disabled', false) }
         />
      </div>
   ));
