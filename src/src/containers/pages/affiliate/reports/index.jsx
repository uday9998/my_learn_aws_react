import { getProductOffersAffiliate } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import React from 'react';
import { connect } from 'react-redux';
import { appSelector } from 'state/modules/common/selectors';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import AdminContainer from 'views/layout/AdminContainer';
import PropTypes from 'prop-types';
import AffiliateFrontProducts from 'views/pages/AffiliateFront/Products';

const AffiliateReports = ({ app }) => {
   const [sortType, setSortType] = React.useState('A_Z');
   const [search, setSearch] = React.useState('');
   const { data, loading, setData } = useApiQuery(getProductOffersAffiliate, []);
   const [sort] = useSubmitForm(getProductOffersAffiliate);

   const handleSort = (type) => {
      sort({
         sort: type,
         search,
      }, (result) => setData(result));
      setSortType(type);
   };

   const handleSearch = (value) => {
      sort({
         sort: sortType,
         search: value,
      }, (result) => setData(result));
      setSearch(value);
   };


   return (
      <AdminContainer>
         <AdminContainer.Content>
            <ComponentProgress loading={ loading }>
               <AffiliateFrontProducts
                  searchInput={ search }
                  setSearchInput={ handleSearch }
                  sort={ sortType }
                  changeSort={ handleSort }
                  affiliate={ data ? data.affiliate : {} }
                  uuid={ app.uuid }
                  data={ data ? data.offers : [] }
               />
            </ComponentProgress>
         </AdminContainer.Content>
      </AdminContainer>
   );
};

const mapDispatchToProps = () => {
   return {

   };
};

const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

AffiliateReports.propTypes = {
   app: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateReports);
