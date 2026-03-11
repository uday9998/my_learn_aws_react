import React from 'react';
import './index.scss';
import { storiesOf } from '@storybook/react';
import BaseButton from 'components/elements/buttons/BaseButton/index.mob';
import {
   withKnobs, select,
} from '@storybook/addon-knobs';
import { btnTheme } from './propOption';

storiesOf('App|Elements/BaseButton/mobile', module)
   .addDecorator(withKnobs)
   .add('Base Button', () => (
      <div className='mob-btnWrapper'>
         <BaseButton
            text='Base Button'
            theme={ select(...btnTheme) }
         />
         <div className='m-t-exl'>
            <BaseButton
               text='Dark Green'
               theme='darkGreen'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               text='Light Green'
               theme='lightGreen'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               text='Grey'
               theme='grey'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               text='Blue Bordered'
               theme='blueBordered'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               text='Light Blue'
               theme='lightBlue'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               text='Dark Blue'
               theme='darkBlue'
            />
         </div>
      </div>
   ));
