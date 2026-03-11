import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';

const OtherPageButton = ({
   inner, isEditor, color, background, onChange, className = '', onClick,
   hasBorder, errorMessage
}) => {
   return (
      <div className={ `${ className } other__page__button__wrapper` }>
         { errorMessage && <p className='other__page__error'>{ errorMessage }</p> }
         <div
            className='other__page__button'
            style={ hasBorder ? { background, color, border: `1px solid ${ color }` } : { background, color } }
            role='presentation'
            onClick={ isEditor ? () => {} : () => onClick() }
         >
            {isEditor ? (
               <AffiliateInlineEditor
                  text={ inner }
                  fontSize='14'
                  fontWeight='400'
                  lineHeight='168%'
                  color={ color }
                  onChange={ (e) => {
                     if (e.length < 31) {
                        onChange('buttonText', e);
                     } else {
                        onChange('buttonText', inner);
                     }
                  } }
               />
            ) : (
               <div
                  dangerouslySetInnerHTML={ { __html: inner } }
               />
            )}
         </div>
      </div>
   );
};

OtherPageButton.propTypes = {
   className: PropTypes.string,
   inner: PropTypes.string,
   isEditor: PropTypes.bool,
   color: PropTypes.string,
   onClick: PropTypes.func,
   background: PropTypes.string,
   onChange: PropTypes.func,
   hasBorder: PropTypes.bool,
   errorMessage: PropTypes.string,
};

export default OtherPageButton;
