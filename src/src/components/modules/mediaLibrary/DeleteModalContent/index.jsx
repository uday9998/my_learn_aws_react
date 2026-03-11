import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';


function PreviewModalContent({
   onDelete, onCancel,
}) {
   return (
      <div style={ {
         display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px 22px', minWidth: '300px', minHeight: '100px',
      } }
      >
         <span>are you sure you want to delete this item?</span>
         <div style={ { display: 'flex', justifyContent: 'flex-end', gap: '12px' } }>
            <BaseButton
               size={ btnSize.medium }
               text='Delete'
               onClick={ () => onDelete() }
            />
            <BaseButton
               size={ btnSize.medium }
               theme={ btnTheme.grey }
               text='Cancel'
               onClick={ () => onCancel() }
            />
         </div>
      </div>
   );
}

PreviewModalContent.propTypes = {
   type: PropTypes.string,
   src: PropTypes.string,
};

export default PreviewModalContent;
