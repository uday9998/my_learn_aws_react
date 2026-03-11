import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text from 'components/elements/Text';
import EmailStatusesTable from 'components/elements/EmailStatuses/EmailStatusesTable';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Pagination from 'components/elements/Pagination';
import EmptyPage from 'components/modules/emptyPageNew';
import EmailStatusesFilter from './Components/EmailStatusesFilter';
// import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';

const EmailStatuses = ({
   emailStatuses,
   deleteEmailStatus,
   getEmailStatusesInProgress,
   onChangeEmailStatusPage,
   emailStatusesTotal,
   handleEditEmailStatus,
   filterState,
   onChangeFilterState,
   goToCreatePage,
   isMobile,
   isEmptyByFilter,
   checkedIds,
   handleCheckItem,
   handleCheckAllItems,
   handleMultiDelete,
   handleDuplicate,
}) => {
   const orderHeaders = [
      'Type', 'Send To', 'Status', 'Created', 'Sent', '',
   ];
   const [isMultiselect, setIsMultiselect] = useState(false);
   return (
      !getEmailStatusesInProgress && (
         <>
            { emailStatuses.length === 0 && !isEmptyByFilter
               ? (
                  <EmptyPage
                     subtitle='Welcome to Broadcast Emails'
                     title='Create Emails for Single Use'
                     buttonName='Create New Email'
                     iconName='HandL'
                     handleAction={ () => goToCreatePage() }
                  />
               )

               : (
                  <div className='emailstatus-page'>
                     <EmailStatusesFilter
                        filterState={ filterState }
                        onChange={ onChangeFilterState }
                        isMobile={ isMobile }
                        isMultiselect={ isMultiselect }
                        setIsMultiselect={ setIsMultiselect }
                        emailStatuses={ emailStatuses }
                        checkedIds={ checkedIds }
                        handleCheckAllItems={ handleCheckAllItems }
                        handleMultiDelete={ handleMultiDelete }
                     />
                     <div className='m-t-m m-b-exl'>

                        {!getEmailStatusesInProgress
               && (emailStatuses.length === 0 ? (
                  <div className='settingTransaction__transaction_empty'>
                     <img src={ NoSearchSvg } alt='noCredit' />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No Emails'
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
                  <>
                     <EmailStatusesTable
                        headings={ orderHeaders }
                        content={ emailStatuses }
                        deleteEmailStatus={ deleteEmailStatus }
                        handleEditEmailStatus={ handleEditEmailStatus }
                        checkedIds={ checkedIds }
                        isMultiselect={ isMultiselect }
                        handleCheckItem={ handleCheckItem }
                        handleDuplicate={ handleDuplicate }
                     />
                     <div className={ emailStatusesTotal > 20 ? 'flex justify-center m-t-exl m-b-exl p-t-exs' : 'flex justify-center m-t-exl m-b-exl p-t-exs d-none' }>
                        <Pagination
                           totalRecords={ emailStatusesTotal }
                           pageLimit={ 20 }
                           pageNeighbours={ 1 }
                           onPageChanged={ (page) => onChangeEmailStatusPage(page) }
                        />
                     </div>
                  </>
               ))}

                     </div>

                  </div>
               ) }
         </>
      )
   );
};
EmailStatuses.propTypes = {
   emailStatuses: PropTypes.array,
   deleteEmailStatus: PropTypes.func,
   getEmailStatusesInProgress: PropTypes.bool,
   emailStatusesTotal: PropTypes.number,
   onChangeEmailStatusPage: PropTypes.func,
   handleEditEmailStatus: PropTypes.func,
   // handleNewMessage: PropTypes.func,
   filterState: PropTypes.object,
   goToCreatePage: PropTypes.func,
   onChangeFilterState: PropTypes.func,
   isMobile: PropTypes.bool,
   isEmptyByFilter: PropTypes.bool,
   checkedIds: PropTypes.array,
   handleCheckItem: PropTypes.func,
   handleCheckAllItems: PropTypes.func,
   handleMultiDelete: PropTypes.func,
   handleDuplicate: PropTypes.func,
};

export default EmailStatuses;
