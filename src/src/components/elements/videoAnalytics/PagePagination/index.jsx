import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Pagination from 'components/elements/Pagination';

const PagePagination = ({ changeVideosPage, videoAnalytics }) => {
   return (
      <div className='pagePagination'>
         <Pagination
            totalRecords={ videoAnalytics.total }
            pageLimit={ 10 }
            pageNeighbours={ 1 }
            onPageChanged={ (data) => changeVideosPage(data) }
         />
      </div>
   );
};

PagePagination.propTypes = {
   changeVideosPage: PropTypes.func,
   videoAnalytics: PropTypes.object,
};

export default PagePagination;
