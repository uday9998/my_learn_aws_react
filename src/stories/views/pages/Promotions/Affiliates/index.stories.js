/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

import SiteHeader from 'views/layout/SiteHeader';
import SearchFilter from 'components/elements/SearchFilter';
import DataTable from 'components/elements/DataTable';
import AddAffiliateCard from 'components/modules/promotions/affiliates/AddAffiliateCard';

import { body, header } from './propOptions';

const AffiliatesHeader = () => {
   return (
      <SiteHeader
         style={ { padding: '24px 24px 32px 32px' } }
         title='Affiliates'
         hasArrow
         right={ (
            <div className='flex affiliatesHeader__btns'>
               <div className='m-r-l'>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.medium }
                     text='Export CSV'
                  />
               </div>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.medium }
                  text='Add Affiliates'
               />
            </div>
         ) }
         bottom={ (
            <div className='m-t-exl'>
               <SearchFilter />
            </div>
         ) }
      />
   );
};

storiesOf('App|Views/pages/promotions/Affiliates/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty state', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <AffiliatesHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px)' } }>
                  <div className='w-full'>
                     <DataTable
                        style={ { padding: '8px 24px 0 24px' } }
                        header={ header }
                        match='users'
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Affiliates', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <AffiliatesHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px)' } }>
                  <div className='w-full'>
                     <DataTable
                        style={ { padding: '8px 24px 0 24px' } }
                        header={ header }
                        body={ body }
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Add Affiliate', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader
                  title='Add Affiliate'
                  hasArrow
               />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <div style={ { width: '100%', maxWidth: '552px' } }>
                     <AddAffiliateCard />
                  </div>
               </div>
            </div>
         </div>
      );
   });
