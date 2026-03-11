/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import QuillInlineEditorSimple from 'components/modules/Editors/QuillInlineEditorSimple';
import './index.scss';

const AffiliateInlineEditor = (props) => {
   const {
      text, onChange, fontSize, fontWeight, lineHeight, color,
   } = props;


   return (
      <div
         style={ {
            fontSize: `${ fontSize }px`,
            fontWeight,
            lineHeight: `${ lineHeight }%`,
            width: '100%',
            textAlign: 'center',
            color,
         } }
      >
         <QuillInlineEditorSimple
            text={ text || '' }
            onChange={ onChange }
            isOtherPage={ true }
            modules={ { toolbar: false } }
         /> 
      </div>
   );
};

AffiliateInlineEditor.propTypes = {
   text: PropTypes.string,
   onChange: PropTypes.func,
   lineHeight: PropTypes.string,
   fontWeight: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.string,
};

export default AffiliateInlineEditor;
