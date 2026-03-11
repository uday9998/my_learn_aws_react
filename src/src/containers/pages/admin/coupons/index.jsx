import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import CouponsView from 'views/pages/Coupons';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import CouponsEmptyPage from 'views/pages/Coupons/Components/Empty';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import * as operations from 'state/modules/coupon/operations';
import * as selectors from 'state/modules/coupon/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';

const Coupons = ({
   goToCreatePage, init, initalCount, coupons, progress, couponsDelete, filter,
   filterProgress, goToEditPage,
}) => {
   const [search, setSearch] = useState('');
   const [sort, setSort] = useState('ongoing');
   const [checkedCouponsIds, setCheckedCouponsIds] = useState([]);
   const [isMultiSelect, setIsMultiSelect] = useState(false);
   const [showSearch, setShowSearch] = useState(false);
   const { isMobile } = useWindowSizeChange();

   const query = `?count=10&code=${ search }&sort_by=${ sort }`;
   useEffect(() => {
      init();
   }, []);
   const onCheckAll = () => {
      if (checkedCouponsIds.length < coupons.data.length) {
         setCheckedCouponsIds(coupons.data.map((e) => e.id));
         return;
      }
      setCheckedCouponsIds([]);
   };

   const onCheckItem = (value, id) => {
      if (value) {
         setCheckedCouponsIds([...checkedCouponsIds, id]);
         return;
      }
      setCheckedCouponsIds(checkedCouponsIds.filter((e) => e !== id));
   };

   const handleTabChange = (tab) => {
      filter(`${ query }&page=${ tab }`);
   };

   useEffect(() => {
      if (!progress) {
         filter(query);
      }
   }, [search, sort]);

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
               <ComponentProgress loading={ progress }>
                  <div className='coupons'>
                     <HeaderTypeSecond
                        title='Coupons'
                        tooltip='text'
                        buttonProps={ {
                           text: 'New Coupon',
                           iconName: 'PluseNewL',
                           isIconRight: true,
                           onClick: () => goToCreatePage(),
                        } }
                        searchValue={ search }
                        onChangeSearchValue={ setSearch }
                        isHaveBaseButton={ initalCount !== 0 }
                        isHidenSearch={ !showSearch && isMobile }
                     />
                     {initalCount === 0 ? (
                        <CouponsEmptyPage
                           onCreateNewCoupon={ () => goToCreatePage() }
                        />
                     ) : (
                        <CouponsView
                           data={ coupons }
                           coupons={ coupons.data }
                           isMultiSelect={ isMultiSelect }
                           checkedIds={ checkedCouponsIds }
                           filterProgress={ filterProgress }
                           onSorting={ (value) => setSort(value) }
                           selectedSortingVariant={ sort }
                           onCheckAll={ () => onCheckAll() }
                           searchValue={ search }
                           goToEditPage={ goToEditPage }
                           onCheck={ onCheckItem }
                           handlePaginationChange={ handleTabChange }
                           onMultiSelect={ (value) => setIsMultiSelect(value) }
                           onDelete={ (ids) => couponsDelete(ids, () => setCheckedCouponsIds([])) }
                           isMobile={ isMobile }
                        />
                     )}
                  </div>
               </ComponentProgress>
            </AdminContainer.Content>
         </AdminContainer>
      </>
   );
};

Coupons.propTypes = {
   goToCreatePage: PropTypes.func,
   init: PropTypes.func,
   progress: PropTypes.bool,
   initalCount: PropTypes.number,
   coupons: PropTypes.array,
   couponsDelete: PropTypes.func,
   filter: PropTypes.func,
   filterProgress: PropTypes.bool,
   goToEditPage: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      progress: selectors.ProgressSelector(state),
      coupons: selectors.CouponsCountSelector(state),
      initalCount: selectors.initalCouponsCountSelector(state),
      filterProgress: selectors.filterProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToCreatePage: () => {
         dispatch(push(
            Router.route('ADMIN_COUPONS_CREATE').getCompiledPath()
         ));
      },
      init: () => {
         dispatch(operations.initCouponsOperation());
      },
      couponsDelete: (ids, callBack) => {
         dispatch(operations.CouponDeleteOperation(ids, callBack));
      },
      filter: (query) => {
         dispatch(operations.CouponDataFilter(query));
      },
      goToEditPage: (id) => {
         dispatch(push(
            Router.route('ADMIN_COUPON_VIEW').getCompiledPath({ id })
         ));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
