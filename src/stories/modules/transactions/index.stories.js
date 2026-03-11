import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TransactionCard from 'components/modules/transactions/TransactionCard';
import 'index.scss';

storiesOf('App|Modules/transactions', module)
   .addDecorator(withKnobs)
   .add('TransactionCard', () => (
      <div className='storybook-element__wrapper'>
         <TransactionCard />
      </div>
   ));
