import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

const PollDrangAndDropItem = ({
   p, s, getItemStyle, item, options, handleRemoveOption, onRename,
}) => {
   const [isRenaming, setIsRenaming] = useState(true);
   return (
      <div
         ref={ p.innerRef }
         { ...p.draggableProps }
         style={ getItemStyle(
            s.isDragging,
            p.draggableProps.style
         ) }
         className='poll__drag__item draggable'
      >
         <div className='poll__drag__item__left'>
            <div
               className='poll__drag__item__icon'
               { ...p.dragHandleProps }
            >
               <Icon name='Reorder' color='#C2CEDB' />
            </div>
            {item.name || isRenaming ? (
               <>
                  {isRenaming || !item.name ? (
                     <ClickOutside onClick={ () => setIsRenaming(true) }>
                        <input value={ item.name } onChange={ (e) => onRename(Number.parseFloat(item.id), e.target.value) } placeholder='Enter option name' />
                     </ClickOutside>
                  ) : (
                     <Text
                        inner={ item.name }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        onClick={ () => setIsRenaming(true) }
                     />
                  )}
               </>
            ) : (
               <Text
                  inner='Option Name'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
                  onClick={ () => setIsRenaming(true) }
               />
            )}
         </div>
         {options.length > 1 && (
            <div
               className='poll__drag__item__right'
               role='presentation'
               onClick={ () => handleRemoveOption(Number.parseFloat(item.id)) }
            >
               <IconNew name='deleteCommunityM' />
            </div>
         )}
      </div>
   );
};

PollDrangAndDropItem.propTypes = {
   p: PropTypes.object,
   s: PropTypes.object,
   getItemStyle: PropTypes.func,
   provided: PropTypes.object,
   options: PropTypes.array,
   item: PropTypes.object,
   onRename: PropTypes.func,
   handleRemoveOption: PropTypes.func,
};

export default PollDrangAndDropItem;
