import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import OrdersTable from 'components/elements/studentAccount/OrdersTable';
import { useTranslate } from 'react-polyglot';

const PastOrders = ({ orders, cancelSubscription }) => {
   const t = useTranslate();
   const orderHeaders = [
      t('course_name'), t('pricing'), t('status'),
   ];
   return (
      <ItemWrapper>
         <div className='ordersInfo'>
            <div className='orders__title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner={ t('your_billing_history') }
                  color='#333333'
               />
            </div>
            { orders && orders.payments.length !== 0 && (
               <OrdersTable
                  headings={ orderHeaders }
                  cancelSubscription={ cancelSubscription }
                  content={ orders && orders.payments }
               />
            )}
         </div>
      </ItemWrapper>
   );
};

PastOrders.propTypes = {
   orders: PropTypes.object,
   cancelSubscription: PropTypes.func,
};

export default PastOrders;
