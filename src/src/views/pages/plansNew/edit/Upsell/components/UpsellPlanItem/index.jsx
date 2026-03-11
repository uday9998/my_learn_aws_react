import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';
import DownSellItem from '../DownSellItem';

const statuses = [
   { color: 'grey', text: 'Inactive', iconName: 'UnpublishedPlanS' },
   { color: 'green', text: 'Active', iconName: 'PublishedPlanS' },
];
const UpsellPlanItem = ({
   name, image, isActive, onPreview, onDelete, downsell, onDownsell, price, deleteDownsell,
   changeDownsellStatus, onEdit, goToDownsellEdit, goToDownsellPreview,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   return (
      <div
         className='upsell__plan__item__wrapper'
      >
         <div className='upsell__plan__item'>
            {isOpenDeleteModal && (
               <DeleteModal
                  onDelete={ () => {
                     onDelete(() => setIsOpenDeleteModal(false));
                  } }
                  onCancel={ () => setIsOpenDeleteModal(false) }
                  deleteText='Delete'
                  maxWidth={ 414 }
                  title='Are you sure you want to delete the upsell?'
               />
            )}
            <div className='upsell__plan__item__left'>
               {image ? (
                  <img src={ image } alt='' />
               ) : (
                  <div className='default'>
                     <IconNew name='ImageDefaultM' />
                  </div>
               )}
               <div className='upsell__plan__item__left__info'>
                  <Text
                     inner={ name }
                     type={ types.mediumLarge }
                     style={ { cursor: 'pointer' } }
                     role='presentation'
                     onClick={ () => onEdit() }
                     size={ sizes.small }
                  />
                  <div className='bottom'>
                     <SimpleStatus
                        color='pink'
                        text='Upsell'
                     />
                     <div className='bottom__line' />
                     <TextWithIcon
                        iconName='DollarPlanM'
                        inner={ price }
                        type={ types.regularDefault }
                        generalStyles={ { gap: '8px' } }
                        size={ sizes.small }
                     />
                  </div>
               </div>
            </div>
            <div className='upsell__plan__item__right'>
               {isActive ? (
                  <SimpleStatus
                     { ...statuses[1] }
                  />
               ) : (
                  <SimpleStatus
                     { ...statuses[0] }
                  />
               )}
               <IconButton
                  name='CheckoutPreviewM'
                  onClick={ onPreview }
               />
               <IconButton
                  name='EditSettingsM'
                  onClick={ () => onEdit() }
               />
               <IconButton
                  name='DeleteCommentM'
                  onClick={ () => setIsOpenDeleteModal(true) }
                  theme='delete'
               />
            </div>
         </div>
         <div className='upsell__plan__item__wrapper__downsell'>
            <IconNew name='ArrowUpsellM' />
            {!downsell || downsell.pricing === null ? (
               <div
                  className='upsell__plan__item__wrapper__downsell__create'
                  role='presentation'
                  onClick={ () => onDownsell() }
               >
                  <div className='circle'>
                     <Icon name='PluseNewL' />
                  </div>
                  <Text
                     inner='Add Downsell to this Upsell'
                     type={ types.regularMin }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                  />
               </div>
            ) : (
               <DownSellItem
                  deleteDownsell={ deleteDownsell }
                  goToDownsellPreview={ goToDownsellPreview }
                  downsell={ downsell }
                  goToDownsellEdit={ goToDownsellEdit }
                  changeDownsellStatus={ changeDownsellStatus }
               />
            )}
         </div>
      </div>
   );
};

UpsellPlanItem.propTypes = {
   onDelete: PropTypes.func,
   onPreview: PropTypes.func,
   isActive: PropTypes.bool,
   downsell: PropTypes.object,
   image: PropTypes.any,
   name: PropTypes.string,
   price: PropTypes.string,
   goToDownsellPreview: PropTypes.func,
   onDownsell: PropTypes.func,
   goToDownsellEdit: PropTypes.func,
   deleteDownsell: PropTypes.func,
   changeDownsellStatus: PropTypes.func,
   onEdit: PropTypes.func,
};

export default UpsellPlanItem;
