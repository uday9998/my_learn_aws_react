import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import { useHistory } from 'react-router';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import { copyToClipBoard } from 'utils/copy';
import DeleteModal from 'components/elements/DeleteModal';
import DropTriggle from 'components/elements/newDropTriggle';

const CouponEditBottomTop = ({
   onDelete,
   code,
   isMobile,
}) => {
   const history = useHistory();
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   return (
      <div className='coupon__edit__bottom__top'>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to delete the [${ code }] coupon?` }
               onDelete={ onDelete }
               maxWidth={ 414 }
               deleteText='Delete'
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <div className='coupon__edit__bottom__top__left'>
            <Icon name='ArrowBackNew' onClick={ () => history.goBack() } />
            <Text
               inner={ code }
               type={ types.regularMin }
               size={ sizes.size_28 }
            />
            <div
               role='presentation'
               onClick={ () => copyToClipBoard(code) }
               className='coupon__edit__bottom__top__left__copy'
            >
               <IconNew
                  name='CouponCodeCopyL'
               />
            </div>
         </div>
         {
            isMobile ? (
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
            ) : (
               <Button
                  theme={ themes.red }
                  text='Delete Coupon'
                  onClick={ () => setIsOpenDeleteModal(!isOpenDeleteModal) }
               />
            )
         }
      </div>
   );
};

CouponEditBottomTop.propTypes = {
   code: PropTypes.string,
   onDelete: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default CouponEditBottomTop;
