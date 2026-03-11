/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Button = (props) => {
   const {
      slug, className, onClick, text, color, fontSize, fontFamily, lineHeight, bgColor, isPreview,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft, paddingBottom,
      size, href, blanked, style,
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
      if (!url.match(/^https?:\/\//i)) {
         customUrl = `http://${ url }`;
      }
      window.open(customUrl, blanked ? '_blank' : '_self');
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
               width: `${ width }px`,
               borderRadius: `${ borderRadius }px`,
               backgroundColor: bgColor,
               ...handleButtonSize(),
               ...handleButtonBorder(),
               ...style,
            } }
         >
            {text}
         </div>
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
   lineHeight: PropTypes.number,
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
};

export default Button;
