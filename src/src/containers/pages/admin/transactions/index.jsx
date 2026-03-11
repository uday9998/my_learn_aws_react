/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import { connect } from 'react-redux';
import Transactions from 'views/pages/Transactions';
import moment from 'moment';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   getOnlyOffers, getTransactions,
} from 'api';
import withLoading from 'utils/withLoading';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

const TransactionsLoading = withLoading(Transactions);

const TransactionsContainer = ({ goTo }) => {
   const {
      data: offers, loading: loadingCourses,
   } = useApiQuery(getOnlyOffers);

   const [getTransactionsFunc, { loading }] = useSubmitForm(getTransactions, {
      successMessage: '',
   });

   const [transactions, setTransactions] = useState([]);

   const [inputs, setInputs] = useState({
      searchFrom: '',
      searchTo: '',
      email: '',
      offer_id: 'all_offers',
      type: 'all',
      to: '',
      from: '',
   });

   useEffect(() => {
      getTransactionsFunc({}, (res) => {
         setTransactions(res);
      });
   }, []);

   const handleInternalInputChange = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };

      filters.searchTo = name !== 'searchTo' ? filters.searchFrom : filters.searchTo;

      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getTransactionsFunc(filters, (res) => {
            setTransactions(res);
         });
      }
   };

   const handleSearch = (from, to) => {
      let date_from = '';
      let date_to = '';
      if (to) {
         date_to = moment(to).format('YYYY-MM-DD');
      }

      if (from) {
         date_from = moment(from).format('YYYY-MM-DD');
      }
      const filters = {
         ...inputs,
         to: date_to,
         from: date_from,
      };
      setInputs(filters);
      getTransactionsFunc(filters, (res) => {
         setTransactions(res);
      });
   };


   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <Container>
            <TransactionsLoading
               isLoading={ loadingCourses }
               offers={ offers }
               transactions={ transactions }
               handleInternalInputChange={ (name, value) => handleInternalInputChange(name, value) }
               handleSearch={ (from, to) => handleSearch(from, to) }
               searchFrom={ inputs.searchFrom }
               searchTo={ inputs.searchTo }
               email={ inputs.email }
               offer_id={ inputs.offer_id }
               type={ inputs.type }
               getTransactionsInProgress={ loading }
               goTo={ goTo }
            />
         </Container>
      </>
   );
};

TransactionsContainer.propTypes = {
   goTo: PropTypes.func,
};

const mapStateToProps = () => {
   return {
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      goTo: (location, hash) => {
         dispatch(push({
            pathname: Router.route('ADMIN_CLASS_PROGRESS_VIEW').getCompiledPath({ id: location }),
            hash,
         }));
      },

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer);
