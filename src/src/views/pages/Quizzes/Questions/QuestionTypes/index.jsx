import React from 'react';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';


const QuestionTypes = ({
   chooseQuestionType, hasEnding, hasStart, popupRef,
}) => {
   return (
      <div className='globalQuizTypes globalQuizTypes__modal' ref={ popupRef }>

         {!hasStart && (
            <div className='globalQuizTypes__item' onClick={ () => chooseQuestionType('welcome_screen') } role='presentation'>
               <div><IconNew name='WelcomeQuizM' /></div>
               <div>
                  <Text
                     type={ types.regularDefault }
                     size={ sizes.small }
                     inner='Welcome screen'
                  />
               </div>
            </div>
         )}

         <div className='globalQuizTypes__item' onClick={ () => chooseQuestionType('multiple_choice') } role='presentation'>
            <div><IconNew name='MultiQuizM' /></div>
            <div>
               <Text
                  type={ types.regularDefault }
                  size={ sizes.small }
                  inner='Multiple Choice'
               />
            </div>
         </div>
         <div className='globalQuizTypes__item' onClick={ () => chooseQuestionType('yes_no') } role='presentation'>
            <div><IconNew name='YesNoQuizM' /></div>
            <div>
               <Text
                  type={ types.regularDefault }
                  size={ sizes.small }
                  inner='Yes/No'
               />
            </div>
         </div>
         {!hasEnding && (
            <div className='globalQuizTypes__item' onClick={ () => chooseQuestionType('ending') } role='presentation'>
               <div><IconNew name='EndingQuizM' /></div>
               <div>
                  <Text
                     type={ types.regularDefault }
                     size={ sizes.small }
                     inner='Ending'
                  />
               </div>
            </div>
         )}
      </div>
   );
};

QuestionTypes.propTypes = {
   hasStart: PropTypes.bool,
   chooseQuestionType: PropTypes.func,
   hasEnding: PropTypes.bool,
   popupRef: PropTypes.any,
};


export default QuestionTypes;
