import React, { useState } from 'react';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import AccountPaymentPage from './AccountBillingPages/Payment';
import AccountInvoicesPage from './AccountBillingPages/Invoices';
import AccountBillingPage from './AccountBillingPages/Billing';

const tabsVariant = [
   { key: 'Billing Address', value: 'billing', iconName: 'BillingAddresM' },
   { key: 'Payment Information', value: 'payment', iconName: 'PaymentInfoM' },
   { key: 'Invoices', value: 'invoices', iconName: 'InvoicesAccountM' },
];

const AccountBilling = (props) => {
   const [selectedVariant, setSelectedVariant] = useState('billing');
   const getPage = () => {
      switch (selectedVariant) {
         case 'payment':
            return (<AccountPaymentPage { ...props } />);
         case 'invoices':
            return (<AccountInvoicesPage { ...props } />);
         default:
            return (<AccountBillingPage { ...props } />);
      }
   };

   return (
      <InnerWrapper
         hasTabs={ true }
         tabName={ tabsVariant }
         title='Billing'
         selectedPage={ selectedVariant }
         setSelectedPage={ setSelectedVariant }
         tooltip='View your current plans, downgrade, or upgrade to a different plan.'
      >
         <div className='account__billing__wrapper'>
            {getPage()}
         </div>
      </InnerWrapper>
   );
};

AccountBilling.propTypes = {

};

export default AccountBilling;
