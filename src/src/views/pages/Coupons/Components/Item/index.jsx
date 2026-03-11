import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SimpleStatus from 'components/elements/SimpleStatus';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { copyToClipBoard } from 'utils/copy';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import SearchText from 'components/elements/searchText';

const CouponItem = ({
   item, status, date, onDelete, isMultiSelect, isChecked, onCheck, searchValue,
   onEdit,
}) => {
   const textColor = status === 1 ? '#131F1E' : '#727978';
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const getText = () => {
      if (item.coupon_type === 'percentage') {
         return `${ item.coupon_percentage }%`;
      }
      return `$${ item.coupon_amount }`;
   };

   const durationTypes = ['Once', 'Repeating', 'Between Dates', 'No Expiration Date'];
   return (
      <>
         {isOpenDeleteModal && (
            <DeleteModal
               maxWidth={ 414 }
               onDelete={ () => {
                  onDelete([item.id]);
                  setIsOpenDeleteModal(false);
               } }
               deleteText='Delete'
               title={ `Are you sure you want to delete the [${ item.coupon_code }] coupon ?` }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <tr
            className='coupon__item'
            role='presentation'
            onClick={ () => onEdit() }
         >
            {isMultiSelect && (
               <td>
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(!isChecked, item.id) }
                  />
               </td>
            )}
            <td>
               <SimpleStatus
                  color={ status === 1 ? 'green' : 'grey' }
                  text={ status === 1 ? 'Ongoing' : 'Expired' }
                  iconName={ status === 1 ? 'OngoinCouponM' : 'ExpiredCouponM' }
               />
            </td>
            <td>
               {status === 1 ? (
                  <div
                     className='coupon__item__title'
                  >
                     <SearchText
                        searchText={ searchValue }
                        textProps={ {
                           onClick: () => onEdit(),
                           type: types.regularDefault,
                           size: sizes.small,
                           inner: item.coupon_code,
                        } }
                        activeColor='rgba(0, 176, 255, 0.2)'
                     />
                     <div
                        role='presentation'
                        onClick={ (e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           copyToClipBoard(item.coupon_code);
                        } }
                        className='coupon__item__title__icon'
                     >
                        <IconNew
                           name='CopyProgramM'
                        />
                     </div>

                  </div>
               ) : (
                  <Text
                     style={ { color: '#727978', textDecoration: 'line-through' } }
                     inner={ item.coupon_code }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               )}
            </td>
            <td className='coupons__data__tr__start'>
               <Text
                  inner={ item.plans.length }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: textColor } }
               />
            </td>
            <td className='coupons__data__tr__start'>
               <Text
                  inner={ getText() }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: textColor } }
               />
            </td>
            <td className='coupons__data__tr__start'>
               <Text
                  inner={ durationTypes[item.coupon_duration] }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: textColor } }
               />
            </td>
            <td className='coupons__data__tr__start'>
               <Text
                  inner={ date }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: textColor } }
               />
            </td>
            <td>
               <DropTriggle
                  type='one'
                  options={ [
                     {
                        trash: true,
                        iconName: 'DeleteMediaM',
                        name: 'Delete',
                        onClick: () => setIsOpenDeleteModal(true),
                     },
                  ] }
               />
            </td>
         </tr>
      </>

   );
};

CouponItem.propTypes = {
   status: PropTypes.number,
   item: PropTypes.object,
   isMultiSelect: PropTypes.bool,
   searchValue: PropTypes.string,
   date: PropTypes.string,
   onCheck: PropTypes.func,
   isChecked: PropTypes.bool,
   onEdit: PropTypes.func,
   onDelete: PropTypes.func,
};

export default CouponItem;
