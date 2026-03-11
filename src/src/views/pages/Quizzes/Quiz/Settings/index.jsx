
import React from 'react';
import PropTypes from 'prop-types';
// import EmptyQuizzes from 'views/pages/Quizzes/EmptyQuizzes';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/form/SwitchNew';
import Select from 'components/elements/SelectNew';
import './index.scss';


const QuizSettings = ({
   quizSettings, onQuizSettingsChange, errorMessages,
}) => {
   return (
      <div className='quiz_settings'>
         <div className='quiz_settings_general'>
            <div>
               <div>
                  <Text
                     inner='General Settings'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
               </div>
               <div>
                  <Text
                     inner='Manage your basic quiz options and select your grade poin'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            </div>
            <div>
               <div>
                  <div>
                     <Switch
                        label='Enable Passing Grade'
                        checked={ !!quizSettings.passing_grade_status }
                        name='passing_grade_status'
                        space='boldText'
                        onChange={ (name, val) => onQuizSettingsChange('passing_grade_status', val ? 1 : 0) }
                     />
                  </div>
                  <div className='passing_grade_desc'>
                     <Text
                        inner='Only users with enough percentage will pass the quiz.'
                        type={ types.regularDefaultGrey }
                        size={ sizes.small }
                     />
                  </div>
               </div>
               {!!quizSettings.passing_grade_status && (
                  <Input
                     errorMessages={ errorMessages.passing_grade }
                     helpText=''
                     value={ quizSettings.passing_grade }
                     max={ 100 }
                     min={ 0 }
                     onChange={ (name, value) => {
                        const re = /^[0-9\b]+$/;
                        if ((value === '' || re.test(value)) && value < 101) {
                           onQuizSettingsChange(name, value);
                        }
                     } }
                     name='passing_grade'
                     label='Passing Grade'
                     withIcon={ true }
                     iconName='ProcentM'
                  />
               )}
               <div className='grey__line' />
               <Select
                  iconName='ArrowSelectM'
                  label='Results Breakdown Preference'
                  options={ [
                     { label: 'Show assessment results breakdown', value: 1 },
                     { label: 'Hide assessment results', value: 0 }] }
                  placeholder=''
                  type='select-medium'
                  value={ quizSettings.resault_breakdown }
                  name='resault_breakdown'
                  onChange={ (name, value) => onQuizSettingsChange(name, value) }
               />
            </div>

         </div>
         {/* <div className='quiz_settings_after'>
            <div>
               <div>
                  <Text
                     inner='After Submission'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
               </div>
               <div>
                  <Text
                     inner='What happens after passing the quiz'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            </div>
            <div>
               <div className='send_email_checkbox'>
                  <CheckBox
                     checked={ quizSettings.send_email === 1 }
                     onChange={ (name, val) => onQuizSettingsChange('send_email', val ? 1 : 0) }
                     label='Send a completion email with a link to results'
                  />
               </div>
            </div>
         </div> */}
      </div>
   );
};

QuizSettings.defaultProps = {
   onQuizSettingsChange: () => {},
   quizSettings: {},
};

QuizSettings.propTypes = {
   onQuizSettingsChange: PropTypes.func,
   quizSettings: PropTypes.object,
   errorMessages: PropTypes.object,
};

export default QuizSettings;
