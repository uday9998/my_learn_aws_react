import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import SortButton from 'components/elements/buttons/SortButton';

const sortOptions = {
   ongoing: 'Ongoing First',
   expired: 'Expired First',
   newest: 'Newest',
   oldest: 'Oldest',
};

const CouponsListTop = ({
   count, onSorting, selectedSortingVariant, onCheckAll, onDelete,
   isMultiSelect, onMultiSelect, checkedIds, searchValue, isMobile,
}) => {
   const [isOpendelete, setIsOpenDelete] = useState(false);
   if (searchValue) {
      return (
         <div className='coupons__list__top'>
            <Text
               inner='Search Results'
               type={ types.mediumLarge }
               size={ sizes.small }
            />
         </div>
      );
   }
   return (
      <div className='coupons__list__top__wrapper'>
         <div className='coupons__list__top'>
            {isOpendelete && (
               <DeleteModal
                  maxWidth={ 414 }
                  onDelete={ () => {
                     onDelete(checkedIds);
                     setIsOpenDelete(false);
                  } }
                  deleteText='Delete'
                  title='Are you sure you want to delete the selected coupons ?'
                  onCancel={ () => setIsOpenDelete(false) }
               />
            )}
            <div className='coupons__list__top__left'>
               {isMultiSelect ? (
                  <CheckBox
                     checked={ checkedIds.length > 0 }
                     iconType='-'
                     onChange={ () => onCheckAll() }
                     label={ `${ checkedIds.length }/${ count } Coupons` }
                  />
               ) : (
                  <Text
                     inner={ `${ count } Coupons` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               )}
               <div className='coupons__list__top__left__liner' />
               <Switch
                  label='Multiselect'
                  onChange={ () => onMultiSelect(!isMultiSelect) }
                  size='medium'
                  positionText='right'
                  value={ isMultiSelect }
               />
               {checkedIds.length > 0 && isMultiSelect && !isMobile && (
               <>
                  <div className='coupons__list__top__left__liner' />
                  <div className='coupons__list__top__left__actions'>
                     <Text
                        inner='Actions:'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <IconButton
                        name='CertificatesDeleteS'
                        wBorder={ true }
                        onClick={ () => setIsOpenDelete(true) }
                        theme={ iconThemes.delete }
                     />
                  </div>
               </>
               )}
            </div>
            <SortButton
               onFilter={ onSorting }
               value={ selectedSortingVariant }
               type='first'
               options={ sortOptions }
            />
         </div>
         {
            checkedIds.length > 0 && isMultiSelect && (
               <div className='coupons__list__top__wrapper__bottom'>
                  <Text
                     inner='Actions:'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <IconButton
                     name='CertificatesDeleteS'
                     wBorder={ true }
                     onClick={ () => setIsOpenDelete(true) }
                     theme={ iconThemes.delete }
                  />
               </div>
            )
         }
      </div>
   );
};

CouponsListTop.propTypes = {
   count: PropTypes.number,
   onMultiSelect: PropTypes.func,
   onCheckAll: PropTypes.func,
   checkedIds: PropTypes.array,
   onSorting: PropTypes.func,
   selectedSortingVariant: PropTypes.string,
   searchValue: PropTypes.string,
   onDelete: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default CouponsListTop;
