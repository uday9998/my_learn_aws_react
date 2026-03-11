import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SliceAndConnectText from 'utils/getSplitedText';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import image from 'assets/images/plan/default.png';

const OrderBumpItem = ({ item, onDelete, onEdit }) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   return (
      <div className='plan__pricing__left__bump__item'>
         {isOpenDeleteModal && (
            <DeleteModal
               deleteText='Delete'
               title={ `Are you sure you want to delete [${ item.name }] item` }
               onDelete={ () => onDelete(item.id) }
               maxWidth={ 414 }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <img src={ item.plan.picture_src || image } alt='' />
         <div className='plan__pricing__left__bump__item__right'>
            <Text
               inner={ SliceAndConnectText(item.name, 15) }
               type={ types.mediumLarge }
               size={ sizes.small }
            />
            <IconButton
               name='EditCommunityM'
               theme='light'
               onClick={ () => onEdit(item.id) }
            />
            <IconButton
               name='DeleteCommunityM'
               theme='delete'
               onClick={ () => setIsOpenDeleteModal(true) }
            />
         </div>
      </div>
   );
};

OrderBumpItem.propTypes = {
   item: PropTypes.object,
   onDelete: PropTypes.func,
   onEdit: PropTypes.func,
};

export default OrderBumpItem;
