
import React from 'react';
import PropTypes from 'prop-types';
import EmptyQuizzes from 'views/pages/Quizzes/EmptyQuizzes';
import QuizzesListing from 'views/pages/Quizzes/QuizzesListing';
import './index.scss';

const Quizzes = ({
   quizzes, createQuiz, onSingleRemove, handlePaginationChange, loading, isSearch, isMobile, ...res
}) => {
   if (quizzes.data && !quizzes.data.length && !isSearch) {
      return (<EmptyQuizzes createQuiz={ createQuiz } />);
   }

   return (
      <QuizzesListing
         quizzes={ quizzes.data }
         paginationData={ quizzes }
         onSingleRemove={ onSingleRemove }
         handlePaginationChange={ handlePaginationChange }
         loading={ loading }
         isSearch={ isSearch }
         isMobile={ isMobile }
         { ...res }
      />
   );
};

Quizzes.defaultProps = {
   createQuiz: () => {},
   quizzes: {},
};

Quizzes.propTypes = {
   quizzes: PropTypes.object,
   createQuiz: PropTypes.func,
   onSingleRemove: PropTypes.func,
   handlePaginationChange: PropTypes.func,
   loading: PropTypes.bool,
   isSearch: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default Quizzes;
