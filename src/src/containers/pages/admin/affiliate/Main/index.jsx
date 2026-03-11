import React, { useState, createContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as operations from 'state/modules/affiliate/operations';
import * as selectors from 'state/modules/affiliate/selectors';
import PropTypes from 'prop-types';
import AffiliateMainView from 'views/pages/Affiliate/Main';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import ComponentProgress from 'components/modules/ComponentProgress';
import { isLocalhost } from 'utils/Helpers';

export const MainAffiliateContext = createContext(null);
const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

function mapStateToProps(state) {
   return {
      loading: selectors.affiliateMainLoadingSelector(state),
      data: selectors.affiliateMainInfoSelector(state),
   };
}

function mapDispatchToProps(dispatch) {
   return {
      openUser: (id, affiliateId) => {
         dispatch(push(Router.route('ADMIN_AFFILIATE_USER').getCompiledPath({ id, affiliateId })));
      },
      inviteUsers: () => {
         dispatch(push(Router.route('ADMIN_AFFILIATE_INVITE_USERS').getCompiledPath()));
      },
      goToSettingsPage: (id) => {
         dispatch(push(`${ Router.route('ADMIN_AFFILIATE_SETTINGS').getCompiledPath({ id }) }#signin`));
      },
      goToEditPage: (id) => {
         dispatch(push(`${ Router.route('ADMIN_AFFILIATE_EDIT').getCompiledPath({ id }) }#offers`));
      },
      init: (id) => {
         dispatch(operations.affiliateMainInit(id));
      },
      overviewFilter: (id, type) => {
         dispatch(operations.affilaiteOverviewFilter(id, type));
      },
      deleteAffiliate: (id) => {
         dispatch(operations.affiliateDeleteOperation(id));
      },
      markAsPaid: (id, transactionId) => {
         dispatch(operations.markAsPaidOperation(id, transactionId));
      },
   };
}
const AffiliateMain = ({
   openUser, inviteUsers, goToSettingsPage, goToEditPage, init, loading, data,
   program, overviewFilter, deleteAffiliate, markAsPaid,
}) => {
   const [searchValue, setSearchValue] = useState('');
   const [tab, setTab] = useState('overview');
   useEffect(() => init(program.id), []);
   const [filterType, setFilterType] = useState('last30');
   const handleChangeFilterType = (type) => {
      overviewFilter(program.id, type);
      setFilterType(type);
   };

   const exportTransactions = () => {
      const url = `${ apiUrl }/api/v1/affiliate/${ program.id }/export-csv-transactions`;
      window.open(url, '_blank');
   };

   const exportAffiliates = () => {
      const url = `${ apiUrl }/api/v1/affiliate/${ program.id }/export-csv-affiliates`;
      window.open(url, '_blank');
   };
   return (
      <MainAffiliateContext.Provider value={ {
         searchValue,
         tab,
         setSearchValue,
         setTab,
         stats: data ? data.overview : null,
         filterType,
         data,
         users: data && data.overview ? data.overview.affiliates : [],
         editUser: (id) => openUser(id, program.id),
         inviteUsers,
         transactions: data ? data.transactions : null,
         exportTransactions: () => exportTransactions(),
         exportUsers: () => exportAffiliates(),
         goToSettingsPage: () => goToSettingsPage(program.id),
         markAsPaid: (transactionId) => markAsPaid(program.id, transactionId),
         onChangeFilterType: handleChangeFilterType,
         deleteAffiliateProgram: () => deleteAffiliate(program.id),
         goToEditPage: () => goToEditPage(program.id),
      } }
      >
         <ComponentProgress loading={ loading }>
            <AffiliateMainView />
         </ComponentProgress>
      </MainAffiliateContext.Provider>
   );
};

AffiliateMain.propTypes = {
   openUser: PropTypes.func,
   inviteUsers: PropTypes.func,
   goToSettingsPage: PropTypes.func,
   goToEditPage: PropTypes.func,
   init: PropTypes.func,
   loading: PropTypes.bool,
   data: PropTypes.object,
   program: PropTypes.any,
   overviewFilter: PropTypes.func,
   deleteAffiliate: PropTypes.func,
   markAsPaid: PropTypes.func,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(AffiliateMain);
