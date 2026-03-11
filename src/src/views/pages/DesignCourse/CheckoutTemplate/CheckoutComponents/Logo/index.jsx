/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import './index.scss';

const Logo = (props) => {
   const {
      slug, className, onClick, color, fontSize, fontFamily, lineHeight, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, justifyContent, bgColor,
      siteInfo,
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
            'logo': !active || isPreview,
            'logo mark': active && !isPreview,
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
            lineHeight,
            textAlign,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
         >
            {siteInfo.active_school_room.school_logo ? (
               <div className='logo school_logo mastercode-class'>
                  <img src={ siteInfo.active_school_room.school_logo } alt='school logo' />
               </div>
            )
               : (
                  <div className='mastercode-class'>
                     <Text
                        size={ TextSize.extraLarge48 }
                        type={ TextType.bold }
                        color={ color }
                        inner={ siteInfo.title }
                        style={ {
                           fontSize: `${ fontSize }px`,
                           fontFamily,
                        } }
                     />
                  </div>
               )}
         </div>
      </div>
   );
};


Logo.defaultProps = {
   color: '#fff',
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   lineHeight: '1',
   justifyContent: 'flex-start',
   bgColor: 'transparent',
};

Logo.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   siteInfo: PropTypes.object,
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
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
};

export default Logo;
