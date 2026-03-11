/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const ClassAuthor = (props) => {
   const {
      slug, className, onClick, isPreview,
      justifyContent, bgColor, style, name, avatar, description, color,
      fontSize, fontSize_bio,
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
            'coursename': !active || isPreview,
            'coursename mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent, backgroundColor: bgColor } }
      >
         <div className={ `flex authorcard ${ className }` }>
            <div className='avatar'>
               <img src={ avatar } alt='Class author' />
            </div>
            <div className={ `authorinfo m-l-exs ${ !description && 'no-description-author' }` }>
               <div>
                  <Text
                     type={ TextType.demiBold }
                     size={ TextSize.base }
                     inner={ name }
                     style={ { ...style, fontSize: `${ fontSize }px`, lineHeight: 'normal' } }
                     color={ color }

                  />
               </div>
               <div>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.megaSmall }
                     inner={ description }
                     style={ {
                        ...style, opacity: '.7', fontSize: `${ fontSize_bio }px`, lineHeight: 'normal',
                     } }
                     color={ color }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};


ClassAuthor.defaultProps = {
   justifyContent: 'flex-start',
   bgColor: 'transparent',
};

ClassAuthor.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
   style: PropTypes.object,
   name: PropTypes.string,
   description: PropTypes.string,
   avatar: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.string,
   fontSize_bio: PropTypes.string,
};

export default ClassAuthor;
