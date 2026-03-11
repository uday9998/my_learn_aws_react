/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Table';


const OrdersTable = ({ headings, content, cancelSubscription }) => {
   const renderTableHeader = () => {
      return headings.map((key, index) => {
         return (
            <Th key={ index }>
               {key}
            </Th>
         );
      });
   };

   const renderTableData = () => {
      return content.map((data) => {
         const {
            id, course_name, status, currency, amount, subscription_id,
         } = data;

         return (
            <Tr key={ id }>
               <Td>{course_name}</Td>
               <Td>{`${ Math.round(amount) } ${ currency }`}</Td>
               <Td> <span className={ status === 'succeeded' ? 'oval' : 'ovalBlack' } /> {status === 'succeeded' ? 'Completed' : status} </Td>
               {
                  status === 'succeeded' && subscription_id && (
                     <Td>
                        <div className='btnWrapper'>
                           <BaseButton
                              theme={ btnTheme.darkRed }
                              size={ btnSize.medium }
                              text='Cancel'
                              onClick={ () => cancelSubscription(subscription_id) }
                           />
                        </div>
                     </Td>
                  )
               }
            </Tr>
         );
      });
   };

   return (
      <div className='ordersTable'>
         <table id='membersTable' className='membersTable__table w-full'>
            <Theader className='membersTable__header'>
               <Tr>
                  {renderTableHeader()}
               </Tr>
            </Theader>
            <Tbody>
               {renderTableData()}
            </Tbody>
         </table>
      </div>
   );
};

OrdersTable.propTypes = {
   headings: PropTypes.array,
   content: PropTypes.array,
   cancelSubscription: PropTypes.func,
};

export default OrdersTable;
