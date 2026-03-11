import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';

const FormActions = ({
   onSave, onCancel, cancelDisabled, saveText,
}) => {
   return (
      <div className='formActions'>
         {typeof onSave === 'function'
        && (
           <div className='formActions__item'>
              <BaseButton
                 theme={ btnTheme.primary }
                 size={ btnSize.large }
                 text={ saveText || 'Save' }
                 onClick={ onSave }
              />
           </div>
        )}
         {typeof onCancel === 'function' && !cancelDisabled
        && (
           <div className='formActions__item'>
              <BaseButton
                 theme={ btnTheme.secondary }
                 size={ btnSize.large }
                 text='Cancel'
                 onClick={ onCancel }
              />
           </div>
        )}
      </div>
   );
};

FormActions.propTypes = {
   onSave: PropTypes.func,
   onCancel: PropTypes.func,
   cancelDisabled: PropTypes.bool,
   saveText: PropTypes.string,
};

export default FormActions;
