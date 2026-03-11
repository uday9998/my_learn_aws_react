import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import FromToForm from 'components/elements/promotions/affiliates/FromToForm';
import DataTable from 'components/elements/DataTable';
import {
   TitleCourse, TitleAmount, StatusActive,
} from './elements';

const header = [
   'Member Name',
   <TitleCourse />,
   <TitleAmount />,
   'Status',
   'Date',
   'Type',
   'Payment Method',
];

const body = [
   [
      'Justin Burns',
      'Masterclass Code',
      '1 USD',
      <StatusActive />,
      '9/12/2017',
      'One Time',
      'PayPal',
   ],
];

const TransactionCard = () => {
   return (
      <ItemWrapper>
         <div className='transactionCard'>
            <div className='transactionCard__title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Transactions'
               />
            </div>
            <div className='transactionCard__form'>
               <FromToForm />
            </div>
            <div className='transactionCard__table'>
               <DataTable header={ header } body={ body } hasInterval />
               <div className='btnWrapper'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSize.medium }
                     text='Details'
                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

export default TransactionCard;
