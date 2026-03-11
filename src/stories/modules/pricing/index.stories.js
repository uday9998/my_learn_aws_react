import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import CommonQuestions from 'components/modules/pricing/CommonQuestions';
import AllPlansCard from 'components/modules/pricing/AllPlansCard';
import PricingHeader from 'components/modules/pricing/PricingHeader';
import 'index.scss';

import { questions } from './propOptions';

storiesOf('App|Modules/pricing', module)
   .addDecorator(withKnobs)
   .add('CommonQuestions', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CommonQuestions questions={ questions } />
         </div>
      );
   })
   .add('AllPlansCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <AllPlansCard />
         </div>
      );
   })
   .add('PricingHeader', () => <PricingHeader />);
