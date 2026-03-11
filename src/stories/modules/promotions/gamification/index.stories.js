import React from 'react';
import { storiesOf } from '@storybook/react';
import AddBadgeCard from 'components/modules/promotions/gamification/AddBadgeCard';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import CongratsCard from 'components/modules/promotions/gamification/CongratsCard';
import CongratulationsCard from 'components/modules/promotions/gamification/CongratulationsCard';
import FirstBadgeCard from 'components/modules/promotions/gamification/FirstBadgeCard';
import img from 'assets/images/promotions/group-sm.png';
import 'index.scss';

storiesOf('App|Modules/promotions/gamification', module)
   .addDecorator(withKnobs)
   .add('AddBadgeCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <AddBadgeCard
               completed={ boolean('Completed', false) }
               checked={ select('checked', { first: 1, second: 2 }, 1) }
            />
         </div>
      );
   })
   .add('CongratsCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '456px' } }>
            <CongratsCard
               img={ img }
               title='Congrats completing'
               content='Course Code Masterclass/Welcome to Cracking'
               active={ boolean('active', false) }
            />
         </div>
      );
   })
   .add('CongratulationsCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { paddingTop: '100px', maxWidth: '400px' } }>
            <CongratulationsCard />
         </div>
      );
   })
   .add('FirstBadgeCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '456px' } }>
            <FirstBadgeCard />
         </div>
      );
   });
