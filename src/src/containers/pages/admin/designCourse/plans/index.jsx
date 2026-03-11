import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import PlansEmpty from 'views/pages/plansNew/components/empty';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/plans/selectors';
import * as operations from 'state/modules/plans/operations';
import ComponentProgress from 'components/modules/ComponentProgress';
import PlansView from 'views/pages/plansNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { deletePlans as deleteMany, duplicatePlans } from 'api';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Axios from 'axios';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import { resetStateToInitialAction } from 'state/modules/plans/actions';

const PlansNew = ({
   isLoading, plans, getPlans, filterPlans, filterLoading, deletePlans,
   goToCreate, goToEdit, lastPage, getPlansNextPage, isFetchingNextPage, resetStateToInitial,
}) => {
   const [search, setSearch] = useState('');
   const [isMultiSelect, setIsMutliSelect] = useState(false);
   const [checkedPlanIds, setCheckedPlanIds] = useState([]);
   const [currencyData, setCurrencyData] = useState([]);
   const [progress, setProgress] = useState(false);
   const [sortBy, setSortBy] = useState('recently');
   const [showSearch, setShowSearch] = useState(false);
   const { isMobile } = useWindowSizeChange();
   const [currentPage, setCurrnetPage] = useState(1);


   const generateQuery = (page) => {
      let query = `order_by=${ sortBy }`;
      if (search.length) {
         query += `&name=${ search }`;
      }
      if (page) {
         query += `&page=${ page }`;
      }
      return query;
   };

   const handleScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isNeedNextPage = window.innerHeight + e.target.scrollTop + 3 >= e.target.scrollHeight;

      if (isNeedNextPage && currentPage < lastPage && !isFetchingNextPage) {
         getPlansNextPage(generateQuery(currentPage + 1), () => {
            setCurrnetPage(currentPage + 1);
         });
      }
   };

   useEffect(() => {
      getPlans('page=1&order_by=recently');

      return () => {
         resetStateToInitial();
      };
   }, []);

   useEffect(() => {
      let adminContainer;
      if (isMobile) {
         adminContainer = document.querySelector('.adminContent');
      } else {
         adminContainer = document.querySelector('.adminContainer ');
      }

      if (adminContainer) {
         adminContainer.addEventListener('scroll', handleScroll);
      }

      return () => {
         if (adminContainer) {
            adminContainer.removeEventListener('scroll', handleScroll);
         }
      };
   }, [isMobile, lastPage, currentPage]);


   useEffect(() => {
      setProgress(true);
      Axios.get(
         'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
         .then(({ data: res }) => {
            setCurrencyData(res.usd);
            setProgress(false);
         });
   }, []);


   const handleCheckPlan = (id, general) => {
      if (general) {
         if (checkedPlanIds.length !== plans.length) {
            const ids = plans.map((e) => e.id);
            setCheckedPlanIds(ids);
         } else {
            setCheckedPlanIds([]);
         }
         return;
      }
      const isChecked = checkedPlanIds.includes(id);
      if (isChecked) {
         setCheckedPlanIds(checkedPlanIds.filter((e) => e !== id));
         return;
      }
      setCheckedPlanIds([...checkedPlanIds, id]);
   };


   const deleteOnePlan = (id, func) => {
      deletePlans([id], () => {
         func();
         getPlans(generateQuery());
         if (isPrint('Bundle has been deleted.')) {
            toast.success('Bundle has been deleted.');
         }
         setCurrnetPage(1);
      });
   };

   const duplicateOnePlan = (id) => {
      duplicatePlans([id]).then(() => {
         getPlans(generateQuery());
         if (isPrint('Bundle has been duplicated.')) {
            toast.success('Bundle has been duplicated.');
         }
         setCurrnetPage(1);
      });
   };

   const bulkDelete = () => {
      deleteMany(checkedPlanIds).then(() => {
         setCheckedPlanIds([]);
         getPlans(generateQuery());
         if (isPrint('Selected bundles has been deleted.')) {
            toast.success('Selected bundles has been deleted.');
         }
         setCurrnetPage(1);
      });
   };

   const bulkDuplicate = () => {
      duplicatePlans(checkedPlanIds).then(() => {
         setCheckedPlanIds([]);
         getPlans(generateQuery());
         if (isPrint('Selected bundles has been duplicated.')) {
            toast.success('Selected bundles has been duplicated.');
         }
         setCurrnetPage(1);
      });
   };

   const onChangeSearchValue = (value) => {
      setSearch(value);
      if (!isLoading && !filterLoading) {
         setCheckedPlanIds([]);
         filterPlans(`&name=${ value }&order_by=${ sortBy }`);
         setCurrnetPage(1);
      }
   };

   const onChangeSortByValue = (value) => {
      setSortBy(value);
      if (!isLoading && !filterLoading) {
         setCheckedPlanIds([]);
         filterPlans(`&name=${ search }&order_by=${ value }`);
         setCurrnetPage(1);
      }
   };

   return (
      <>
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => {} }
               isMobSearchOpen
               setIsOpenMobSearch={ () => setShowSearch(!showSearch) }
            />
         </MobileHeader>
         <AdminContainer>
            <AdminContainer.Content>
               <ComponentProgress loading={ isLoading || progress }>

                  <HeaderTypeSecond
                     title='Bundles'
                     tooltip='text'
                     isHaveBaseButton={ plans.length !== 0 }
                     buttonProps={ {
                        text: 'New Bundle',
                        iconName: 'PluseNewL',
                        isIconRight: true,
                        onClick: () => goToCreate(),
                     } }
                     searchValue={ search }
                     onChangeSearchValue={ onChangeSearchValue }
                     isHidenSearch={ !showSearch && isMobile }
                  />
                  {filterLoading && (
                     <LoaderSpinner />
                  )}
                  {!isLoading && (
                     <>
                        {plans.length === 0 ? (
                           <PlansEmpty onCreatePlan={ () => goToCreate() } />
                        ) : (
                           <PlansView
                              data={ plans }
                              paginationData={ plans }
                              checkedPlanIds={ checkedPlanIds }
                              handleCheck={ handleCheckPlan }
                              sortBy={ sortBy }
                              currencyData={ currencyData }
                              goToEdit={ goToEdit }
                              deletePlans={ bulkDelete }
                              setSortBy={ onChangeSortByValue }
                              duplicatePlans={ bulkDuplicate }
                              duplicateOnePlan={ duplicateOnePlan }
                              isMultiSelect={ isMultiSelect }
                              deleteOnePlan={ deleteOnePlan }
                              setIsMutliSelect={ setIsMutliSelect }
                              isMobile={ isMobile }
                              isFetchingNextPage={ isFetchingNextPage }
                           />
                        )}
                     </>
                  )}
               </ComponentProgress>

            </AdminContainer.Content>
         </AdminContainer>
      </>

   );
};

PlansNew.propTypes = {
   isLoading: PropTypes.bool,
   plans: PropTypes.any,
   deletePlans: PropTypes.func,
   getPlans: PropTypes.func,
   filterPlans: PropTypes.func,
   filterLoading: PropTypes.bool,
   goToCreate: PropTypes.func,
   goToEdit: PropTypes.func,
   lastPage: PropTypes.number,
   isFetchingNextPage: PropTypes.bool,
   getPlansNextPage: PropTypes.func,
   resetStateToInitial: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      isLoading: selectors.getPlansInProgressSelector(state),
      plans: selectors.plansSelector(state),
      filterLoading: selectors.filterInProgressSelector(state),
      lastPage: selectors.lastPageSelector(state),
      isFetchingNextPage: selectors.isFetchingNextPageSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getPlans: (query) => dispatch(operations.getPlans(query, true)),
      filterPlans: (query) => dispatch(operations.filterPlans(query, true)),
      deletePlans: (ids, callBack) => dispatch(operations.deletePlansOperation(ids, callBack)),
      goToCreate: (id, roomId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_CREATE_PLAN').getCompiledPath() }${ roomId ? `#${ roomId }` : '' }`
            )
         );
      },
      goToEdit: (id) => {
         dispatch(
            push(`${ Router.route('ADMIN_PLAN_EDIT').getCompiledPath({ id }) }#main`)
         );
      },
      getPlansNextPage: (query, callback) => dispatch(operations.getPlansNextPageOperation(query, callback, true)),
      resetStateToInitial: () => dispatch(resetStateToInitialAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlansNew);
