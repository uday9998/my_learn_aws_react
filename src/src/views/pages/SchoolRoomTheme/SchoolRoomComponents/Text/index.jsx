/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineEditor from 'components/modules/InlineEditor';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { SafeHtml } from 'utils/sanitizeHtml';
import './index.scss';

const Text = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, lineHeight, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth, justifyContent, bgColor,
      title, style, changeProp, index, disabled, handleDuplicateComponent, handleDeleteComponent, sectionIndex,
      fontWeight, isSubcomponent, subIndex,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

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
         style={ { justifyContent, backgroundColor: bgColor } }
      >
         <div style={ {
            color,
            fontSize: `${ fontSize }px`,
            lineHeight: parseFloat(lineHeight) < 1 ? 1 : lineHeight,
            textAlign,
            width: `${ width }%`,
            maxWidth: maxWidth === 'initial' || maxWidth === 'none' || maxWidth === 0 ? 'initial' : `${ maxWidth }px`,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            fontWeight: `${ fontWeight }`,
            ...style,
         } }
         >

            {title || ((disabled || isPreview) ? (
               <SafeHtml html={ text } />
            )
               : (
                  <InlineEditor
                     text={ text }
                     slug={ slug }
                     changeProp={ changeProp }
                     subIndex={ subIndex }
                     index={ index }
                     sectionIndex={ sectionIndex }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     handleDeleteComponent={ handleDeleteComponent }
                     isSubcomponent={ isSubcomponent }
                  />
               ))}
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
   disabled: false,
};

Text.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   text: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   lineHeight: PropTypes.string,
   isPreview: PropTypes.bool,
   paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   textAlign: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   fontWeight: PropTypes.string,
   bgColor: PropTypes.string,
   title: PropTypes.string,
   style: PropTypes.object,
   index: PropTypes.number,
   changeProp: PropTypes.func,
   disabled: PropTypes.bool,
   isSubcomponent: PropTypes.bool,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   subIndex: PropTypes.number,
};

export default Text;
