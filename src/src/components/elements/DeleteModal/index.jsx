import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Modal from 'components/elements/Modal';

const DeleteModal = ({
   title, description, deleteText, onDelete, onCancel, maxWidth, cancelBtnSize = 'large', approveBtnSize = 'large120',
   loading, isDeleteButton = true, className,
}) => {
   return (
      <Modal>
         <div className={ className ? `${ className } delete__modal` : 'delete__modal' }>
            <div className='delete__modal__background' />
            <ClickOutside onClick={ () => onCancel() }>
               <div className='delete__modal__content' style={ { maxWidth: `${ maxWidth }px` || '334px' } }>
                  <div className='delete__modal__content__top'>
                     <Text
                        inner={ title }
                        type={ txtTypes.medium }
                        className='delete__modal__content__span'
                        size={ txtSizes.xxlarge }
                     />
                     {description && (
                        <Text
                           inner={ description }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     )}
                  </div>
                  <div className='delete__modal__content__footer'>
                     <BaseButton
                        text='Cancel'
                        theme={ btnTheme.secondary }
                        size={ btnSize[cancelBtnSize] }
                        onClick={ (e) => onCancel(e) }
                     />
                     {onDelete && (
                        <BaseButton
                           disabled={ loading }
                           text={ deleteText }
                           size={ btnSize[approveBtnSize] }
                           theme={ isDeleteButton ? btnTheme.red : btnTheme.primary }
                           onClick={ (e) => onDelete(e) }
                        />
                     )}
                  </div>
               </div>
            </ClickOutside>
         </div>
      </Modal>
   );
};

DeleteModal.propTypes = {
   title: PropTypes.string,
   onDelete: PropTypes.func,
   onCancel: PropTypes.func,
   deleteText: PropTypes.string,
   maxWidth: PropTypes.number,
   cancelBtnSize: PropTypes.string,
   approveBtnSize: PropTypes.string,
   description: PropTypes.string,
   loading: PropTypes.bool,
   isDeleteButton: PropTypes.bool,
   className: PropTypes.string,
};

export default DeleteModal;
