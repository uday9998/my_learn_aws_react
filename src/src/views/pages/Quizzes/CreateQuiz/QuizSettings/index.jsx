import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Select from 'components/elements/SelectNew';
import './index.scss';
// import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';

// const QuizzesLoading = withLoading(Quizzes);

const QuizSettings = ({ quiz = {}, setQuiz, localErrorMessages }) => {
   return (
      <div className='quizSettings'>
         <div>
            <div>
               <Switch
                  label='Enable Passing Grade'
                  checked={ !!quiz.passing_grade_status }
                  name='passing_grade_status'
                  space='boldText'
                  onChange={ (name, value) => setQuiz(name, value) }
               />
            </div>
            <div className='passing_grade_desc'>
               <Text
                  inner='Only users with enough percentage will pass the quiz.'
                  type={ txtTypes.regularDefaultGrey }
                  size={ txtSizes.small }
               />
            </div>
         </div>
         {!!quiz.passing_grade_status && (
            <div>
               <Input
                  errorMessages={ localErrorMessages }
                  helpText=''
                  value={ quiz.passing_grade }
                  max={ 100 }
                  min={ 0 }
                  onChange={ (name, value) => {
                     const re = /^[0-9\b]+$/;
                     if ((value === '' || re.test(value)) && value < 101) {
                        setQuiz(name, value);
                     }
                  } }
                  name='passing_grade'
                  label='Passing Grade'
                  withIcon={ true }
                  iconName='ProcentM'
               />
            </div>
         )}
         <div className='grey__line' />
         <div>
            <Select
               iconName='ArrowSelectM'
               options={ [
                  { label: 'Always show assessment results breakdown', value: 1 },
                  { label: 'Hide assessment results', value: 0 }] }
               placeholder='Results Breakdown Preference'
               type='select-medium'
               value={ quiz.resault_breakdown }
               name='resault_breakdown'
               label='Results Breakdown Preference'
               onChange={ (name, value) => setQuiz(name, value) }
            />
         </div>
         {/* <div className='grey__line' /> */}
         <div className='after_submission'>
            {/* <div>
               <Text
                  inner='After Submission'
                  type={ txtTypes.medium150 }
                  size={ txtSizes.medium }
               />
            </div> */}
            {/* <div>
               <CheckBox
                  checked={ quiz.send_email === 1 }
                  onChange={ (name, val) => setQuiz('send_email', val ? 1 : 0) }
                  label='Send a completion email with a link to results'
               />
            </div> */}
         </div>

      </div>
   );
};

QuizSettings.propTypes = {
   quiz: PropTypes.object,
   setQuiz: PropTypes.func,
   localErrorMessages: PropTypes.array,
};

export default QuizSettings;
