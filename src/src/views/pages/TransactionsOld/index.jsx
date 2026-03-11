import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import SearchFilter from 'components/elements/TransactionsSearchFilter';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TransactionTable from 'components/elements/Transactions/TransactionTable';
import NoCreditSvg from 'assets/images/no-credit-card.svg';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PagePagination from 'components/elements/Transactions/PagePagination';
import { isLocalhost } from 'utils/Helpers';
import Tooltip from 'components/elements/members/Tooltip';
import moment from 'moment';

const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
const Transactions = ({
   transactions, handleInternalInputChange, searchTo, searchFrom, handleSearch, getTransactionsInProgress,
   changeTransactionsPage, total, pageLimit, currentPage,
}) => {
   const orderHeaders = [
      'Member Name', 'Class', 'Amount', 'Status', 'Date', 'Type', 'Payment Method', '',
   ];
   const exportCSV = () => {
      let dateTo;
      let dateFrom;
      let url;
      if (searchTo) {
         dateTo = moment(searchTo).format('YYYY-MM-DD');
      }
      if (searchFrom) {
         dateFrom = moment(searchFrom).format('YYYY-MM-DD');
      }
      if (dateFrom || dateTo) {
         url = `${ apiUrl }/api/v1/reports/transactions/csv-export?page=${ currentPage }&count=${ pageLimit }&from=${ dateFrom }&to=${ dateTo }`;
      } else {
         url = `${ apiUrl }/api/v1/reports/transactions/csv-export?page=${ currentPage }&count=${ pageLimit }`;
      }
      const hiddenElement = document.createElement('a');
      hiddenElement.href = url;
      hiddenElement.click();
   };

   return (
      <div className='transactions-page'>
         <div className='m-t-exl m-b-exl'>
            <ItemWrapper style={ { padding: '32px 50px 32px 42px' } }>
               <div className='flex'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Transactions'
                     className='m-b-exl p-b-m'
                  />
                  <Tooltip
                     hintText='You can pull a history of all you transactions and export them to a CSV file for your records.'
                     hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
                  />
               </div>

               <div className='transaction-page-serach-header'>
                  <div>
                     <SearchFilter
                        handleInternalInputChange={ handleInternalInputChange }
                        searchTo={ searchTo }
                        searchFrom={ searchFrom }
                        handleSearch={ handleSearch }
                     />
                  </div>
                  <div className='export-csv'>
                     <BaseButton
                        size={ btnSize.medium }
                        text='Export CSV'
                        onClick={ exportCSV }
                     />
                  </div>
               </div>
               <div className='line' />
               {!getTransactionsInProgress
               && (transactions.length === 0 ? (
                  <div className='settingTransaction__transaction_empty'>
                     <img src={ NoCreditSvg } alt='noCredit' />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No Transactions'
                     />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No data available in table'
                        style={ { fontSize: '12px' } }
                     />
                  </div>
               ) : (
                  <TransactionTable
                     headings={ orderHeaders }
                     content={ transactions }
                  />
               ))}

               {!getTransactionsInProgress && (
                  <div className='flex justify-center m-t-exl m-b-exl p-t-exs'>
                     <PagePagination changePage={ changeTransactionsPage } total={ total } pageLimit={ pageLimit } />
                  </div>
               )}
            </ItemWrapper>
         </div>

      </div>
   );
};
Transactions.propTypes = {
   transactions: PropTypes.array,
   handleInternalInputChange: PropTypes.func,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   handleSearch: PropTypes.func,
   getTransactionsInProgress: PropTypes.bool,
   changeTransactionsPage: PropTypes.func,
   total: PropTypes.number,
   pageLimit: PropTypes.number,
   currentPage: PropTypes.number,
};

export default Transactions;
