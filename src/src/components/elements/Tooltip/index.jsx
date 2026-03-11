import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';

const Tooltip = ({ hintText, isLessonSettings }) => {
   const [hint, setHint] = useState(false);
   return (
      <div
         className={ isLessonSettings ? 'tooltip__input__settings' : 'tooltip__input' }
         onMouseEnter={ (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setHint(true);
         } }
         onMouseLeave={ (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setHint(false);
         } }
         role='presentation'
      >
         <Icon name='Hint' />
         {hint && (
            <div className='hintCard__wrapper'>
               <SelectedWrapper>
                  <div className='hintCard'>
                     <Text
                        type={ textType.normal }
                        size={ textSize.extraSmall }
                        inner={ hintText }
                     />
                  </div>
               </SelectedWrapper>
            </div>
         ) }
      </div>
   );
};

Tooltip.propTypes = {
   hintText: PropTypes.string,
   isLessonSettings: PropTypes.bool,
};

export default Tooltip;
