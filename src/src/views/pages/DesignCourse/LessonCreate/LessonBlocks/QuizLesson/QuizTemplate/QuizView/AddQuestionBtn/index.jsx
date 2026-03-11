import React, { useState, useRef } from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import QuestionTypes from 'views/pages/DesignCourse/LessonCreate/LessonBlocks/QuizLesson/QuizTemplate/QuizView/QuestionTypes';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import PropTypes from 'prop-types';


const AddQuestionBtn = ({ chooseQuestionType, hasEnding, withoutText }) => {
   const [openQuestionTypes, setOpenQuestionTypes] = useState(false);

   const popupRef = useRef(null);

   useOutsideClickDetector(popupRef, () => setOpenQuestionTypes(false));

   return (
      <div className='add__question__btn' role='presentation' onClick={ () => setOpenQuestionTypes(!openQuestionTypes) }>
         <div className='quiz__add__quieston__icon' style={ openQuestionTypes ? { background: '#A6C9C5' } : {} }>
            <IconNew name='plusSectionProgramM' color='#24554E' />
         </div>
         {!withoutText && (
            <div>
               <Text
                  inner='Add Another Question'
                  type={ types.regularDefaultSmallX }
                  size={ sizes.small }
                  style={ { color: '#24554E' } }
               />
            </div>
         )}
         {openQuestionTypes && (
            <QuestionTypes
               popupRef={ popupRef }
               disabled={ true }
               chooseQuestionType={ chooseQuestionType }
               hasEnding={ hasEnding }
            />
         )}
      </div>
   );
};

AddQuestionBtn.propTypes = {
   chooseQuestionType: PropTypes.func,
   hasEnding: PropTypes.bool,
   withoutText: PropTypes.bool,
};

export default AddQuestionBtn;
