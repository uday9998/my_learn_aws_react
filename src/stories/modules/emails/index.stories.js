import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import MemberUpdate from 'components/modules/emails/MemberUpdate';
import EmailUpdate from 'components/modules/emails/EmailUpdate';

storiesOf('App|Modules/emails', module)
   .addDecorator(withKnobs)
   .add('Member Update', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '648px' } }>
            <MemberUpdate />
         </div>
      );
   })
   .add('Email Update', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '456px' } }>
            <EmailUpdate />
         </div>
      );
   });
