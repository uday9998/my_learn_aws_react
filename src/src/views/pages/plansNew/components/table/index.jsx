import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import { uniqueId } from 'lodash';
import TableItem from '../tableItem';
import MobileTableItem from '../mobile-table-item';


const PlansNewTable = ({
   data, isMultiSelect, onCheck, checkedIds, onSingleRemove, duplicateOnePlan, currencyData,
   goToEdit, isMobile,
}) => {
   if (isMobile) {
      return (
         <div className='plans__new__mobile__table'>
            {
               data.map(el => (
                  <MobileTableItem
                     goToEdit={ goToEdit }
                     isChecked={ checkedIds.includes(el.id) }
                     isMultiSelect={ isMultiSelect }
                     item={ el }
                     onCheck={ onCheck }
                     key={ el.id }
                     onDuplicate={ duplicateOnePlan }
                     currencyData={ currencyData }
                     onSingleRemove={ onSingleRemove }
                  />
               ))
            }
         </div>
      );
   }
   return (
      <div className='plans__new__table'>
         <table>
            <thead>
               {isMultiSelect && <th className='plans__new__table__space' />}
               <th>
                  <Text
                     inner='Bundle Name'
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </th>
               <th className='plans__new__table__end'>
                  <Text
                     inner='Products'
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </th>
               <th className='plans__new__table__end'>
                  <Text
                     inner='Price Starting At'
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </th>
               <th>
                  <Text
                     inner='Status'
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </th>
               <th />
            </thead>
            <tbody>
               {data.map((e) => {
                  return (
                     <TableItem
                        isChecked={ checkedIds.includes(e.id) }
                        onCheck={ onCheck }
                        isMultiSelect={ isMultiSelect }
                        onDuplicate={ duplicateOnePlan }
                        item={ e }
                        goToEdit={ goToEdit }
                        currencyData={ currencyData }
                        onSingleRemove={ onSingleRemove }
                        key={ uniqueId() }
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

PlansNewTable.propTypes = {
   checkedIds: PropTypes.array,
   duplicateOnePlan: PropTypes.func,
   data: PropTypes.array,
   goToEdit: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   onSingleRemove: PropTypes.func,
   onCheck: PropTypes.func,
   currencyData: PropTypes.array,
   isMobile: PropTypes.bool,
};

export default PlansNewTable;
