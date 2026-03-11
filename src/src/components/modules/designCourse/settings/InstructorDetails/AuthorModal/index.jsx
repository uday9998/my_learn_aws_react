import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import icon from '../icon';
import './style.scss';


const AuthorModal = ({
   onCancel,
   onCreate,
   isButtonDisabled,
   authorOptions,
   setOpenDeleteModal,
}) => {
   const [newAuthor, setNewAuthor] = useState('');
   return (
      <div className='author-wraper'>
         <div className='author-wraper-header'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Create Instructor'
            />
            <div
               className='closeIcon'
               role='presentation'
               onClick={ () => onCancel(false) }
            >
               <Icon name='CloseX' />
            </div>
         </div>
         <div className='author-wraper-content'>
            <div className='author-wraper-content-input'>
               <TextInput
                  label='Class Instructor Name'
                  placeholder='Author'
                  name='author'
                  value={ newAuthor }
                  onChange={ (name, value) => setNewAuthor(value) }
               />
            </div>
            <div className='author-wraper-options-list'>
               {
                  authorOptions && authorOptions.map(option => {
                     return (
                        <div className='author-wraper-option' key={ option.value }>
                           <div className='option-label'>{ option.label }</div>
                           <div className='option-button'>
                              <button
                                 onClick={ () => { setOpenDeleteModal(true, option.value, option.label); } }
                                 type='button'
                                 className='author-wraper-option-icon'
                              >
                                 <img src={ icon.delete } alt='delete' />
                              </button>
                           </div>
                        </div>
                     );
                  })
               }
            </div>
         </div>
         <div className='author-wraper-footer'>
            <div>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.large }
                  text='Cancel'
                  onClick={ () => onCancel(false) }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  text='Save'
                  onClick={ () => onCreate(newAuthor) }
                  disabled={ isButtonDisabled }
               />
            </div>
         </div>
      </div>
   );
};

AuthorModal.propTypes = {
   onCancel: PropTypes.func,
   onCreate: PropTypes.func,
   setOpenDeleteModal: PropTypes.func,
   isButtonDisabled: PropTypes.bool,
   authorOptions: PropTypes.array,
};

export default AuthorModal;
