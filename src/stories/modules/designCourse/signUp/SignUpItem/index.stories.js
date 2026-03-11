import React from 'react';
import { storiesOf } from '@storybook/react';
import SignUpItem from 'components/modules/designCourse/signUp/SignUpItem';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/signUp', module)
   .addDecorator(withKnobs)
   .add('SignUpItem', () => (
      <div className='storybook-element__wrapper' style={ { maxWidth: '290px' } }>
         <SignUpItem
            active={ boolean('active', false) }
            text={ text('text', 'Edit Order Summary') }
            icon={ text('icon', 'Order') }
         />
      </div>
   ));
