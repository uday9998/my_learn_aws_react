/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Quizzes from 'views/pages/Quizzes/QuizzesListing/quizTable';
import Switch from 'components/elements/switchNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import SortButton from 'components/elements/buttons/SortButton';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Pagination from 'components/elements/Pagination';
import Input from 'components/elements/inputNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CourseNotFoundImg from 'assets/images/course-not-found.svg';
import DeleteModal from 'components/elements/DeleteModal';
import './index.scss';

const options = {
   recently: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest',
};


const QuizzesListing = ({
   quizzes, isMultiSelect, setIsMutliSelect, sortBy,
   checkedQuizIds, duplicateQuiz,
   setSortBy, onSingleRemove,
   paginationData, handlePaginationChange, loading,
   setSearch, search, onCheck, isSearch, bulkDelete, bulkDuplicate, loadingActions,
   goToEditPage, goToSettingsPage, isMobile,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');

   return (
      <div className='quiz__view'>
         {loading && (
            <LoaderSpinner />
         )}
         <Input
            value={ search }
            // onKeyPress={ searchOnEnter }
            onClearSearchValue={ () => setSearch('') }
            type='search'
            placeholder='Search'
            onChange={ (name, value) => setSearch(value) }
         />
         <div
            className='quiz__view__top__wrapper'
         >
            <div className='quiz__view__top'>
               {quizzes.length > 1 && (
                  <>
                     <div className='quiz__view__top__left'>
                        <div className='quiz__view__top__left__flex'>
                           {isMultiSelect && (
                              <CheckBox
                                 checked={ checkedQuizIds.length === quizzes.length }
                                 onChange={ () => onCheck(null, true) }
                              />
                           )}
                           <Text
                              inner={ isMultiSelect ? `${ checkedQuizIds.length }/${ quizzes.length } Quizzes` : quizzes.length === 1 ? `${ quizzes.length } Quiz` : `${ quizzes.length } Quizzes` }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </div>
                        <div className='quiz__view__top__left__line' />
                        <Switch
                           positionText='right'
                           label='Multiselect'
                           value={ isMultiSelect }
                           size='medium'
                           onChange={ setIsMutliSelect }
                        />
                        { isMultiSelect && !isMobile && (
                           <>
                              <div className='quiz__view__top__left__line' />
                              <div className='quiz__view__top__left__flex'>
                                 <Text
                                    inner='Actions: '
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                                 <div className='quiz__view__top__left__flex__actions'>
                                    <IconButton
                                       name='DuplicateMediaM'
                                       onClick={ checkedQuizIds.length > 0 ? () => bulkDuplicate(checkedQuizIds) : () => {} }
                                       theme={ iconThemes.light }
                                       wBorder={ true }
                                       title='Duplicate'
                                    />
                                    <IconButton
                                       name='CertificatesDeleteS'
                                       wBorder={ true }
                                       onClick={ checkedQuizIds.length > 0 ? () => setIsOpenDeleteModal(true) : () => {} }
                                       theme={ iconThemes.delete }
                                       title='Delete'
                                    />
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                     <SortButton
                        value={ sortBy }
                        onFilter={ (value) => setSortBy(value) }
                        options={ options }
                     />
                  </>
               )}
            </div>
            {
               isMultiSelect && isMobile && (
                  <div
                     className='quiz__view__top__wrapper__bottom'
                  >
                     <Text
                        inner='Actions: '
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <div className='quiz__view__top__left__flex__actions'>
                        <IconButton
                           name='DuplicateMediaM'
                           onClick={ checkedQuizIds.length > 0 ? () => bulkDuplicate(checkedQuizIds) : () => {} }
                           theme={ iconThemes.light }
                           wBorder={ true }
                           title='Duplicate'
                        />
                        <IconButton
                           name='CertificatesDeleteS'
                           wBorder={ true }
                           onClick={ checkedQuizIds.length > 0 ? () => setIsOpenDeleteModal(true) : () => {} }
                           theme={ iconThemes.delete }
                           title='Delete'
                        />
                     </div>
                  </div>
               )
            }
         </div>
         <div>
            {quizzes.length > 0 && (
               <Quizzes
                  quizzes={ quizzes }
                  deleteQuiz={ onSingleRemove }
                  duplicateQuiz={ duplicateQuiz }
                  isMultiSelect={ isMultiSelect }
                  onCheck={ onCheck }
                  checkedIds={ checkedQuizIds }
                  setSortBy={ setSortBy }
                  goToEditPage={ goToEditPage }
                  goToSettingsPage={ goToSettingsPage }
                  isMobile={ isMobile }
               />
            )}
            {quizzes.length === 0 && isSearch
            && (
               <div className='noFound'>
                  <Text
                     inner='No Quiz Found'
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
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to delete selected quizzes'
               deleteText='Delete'
               maxWidth={ 415 }
               onDelete={ () => { bulkDelete(checkedQuizIds); setIsOpenDeleteModal(false); } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
      </div>
   );
};

QuizzesListing.defaultProps = {
   quizzes: [],
   checkedQuizIds: [],
   sortBy: 'recently',
};

QuizzesListing.propTypes = {
   quizzes: PropTypes.array,
   handlePaginationChange: PropTypes.func,
   paginationData: PropTypes.object,
   setIsMutliSelect: PropTypes.func,
   duplicateQuiz: PropTypes.func,
   setSortBy: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   sortBy: PropTypes.string,
   checkedQuizIds: PropTypes.array,
   onSingleRemove: PropTypes.func,
   loading: PropTypes.bool,
   setSearch: PropTypes.func,
   search: PropTypes.string,
   onCheck: PropTypes.func,
   isSearch: PropTypes.bool,
   bulkDelete: PropTypes.func,
   bulkDuplicate: PropTypes.func,
   loadingActions: PropTypes.bool,
   goToEditPage: PropTypes.func,
   goToSettingsPage: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default QuizzesListing;
