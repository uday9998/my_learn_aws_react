/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Transactions/Table';
import moment from 'moment';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Modal from 'components/elements/Modal';
import RefundModalContent from 'components/elements/Transactions/RefundModalContent';
// Payment Method, Class

const TransactionTable = ({ headings, content }) => {
   const [hideColumns, setHideColumns] = useState(true);
   useEffect(() => {
      const mediaHandler = (media) => {
         if (media.matches) {
            setHideColumns(true);
         } else {
            setHideColumns(false);
         }
      };
      const x = window.matchMedia('(width: 1024px)');
      x.addListener(mediaHandler);
      return () => {
         x.removeListener(mediaHandler);
      };
   }, [setHideColumns]);
   function typeFunc(transactionType) {
      if (transactionType) {
         return 'Subscription';
      }
      return 'One Time';
   }


   const [isModalOpened, setIsModalOpened] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState(null);

   const refundModalClick = (type) => {
      setPaymentMethod(type);
      setIsModalOpened(true);
   };

   const renderTableHeader = () => {
      return headings.map((key, index) => {
         if (hideColumns && ['Payment Method', 'Class'].includes(key)) return null;
         return (
            <Th key={ index }>
               {key}
            </Th>
         );
      }
      );
   };

   const renderTableData = () => {
      return content.map((data) => {
         const {
            id, user, course, amount, status, created_at, subscription_id, type, currency,
         } = data;
         const date = moment(created_at).format('MM/DD/YYYY');
         return (
            <Tr key={ id }>
               <Td>{user.name}</Td>
               { !hideColumns
               && (
                  <Td>{course.name}</Td>
               )}
               <Td>{ `${ amount } ${ currency }`}</Td>
               {status === 'succeeded'
                  ? (<Td> {<div className='oval' /> } {status} </Td>)
                  : (<Td>{status}</Td>)
               }

               <Td>{date}</Td>
               <Td>{typeFunc(subscription_id)}</Td>
               { !hideColumns
               && (
                  <Td>{type}</Td>
               )}
               <Td>
                  <BaseButton
                     size={ btnSize.medium }
                     text='REFUND'
                     onClick={ () => refundModalClick(type) }
                  />
               </Td>

            </Tr>
         );
      });
   };

   return (
      <div className='transactionsTable'>
         <table id='transactionsTable' className='transactions__table w-full' cellSpacing='0' cellPadding='1'>
            <Theader className='transactions__header'>
               <Tr>
                  {renderTableHeader()}
               </Tr>
            </Theader>
            <Tbody>
               {renderTableData()}
            </Tbody>
         </table>
         {

            content.map((data) => {
               const {
                  id, user, course, amount, status, created_at, subscription_id, type, currency,
               } = data;
               const date = moment(created_at).format('MM/DD/YYYY');
               return (
                  <div
                     key={ id }
                     className='mob-transactions-tabel'
                  >
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Member Name </span>
                        <span className='transactions-value'> { user.name } </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Class </span>
                        <span className='transactions-value'> {course.name } </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'>Amount </span>
                        <span className='transactions-value'> { `${ amount } ${ currency }`} </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Status </span>
                        <span className='transactions-value'> {status} </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Date </span>
                        <span className='transactions-value'>  {date} </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Type </span>
                        <span className='transactions-value'>  {typeFunc(subscription_id)} </span>
                     </div>
                     <div className='mob-transactions-tabel-row'>
                        <span className='header'> Payment Method </span>
                        <span className='transactions-value'>  {type} </span>
                     </div>
                     <div className='mob-transactions-tabel-row refund-row'>
                        <span className='header'>  </span>
                        <span className='transactions-value'>
                           <BaseButton
                              size={ btnSize.medium }
                              text='REFUND'
                              onClick={ () => refundModalClick(type) }
                           />
                        </span>
                     </div>

                  </div>
               );
            })
         }
         {
            isModalOpened && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => setIsModalOpened(false) }
               >
                  <div>
                     <RefundModalContent
                        onCancel={ () => setIsModalOpened(false) }
                        paymentMethod={ paymentMethod }
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

TransactionTable.propTypes = {
   headings: PropTypes.array,
   content: PropTypes.array,
};

export default TransactionTable;
