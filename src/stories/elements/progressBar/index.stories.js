import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressLine from 'components/elements/progressBar/ProgressLine';
import { withKnobs, text } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements/progressBar', module)
   .addDecorator(withKnobs)
   .add('ProgressLine', () => (
      <div className='storybook-element__wrapper'>
         <ProgressLine
            height={ text('height', '7px') }
            color={ text('color', '#7cb740') }
            backColor={ text('background', '#7cb740') }
         />
      </div>
   ));
