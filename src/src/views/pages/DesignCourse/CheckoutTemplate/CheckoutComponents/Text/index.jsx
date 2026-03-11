/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineEditor from 'components/modules/InlineEditor';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';
import { checkLightOrDark } from '../Section';

export const checkLightOrDarkTextColor = (section) => {
   if (checkLightOrDark(section)?.includes('var')) {
      return 'var(--textColor)';
   }

   return '#131F1E';
};

const Text = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, fontFamily, lineHeight, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth, justifyContent, bgColor,
      course, isClassName, index, changeProp, fontStyle, handleDuplicateComponent, handleDeleteComponent, sectionIndex,
      textDecoration, fontWeight, templateName, sections,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const endsWithTenNumbers = (text) => {
      if (/\d{10}$/.test(text)) {
         return text.slice(0, -10);
      }

      return text;
   };

   const forText = isClassName ? endsWithTenNumbers(course.name) : text;

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'text': !active || isPreview,
            'text mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent, backgroundColor: bgColor, width: `${ width }%` } }
      >
         <div style={ {
            color: color || (sections ? checkLightOrDarkTextColor(sections) : '#131F1E'),
            fontSize: `${ fontSize }px`,
            fontFamily,
            lineHeight,
            textDecoration,
            fontStyle,
            textAlign,
            fontWeight,
            maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
         >
            {
               (isPreview || isClassName) ? (
                  <div
                     style={ { color: templateName === 'template4' && (color || checkLightOrDarkTextColor(sections)) } }
                     dangerouslySetInnerHTML={ { __html: forText } }
                  />
               )
                  : (
                     <InlineEditor
                        text={ forText }
                        slug={ slug }
                        changeProp={ changeProp }
                        index={ index }
                        sectionIndex={ sectionIndex }
                        handleDuplicateComponent={ handleDuplicateComponent }
                        handleDeleteComponent={ handleDeleteComponent }
                        isClassName={ isClassName }
                     />
                  )}
         </div>
      </div>
   );
};


Text.defaultProps = {
   color: '#fff',
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'flex-start',
   bgColor: 'transparent',
   course: {},
};

Text.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   fontStyle: PropTypes.string,
   text: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   lineHeight: PropTypes.string,
   fontFamily: PropTypes.string,
   isPreview: PropTypes.bool,
   paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   textAlign: PropTypes.string,
   fontWeight: PropTypes.string,
   textDecoration: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
   isClassName: PropTypes.bool,
   course: PropTypes.object,
   index: PropTypes.number,
   changeProp: PropTypes.func,
   sectionIndex: PropTypes.number,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   templateName: PropTypes.string,
   sections: PropTypes.array,
};

export default Text;
