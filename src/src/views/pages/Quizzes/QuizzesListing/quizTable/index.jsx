import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import QuizItem from '../quizTableItem';
import QuizMobileItem from '../quizMobileItem';

const QuizTable = ({
   quizzes, isMultiSelect, onCheck, checkedIds, deleteQuiz, duplicateQuiz, goToEditPage,
   goToSettingsPage, isMobile,
}) => {
   if (isMobile) {
      return (
         <div
            className='quiz__mobile__list'
         >
            {
               quizzes.map(quiz => (
                  <QuizMobileItem
                     isChecked={ checkedIds.includes(quiz.id) }
                     onCheck={ onCheck }
                     isMultiSelect={ isMultiSelect }
                     duplicateQuiz={ duplicateQuiz }
                     item={ quiz }
                     deleteQuiz={ deleteQuiz }
                     key={ quiz.id }
                     goToEditPage={ goToEditPage }
                     goToSettingsPage={ goToSettingsPage }
                  />
               ))
            }
         </div>
      );
   }

   return (
      <div className='quiz__new__table'>
         <table>
            <thead>
               <tr>
                  {isMultiSelect && <th className='quiz__new__table__space' />}
                  <th>
                     <Text
                        inner='Quiz Name'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th className='quiz__new__table__end'>
                     <Text
                        inner='Questions'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th className='quiz__new__table__end'>
                     <Text
                        type={ types.mediumLarge }
                        inner='Updated At'
                        size={ sizes.small }
                     />
                  </th>
                  <th />
               </tr>
            </thead>
            <tbody>
               {quizzes.map((quiz) => {
                  return (
                     <QuizItem
                        isChecked={ checkedIds.includes(quiz.id) }
                        onCheck={ onCheck }
                        isMultiSelect={ isMultiSelect }
                        duplicateQuiz={ duplicateQuiz }
                        item={ quiz }
                        deleteQuiz={ deleteQuiz }
                        key={ quiz.id }
                        goToEditPage={ goToEditPage }
                        goToSettingsPage={ goToSettingsPage }
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

QuizTable.defaultProps = {
   checkedIds: [],
};

QuizTable.propTypes = {
   checkedIds: PropTypes.array,
   duplicateQuiz: PropTypes.func,
   quizzes: PropTypes.array,
   isMultiSelect: PropTypes.bool,
   deleteQuiz: PropTypes.func,
   onCheck: PropTypes.func,
   goToEditPage: PropTypes.func,
   goToSettingsPage: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default QuizTable;
