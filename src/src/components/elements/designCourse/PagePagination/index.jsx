import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Pagination from 'components/elements/Pagination';

const PagePagination = ({ changePage, total, isVideoMetrics }) => {
   return (
      <div className='pagePagination'>
         <Pagination
            totalRecords={ total }
            pageLimit={ 30 }
            pageNeighbours={ 1 }
            onPageChanged={ (data) => changePage(data) }
            isVideoMetrics={ isVideoMetrics }
         />
      </div>
   );
};

PagePagination.propTypes = {
   changePage: PropTypes.func,
   total: PropTypes.number,
   isVideoMetrics: PropTypes.bool,
};

export default PagePagination;
