/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineEditor from 'components/modules/InlineEditor';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { SafeHtml } from 'utils/sanitizeHtml';
import './index.scss';

const Bullet = (props) => {
   const {
      slug, className, onClick, bullet, isPreview, bulletIconName, style, disabled,
      changeProp, index, subIndex,
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
            'bullet': !active || isPreview,
            'bullet mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='bullet-content'>
            <div><Icon name={ bulletIconName } color={ bullet.color } /></div>
            <div style={ {
               color: bullet.color, fontSize: `${ bullet.font_size }px`, ...style,
            } }
            >
               {((disabled || isPreview) ? (
                  <SafeHtml html={ bullet.text } />
               )
                  : (
                     <InlineEditor
                        text={ bullet.text }
                        slug={ slug }
                        changeProp={ changeProp }
                        index={ index }
                        subIndex={ subIndex }
                        isSubcomponent={ true }
                     />
                  ))}
            </div>
         </div>
      </div>
   );
};


Bullet.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   bullet: PropTypes.object,
   bulletIconName: PropTypes.string,
   isPreview: PropTypes.bool,
   style: PropTypes.object,
   disabled: PropTypes.bool,
   subIndex: PropTypes.number,
   index: PropTypes.number,
   changeProp: PropTypes.func,
};

export default Bullet;
