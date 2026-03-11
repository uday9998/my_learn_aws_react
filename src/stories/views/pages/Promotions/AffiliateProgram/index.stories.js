/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

import SiteHeader from 'views/layout/SiteHeader';
import AddAffiliateCard from 'components/modules/promotions/affiliates/AddAffiliateCard';
import AffiliatesCard from 'components/modules/promotions/affiliates/AffiliatesCard';
import DataTable from 'components/elements/DataTable';
import { header } from './propOptions';

storiesOf('App|Views/pages/promotions/AffiliateProgram/desktop', module)
   .addDecorator(withKnobs)
   .add('Affiliate Program', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader
                  title='Affiliate Program'
                  hasArrow
                  right={ (
                     <div style={ { width: '140px' } }>
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.medium }
                           text='Add Affiliate'
                           style={ { width: '100%' } }
                        />
                     </div>
                  ) }
               />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <div className='w-full'>
                     <AffiliatesCard />
                     <div className='w-full m-t-exl'>
                        <DataTable
                           style={ { padding: '8px 24px 0 24px' } }
                           header={ header }
                           match='affiliates'
                        />
                     </div>
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
