import React, { useState } from 'react';
import Text, { TYPES as type, SIZES as size } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';


const Welcome = ({
   question, quiz, changeQuestion, changeSettingsQuestion, isRight,
}) => {
   const onChangeQuestion = (name, value, originalName, file) => {
      changeQuestion(name, value, originalName, file);
   };

   const onChangeQuiz = (name, value) => {
      changeSettingsQuestion(name, value);
   };

   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });


   return (
      <div className='block__quiz__welcome'>
         {!!question.image_status && question.image_src && <div><img src={ question.image_src } alt='welcome_img' /></div>}
         <div>
            <Text
               type={ type.bold }
               inner={ quiz.name }
               size={ size.large }
               style={ { color: '#131f1e' } }
            />
         </div>
         {quiz.description && (
            <div>
               <Text
                  type={ type.regularDefaultGrey145 }
                  inner={ quiz.description }
                  size={ size.medium }
                  style={ { color: '#131f1e' } }
               />
            </div>
         )}
         {!!quiz.passing_grade_status && (<div className='grey__line' />)}
         {!!quiz.passing_grade_status && (
            <div className='passing__grade'>
               <div>
                  <Text
                     type={ type.regularDefault }
                     inner='Passing Grade'
                     size={ size.medium }
                     style={ { color: '#131f1e' } }
                  />
               </div>

               <div>
                  <Text
                     type={ size.medium150 }
                     inner={ `${ quiz.passing_grade }%` }
                     size={ size.medium }
                     style={ { color: '#131f1e' } }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

Welcome.propTypes = {
   question: PropTypes.object,
   quiz: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeSettingsQuestion: PropTypes.func,
   isRight: PropTypes.bool,
};

export default Welcome;
