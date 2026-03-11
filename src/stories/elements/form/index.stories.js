import React from 'react';

import { storiesOf } from '@storybook/react';
import CheckBox from 'components/elements/form/CheckBox';
import Select from 'components/elements/form/Select';
import Switch from 'components/elements/form/Switch';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import TextInput from 'components/elements/form/TextInput';
import WritableSelect from 'components/elements/form/WritableSelect';
import ColorInput from 'components/elements/form/ColorInput';
import CardNumberInput from 'components/elements/form/CardNumberInput';
import UploadInput from 'components/elements/form/UploadInput';
import {
   withKnobs, boolean, text, select,
} from '@storybook/addon-knobs';
import { textTheme, textSize, selectOptions } from './propOptions';
import 'index.scss';

storiesOf('App|Elements/form', module)
   .addDecorator(withKnobs)
   .add('Checkbox', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CheckBox
               checked={ boolean('switch', true) }
            />
         </div>
      );
   })
   .add('Select', () => (
      <div className='storybook-element__wrapper'>
         <Select
            placeholder={ text('placeholder', 'Choose course') }
            options={ selectOptions }
            icon={ select('icon', { down: 'Down', triangleDown: 'TriangleDown' }, 'Down') }
            padding={ text('padding', '12px 16px 12px 25px') }
            typeOval={ boolean('type oval', false) }
            hasBorder={ boolean('oval has border', false) }
            radius={ text('oval border-radius', '32px') }
            multiMode={ boolean('multi mode', false) }
         />
      </div>
   ))
   .add('Switch', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Switch
               checked={ boolean('switch', true) }
            />
         </div>
      );
   })
   .add('CustomSwitch', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CustomSwitch
               firstOption={ text('firstOption', 'option 1') }
               secondOption={ text('secondOption', 'option 2') }
               checkedBackground={ text('checkedBackground', '#7cb740') }
               checkedTextColor={ text('checkedTextColor', '#ffffff') }
               checked={ select('checked', { first: 1, second: 2 }, 1) }
            />
         </div>
      );
   })
   .add('ColorInput', () => {
      return (
         <div className='storybook-element__wrapper'>
            <ColorInput />
         </div>
      );
   })
   .add('TextInput', () => (
      <div className='storybook-element__wrapper'>
         <TextInput
            label={ text('label', 'Name:') }
            placeholder={ text('placeholder', 'Type Sumething') }
            theme={ select(...textTheme) }
            size={ select(...textSize) }
            user={ boolean('user', false) }
            icon={ text('icon', 'Copy') }
         />
      </div>
   ))
   .add('WritableSelect', () => (
      <div className='storybook-element__wrapper'>
         <WritableSelect
            label='label'
         />
      </div>
   ))
   .add('CardNumberInput', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CardNumberInput />
         </div>
      );
   })
   .add('UploadInput', () => {
      return (
         <div className='storybook-element__wrapper'>
            <UploadInput
               color={ text('color', '#006dff') }
               backColor={ text('background-color', 'rgba(0, 109, 255, 0.1)') }
            />
         </div>
      );
   });
