import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import QuillEditor from 'components/modules/Editors/QuillEditor';
import './index.scss';

const LegalPages = ({
   globalBranding, onChange, saveGeneral, isChanged,
}) => {
   return (
      <div className='legal-pages'>
         <div className='checkout-codes-content-field'>
            <QuillEditor
               text={ globalBranding.terms || '' }
               onChange={ (value) => onChange('terms', value) }
               title='Terms and Service Policy'
               withoutBorder={ true }
            />
         </div>
         <div className='code-btn'>
            <BaseButton
               text='Save Changes'
               theme={ btnTheme.primary }
               size={ btnSize.small63 }
               onClick={ () => {
                  saveGeneral(globalBranding);
               } }
               disabled={ !isChanged }
            />
         </div>
      </div>
   );
};

LegalPages.propTypes = {
   globalBranding: PropTypes.object,
   onChange: PropTypes.func,
   saveGeneral: PropTypes.func,
   isChanged: PropTypes.bool,
};

export default LegalPages;
