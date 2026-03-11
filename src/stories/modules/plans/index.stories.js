import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import PlanCard from 'components/modules/plans/PlanCard';
import PlanHistory from 'components/modules/plans/PlanHistory';
import PlanItemsList from 'components/modules/plans/PlanItemsList';
import PlanSubscription from 'components/modules/plans/PlanSubscription';
import { orders, table1, table2 } from './propOptions';

import 'index.scss';

storiesOf('App|Modules/plans', module)
   .addDecorator(withKnobs)
   .add('PlanCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { width: '360px' } }>
            <PlanCard
               title={ text('title', 'Business') }
               price={ text('price', '189') }
               active={ boolean('active', false) }
               popular={ boolean('popular', false) }
               orders={ orders }
            />
         </div>
      );
   })
   .add('PlanHistory', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlanHistory table={ table1 } />
         </div>
      );
   })
   .add('PlanItemsList', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlanItemsList />
         </div>
      );
   })
   .add('PlanSubscription', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlanSubscription table={ table2 } />
         </div>
      );
   });
