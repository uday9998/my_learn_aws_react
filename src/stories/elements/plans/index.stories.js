import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import PlansTable from 'components/elements/plans/PlansTable';
import PlanItem from 'components/elements/plans/PlanItem';
import icon from 'assets/images/plans/unlimited-students.png';
import 'index.scss';
import { table } from './propOptions';

storiesOf('App|Elements/plans', module)
   .addDecorator(withKnobs)
   .add('PlansTable', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlansTable table={ table } />
         </div>
      );
   })
   .add('PlanItem', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlanItem
               icon={ icon }
               title={ text('Title', 'Unlimited Students') }
            />
         </div>
      );
   });
