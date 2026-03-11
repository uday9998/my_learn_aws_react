import PropTypes from 'prop-types';
import React from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import InputNew from 'components/elements/inputNew';

const QuestionContent = ({
   type,
   question,
   answers,
   onInputChange,
   onClickAnswer,
}) => {
   if (type === 'question') {
      return (
         <>
            <Text
               type={ txtTypes.medium }
               size={ txtSizes.size_28 }
               inner={ question.title }
            />
            <Text
               type={ txtTypes.regular }
               size={ txtSizes.medium }
               inner={ question.description }
               style={ {
                  color: '#727978',
                  marginTop: '8px',
               } }
            />
            <div className='answers_wrapper'>
               {
                  question.answers.map(item => {
                     const isActive = answers[question.key] && answers[question.key].includes(item.answer);
                     return (
                        <div
                           key={ item.answer }
                           className='answer_item'
                           style={ {
                              borderColor: isActive ? '#36796F' : '#E7E9E9',
                           } }
                           role='presentation'
                           onClick={ () => {
                              if (isActive && !question.isMultiple) return;
                              onClickAnswer(question.key, item.answer, question.isMultiple);
                           } }
                        >
                           <div
                              className='answer_icon_wrapper'
                              style={ {
                                 backgroundColor: item.iconBackground,
                              } }
                           >
                              <IconNew name={ item.iconName } />
                           </div>
                           <Text
                              type={ txtTypes.regular }
                              size={ txtSizes.large }
                              inner={ item.title }
                              style={ {
                                 color: '#131F1E',
                                 textAlign: 'center',
                              } }
                           />
                        </div>
                     );
                  })
               }
            </div>
         </>
      );
   }

   return (
      <>
         <div
            className='input_icon_wrapper'
            style={ {
               backgroundColor: question.iconBackground,
            } }
         >
            <IconNew name={ question.iconName } color={ question.iconColor } />
         </div>
         <Text
            type={ txtTypes.medium }
            size={ txtSizes.size_28 }
            inner={ question.title }
            style={ {
               marginTop: '24px',
            } }
         />
         <Text
            type={ txtTypes.regular }
            size={ txtSizes.medium }
            inner={ question.description }
            style={ {
               color: '#727978',
               marginTop: '8px',
            } }
         />
         <InputNew
            label={ question.inputLabel }
            name={ question.key }
            onChange={ onInputChange }
            value={ answers[question.key] }
            disabled={ false }
         />
      </>
   );
};

QuestionContent.propTypes = {
   type: PropTypes.oneOf(['question', 'input']),
   question: PropTypes.object,
   answers: PropTypes.object,
   onInputChange: PropTypes.func,
   onClickAnswer: PropTypes.func,
};

export default QuestionContent;
