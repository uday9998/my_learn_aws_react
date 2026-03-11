/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { isLocalhost } from 'utils/Helpers';
import moment from 'moment';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import { TransactionsFilter } from './TransactionsComponent/TransactionsFilter';
import TransactionsTable from './TransactionsComponent/TransactionsTable';

const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
const Transactions = ({
   transactions, handleInternalInputChange, searchFrom, searchTo, email, type, offer_id,
   pageLimit, currentPage, handleSearch, offers, goTo,
}) => {
   let offersForSelectOption = [];
   if (offers && !!offers.length) {
      offersForSelectOption = offers.map(offer => ({ label: offer.name, value: offer.id }));
   }
   offersForSelectOption.unshift({ value: 'all_offers', label: 'All Offers' });
   useEffect(() => {
      handleSearch(searchFrom, searchTo);
   }, [searchTo]);
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
         url = `${ apiUrl }/api/v1/reports/transactions/csv-export-new?${ currentPage ? `page=${ currentPage`& ` }` : '' }${ pageLimit ? `count=${ pageLimit }&` : '' }${ dateFrom ? `from=${ dateFrom }&` : '' }${ dateTo ? `to=${ dateTo }` : '' }`;
      } else {
         url = `${ apiUrl }/api/v1/reports/transactions/csv-export-new?${ currentPage ? `page=${ currentPage`& ` }` : '' }${ pageLimit ? `count=${ pageLimit }&` : '' }`;
      }
      const hiddenElement = document.createElement('a');
      hiddenElement.href = url;
      hiddenElement.click();
   };
   return (
      <div className='transactions-page'>
         <TransactionsFilter
            handleInputChange={ handleInternalInputChange }
            offerOptions={ offersForSelectOption }
            data={ {
               searchFrom, searchTo, email, type, offer_id,
            } }
         />
         <ReportsContainer>
            <ReportsHeader title='Transactions' exportCSV={ exportCSV } />
            <TransactionsTable data={ transactions } goTo={ goTo } />
         </ReportsContainer>
      </div>
   );
};

Transactions.propTypes = {
   transactions: PropTypes.array,
   handleInternalInputChange: PropTypes.func,
   searchFrom: PropTypes.any,
   email: PropTypes.any,
   type: PropTypes.any,
   pageLimit: PropTypes.number,
   currentPage: PropTypes.number,
   searchTo: PropTypes.any,
   handleSearch: PropTypes.func,
   offer_id: PropTypes.any,
   offers: PropTypes.object,
   goTo: PropTypes.func,
};

export default Transactions;
