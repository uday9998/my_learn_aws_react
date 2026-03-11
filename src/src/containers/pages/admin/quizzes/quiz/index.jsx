import React, { useState, useEffect } from 'react';
import Quiz from 'views/pages/Quizzes/Quiz';
import {
   getResults, getQuiz, saveQuizSettings, resetUserResult,
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
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';


const QuizLoading = withLoading(Quiz);

const QuizContainer = ({ match }) => {
   const history = useHistory();
   const screenWidth = useSelector(screenWidthSelector);

   const { data: quiz, loading, setData: setQuiz } = useApiQuery(getResults, [{ id: match.params.id }]);
   const {
      data: quizSettings,
      loading: loadingSettings,
      setData: setQuizSettings,
   } = useApiQuery(getQuiz, [{ id: match.params.id }]);

   const [saveQuizSettingsFunc, { loading: loadingSave }] = useSubmitForm(saveQuizSettings, {
      successMessage: 'Quiz  has been updated.',
   });
   const [resetResultFunc, { loading: loadingResult }] = useSubmitForm(resetUserResult, {
      successMessage: 'Results  has been reset.',
   });
   const [filterResultFunc, { loading: loadingFilterResult }] = useSubmitForm(getResults);

   const [sortBy, setSortBy] = useState('name');
   const [selectedPage, setSelectedPage] = useState('results');
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

   const handleSelectTab = (tab) => {
      setSelectedPage(tab);
      QueryParams.setHash(tab);
   };


   useEffect(() => {
      if (!QueryParams.getHash()) {
         setSelectedPage('settings');
      } else {
         setSelectedPage(QueryParams.getHash());
      }
   }, []);

   const onQuizSettingsChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setQuizSettings({
         ...quizSettings,
         [name]: value,
      });
   };

   const handleSaveQuiz = () => {
      if (quizSettings.description === null) {
         delete quizSettings.description;
      }
      delete quizSettings.questions;

      saveQuizSettingsFunc(
         { id: match.params.id, quiz: quizSettings },
         () => {},
         addErrorsFromQuery
      );
   };

   const goBack = () => {
      history.push(`${ Router.route('ADMIN_QUIZZES').getCompiledPath() }`);
   };

   const resetResult = (id) => {
      resetResultFunc({ user_id: id, quiz_id: id }, () => {
         const data = quiz.data.filter(result => result.id !== id);
         setQuiz({ ...quiz, data });
      });
   };

   const filterResult = (value) => {
      setSortBy(value);
      filterResultFunc({ id: match.params.id, param: value }, (res) => {
         setQuiz(res);
      });
   };

   const exportQuizCsv = () => {
      const url = `${ apiUrl }/api/v1/quiz/${ match.params.id }/export-csv`;
      window.open(url, '_blank');
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
               {loadingSave && loadingResult && loadingFilterResult && (
                  <LoaderSpinner />
               )}
               <QuizLoading
                  isLoading={ loadingSettings || loading }
                  quiz={ quiz }
                  handleSelectTab={ handleSelectTab }
                  selectedPage={ selectedPage }
                  quizSettings={ quizSettings }
                  onQuizSettingsChange={ onQuizSettingsChange }
                  handleSaveQuiz={ handleSaveQuiz }
                  goBack={ goBack }
                  resetResult={ resetResult }
                  filterResult={ filterResult }
                  sortBy={ sortBy }
                  exportQuizCsv={ exportQuizCsv }
                  isMobile={ screenWidth < 1025 }
                  errorMessages={ errorMessages }
               />
            </Container.Content>
         </Container>
      </>
   );
};


QuizContainer.propTypes = {
   match: PropTypes.object,
};


export default QuizContainer;
