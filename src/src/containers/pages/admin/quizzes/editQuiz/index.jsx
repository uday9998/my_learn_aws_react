import React, { useState, useEffect, useRef } from 'react';
// import CreateQuiz from 'views/pages/Quizzes/CreateQuiz';
import {
   getQuiz, saveQuiz, deleteQuiz, deleteSingleQuestion, deleteSingleAnswer,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainerAlt';
import { useHistory } from 'react-router';
import Router from 'routes/router';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import QuizHeader from 'views/layout/DesignCourse/QuizHeader';
import Questions from 'views/pages/Quizzes/Questions';
import { toast } from 'react-toastify';
import { useApiQuery } from 'utils/hooks/useQuery';
import isPrint from 'state/modules/designCourse/edit/Error';
import { cloneDeep } from 'lodash';
import {
   WelcomeScreen, Single, MultipleChoice, Ending, slug, multiAnswers, answers, slugAnswer, slugAnswerMulti,
} from 'utils/questions';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';
import ApproveModal from 'components/elements/ApproveModal';


const ContainerLoading = withLoading(Container);

const EditQuizContainer = ({ match }) => {
   const { data: quiz, loading, setData: setQuiz } = useApiQuery(getQuiz, [{ id: match.params.id }]);
   const [quizSaveFunc] = useSubmitForm(saveQuiz, {
      successMessage: 'Quiz has been saved.',
   });

   const [deleteQuizFunc, { loading: loadingDelete }] = useSubmitForm(deleteQuiz, {
      successMessage: 'Quiz  has been deleted.',
   });

   const [deleteSingleQuestionFunc, { loading: loadingQuestionDelete }] = useSubmitForm(deleteSingleQuestion, {
      successMessage: 'Question  has been deleted.',
   });

   const [deleteSingleAnswerFunc, { loading: loadingAnswerDelete }] = useSubmitForm(deleteSingleAnswer, {
      successMessage: 'Answer  has been deleted.',
   });


   const [hasEnding, setHasEnding] = useState(false);
   const [hasStart, setHasStart] = useState(false);
   const [questionContent, setQuestionContent] = useState({ question: {}, index: -1 });
   const history = useHistory();
   const screenWidth = useSelector(screenWidthSelector);
   const initialQuiz = useRef('');
   const [showDiscardModal, setShowDiscardModal] = useState(false);
   const [nextRoute, setNextRoute] = useState('');


   const handleDeleteQuiz = () => {
      history.block(() => {
         return true;
      });
      if (nextRoute) {
         history.push(nextRoute);
      }
      deleteQuizFunc({ id: match.params.id }, () => {
         history.push(Router.route('ADMIN_QUIZZES').getCompiledPath());
      });
   };

   const goToSettings = () => {
      history.push(`${ Router.route('ADMIN_QUIZ').getCompiledPath({ id: match.params.id }) }#settings`);
   };
   
   const chooseQuestionType = (questionType) => {
      let question = {};
      const questions = [...quiz.questions];
      let newMultiAnswers = [];
      let newAnswers = [];
      switch (questionType) {
         case 'welcome_screen': question = WelcomeScreen;
            break;
         case 'multiple_choice':
            question = { ...MultipleChoice };
            newMultiAnswers = cloneDeep(multiAnswers);
            newMultiAnswers[0].slug = slugAnswerMulti(new Date().getTime() + 7);
            newMultiAnswers[1].slug = slugAnswerMulti(new Date().getTime() + 8);
            newMultiAnswers[2].slug = slugAnswerMulti(new Date().getTime() + 9);
            question.answers = [...newMultiAnswers];
            break;
         case 'yes_no':
            question = { ...Single };
            newAnswers = cloneDeep(answers);
            newAnswers[0].slug = slugAnswer(new Date().getTime() + 10);
            newAnswers[1].slug = slugAnswer(new Date().getTime() + 11);
            question.answers = [...newAnswers];
            break;
         case 'ending': question = { ...Ending };
            break;
         default:
      }
      question.slug = slug(new Date().getTime());
      if (question.type === 'welcome_screen' && !hasStart) {
         questions.splice(0, 0, question);
         setHasStart(true);
      } else if (question.type === 'ending' && !hasEnding) {
         questions.splice(questions.length + 1, 0, question);
         setHasEnding(true);
      } else if (hasEnding) {
         questions.splice(questions.length - 1, 0, question);
      } else {
         questions.splice(questions.length + 1, 0, question);
      }

      questions.forEach((questionn, i) => {
         const orderedQuestion = questionn;
         orderedQuestion.order = i;
      });
      setQuiz({
         ...quiz,
         questions,
      });
      if (question.type === 'welcome_screen' || questions.length === 1) {
         setQuestionContent({ question: questions[0], index: 0 });
      } else if (question.type === 'ending') {
         setQuestionContent({ question: questions[questions.length - 1], index: questions.length - 1 });
      } else if (hasEnding) {
         setQuestionContent({ question: questions[questions.length - 2], index: questions.length - 2 });
      } else {
         setQuestionContent({ question: questions[questions.length - 1], index: questions.length - 1 });
      }
   };

   const handleChangeQuiz = (name, value, originalName, file, index, isQuiz) => {
      if (isQuiz) {
         quiz[name] = value;
      } else {
         const questions = quiz.questions;
         questions[index][name] = value;
         if (originalName) {
            questions[index].original_name = originalName;
         }
      }
      setQuiz({
         ...quiz,
      });
   };

   const handleQuizSave = (callback) => {
      if (quiz.user_quizzes) {
         delete quiz.user_quizzes;
      }
      let isError = '';
      quiz.questions.forEach(question => {
         const newQuestion = question;
         delete newQuestion.file;
         if (question.type === 'multiple_choice') {
            if (question.multiple_status) {
               const checkedAnswerslength = question.answers.filter(
                  answer => (answer.is_true === 1 || answer.is_true === true)).length;
               if (parseInt(question.multiple_value, 10) !== checkedAnswerslength) {
                  isError = 'There is a multiple question with the correct number of answers indicated incorrectly';
               }
            }
         }
      });
      if (isError) {
         if (isPrint(isError)) {
            toast.error(isError);
         }
      } else {
         quizSaveFunc({ id: match.params.id, quiz }, (data) => {
            setQuiz(data);
            initialQuiz.current = JSON.stringify(data);
            if (callback) {
               callback();
            }
         });
      }
   };


   const handleElementOnDragEnd = (result) => {
      const {
         source, destination, draggableId, type,
      } = result;
      if (!destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      if (destination && destination.droppableId !== source.droppableId) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      if (type === 'questions') {
         const newQuiz = { ...quiz };
         const questions = [...newQuiz.questions];
         const draggableQuestion = questions.filter((question) => question.slug === draggableId)[0];
         questions.splice(source.index, 1);
         questions.splice(destination.index, 0, draggableQuestion);
         questions.forEach((question, i) => {
            const orderedQuestion = question;
            orderedQuestion.order = i;
         });
         setQuiz(newQuiz);
      } else if (type === 'answers') {
         const newQuiz = { ...quiz };
         const questions = [...newQuiz.questions];
         const dropableQuestion = questions[questionContent.index];
         const newAnswers = dropableQuestion.answers;
         const draggableAnswer = newAnswers.filter((answer) => answer.slug === draggableId)[0];
         newAnswers.splice(source.index, 1);
         newAnswers.splice(destination.index, 0, draggableAnswer);
         newAnswers.forEach((answer, i) => {
            const orderedAnswer = answer;
            orderedAnswer.order = i;
         });
         setQuiz(newQuiz);
      }
   };

   const changeQuestionAnswer = (newQuestion, newAnswer, isAddChoice) => {
      const newQuiz = { ...quiz };
      const questions = [...newQuiz.questions];
      if (isAddChoice) {
         questions[questionContent.index].answers.push(newAnswer);
      } else {
         questions[questionContent.index] = newQuestion;
      }
      setQuiz({
         ...quiz,
         questions,
      });
   };

   const handleDeleteQuestion = (id, i, questionSlug, type) => {
      if (id !== undefined) {
         deleteSingleQuestionFunc({ quizId: match.params.id, questionId: id }, () => {
            const newQuiz = { ...quiz };
            let questions = [...newQuiz.questions];
            questions = questions.filter((question) => question.id !== id);
            if (i === 0 && questions.length !== 0) {
               setQuestionContent({ question: questions[questions.length - 1], index: questions.length - 1 });
            } else if (i === questionContent.index && questions[i - 1] && questions[i - 1].slug) {
               setQuestionContent({ question: questions[i - 1], index: i - 1 });
            } else if (questions.length < 1) {
               setQuestionContent({ question: {}, index: -1 });
            }
            if (type === 'welcome_screen') {
               setHasStart(false);
            } else if (type === 'ending') {
               setHasEnding(false);
            }
            setQuiz({
               ...newQuiz,
               questions,
            });
         });
      } else {
         const newQuiz = { ...quiz };
         let questions = [...newQuiz.questions];
         questions = questions.filter((question) => question.slug !== questionSlug);
         if (i === 0 && questions.length !== 0) {
            setQuestionContent({ question: questions[questions.length - 1], index: questions.length - 1 });
         } else if (i === questionContent.index && questions[i - 1] && questions[i - 1].slug) {
            setQuestionContent({ question: questions[i - 1], index: i - 1 });
         } else if (questions.length < 1) {
            setQuestionContent({ question: {}, index: -1 });
         }
         if (type === 'welcome_screen') {
            setHasStart(false);
         } else if (type === 'ending') {
            setHasEnding(false);
         }
         setQuiz({
            ...newQuiz,
            questions,
         });
      }
   };

   const handleDuplicateQuestion = (newQuestion, index) => {
      let question = {};
      const questions = [...quiz.questions];
      let newMultiAnswers = [];
      let newAnswers = [];
      switch (newQuestion.type) {
         case 'multiple_choice':
            question = { ...newQuestion };
            newMultiAnswers = cloneDeep(question.answers);
            newMultiAnswers = newMultiAnswers.map((newMultiAnswer, i) => {
               newMultiAnswers[i].slug = slugAnswerMulti(new Date().getTime() + i);
               if (newMultiAnswers[i].id) {
                  delete newMultiAnswers[i].id;
               }
               return newMultiAnswer;
            });
            question.answers = [...newMultiAnswers];
            break;
         case 'yes_no':
            question = { ...newQuestion };
            newAnswers = cloneDeep(question.answers);
            newAnswers = newAnswers.map((newAnswer, i) => {
               newAnswers[i].slug = slugAnswerMulti(new Date().getTime() + i);
               if (newAnswers[i].id) {
                  delete newAnswers[i].id;
               }
               return newAnswer;
            });
            question.answers = [...newAnswers];
            break;
         default:
      }
      question.slug = slug(new Date().getTime());
      if (question.id) {
         delete question.id;
      }
      questions.splice(index + 1, 0, question);


      questions.forEach((questionn, i) => {
         const orderedQuestion = questionn;
         orderedQuestion.order = i;
      });
      setQuiz({
         ...quiz,
         questions,
      });
   };

   const handleDeleteAnswer = (id, answerSlug) => {
      if (id !== undefined) {
         deleteSingleAnswerFunc({ quizId: match.params.id, answerId: id }, () => {
            const newQuiz = { ...quiz };
            const questions = [...newQuiz.questions];
            const currentQuestion = questions[questionContent.index];
            currentQuestion.answers = currentQuestion.answers.filter((answer) => answer.slug !== answerSlug);
            setQuiz({
               ...newQuiz,
               questions,
            });
         });
      } else {
         const newQuiz = { ...quiz };
         const questions = [...newQuiz.questions];
         const currentQuestion = questions[questionContent.index];
         currentQuestion.answers = currentQuestion.answers.filter((answer) => answer.slug !== answerSlug);
         setQuiz({
            ...newQuiz,
            questions,
         });
      }
   };

   const handleDuplicateAnswer = (answer, index) => {
      const questions = [...quiz.questions];
      const newMultiAnswers = questions[questionContent.index].answers;
      const newAnswer = { ...answer };
      if (newAnswer.id) {
         delete newAnswer.id;
      }
      newAnswer.slug = slugAnswerMulti(new Date().getTime() + index);
      newMultiAnswers.splice(index + 1, 0, newAnswer);
      newMultiAnswers.forEach((newMultiAnswer, i) => {
         const orderedNewMultiAnswer = newMultiAnswer;
         orderedNewMultiAnswer.order = i;
      });
      setQuiz({
         ...quiz,
         questions,
      });
   };


   useEffect(() => {
      if (quiz && !initialQuiz.current) {
         initialQuiz.current = JSON.stringify(quiz);
      }
   }, [quiz]);

   let unblock = () => {};

   useEffect(() => {
      unblock = history.block(({ pathname }) => {
         if (initialQuiz.current !== JSON.stringify(quiz)) {
            setShowDiscardModal(true);
            setNextRoute(pathname);
         } else {
            unblock();
            history.push(pathname);
         }
         return false;
      });

      return () => {
         unblock();
      };
   }, [quiz]);

   return (
      <ContainerLoading isLoading={ loading }>
         <QuizHeader
            title={ (quiz && quiz.name) || 'Quiz title' }
            saveQuiz={ handleQuizSave }
            handleDeleteQuiz={ handleDeleteQuiz }
            goToSettings={ goToSettings }
            goTo={ () => history.push(Router.route('ADMIN_QUIZZES').getCompiledPath()) }
            isMobile={ screenWidth < 1025 }
            handleChangeQuiz={ handleChangeQuiz }
         />
         <Questions
            isLoading={ loading || loadingDelete || loadingQuestionDelete || loadingAnswerDelete }
            quiz={ quiz }
            chooseQuestionType={ chooseQuestionType }
            hasEnding={ hasEnding }
            hasStart={ hasStart }
            questionContent={ questionContent }
            setQuestionContent={ setQuestionContent }
            handleElementOnDragEnd={ handleElementOnDragEnd }
            handleChangeQuiz={ handleChangeQuiz }
            setHasEnding={ setHasEnding }
            setHasStart={ setHasStart }
            changeQuestionAnswer={ changeQuestionAnswer }
            handleDeleteQuestion={ handleDeleteQuestion }
            handleDuplicateQuestion={ handleDuplicateQuestion }
            handleDeleteAnswer={ handleDeleteAnswer }
            handleDuplicateAnswer={ handleDuplicateAnswer }
            goToSettings={ goToSettings }
         />
         {
            showDiscardModal && (
               <ApproveModal
                  title='Are you sure you want to exit? Your progress will be lost.'
                  btnText='Save & Exit'
                  cancelText='Exit Without Saving'
                  onApprove={ () => {
                     handleQuizSave(() => {
                        history.block(() => {
                           return true;
                        });
                        if (nextRoute) {
                           history.push(nextRoute);
                        }
                     });
                  } }
                  onCancel={ () => {
                     history.block(() => {
                        return true;
                     });
                     if (nextRoute) {
                        history.push(nextRoute);
                     }
                  } }
                  dontCancelOnClickOutside
                  onClickOutside={ () => setShowDiscardModal(false) }

               />
            )
         }
      </ContainerLoading>
   );
};

EditQuizContainer.propTypes = {
   match: PropTypes.object,
};

export default EditQuizContainer;
