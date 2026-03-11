import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';

const Tooltip = () => {
   const [hint, setHint] = useState(false);
   return (
      <div
         className='dynamicWrapper__tooltip_plan'
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
                        inner='Set 0 For Unlimited Payments'
                     />
                  </div>
               </SelectedWrapper>
            </div>
         ) }
      </div>
   );
};

export default Tooltip;
