import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import TextArea from 'components/elements/form/TextArea';
import InlineEditor from 'components/modules/textInlineEditor';

const TextLesson = ({
   block, onGeneralSettingsChange,
}) => {
   const styles = block.css_attributes;
   const buttonStyle = {
      color: styles.color,
      gap: `${ styles.gap }px`,
      justifyContent: styles.justifyContent,
   };
   return (
      <div className='linkBlock' style={ (block.css_attributes) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px`, gap: `${ block.css_attributes.gap }px` } : {} }>
         {block.links && !!block.links.length && block.links.map((link, i) => {
            const newIndex = i + 1;
            return (
               <div key={ newIndex }>
                  <InlineEditor
                     text={ link.text || '<div>Link Text</div>' }
                     onChange={ (value) => onGeneralSettingsChange('text', value, false, true, i) }
                     placeholder='Title here...'
                     isEmail={ true }
                  />
               </div>
            );
         })
         }
      </div>
   );
};

TextLesson.propTypes = {
   block: PropTypes.object,
   onGeneralSettingsChange: PropTypes.func,
};

export default TextLesson;
