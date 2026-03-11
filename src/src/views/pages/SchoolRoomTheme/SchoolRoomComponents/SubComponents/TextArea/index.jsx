/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InlineEditor from 'components/modules/InlineEditor';
import { SafeHtml } from 'utils/sanitizeHtml';
import './index.scss';

const Text = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth, justifyContent, bgColor,
      title, style, changeProp, index, disabled, subIndex, lineHeight,
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
            textAlign,
            width: `${ width }%`,
            maxWidth: maxWidth === 'initial' || maxWidth === 'none' || maxWidth === 0 ? 'initial' : `${ maxWidth }px`,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            lineHeight: parseFloat(lineHeight) < 1 ? 1 : lineHeight,
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
                     index={ index }
                     subIndex={ subIndex }
                     isSubcomponent={ true }
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
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'flex-start',
   bgColor: 'transparent',
   lineHeight: '1',
};

Text.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   text: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   isPreview: PropTypes.bool,
   paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   textAlign: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
   title: PropTypes.string,
   style: PropTypes.object,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   changeProp: PropTypes.func,
   disabled: PropTypes.bool,
   lineHeight: PropTypes.string,
};

export default Text;
