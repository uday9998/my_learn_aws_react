/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import './index.scss';
import { schoolDefaultColor } from 'utils/pageBuilder/schoolRoomColor';

const ClassButton = (props) => {
   const {
      slug, className, onClick, color, fontSize, lineHeight, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth, justifyContent, bgColor,
      course, title, style, borderRadius, landing, offer,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const classButtonBgColor = bgColor || ((landing && landing.school_color)
   || schoolDefaultColor(landing.school_room_theme_name));
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'coursename classbutton': !active || isPreview,
            'coursename classbutton mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            justifyContent,
            backgroundColor: classButtonBgColor,
            borderRadius: `${ borderRadius }px`,
            width: `${ width }px`,
            textAlign,
         } }
      >

         {offer.url ? (
            <Link
               className='course-link'
               to={ `courses/${ course.url }` }
               target='_blank'
               style={ {
                  backgroundColor: classButtonBgColor,
               } }
            >
               <div style={ {
                  color,
                  backgroundColor: classButtonBgColor,
                  lineHeight,
                  maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
                  paddingTop: `${ paddingTop }px`,
                  paddingBottom: `${ paddingBottom }px`,
                  paddingLeft: `${ paddingLeft }px`,
                  paddingRight: `${ paddingRight }px`,
                  ...style,
               } }
               >
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.extraLarge }
                     inner={ title }
                     color={ color }
                     style={ { ...style, fontSize: `${ fontSize }px` } }
                  />
               </div>
            </Link>
         )
            : (
               <div
                  className='course-link'
                  style={ {
                     backgroundColor: classButtonBgColor,
                  } }
               >
                  <div style={ {
                     color,
                     backgroundColor: classButtonBgColor,
                     lineHeight,
                     maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
                     paddingTop: `${ paddingTop }px`,
                     paddingBottom: `${ paddingBottom }px`,
                     paddingLeft: `${ paddingLeft }px`,
                     paddingRight: `${ paddingRight }px`,
                     ...style,
                  } }
                  >
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.extraLarge }
                        inner={ title }
                        color={ color }
                        style={ { ...style, fontSize: `${ fontSize }px` } }
                     />
                  </div>
               </div>
            )}
      </div>
   );
};


ClassButton.defaultProps = {
   color: '#fff',
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'center',
   textAlign: 'center',
   borderRadius: '4',
};

ClassButton.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   lineHeight: PropTypes.string,
   isPreview: PropTypes.bool,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   textAlign: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
   style: PropTypes.object,
   offer: PropTypes.object,
   course: PropTypes.object,
   title: PropTypes.string,
   borderRadius: PropTypes.string,
   landing: PropTypes.object,
};

export default ClassButton;
