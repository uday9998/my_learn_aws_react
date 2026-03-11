import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const OfferEditorButton = ({
   bgColor, textColor, borderColor, children, onClick = () => {}, fontSize,
}) => {
   return (
      <div
         className='offer__editor__button'
         role='presentation'
         onClick={ (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
         } }
         style={ {
            color: textColor,
            background: bgColor,
            fontSize: `${ fontSize }px`,
            border: `1px solid ${ borderColor }`,
         } }
      >
         {children}
      </div>
   );
};

OfferEditorButton.propTypes = {
   children: PropTypes.any,
   textColor: PropTypes.string,
   onClick: PropTypes.func,
   fontSize: PropTypes.string,
   borderColor: PropTypes.string,
   bgColor: PropTypes.string,
};

export default OfferEditorButton;
