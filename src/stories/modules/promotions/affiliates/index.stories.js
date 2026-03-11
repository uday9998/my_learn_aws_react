import React from 'react';
import { storiesOf } from '@storybook/react';
import AddAffiliateCard from 'components/modules/promotions/affiliates/AddAffiliateCard';
import AffiliatesCard from 'components/modules/promotions/affiliates/AffiliatesCard';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/promotions/affiliates', module)
   .addDecorator(withKnobs)
   .add('AddAffiliateCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <AddAffiliateCard />
         </div>
      );
   })
   .add('AffiliatesCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <AffiliatesCard />
         </div>
      );
   });
