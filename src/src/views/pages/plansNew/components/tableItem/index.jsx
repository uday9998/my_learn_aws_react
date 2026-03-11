import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import IconButton from 'components/elements/buttons/IconButton';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import getCurrencySumbol from 'utils/getCurrencySymbol';

const TableItem = ({
   item, onCheck, isMultiSelect, isChecked, onDuplicate, onSingleRemove,
   currencyData, goToEdit,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');
   const [price, setPrice] = useState(0);

   const statuses = [
      { color: 'grey', text: 'Unpublished', iconName: 'UnpublishedPlanS' },
      { color: 'green', text: 'Published', iconName: 'PublishedPlanS' },
      { color: 'test', text: 'Test Mode', iconName: 'TestModePlanS' },
   ];

   const getMinimumPrice = () => {
      const all = item.pricings.map((e) => {
         if (e.price && e.currency !== 'USD') {
            return {
               price: Math.round((e.price / currencyData[e.currency.toLowerCase()]) * 100) / 100,
               currency: e.currency,
               realPrice: e.price,
            };
         }
         return {
            price: e.price,
            currency: e.currency,
            realPrice: e.price,
         };
      });
      const sortedPrice = all.sort((a, b) => (parseFloat(a.price) - parseFloat(b.price)));
      return sortedPrice && sortedPrice[0];
   };

   useEffect(() => {
      if (currencyData && getMinimumPrice()) {
         setPrice({ price: getMinimumPrice().realPrice, currency: getMinimumPrice().currency });
      }
   }, [item]);
   const publishedCourseNames = item.courses.filter((e) => e.is_published === 1).map((e) => e.name);
   return (
      <>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to delete the [${ item.name }] plan` }
               description={ item.after_delete_courses_unpublished ? `After deleting this plan the following courses will be unpublished: [${ publishedCourseNames.join(',') }]` : null }
               deleteText='Delete'
               maxWidth={ 415 }
               onDelete={ () => { onSingleRemove(item.id, () => { setIsOpenDeleteModal(false); }); } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <tr
            className='plans__new__table__item'
            role='presentation'
            onClick={ () => goToEdit(item.id) }
         >
            {isMultiSelect && (
               <td className='plans__new__table__space'>
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(item.id) }
                  />
               </td>
            )}
            <td>
               <Text
                  inner={ item.name }
                  onClick={ () => goToEdit(item.id) }
                  style={ { cursor: 'pointer' } }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </td>
            <td className='plans__new__table__end'>
               <Text
                  inner={ item.courses_count }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </td>
            <td className='plans__new__table__end'>
               <Text
                  inner={ `${ getCurrencySumbol(price.currency) || '$' } ${ Number.parseFloat(price.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }` }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </td>
            <td>
               <SimpleStatus
                  { ...statuses[item.status] }
               />
            </td>
            <td>
               <div className='plans__new__table__actions'>
                  <IconButton
                     name='EditPlanS'
                     theme='inherit'
                     onClick={ () => goToEdit(item.id) }
                  />
                  <DropTriggle
                     options={ [
                        {
                           trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => onDuplicate(item.id),
                        },
                        {
                           trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => setIsOpenDeleteModal(true),
                        },
                     ] }
                  />
               </div>

            </td>
         </tr>
      </>
   );
};

TableItem.propTypes = {
   onCheck: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   currencyData: PropTypes.array,
   goToEdit: PropTypes,
   isChecked: PropTypes.bool,
   onSingleRemove: PropTypes.func,
   onDuplicate: PropTypes.func,
   item: PropTypes.object,
   openPlan: PropTypes.func,
};

export default TableItem;
