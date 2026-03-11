import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import SliceAndConnectText from 'utils/getSplitedText';

const Item = ({
   icon,
   title,
   content,
   onClick,
   style,
   delActionModalClick,
   id,
   depth,
   type,
   stepId,
   delTriggerModalClick,
}) => {
   return (
      <div
         role='presentation'
         onClick={ onClick }
         className='automation_item'
         style={ style }
         id={ `item-${ id }` }
      >
         {type !== 'trigger'
        && (
           <div role='presentation' onClick={ (e) => { e.stopPropagation(); delActionModalClick(id, depth, stepId); } } className='delete__action' title='Delete Action'>
              <IconNew name='AffiliateDeleteM' />
           </div>
        )}
         {type === 'trigger'
        && (
           <div role='presentation' onClick={ (e) => { e.stopPropagation(); delTriggerModalClick(id); } } className='delete__action' title='Delete Trigger'>
              <IconNew name='AffiliateDeleteM' />
           </div>
        )}
         <div className='item__title'>
            <div>
               <Icon name={ icon === 'enroll_in' ? 'enroll' : icon } />
            </div>
            <Text
               type={ textType.mediumLarge }
               size={ textSizes.small }
               inner={ title }
            />
         </div>
         <div className='item__content'>
            <Text
               type={ textType.regular148 }
               size={ textSizes.xsmall }
               style={ { color: '#727978' } }
               inner={ SliceAndConnectText(content, 25) }
            />
         </div>
      </div>
   );
};

Item.propTypes = {
   onClick: PropTypes.func,
   icon: PropTypes.string,
   title: PropTypes.string,
   content: PropTypes.string,
   style: PropTypes.any,
   delActionModalClick: PropTypes.func,
   id: PropTypes.number,
   depth: PropTypes.number,
   type: PropTypes.string,
   stepId: PropTypes.number,
   delTriggerModalClick: PropTypes.func,
};

export default Item;
