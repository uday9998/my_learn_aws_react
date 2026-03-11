/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';
import InlineEditor from 'components/modules/InlineEditor';

const Link = (props) => {
   const {
      slug, className, onClick, isPreview, style,
      link: {
         text, color, fontSize, fontFamily, lineHeight, bgColor,
         borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft, paddingBottom,
         href, blanked,
      },
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
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
            'link': !active || isPreview,
            'link mark': active && !isPreview,
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
            className='Link-content'
            style={ {
               color,
               fontSize: `${ fontSize }px`,
               fontFamily,
               lineHeight,
               width: `${ width }px`,
               borderRadius: `${ borderRadius }px`,
               backgroundColor: bgColor,
               ...style,
            } }
         >
            {text}
         </div>
      </div>
   );
};


Link.defaultProps = {
   color: '#fff',
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
};

Link.propTypes = {
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
   borderRadius: PropTypes.string,
   width: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   style: PropTypes.object,
   href: PropTypes.string,
   blanked: PropTypes.bool,
   link: PropTypes.object,
};

export default Link;
