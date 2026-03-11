import React from 'react';
import { storiesOf } from '@storybook/react';
import AdvantagesBlock from 'components/modules/checkout/AdvantagesBlock';
import CheckoutHeader from 'components/modules/checkout/CheckoutHeader';
import TrialCard from 'components/modules/checkout/TrialCard';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/checkout', module)
   .addDecorator(withKnobs)
   .add('AdvantagesBlock', () => {
      return (
         <div className='storybook-element__wrapper'>
            <AdvantagesBlock />
         </div>
      );
   })
   .add('CheckoutHeader', () => {
      return <CheckoutHeader />;
   })
   .add('TrialCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '456px' } }>
            <TrialCard
               formView={ boolean('Form View', true) }
               creditCardFormView={ boolean('Creadit Card Form View', true) }
            />
         </div>
      );
   });
