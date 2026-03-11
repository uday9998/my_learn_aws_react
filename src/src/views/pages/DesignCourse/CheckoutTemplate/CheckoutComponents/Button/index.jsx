/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineActions from 'components/modules/InlineActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Button = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, fontFamily, lineHeight, bgColor, isPreview,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft, paddingBottom,
      handleDuplicateComponent, handleDeleteComponent, index, sectionIndex, isBuyButton,
      height, borderSize, style,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const handleButtonBorder = () => {
      let button_border = {};
      switch (border) {
         case 'solid':
            button_border = {
               border: `1px solid ${ bgColor }`,
               backgroundColor: 'transparent',
            };
            break;
         case 'dotted':
            button_border = {
               border: `1px dotted ${ bgColor }`,
               backgroundColor: 'transparent',
            };
            break;
         default:
            button_border = {};
            break;
      }
      return button_border;
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'button': !active || isPreview,
            'button mark': active && !isPreview,
            'isBuyButton': isBuyButton,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => { onClick(e); } }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            justifyContent,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
      >
         <div
            className='button-content'
            style={ {
               color,
               fontSize: `${ fontSize }px`,
               fontFamily,
               lineHeight,
               // paddingTop: `${ paddingTop }px`,
               // paddingBottom: `${ paddingBottom }px`,
               // paddingLeft: `${ paddingLeft }px`,
               // paddingRight: `${ paddingRight }px`,
               width: `${ width }px`,
               height: `${ height }px`,
               borderWidth: `${ borderSize }px`,
               borderRadius: `${ borderRadius }px`,
               backgroundColor: bgColor,
               ...handleButtonBorder(),
               ...style,
            } }
         >
            {text}
         </div>
         {!isBuyButton
         && (
            <InlineActions
               slug={ slug }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         )}
      </div>
   );
};


Button.defaultProps = {
   color: '#fff',
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
   height: '42',
};

Button.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   text: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   height: PropTypes.string,
   borderSize: PropTypes.string,
   lineHeight: PropTypes.string,
   fontFamily: PropTypes.string,
   bgColor: PropTypes.string,
   isPreview: PropTypes.bool,
   border: PropTypes.string,
   borderRadius: PropTypes.string,
   width: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   index: PropTypes.number,
   sectionIndex: PropTypes.number,
   isBuyButton: PropTypes.bool,
   style: PropTypes.object,
};

export default Button;
