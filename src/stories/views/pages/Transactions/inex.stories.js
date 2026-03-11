import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import SideBar from 'components/modules/Sidebar';

import SiteHeader from 'views/layout/SiteHeader';
import TransactionCard from 'components/modules/transactions/TransactionCard';

storiesOf('App|Views/pages/Transactions/desktop', module)
   .add('Transactions', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader
                  title='Transactions'
                  hasArrow
               />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <div className='w-full'>
                     <TransactionCard />
                  </div>
               </div>
            </div>
         </div>
      );
   });
