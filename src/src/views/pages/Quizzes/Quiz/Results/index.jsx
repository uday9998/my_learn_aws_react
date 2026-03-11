/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from 'views/pages/Quizzes/Quiz/Results/ResultsTable';
import SortButton from 'components/elements/buttons/SortButton';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Pagination from 'components/elements/Pagination';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CourseNotFoundImg from 'assets/images/course-not-found.svg';
// import DeleteModal from 'components/elements/DeleteModal';
import './index.scss';

const options = {
   name: 'Name',
   comleted_date: 'Comleted Date',
   status: 'Status',
   results: 'Results',
};


const Results = ({
   quiz,
   sortBy,
   paginationData,
   handlePaginationChange,
   loading,
   loadingActions,
   resetResult,
   filterResult,
   isMobile,
}) => {
   return (
      <div className='results__view'>
         {loading && (
            <LoaderSpinner />
         )}
         <div className='results__view__top'>
            {quiz.length > 1 && (
               <>
                  <div className='quiz__view__top__left__flex'>
                     <Text
                        inner={ quiz.length === 1 ? `${ quiz.length } Student` : `${ quiz.length } Students` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
                  <SortButton
                     value={ sortBy }
                     onFilter={ (value) => filterResult(value) }
                     options={ options }
                  />
               </>
            )}
         </div>
         <div>
            {quiz.length > 0 && (
               <ResultsTable
                  quiz={ quiz }
                  setSortBy={ filterResult }
                  resetResult={ resetResult }
                  isMobile={ isMobile }
               />
            )}
            {quiz.length === 0
            && (
               <div className='noFound'>
                  <Text
                     inner='No Results Found'
                     type={ types.mediumLarge }
                     size={ sizes.large }
                  />
                  <img src={ CourseNotFoundImg } alt='not found' className='notFoundImg' />
               </div>
            )}
         </div>
         {paginationData.total > paginationData.per_page && !loadingActions && (
            <Pagination
               totalRecords={ paginationData.total }
               pageLimit={ paginationData.per_page }
               pageNeighbours={ 1 }
               onPageChanged={ ({ currentPage }) => handlePaginationChange(currentPage) }
            />
         )}
      </div>
   );
};

Results.defaultProps = {
   quiz: [],
   sortBy: 'recently',
   handlePaginationChange: () => {},
   paginationData: {},
};

Results.propTypes = {
   quiz: PropTypes.array,
   handlePaginationChange: PropTypes.func,
   paginationData: PropTypes.object,
   filterResult: PropTypes.func,
   sortBy: PropTypes.string,
   loading: PropTypes.bool,
   loadingActions: PropTypes.bool,
   resetResult: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default Results;
