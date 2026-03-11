import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './style.scss';

const AuthorDeleteModal = ({
   onCancel,
   onDelete,
}) => {
   return (
      <div className='author-wraper-delete'>
         <div className='author-wraper-delete-header'>
            <Text
               type={ txtType.bold }
               size={ txtSizes.medium }
               inner='Delete Author'
            />
            <div
               className='closeIcon'
               role='presentation'
               onClick={ () => onCancel(false) }
            >
               <Icon name='CloseX' />
            </div>
         </div>
         <div className='author-wraper-delete-content'>
            <p> Are you sure, you want to delete the insctructor? </p>
         </div>
         <div className='author-wraper-delete-footer'>
            <div>
               <BaseButton
                  theme={ btnType.grey }
                  size={ btnSize.large }
                  text='Cancel'
                  onClick={ () => onCancel(false) }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  text='Delete'
                  onClick={ onDelete }
               />
            </div>
         </div>
      </div>
   );
};

AuthorDeleteModal.propTypes = {
   onCancel: PropTypes.func,
   onDelete: PropTypes.func,
};

export default AuthorDeleteModal;
