import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import Switch from 'components/elements/switchNew';
import { getProperlyNotifyName } from 'utils/notificationHelpers';
import IconNew from 'components/elements/iconsSize';

const NotificationList = ({
   list, section, onChange, handleSelectNotification,
}) => {
   return (
      <div className='notification__list'>
         <div className='notification__list__top'>
            <div className='notification__list__text'>
               <Text
                  inner={ `${ section } Notifications` }
                  type={ txtTypes.mediumSmall }
                  size={ txtSizes.medium }
               />
            </div>
            <div className='notification__list__switch'>
               <Text
                  inner='Notify Member'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />
            </div>
            <div className='notification__list__switch'>
               <Text
                  inner='Notify Me'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />
            </div>
         </div>
         <div className='notification__list__content'>
            {list.map((item) => {
               return (
                  <div className='notification__list__item' key={ uniqueId() }>
                     <div className='notification__list__text'>
                        <Text
                           inner={ getProperlyNotifyName(item.id) }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                     <div className='notification__list__switch'>
                        <Switch
                           size='medium'
                           value={ !!item.member }
                           onChange={ (value) => onChange(item.id, 'member', value ? 1 : 0) }
                        />
                     </div>
                     <div className='notification__list__switch'>
                        <Switch
                           size='medium'
                           value={ !!item.admin }
                           onChange={ (value) => onChange(item.id, 'admin', value ? 1 : 0) }
                        />
                     </div>
                     {item.edited && (
                        <div className='notification__list__edit' role='presentation' onClick={ () => handleSelectNotification(item.id) }>
                           <IconNew name='NotificationEditM' />
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

NotificationList.propTypes = {
   list: PropTypes.array,
   onChange: PropTypes.func,
   section: PropTypes.string,
   handleSelectNotification: PropTypes.func,
};

export default NotificationList;
