import React from 'react';
import CreateQuiz from 'views/pages/Quizzes/CreateQuiz';
import { quizCreate } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import { useHistory } from 'react-router';
import withLoading from 'utils/withLoading';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import MobileHeader from 'views/layout/MobileHeader';

const CreateQuizLoading = withLoading(CreateQuiz);

const CreateQuizContainer = () => {
   const [quizCreateFunc] = useSubmitForm(quizCreate, {
      successMessage: 'Quiz has been created.',
   });

   const history = useHistory();

   const onCreate = async (quiz) => {
      const newQuiz = quiz;
      if (!quiz.description) {
         delete newQuiz.description;
      }
      newQuiz.questions = [];

      const { data: { errors = {} } = {} } = await quizCreateFunc(
         newQuiz,
         (data) => {
            history.push(`${ Router.route('ADMIN_EDIT_QUIZ').getCompiledPath({ id: data.id }) }`);
         },
         () => true
      ) || {};

      return errors;
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
            <CreateQuizLoading isLoading={ false } onCreate={ onCreate } />
         </Container>
      </>
   );
};


export default CreateQuizContainer;
