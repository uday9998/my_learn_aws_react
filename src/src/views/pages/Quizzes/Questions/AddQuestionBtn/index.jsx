import React, { useState, useRef } from 'react';
import IconNew from 'components/elements/iconsSize';
// import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import QuestionTypes from 'views/pages/Quizzes/Questions/QuestionTypes';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import PropTypes from 'prop-types';


const AddQuestionBtn = ({
   chooseQuestionType, hasEnding, disabled, hasStart,
}) => {
   const [openQuestionTypes, setOpenQuestionTypes] = useState(false);


   const popupRef = useRef(null);

   useOutsideClickDetector(popupRef, () => setOpenQuestionTypes(false));

   return (
      <div className='quiz__add__question__btn' role='presentation' onClick={ () => setOpenQuestionTypes(!openQuestionTypes) }>
         <div className='quiz__add__question__icon' style={ openQuestionTypes ? { background: '#A6C9C5' } : {} }>
            <IconNew name='plusSectionProgramM' color='#24554E' />
         </div>
         {openQuestionTypes && (
            <QuestionTypes
               popupRef={ popupRef }
               disabled={ disabled }
               chooseQuestionType={ chooseQuestionType }
               hasEnding={ hasEnding }
               hasStart={ hasStart }
            />
         )}
      </div>
   );
};

AddQuestionBtn.propTypes = {
   chooseQuestionType: PropTypes.func,
   hasEnding: PropTypes.bool,
   disabled: PropTypes.bool,
   hasStart: PropTypes.bool,
};

export default AddQuestionBtn;
