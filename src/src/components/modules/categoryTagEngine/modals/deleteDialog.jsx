import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';
import MaterialModal from 'components/elements/MaterialModal';


const DeleteDialog = ({
   onClose, title, open, onConfirm,
}) => {
   return (
      <MaterialModal open={ open } onClose={ onClose }>

         <div className='addItemModal'>
            <div className='addItemModal__header'>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.large }
                  inner={ title }
               />
               <div
                  className='addItemModal__close'
                  role='presentation'
                  onClick={ onClose }
               >
                  <Icon name='CloseXNew' />
               </div>
            </div>
            <div className='p-t-exl editItemModal__footer'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ onClose }
                  />
               </div>
               <div>
                  <BaseButton
                     size={ btnSize.large }
                     text='Delete'
                     onClick={ () => { onConfirm(); onClose(); } }
                     style={ { marginLeft: '16px' } }
                  />
               </div>
            </div>

         </div>
      </MaterialModal>
   );
};

DeleteDialog.propTypes = {
   onClose: PropTypes.func,
   onConfirm: PropTypes.func,
   title: PropTypes.string,
   open: PropTypes.bool,
};

DeleteDialog.defaultProps = {
};

export default DeleteDialog;
