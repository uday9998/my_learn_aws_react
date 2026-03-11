import React, { createContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import * as operations from 'state/modules/affiliate/operations';
import * as selectors from 'state/modules/affiliate/selectors';
import AdminContainer from 'views/layout/AdminContainer';
import AffiliateUserView from 'views/pages/Affiliate/User';
import ComponentProgress from 'components/modules/ComponentProgress';

export const AffiliateUserContext = createContext(null);


const mapStateToProps = (state) => {
   return {
      loading: selectors.affiliateUserPageLoadingSelector(state),
      user: selectors.affiliateUserDataSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (id, affiliateId, filterType, loading) => {
         dispatch(operations.userPageInit(id, affiliateId, filterType, loading));
      },
   };
};

const AffiliateUser = ({
   match, init, user, loading,
}) => {
   const id = match.params.id;
   const [filterType, setFilterType] = useState('last30');
   useEffect(() => {
      init(id, match.params.affiliateId, filterType, true);
   }, []);
   const history = useHistory();
   const handleUserFilter = (type) => {
      setFilterType(type);
      init(id, match.params.affiliateId, filterType);
   };
   return (
      <AdminContainer>
         <AdminContainer.Content>
            <AffiliateUserContext.Provider value={ {
               user,
               filterType,
               onChangeFilterType: (type) => handleUserFilter(type),
               goBack: () => history.goBack(),
            } }
            >
               <ComponentProgress loading={ loading }>
                  <AffiliateUserView />
               </ComponentProgress>
            </AffiliateUserContext.Provider>
         </AdminContainer.Content>
      </AdminContainer>
   );
};

AffiliateUser.propTypes = {
   match: PropTypes.object,
   init: PropTypes.func,
   user: PropTypes.object,
   loading: PropTypes.bool,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(AffiliateUser);
