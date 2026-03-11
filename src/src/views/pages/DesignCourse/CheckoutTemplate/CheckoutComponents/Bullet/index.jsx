/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineEditor from 'components/modules/InlineEditor';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { checkLightOrDarkTextColor } from '../Text';
import './index.scss';

const Bullet = (props) => {
   const {
      slug, className, onClick, bullet, isPreview,
      bulletIconName, changeProp, index, disabled, subIndex, sections, templateName,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const bulletColor = bullet.color ? bullet.color : checkLightOrDarkTextColor(sections);

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
            <div className={ templateName === 'template7' ? `bullet-icon ${ templateName }` : 'bullet-icon' }><Icon name={ bulletIconName } color={ bulletColor } /></div>
            <div style={ {
               color: bulletColor, fontSize: `${ bullet.font_size }px`,
            } }
            >
               {(disabled || isPreview) ? (
                  <div
                     dangerouslySetInnerHTML={ { __html: bullet.text } }
                  />
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
                  )}
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
   changeProp: PropTypes.func,
   disabled: PropTypes.bool,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   sections: PropTypes.array,
   templateName: PropTypes.string,
};

export default Bullet;
