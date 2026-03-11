import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Pagination from 'components/elements/Pagination';

const PagePagination = ({ changePage, total }) => {
   return (
      <div className='pagePagination'>

         <Pagination
            totalRecords={ total }
            pageLimit={ 2 }
            pageNeighbours={ 1 }
            onPageChanged={ (data) => changePage(data) }
         />
      </div>
   );
};

PagePagination.propTypes = {
   changePage: PropTypes.func,
   total: PropTypes.number,
};

export default PagePagination;
