import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import IconNew from 'components/elements/iconsSize';

const DownSellItem = ({
   downsell, deleteDownsell, changeDownsellStatus, goToDownsellEdit, goToDownsellPreview,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const editOPtions = [
      {
         trash: false, iconName: 'DeactivateActivateM', name: downsell.active === 1 ? 'Deactivate' : 'Activate', onClick: () => changeDownsellStatus(downsell.id),
      },
      {
         trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { goToDownsellEdit(downsell.id); },
      },
      {
         trash: false, iconName: 'CheckoutPreviewM', name: 'Preview', onClick: () => goToDownsellPreview(downsell.id),
      },
      {
         trash: true, iconName: 'TrashSettingsM', name: 'Delete Downsell', onClick: () => setIsOpenDeleteModal(true),
      },
   ];

   return (
      <div className={ `downsell__item${ downsell.active === 1 ? '' : ' downsell__item__deactivated' }` }>
         {isOpenDeleteModal && (
            <DeleteModal
               deleteText='Delete'
               title='Are you sure you want to delete the downsell ?'
               onDelete={ () => deleteDownsell(downsell.id) }
            />
         )}
         <div className='downsell__item__status'>
            <SimpleStatus
               color={ downsell.active === 1 ? 'green' : 'black' }
               text={ downsell.active === 1 ? 'Active Downsell' : 'Deactivated' }
            />
         </div>
         <div className='downsell__item__left'>
            {downsell.offer && downsell.offer.file ? (
               <img src={ downsell.offer.file.src } alt='' />
            ) : (
               <div className='default'>
                  <IconNew name='ImageDefaultM' />
               </div>
            )}
            <div className='downsell__item__left__information'>
               <Text
                  inner={ downsell.headline }
                  type={ types.mediumLarge }
                  size={ sizes.small }
                  style={ { cursor: 'pointer', color: downsell.active === 1 ? '#131F1E' : '#A1A5A5' } }
                  onClick={ () => goToDownsellEdit(downsell.id) }
               />
               <div className='downsell__item__left__information__bottom'>
                  <SimpleStatus
                     text='Downsell'
                     color='navy'
                  />
                  <div className='downsell__item__left__information__bottom__line' />
                  <TextWithIcon
                     iconName='DollarPlanM'
                     inner={ downsell.pricing.price || '$0.00' }
                     type={ types.regularDefault }
                     style={ { color: downsell.active === 1 ? '#131F1E' : '#A1A5A5' } }
                     generalStyles={ { gap: '8px' } }
                     size={ sizes.small }
                  />
               </div>
            </div>
         </div>
         <div className='downsell__item__right'>
            <DropTriggle
               options={ editOPtions }
            />
         </div>
      </div>
   );
};

DownSellItem.propTypes = {
   downsell: PropTypes.object,
   changeDownsellStatus: PropTypes.func,
   goToDownsellEdit: PropTypes.func,
   deleteDownsell: PropTypes.func,
   goToDownsellPreview: PropTypes.func,
};

export default DownSellItem;
