import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.scss';
import Pagination from 'components/elements/Pagination';

const MediaLibraryFooter = ({
   onPageChange, perPage, total, show, changePageInProgress,
}) => {
   return (
      <div className={ cx('mediaLibrary__footer', { hidden: !show }) }>
         {!changePageInProgress && (
            <Pagination
               totalRecords={ total }
               pageLimit={ perPage }
               pageNeighbours={ 1 }
               onPageChanged={ (data) => onPageChange(data) }
            />
         )}
      </div>
   );
};

MediaLibraryFooter.propTypes = {
   onPageChange: PropTypes.func,
   perPage: PropTypes.number,
   total: PropTypes.number,
   show: PropTypes.bool,
   changePageInProgress: PropTypes.bool,
};

export default MediaLibraryFooter;
