import React, { useContext } from 'react';
import {
   TYPES as types, SIZES as sizes, TextWithTooltip,
} from 'components/elements/TextNew';
import { MainAffiliateContext } from 'containers/pages/admin/affiliate/Main';
import './index.scss';
import Tabs from 'components/elements/tabs';
import AffiliateOverview from './Views/Overivew';
import AffiliateUsers from './Views/Users';
import AffiliateTransactions from './Views/Transactions';

const AffiliateMainView = () => {
   const {
      tab, setTab,
   } = useContext(MainAffiliateContext);
   const tabVariants = [
      { value: 'overview', key: 'Overview', iconName: 'AffiliateOverviewTabM' },
      { value: 'users', key: 'Users', iconName: 'AffiliateUserTabM' },
      { value: 'transactions', key: 'Transactions', iconName: 'AffiliateTransactionsTabM' },
   ];
   const getPageByTab = () => {
      switch (tab) {
         case 'overview':
            return <AffiliateOverview />;
         case 'users':
            return <AffiliateUsers />;
         default:
            return <AffiliateTransactions />;
      }
   };
   return (
      <div className='affiliate__main'>
         <div className='affiliate__main__top'>
            <TextWithTooltip
               inner='Affiliate Program'
               type={ types.mediumTitle }
               tooltip='Affiliate Program can enhance your earning potential by promoting your program. Here you can see the details on commission rates, tracking, and payout schedules.'
               size={ sizes.size_28 }
               iconName='AffiliateQuestionM'
               isIconRigth={ true }
               id='Affiliate'
            />
            {/* <Input
               value={ searchValue }
               onChange={ (name, value) => setSearchValue(value) }
               placeholder='Search'
               type='search'
               onSearch={ () => {} }
               onKeyPress={ (e) => {
                  if (e.key === 'Enter') {
                  }
               } }
            /> */}
         </div>
         <div className='affiliate__main__content'>
            <Tabs
               hasIcon={ true }
               variants={ tabVariants }
               selectedVariant={ tab }
               isButton={ false }
               onSelect={ (value) => setTab(value) }
            />
            <div className='affiliate__main__content__wrapper'>
               {getPageByTab()}
            </div>
         </div>
      </div>
   );
};

AffiliateMainView.propTypes = {

};

export default AffiliateMainView;
