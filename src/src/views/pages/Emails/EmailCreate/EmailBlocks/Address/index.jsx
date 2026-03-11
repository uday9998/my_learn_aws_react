import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import InlineEditor from 'components/modules/textInlineEditor';

const TextEmail = ({
   onChange, block,
}) => {
   const changeLesson = (name, value) => {
      onChange(name, value, true);
   };

   return (
      <div className='address__email' style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }>
         <InlineEditor
            text={ block.description || '<div>Street, City, State 00000, Country</div>' }
            onChange={ (value) => changeLesson('description', value) }
            placeholder='Title here...'
            isEmail={ true }
         />
      </div>
   );
};

TextEmail.propTypes = {
   onChange: PropTypes.func,
   block: PropTypes.object,
};

export default TextEmail;
