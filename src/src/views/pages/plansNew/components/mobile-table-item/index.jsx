import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import DropTriggle from 'components/elements/newDropTriggle';
import IconButton from 'components/elements/buttons/IconButton';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import SimpleStatus from 'components/elements/SimpleStatus';
import DeleteModal from 'components/elements/DeleteModal';

import './index.scss';

const MobileTableItem = ({
   item,
   isMultiSelect,
   isChecked,
   onCheck,
   goToEdit,
   onDuplicate,
   currencyData,
   onSingleRemove,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState('');

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
   const publishedCourseNames = item.courses.filter((e) => e.is_published === 1).map((e) => e.name);

   return (
      <>
         <div
            className={ `plans__new__mobile__table__item ${ isMultiSelect ? 'multiselect' : '' }` }
         >
            {
               isMultiSelect && (
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(item.id) }
                  />
               )
            }
            <div
               className='plans__new__mobile__table__item__info'
            >
               <div>
                  <span
                     className='plans__new__mobile__table__item__info__name'
                     role='presentation'
                     onClick={ () => goToEdit(item.id) }
                  >
                     { item.name }
                  </span>
                  <div
                     className='plans__new__mobile__table__item__info__actions'
                  >
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
               </div>
               <div>
                  <span>Offers</span>
                  <span>{ item.courses_count }</span>
               </div>
               <div>
                  <span>Price</span>
                  <span>
                     { `${ getCurrencySumbol(getMinimumPrice()?.currency) || '$' } ${ Number.parseFloat(getMinimumPrice()?.realPrice || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }` }
                  </span>
               </div>
               <div>
                  <span>Status</span>
                  <SimpleStatus
                     { ...statuses[item.status] }
                  />
               </div>
            </div>
         </div>
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
      </>
   );
};

MobileTableItem.propTypes = {
   item: PropTypes.object,
   isMultiSelect: PropTypes.bool,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   goToEdit: PropTypes.func,
   onDuplicate: PropTypes.func,
   currencyData: PropTypes.array,
   onSingleRemove: PropTypes.func,
};

export default MobileTableItem;
