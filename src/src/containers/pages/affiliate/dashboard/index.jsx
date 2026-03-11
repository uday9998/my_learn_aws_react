import { getAffiliateDashboard } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import React from 'react';
import { connect } from 'react-redux';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import AdminContainer from 'views/layout/AdminContainer';
import PropTypes from 'prop-types';
import AffiliateDashboardView from 'views/pages/AffiliateFront/dashboard';

const AffiliateDashboard = ({ goToProducts }) => {
   const [filterType, setFilterType] = React.useState('today');
   const { data, loading, setData } = useApiQuery(getAffiliateDashboard, []);
   const [filter] = useSubmitForm(getAffiliateDashboard);

   const handleFilter = (type) => {
      filter({
         period: type,
      }, (result) => setData(result));
      setFilterType(type);
   };
   return (
      <AdminContainer>
         <AdminContainer.Content>
            <ComponentProgress loading={ loading }>
               <AffiliateDashboardView
                  bottomInfo={ data ? data.program_affiliate : {} }
                  filterType={ filterType }
                  handleFilter={ handleFilter }
                  data={ data }
                  goToProducts={ goToProducts }
               />
            </ComponentProgress>
         </AdminContainer.Content>
      </AdminContainer>
   );
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToProducts: () => {
         dispatch(
            push(Router.route('AFFILIATE_FRONT_PRODUCTS').getMask())
         );
      },
   };
};

const mapStateToProps = () => {
   return {

   };
};

AffiliateDashboard.propTypes = {
   goToProducts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateDashboard);
