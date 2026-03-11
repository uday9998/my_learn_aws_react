import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Pagination from 'components/elements/Pagination';

const PagePagination = ({ changePage, total, pageLimit }) => {
   return (
      <div className='pagePagination'>
         <Pagination
            totalRecords={ total }
            pageLimit={ pageLimit }
            pageNeighbours={ 1 }
            onPageChanged={ (data) => changePage(data) }
         />
      </div>
   );
};

PagePagination.propTypes = {
   changePage: PropTypes.func,
   total: PropTypes.number,
   pageLimit: PropTypes.number,
};

export default PagePagination;
