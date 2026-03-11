import React, { useState } from 'react';
import Proptypes from 'prop-types';
import CourseCreateHeader from 'views/pages/DesignCourse/CourseCreate/CourseCreateHeader';
import QuizCreation from 'views/pages/Quizzes/CreateQuiz/QuizCreation';
import quizImg from 'assets/images/Program/quiz.png';
import { useHistory } from 'react-router';
import './index.scss';
// import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';

// const QuizzesLoading = withLoading(Quizzes);

const CreateQuiz = ({ onCreate }) => {
   const [step, setStep] = useState(1);
   const history = useHistory();
   return (
      <div className='createQuiz'>
         <CourseCreateHeader title='New Quiz' isDesingedStep={ step === 2 } goBack={ () => history.push('/admin/quizzes') } />
         <QuizCreation
            step={ step }
            setStep={ setStep }
            title='Quiz Information'
            title2='Quiz Settings'
            inputName='Quiz Name'
            inputdescription='Quiz Description'
            descriptionPlaceholder='Type your unique description...'
            img={ quizImg }
            onCreate={ onCreate }
            saveButtonTxt='Create Quiz'
         />
      </div>
   );
};

CreateQuiz.propTypes = {
   onCreate: Proptypes.func,
};

export default CreateQuiz;
