import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import isPrint from 'state/modules/designCourse/edit/Error';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';
import MaterialModal from 'components/elements/MaterialModal';


const EditItemModal = ({
   onClose, title, open, item, onChange, onConfirm, placeholder,
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
            <div className='m-t-exl'>
               <TextInput
                  value={ item.name }
                  name='name'
                  onChange={ (name, value) => {
                     if (value.length <= 150) {
                        onChange(name, value);
                     } else if (isPrint('You are reached character limit')) {
                        toast.error('You are reached character limit');
                     }
                  } }
                  rightLabel={ `${ item.name ? item.name.length : 0 }/150` }
                  label='Name'
                  placeholder={ placeholder }
               />
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
                     text='Save'
                     onClick={ () => { onConfirm(); onClose(); } }
                     style={ { marginLeft: '16px' } }
                  />
               </div>
            </div>

         </div>
      </MaterialModal>
   );
};

EditItemModal.propTypes = {
   onClose: PropTypes.func,
   onConfirm: PropTypes.func,
   placeholder: PropTypes.string,
   title: PropTypes.string,
   item: PropTypes.object,
   open: PropTypes.bool,
   onChange: PropTypes.func,
};

EditItemModal.defaultProps = {
};

export default EditItemModal;
