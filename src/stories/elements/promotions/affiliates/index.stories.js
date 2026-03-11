import React from 'react';
import { storiesOf } from '@storybook/react';
import AffiliateCommission from 'components/elements/promotions/affiliates/AffiliateCommission';
import FromToForm from 'components/elements/promotions/affiliates/FromToForm';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements/promotions/affiliates', module)
   .addDecorator(withKnobs)
   .add('AffiliateCommission', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '252px' } }>
            <AffiliateCommission name='Commission' />
         </div>
      );
   })
   .add('FromToForm', () => {
      return (
         <div className='storybook-element__wrapper'>
            <FromToForm />
         </div>
      );
   });
