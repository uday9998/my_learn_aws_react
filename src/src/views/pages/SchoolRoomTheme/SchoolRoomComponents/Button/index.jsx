/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Button = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, fontFamily, lineHeight, bgColor, isPreview,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft, paddingBottom,
      size, href, blanked, style, handleDuplicateComponent, handleDeleteComponent, sectionIndex, index,
      isPortal = false,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const handleButtonSize = () => {
      let button_size_padding;
      switch (size) {
         case 'large':
            button_size_padding = {
               padding: '22px 40px',
            };
            break;
         case 'medium':
            button_size_padding = {
               padding: '14px 18px',
            };
            break;
         case 'medium-large':
            button_size_padding = {
               padding: '18px 18px',
            };
            break;
         case 'small':
            button_size_padding = {
               padding: '8px 18px',
            };
            break;
         case 'extsmall':
            button_size_padding = {
               padding: '6px 18px',
            };
            break;
         case 'no_padding':
            button_size_padding = {
               padding: '0px 0px',
            };
            break;
         default:
            button_size_padding = {
               padding: '8px 18px',
            };
            break;
      }
      return button_size_padding;
   };

   const handleButtonBorder = () => {
      let button_border = {};
      switch (border) {
         case 'solid':
            button_border = {
               border: `2px solid ${ bgColor }`,
               backgroundColor: 'transparent',
            };
            break;
         case 'dotted':
            button_border = {
               border: `2px dotted ${ bgColor }`,
               backgroundColor: 'transparent',
            };
            break;
         default:
            button_border = {};
            break;
      }
      return button_border;
   };

   const LinkHref = (url) => {
      let customUrl = url;
      if (url && !url.match(/^https?:\/\//i)) {
         customUrl = `http://${ url }`;
      }
      if (url) {
         window.open(customUrl, blanked ? '_blank' : '_self');
      }
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'button': !active || isPreview,
            'button mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ isPreview ? () => LinkHref(href) : (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            justifyContent,
            paddingTop: `${ !isPortal ? paddingTop : 0 }px`,
            paddingBottom: `${ !isPortal ? paddingBottom : 0 }px`,
            paddingLeft: `${ !isPortal ? paddingLeft : 0 }px`,
            paddingRight: `${ !isPortal ? paddingRight : 0 }px`,
         } }
      >
         <div
            className='button-content'
            style={ {
               color,
               fontSize: `${ fontSize }px`,
               fontFamily,
               lineHeight,
               width: `${ width }px`,
               borderRadius: `${ borderRadius }px`,
               backgroundColor: bgColor,
               ...handleButtonSize(),
               ...handleButtonBorder(),
               ...style,
               paddingTop: `${ isPortal ? paddingTop : 0 }px`,
               paddingBottom: `${ isPortal ? paddingBottom : 0 }px`,
               paddingLeft: `${ isPortal ? paddingLeft : 0 }px`,
               paddingRight: `${ isPortal ? paddingRight : 0 }px`,
            } }
         >
            {
               isPortal && (
                  <svg width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                     <path fillRule='evenodd' clipRule='evenodd' d='M15.0001 0.416016C7.22207 0.416016 0.916748 6.72134 0.916748 14.4993C0.916748 22.2774 7.22207 28.5827 15.0001 28.5827C22.7781 28.5827 29.0834 22.2774 29.0834 14.4993C29.0834 6.72134 22.7781 0.416016 15.0001 0.416016ZM11.0001 16.8358V12.1629C11.0001 10.7496 11.0001 10.043 11.2959 9.64468C11.5537 9.29752 11.9488 9.07853 12.3799 9.04388C12.8744 9.00412 13.4736 9.37864 14.6721 10.1277L18.4104 12.4642C19.4902 13.139 20.0301 13.4765 20.2153 13.9085C20.377 14.2858 20.377 14.7129 20.2153 15.0902C20.0301 15.5222 19.4902 15.8597 18.4104 16.5345L14.6721 18.871C13.4736 19.6201 12.8744 19.9946 12.3799 19.9548C11.9488 19.9202 11.5537 19.7012 11.2959 19.354C11.0001 18.9557 11.0001 18.2491 11.0001 16.8358Z' fill='white' />
                  </svg>
               )               
            }
            {text}
         </div>
         <InlineActions
            slug={ slug }
            handleDuplicateComponent={ handleDuplicateComponent }
            handleDeleteComponent={ handleDeleteComponent }
            sectionIndex={ sectionIndex }
            index={ index }
         />
      </div>
   );
};


Button.defaultProps = {
   color: '#fff',
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
};

Button.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   text: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.any,
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
   size: PropTypes.string,
   href: PropTypes.string,
   blanked: PropTypes.bool,
   style: PropTypes.object,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   isPortal: PropTypes.bool,
};

export default Button;
