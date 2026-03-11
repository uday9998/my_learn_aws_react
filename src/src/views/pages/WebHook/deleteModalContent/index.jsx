import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';

const DeleteModalContentWebhook = ({ hook }) => {
   return (
      <div className='delete__modal__hook'>
         <Text
            inner='Are you sure you want to delete this webhook?'
            type={ textType.regularDefault }
            size={ textSize.small }
            style={ { color: '#727978' } }
         />
         <div className='delete__modal__hook__content'>
            <div className='item'>
               <div className='item__left'>
                  <Text
                     inner='Name'
                     type={ textType.mediumLarge }
                     size={ textSize.small }
                  />
               </div>
               <div className='item__right'>
                  <Text
                     inner={ hook.name || '-' }
                     type={ textType.regularDefault }
                     size={ textSize.small }
                  />
               </div>
            </div>
            <div className='item'>
               <div className='item__left'>
                  <Text
                     inner='URL Link'
                     type={ textType.mediumLarge }
                     size={ textSize.small }
                  />
               </div>
               <div className='item__right'>
                  <Text
                     inner={ hook.url }
                     type={ textType.regularDefault }
                     size={ textSize.small }
                  />
               </div>
            </div>
            <div className='item'>
               <div className='item__left'>
                  <Text
                     inner='Event Triggers'
                     type={ textType.mediumLarge }
                     size={ textSize.small }
                  />
               </div>
               <div className='item__right'>
                  <Text
                     inner={ hook.event_triggers }
                     type={ textType.regularDefault }
                     size={ textSize.small }
                  />
               </div>
            </div>
            <div className='item'>
               <div className='item__left'>
                  <Text
                     inner='Status'
                     type={ textType.mediumLarge }
                     size={ textSize.small }
                  />
               </div>
               <div className={ `item__right item__right__${ hook.status }` }>
                  <Text
                     inner={ hook.status }
                     type={ textType.regularDefault }
                     size={ textSize.small }
                  />
               </div>
            </div>
            <div className='item'>
               <div className='item__left'>
                  <Text
                     inner='Triggers'
                     type={ textType.mediumLarge }
                     size={ textSize.small }
                  />
               </div>
               <div className='item__right'>
                  <Text
                     inner={ hook.number_of_triggers }
                     type={ textType.regularDefault }
                     size={ textSize.small }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

DeleteModalContentWebhook.propTypes = {
   hook: PropTypes.object,
};

export default DeleteModalContentWebhook;
