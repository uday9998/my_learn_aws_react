import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import 'index.scss';
import './index.scss';

import PlanCard from 'components/modules/plans/PlanCard';
import PlanItemList from 'components/modules/plans/PlanItemsList';
import PlanSubscription from 'components/modules/plans/PlanSubscription';
import PlanHistory from 'components/modules/plans/PlanHistory';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import SiteHeader from 'views/layout/SiteHeader';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import { planCards, subTable, historyTable } from './propOptions';

const PlansHeader = () => {
   return (
      <SiteHeader
         title='Plans'
         right={ (
            <BaseButton
               theme={ btnTheme.lightGreen }
               size={ btnSize.medium }
               text='Compare Plans Here'
            />
         ) }
      />
   );
};

storiesOf('App|Views/pages/Plans/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty state', () => {
      return (
         <div className='mainContainer'>
            <SideBar />
            <div className='rightSide'>
               <PlansHeader />
               <div className='plansPage'>
                  <div className='flex justify-center'>
                     <CustomSwitch
                        firstOption='Monthly'
                        secondOption='Annually'
                        backgroundColor='#fbfdff'
                        checkedBackground='#7cb740'
                        checkedTextColor='#ffffff'
                     />
                  </div>
                  <div className='planCards m-t-exl'>
                     <PlanCard
                        title={ planCards[0].title }
                        price={ planCards[0].price }
                        orders={ planCards[0].orders }
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        popular
                        title={ planCards[1].title }
                        price={ planCards[1].price }
                        orders={ planCards[1].orders }
                        active
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        title={ planCards[2].title }
                        price={ planCards[2].price }
                        orders={ planCards[2].orders }
                     />
                  </div>
                  <div className='m-t-exl'>
                     <PlanItemList />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Monthly', () => {
      return (
         <div className='mainContainer'>
            <SideBar />
            <div className='rightSide'>
               <PlansHeader />
               <div className='plansPage'>
                  <div className='flex justify-center'>
                     <CustomSwitch
                        firstOption='Monthly'
                        secondOption='Annually'
                        backgroundColor='#fbfdff'
                        checkedBackground='#7cb740'
                        checkedTextColor='#ffffff'
                     />
                  </div>
                  <div className='planCards m-t-exl'>
                     <PlanCard
                        title={ planCards[0].title }
                        price={ planCards[0].price }
                        orders={ planCards[0].orders }
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        active
                        title={ planCards[1].title }
                        price={ planCards[1].price }
                        orders={ planCards[1].orders }
                        popular
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        title={ planCards[2].title }
                        price={ planCards[2].price }
                        orders={ planCards[2].orders }
                     />
                  </div>
                  <div className='m-t-exl' />
                  <PlanItemList />
                  <div className='m-t-exl' />
                  <PlanSubscription table={ subTable } />
                  <div className='m-t-exl' />
                  <PlanHistory table={ historyTable } />
               </div>
            </div>
         </div>
      );
   })
   .add('Annually', () => {
      return (
         <div className='mainContainer'>
            <SideBar />
            <div className='rightSide'>
               <PlansHeader />
               <div className='plansPage'>
                  <div className='flex justify-center'>
                     <CustomSwitch
                        firstOption='Monthly'
                        secondOption='Annually'
                        backgroundColor='#fbfdff'
                        checkedBackground='#7cb740'
                        checkedTextColor='#ffffff'
                        checked={ 2 }
                     />
                  </div>
                  <div className='planCards m-t-exl'>
                     <PlanCard
                        title={ planCards[0].title }
                        price={ planCards[0].price }
                        orders={ planCards[0].orders }
                        annuallyPrice={ planCards[0].annuallyPrice }
                        annually
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        active
                        title={ planCards[1].title }
                        price={ planCards[1].price }
                        orders={ planCards[1].orders }
                        annuallyPrice={ planCards[1].annuallyPrice }
                        popular
                        annually
                     />
                     <div className='m-l-exl' />
                     <PlanCard
                        title={ planCards[2].title }
                        price={ planCards[2].price }
                        orders={ planCards[2].orders }
                        annuallyPrice={ planCards[2].annuallyPrice }
                        annually
                     />
                  </div>
                  <div className='m-t-exl' />
                  <PlanItemList />
                  <div className='m-t-exl' />
                  <PlanSubscription table={ subTable } />
                  <div className='m-t-exl' />
                  <PlanHistory table={ historyTable } />
               </div>
            </div>
         </div>
      );
   });
