import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const NotificationEdtiHeader = ({
   onClear, onSave, goBack,
}) => {
   return (
      <div className='notification__edit__header'>
         <div className='notification__edit__header__left'>
            <IconNew name='NotificationGoBackL' onClick={ () => goBack() } />
            <Text
               inner='Email Notifications'
               type={ txtTypes.regular160 }
               size={ txtSizes.large }
            />
         </div>
         <div className='notification__edit__header__right'>
            <div className='notification__edit__header__right__preview' role='presentation' onClick={ () => onClear() }>
               <IconNew name='UndoM' />
               <Text
                  inner='Revert'
                  type={ txtTypes.regularDefaultSmall }
                  size={ txtSizes.xsmall }
                  style={ { color: '#24554E' } }
               />
            </div>
            {/* <div className='notification__edit__header__right__preview' role='presentation' onClick={ () => onPreview() }>
               <IconNew name='NotificationPreviewM' />
               <Text
                  inner='Preview'
                  type={ txtTypes.regularDefaultSmall }
                  size={ txtSizes.xsmall }
                  style={ { color: '#24554E' } }
               />
            </div> */}
            <div className='line' />
            <BaseButton
               text='Save'
               size={ btnSizes.medium }
               style={ { padding: '9px 12px' } }
               onClick={ () => onSave() }
            />
         </div>
      </div>
   );
};

NotificationEdtiHeader.propTypes = {
   onClear: PropTypes.func,
   onSave: PropTypes.func,
   goBack: PropTypes.func,
};

export default NotificationEdtiHeader;
