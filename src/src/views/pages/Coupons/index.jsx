import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'components/elements/Pagination';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CouponsListTop from './Components/Top';
import './index.scss';
import CouponsList from './Components/List';

const CouponsView = ({
   coupons, onDelete, onMultiSelect, isMultiSelect, checkedIds, onCheckAll, onCheck,
   searchValue, handlePaginationChange, data, filterProgress, onSorting, selectedSortingVariant,
   goToEditPage, isMobile,
}) => {
   return (
      <div className='coupons__view'>
         <CouponsListTop
            count={ coupons.length }
            selectedSortingVariant={ selectedSortingVariant }
            onSorting={ onSorting }
            isMultiSelect={ isMultiSelect }
            searchValue={ searchValue }
            onMultiSelect={ onMultiSelect }
            checkedIds={ checkedIds }
            onDelete={ onDelete }
            onCheckAll={ onCheckAll }
            isMobile={ isMobile }
         />
         {filterProgress ? (
            <LoaderSpinner />
         ) : (
            <CouponsList
               data={ coupons }
               isMultiSelect={ isMultiSelect }
               checkedIds={ checkedIds }
               searchValue={ searchValue }
               goToEditPage={ goToEditPage }
               onCheck={ onCheck }
               onDelete={ onDelete }
               isMobile={ isMobile }
            />
         )}
         {data.total > data.per_page && (
            <Pagination
               totalRecords={ data.total }
               pageLimit={ data.per_page }
               pageNeighbours={ 1 }
               onPageChanged={ ({ currentPage }) => handlePaginationChange(currentPage) }
            />
         )}
      </div>
   );
};

CouponsView.propTypes = {
   coupons: PropTypes.array,
   isMultiSelect: PropTypes.bool,
   onMultiSelect: PropTypes.func,
   checkedIds: PropTypes.array,
   searchValue: PropTypes.string,
   onDelete: PropTypes.func,
   onCheck: PropTypes.func,
   handlePaginationChange: PropTypes.func,
   onCheckAll: PropTypes.func,
   data: PropTypes.object,
   filterProgress: PropTypes.bool,
   onSorting: PropTypes.func,
   selectedSortingVariant: PropTypes.string,
   goToEditPage: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default CouponsView;
