/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const PlansTable = ({ table, isHistory }) => {
   const { head, body } = table;
   const columnHistory = (j, col) => {
      let historyCol = col;
      switch (j) {
         case 2:
            if (historyCol === 'update_card') {
               historyCol = '';
            } else {
               historyCol = `${ col }.00`;
            }
            break;
         case 3: historyCol = col.replace('_', ' ');
            break;
         default: historyCol = col;
      }
      return historyCol;
   };
   return (
      <div className='plansTable'>
         <div className='plansTable__header'>
            { head && head.map((title, i) => {
               return (
                  <div className='plansTable__headerTitle plansTable__column' key={ i }>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.extraSmall }
                        inner={ title }
                        color='rgba(51, 51, 51, 0.5)'
                     />
                  </div>
               );
            })
            }
         </div>
         <div className='plansTabel__body'>
            {
               body && body.map((row, i) => {
                  const newRow = row;
                  if (row[0] === 'Update Card') {
                     newRow[2] = 'update_card';
                  }
                  return (
                     <div className='plansTable__row' key={ i }>
                        { newRow.map((col, j) => {
                           return (
                              <div className='plansTable__column plansTable__columnData' key={ j }>
                                 <Text
                                    type={ TextType.regular }
                                    size={ TextSize.extraSmall }
                                    inner={ isHistory ? columnHistory(j, col) : col }
                                    color='#333333'
                                 />
                              </div>
                           );
                        }) }
                     </div>
                  );
               })
            }
         </div>
      </div>
   );
};

PlansTable.propTypes = {
   table: PropTypes.object,
   isHistory: PropTypes.bool,
};

PlansTable.defaultProps = {
   table: {},
   isHistory: false,
};

export default PlansTable;
