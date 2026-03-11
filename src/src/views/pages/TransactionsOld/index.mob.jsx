import React from 'react';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import SearchFilter from 'components/elements/SearchFilter/index.mob';
import DataTable from 'components/elements/DataTable/index.mob';

const data = {
   titles: ['Member Name', 'Class', 'Amount', 'Status', 'Date', 'Type', 'Payment Method'],
   values: ['Justin Burns', 'Masterclass Code', '1 USD', 'Refunded', '9/12/2017', 'One Time', 'PayPal'],
};

const Transactions = () => {
   return (
      <div className='mob-transactions'>
         <ItemWrapper style={ { border: 'none' } }>
            <div style={ { padding: '24px' } }>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Transactions'
               />
               <div className='m-t-l' />
               <SearchFilter nameExist={ false } labelExist={ false } big />
            </div>
         </ItemWrapper>
         <div className='m-t-exl'>
            <DataTable data={ data } />
         </div>
      </div>
   );
};

export default Transactions;
