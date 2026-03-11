import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import './index.scss';
import { Modal } from 'components/modules/modalNew';

export const Tier = ({ title, onRename, onDelete }) => {
   const [isDrag, setIsDrag] = useState(false);
   const [isRenaming, setIsRenaming] = useState(false);
   const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
   const [value, setValue] = useState(title);
   return (
      <div className='tier'>
         <div className='tier__drag__icon'>
            <Icon name='TierDrag' />
         </div>
         <input type='text' disabled={ !isRenaming } className={ isRenaming ? 'tier__edit__title' : 'tier__title' } value={ value } onChange={ (e) => setValue(e.target.value) } />
         {!isDrag && (
            <div className='tier__edit'>
               <div className='tier__edit__rename' style={ { display: isDrag ? 'none' : '' } }>
                  {!isRenaming
                     ? (
                        <div role='presentation' className='tier__edit__rename__icon' onClick={ () => setIsRenaming(true) }>
                           <Icon name='TierRename' />
                        </div>
                     )
                     : (
                        <div className='tier__edit__buttons'>
                           <div
                              role='presentation'
                              className='tier__edit__cancel'
                              onClick={ () => {
                                 setIsRenaming(false);
                                 setValue(title);
                              } }
                           ><Icon name='TierCancel' />
                           </div>
                           <div
                              role='presentation'
                              className='tier__edit__accept'
                              onClick={ () => {
                                 onRename(value);
                                 setIsRenaming(false);
                              } }
                           ><Icon name='TierAccept' />
                           </div>
                        </div>
                     )
                  }
               </div>
               {!isRenaming && !isDrag && (
                  <div role='presentation' className='tier__edit__delete' onClick={ () => setisOpenDeleteModal(!isOpenDeleteModal) }>
                     <Icon name='TierDelete' />
                  </div>
               )}
               {isOpenDeleteModal && (
                  <Modal
                     onClose={ () => setisOpenDeleteModal(false) }
                     onDelete={ onDelete }
                     title='Are you sure you want to delete your lesson?'
                     text='Deleting this class will result in the following actions that you may want to consider before moving forward'
                  />
               )}
            </div>
         )}
      </div>
   );
};
Tier.propTypes = {
   title: PropTypes.string,
   onRename: PropTypes.func,
   onDelete: PropTypes.func,
};
