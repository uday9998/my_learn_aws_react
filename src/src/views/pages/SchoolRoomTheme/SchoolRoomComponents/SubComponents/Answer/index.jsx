/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import InlineEditor from 'components/modules/InlineEditor';
import PropTypes from 'prop-types';
import './index.scss';

const Text = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth, justifyContent, bgColor,
      title, style, disabled, handleDuplicateComponent, handleDeleteComponent, sectionIndex, changeProp,
      subIndex, index, subofSubIndex,
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
            'answer': !active || isPreview,
            'answer mark': active && !isPreview,
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
            maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            ...style,
         } }
         >
            {title || ((disabled || isPreview) ? text
               : (
                  <InlineEditor
                     text={ text }
                     slug={ slug }
                     changeProp={ changeProp }
                     index={ index }
                     sectionIndex={ sectionIndex }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     handleDeleteComponent={ handleDeleteComponent }
                     isSubofSubcomponent={ true }
                     subIndex={ subIndex }
                     subofSubIndex={ subofSubIndex }
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
   disabled: PropTypes.bool,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeProp: PropTypes.func,
   subIndex: PropTypes.number,
   subofSubIndex: PropTypes.number,
};

export default Text;
