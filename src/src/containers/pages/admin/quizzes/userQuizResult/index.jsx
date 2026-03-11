import React, { useState, useEffect } from 'react';
import QuizResults from 'views/pages/Quizzes/QuizResults';
import {
   resetUserResult, usersAnswersResults,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainer';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
// import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
// import SiteHeader from 'views/layout/SiteHeader';
// import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Router from 'routes/router';
import QueryParams from 'utils/QueryParams';
import { useHistory } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { isLocalhost } from 'utils/Helpers';
import QuizHeader from 'views/layout/DesignCourse/QuizHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import MobileHeader from 'views/layout/MobileHeader';


const QuizLoading = withLoading(QuizResults);

const UserQuizResultContainer = ({ match }) => {
   const [sortBy, setSortBy] = useState('name');
   const { data: quiz, loading, setData: setQuiz } = useApiQuery(usersAnswersResults, [{ id: match.params.resultId }]);

   const [resetResultFunc, { loading: loadingResult }] = useSubmitForm(resetUserResult, {
      successMessage: 'Results  has been reset.',
   });

   const history = useHistory();


   const [selectedPage, setSelectedPage] = useState('results');

   const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

   const handleSelectTab = (tab) => {
      setSelectedPage(tab);
      QueryParams.setHash(tab);
   };


   useEffect(() => {
      setSelectedPage(QueryParams.getHash());
   }, []);


   const goBack = () => {
      history.push(`${ Router.route('ADMIN_QUIZZES').getCompiledPath() }`);
   };

   const resetResult = () => {
      const id = quiz && quiz.data && quiz.data[0] && quiz.data[0].quiz && quiz.data[0].quiz.id;
      resetResultFunc({ user_id: id, quiz_id: id }, () => {
         const data = quiz.data.filter(result => result.id !== id);
         setQuiz({ ...quiz, data });
         history.goBack();
      });
   };

   const filterResult = (value) => {
      setSortBy(value);
      // filterResultFunc({ id: match.params.id, param: value }, (res) => {
      //    setQuiz(res);
      // });
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
            {!loading && (
               <QuizHeader
                  title={ (quiz && quiz.data && quiz.data[0] && quiz.data[0].quiz && quiz.data[0].quiz.quiz && quiz.data[0].quiz.quiz.name) || 'Quiz title' }
                  //  saveQuiz={ handleQuizSave }
                  //  handleDeleteQuiz={ handleDeleteQuiz }
                  //  goToSettings={ goToSettings }
                  isResultPage={ true }
                  resetResult={ resetResult }
                  goTo={ () => history.push(Router.route('ADMIN_QUIZZES').getCompiledPath()) }
               />
            )}
            {/* {loadingSave && loadingResult && loadingFilterResult && (
            <LoaderSpinner />
         )} */}
            <QuizLoading
               isLoading={ loading }
               quizResult={ quiz }

            />
         </Container>
      </>
   );
};


UserQuizResultContainer.propTypes = {
   match: PropTypes.object,
};


export default UserQuizResultContainer;
