import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SearchText from 'components/elements/searchText';
import { copyToClipBoard } from 'utils/copy';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import SimpleStatus from 'components/elements/SimpleStatus';

import './index.scss';

const CouponMobileItem = ({
   item,
   status,
   date,
   onDelete,
   isMultiSelect,
   isChecked,
   onCheck,
   searchValue,
   onEdit,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const textColor = status === 1 ? '#131F1E' : '#727978';

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
         <div className='coupon__mobile__item'>
            {
               isMultiSelect && (
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(!isChecked, item.id) }
                  />
               )
            }
            <div className='coupon__mobile__item__wrapper'>
               <div>
                  {
                     status === 1 ? (
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
                     ) : (
                        <Text
                           style={ { color: '#727978', textDecoration: 'line-through' } }
                           inner={ item.coupon_code }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     )
                  }
                  <div className='coupon__mobile__item__options'>
                     <div
                        role='presentation'
                        onClick={ (e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           copyToClipBoard(item.coupon_code);
                        } }
                        className='coupon__item__title__icon'
                        style={ {
                           cursor: 'pointer',
                        } }
                     >
                        <IconNew
                           name='CopyProgramM'
                        />
                     </div>
                     <div
                        style={ {
                           transform: 'rotate(90deg)',
                        } }
                     >
                        <DropTriggle
                           options={ [
                              {
                                 trash: true,
                                 iconName: 'DeleteMediaM',
                                 name: 'Delete',
                                 onClick: () => setIsOpenDeleteModal(true),
                              },
                           ] }
                        />
                     </div>
                  </div>
               </div>
               <div>
                  <span>Status</span>
                  <SimpleStatus
                     color={ status === 1 ? 'green' : 'grey' }
                     text={ status === 1 ? 'Ongoing' : 'Expired' }
                     iconName={ status === 1 ? 'OngoinCouponM' : 'ExpiredCouponM' }
                  />
               </div>
               <div>
                  <span>Number of Offers</span>
                  <Text
                     inner={ item.plans.length }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: textColor } }
                  />
               </div>
               <div>
                  <span>Amount Off</span>
                  <Text
                     inner={ getText() }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: textColor } }
                  />
               </div>
               <div>
                  <span>Duration</span>
                  <Text
                     inner={ durationTypes[item.coupon_duration] }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: textColor } }
                  />
               </div>
               <div>
                  <span>Expiration Date</span>
                  <Text
                     inner={ date }
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                     style={ { color: textColor } }
                  />
               </div>
            </div>
         </div>
      </>
   );
};

CouponMobileItem.propTypes = {
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

export default CouponMobileItem;
