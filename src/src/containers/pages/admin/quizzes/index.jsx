import React, { useState } from 'react';
import Quizzes from 'views/pages/Quizzes';
import {
   getQuizzes, deleteQuiz, duplicateQuiz, duplicateQuizzes, deleteQuizzes,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainer';
import { useHistory } from 'react-router';
import withLoading from 'utils/withLoading';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Router from 'routes/router';
import MobileHeader from 'views/layout/MobileHeader';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';

import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';


const QuizzesLoading = withLoading(Quizzes);

const QuizzesContainer = () => {
   const { data: quizzes, loading, setData: setQuizzes } = useApiQuery(getQuizzes);
   const [deleteQuizFunc, { loading: loadingDelete }] = useSubmitForm(deleteQuiz, {
      successMessage: 'Quiz  has been deleted.',
   });
   const [duplicateQuizFunc, { loading: loadingDuplicated }] = useSubmitForm(duplicateQuiz, {
      successMessage: 'Quiz  has been duplicated.',
   });
   const [duplicateQuizzesFunc, { loading: loadingDuplicatedPlural }] = useSubmitForm(duplicateQuizzes, {
      successMessage: 'Quizzes  have been duplicated.',
   });
   const [deleteQuizzesFunc, { loading: loadingDeletePlural }] = useSubmitForm(deleteQuizzes, {
      successMessage: 'Quizzes  have been deleted.',
   });
   const [getQuizzesFunc, { loading: loadingQuizzes }] = useSubmitForm(getQuizzes);
   const history = useHistory();

   const goToCreatePage = () => {
      history.push(`${ Router.route('ADMIN_CREATE_QUIZ').getCompiledPath() }`);
   };

   const goToEditPage = (id) => {
      history.push(`${ Router.route('ADMIN_EDIT_QUIZ').getCompiledPath({ id }) }`);
   };

   const goToSettingsPage = (id, isResult) => {
      if (isResult) {
         history.push(`${ Router.route('ADMIN_QUIZ').getCompiledPath({ id }) }#results`);
      } else {
         history.push(`${ Router.route('ADMIN_QUIZ').getCompiledPath({ id }) }#settings`);
      }
   };

   const [search, setSearch] = useState('');
   const [isSearch, setIsSearch] = useState(false);
   const [isMultiSelect, setIsMutliSelect] = useState(false);
   const [checkedQuizIds, setCheckedQuizIds] = useState([]);
   const [sortBy, setSortBy] = useState('recently');

   const screenWidth = useSelector(screenWidthSelector);

   const onSingleRemove = (id) => {
      deleteQuizFunc({ id }, () => {
         getQuizzesFunc({
            search,
            order_by: sortBy,
         }, (data) => {
            setCheckedQuizIds([]);
            setQuizzes(
               data
            );
         });
      });
   };

   const handleDuplicateQuiz = (id) => {
      duplicateQuizFunc({ id }, () => {
         getQuizzesFunc({
            search,
            order_by: sortBy,
         }, (data) => {
            setCheckedQuizIds([]);
            setQuizzes(
               data
            );
         });
      });
   };

   const bulkDelete = (ids) => {
      deleteQuizzesFunc({ ids }, () => {
         getQuizzesFunc({
            search,
            order_by: sortBy,
         }, (data) => {
            setCheckedQuizIds([]);
            setIsMutliSelect(false);
            setQuizzes(
               data
            );
         });
      });
   };

   const bulkDuplicate = (ids) => {
      duplicateQuizzesFunc({ ids }, () => {
         getQuizzesFunc({
            search,
            order_by: sortBy,
         }, (data) => {
            setCheckedQuizIds([]);
            setIsMutliSelect(false);
            setQuizzes(
               data
            );
         });
      });
   };

   const handlePaginationChange = (page) => {
      getQuizzesFunc({ page, search, order_by: sortBy }, (data) => {
         setCheckedQuizIds([]);
         setQuizzes(
            data
         );
      });
   };

   const handleSearch = (value) => {
      setSearch(value);
      setIsSearch(true);
      getQuizzesFunc({ page: quizzes.data.current_page, search: value, order_by: sortBy }, (data) => {
         setQuizzes(
            data
         );
      });
   };

   const handleSort = (value) => {
      setSortBy(value);
      getQuizzesFunc({ page: quizzes.data.current_page, search, order_by: value }, (data) => {
         setQuizzes(
            data
         );
      });
   };

   const handleCheckQuiz = (id, general) => {
      if (general) {
         if (checkedQuizIds.length !== quizzes.data.data.length) {
            const ids = quizzes.data.data.map((e) => e.id);
            setCheckedQuizIds(ids);
         } else {
            setCheckedQuizIds([]);
         }
         return;
      }
      const isChecked = checkedQuizIds.includes(id);
      if (isChecked) {
         setCheckedQuizIds(checkedQuizIds.filter((e) => e !== id));
         return;
      }
      setCheckedQuizIds([...checkedQuizIds, id]);
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <Container>
            <Container.Content>
               <HeaderTypeSecond
                  title='Quizzes'
                  tooltip='text'
                  isHaveBaseButton={ Boolean(quizzes) }
                  buttonProps={ {
                     text: 'New Quiz',
                     iconName: 'PlusSupportM',
                     isIconRight: true,
                     onClick: () => goToCreatePage(),
                  } }
                  isHidenSearch={ true }
               />
               <QuizzesLoading
                  isLoading={ loading }
                  loading={ loadingQuizzes || loadingDuplicatedPlural
                  || loadingDeletePlural || loadingDuplicated || loadingDelete }
                  quizzes={ quizzes && quizzes.data }
                  onSingleRemove={ onSingleRemove }
                  loadingActions={ loadingDuplicated || loadingDelete || loadingDuplicatedPlural
                  || loadingDeletePlural }
                  handlePaginationChange={ handlePaginationChange }
                  isMultiSelect={ isMultiSelect }
                  setIsMutliSelect={ setIsMutliSelect }
                  search={ search }
                  setSearch={ handleSearch }
                  checkedQuizIds={ checkedQuizIds }
                  onCheck={ handleCheckQuiz }
                  sortBy={ sortBy }
                  setSortBy={ handleSort }
                  isSearch={ isSearch }
                  duplicateQuiz={ handleDuplicateQuiz }
                  bulkDelete={ bulkDelete }
                  bulkDuplicate={ bulkDuplicate }
                  goToEditPage={ goToEditPage }
                  goToSettingsPage={ goToSettingsPage }
                  isMobile={ screenWidth < 1025 }
               />
            </Container.Content>
         </Container>
      </>
   );
};


export default QuizzesContainer;
