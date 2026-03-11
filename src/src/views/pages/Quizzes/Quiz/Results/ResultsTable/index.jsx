import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import ResultItem from '../ResultItem';
import ResultItemMobile from '../ResultItemMobile';


const ResultTable = ({
   quiz,
   resetResult,
   isMobile,
}) => {
   if (isMobile) {
      return (
         <div
            className='result__list__mobile'
         >
            {
               quiz.map(item => (
                  <ResultItemMobile
                     item={ item }
                     resetResult={ () => resetResult(item.id) }
                     key={ item.id }
                  />
               ))
            }
         </div>
      );
   }

   return (
      <div className='result__new__table'>
         <table>
            <thead>
               <tr>
                  <th>
                     <Text
                        inner='Name'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th className='result__new__table__end'>
                     <Text
                        inner='Email'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th className='result__new__table__end'>
                     <Text
                        type={ types.mediumLarge }
                        inner='Completed'
                        size={ sizes.small }
                     />
                  </th>
                  <th className='result__new__table__end'>
                     <Text
                        type={ types.mediumLarge }
                        inner='Status'
                        size={ sizes.small }
                     />
                  </th>
                  <th
                     className='result__new__table__end'
                     style={ {
                        textAlign: 'center',
                     } }>
                     <Text
                        type={ types.mediumLarge }
                        inner='Results'
                        size={ sizes.small }
                     />
                  </th>
                  <th />
               </tr>
            </thead>
            <tbody>
               {quiz.map((result) => {
                  return (
                     <ResultItem
                        item={ result }
                        resetResult={ () => resetResult(result.id) }
                        key={ result.id }
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

ResultTable.defaultProps = {
   quiz: [],
};

ResultTable.propTypes = {
   quiz: PropTypes.array,
   resetResult: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default ResultTable;
