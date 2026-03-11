import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';


const TextLesson = ({
   block,
}) => {
   const styles = block.css_attributes;
   const dividerStyle = {
      borderTopStyle: styles.borderStyle,
      width: `${ styles.width }px`,
      borderTopWidth: `${ styles.borderWidth }px`,
      borderTopColor: styles.borderColor,
   };


   return (
      <div className='dividerBlock' style={ { justifyContent: styles.justifyContent } }>
         <div className='divider_line' style={ dividerStyle } />
      </div>

   );
};

TextLesson.propTypes = {
   block: PropTypes.object,
};

export default TextLesson;
