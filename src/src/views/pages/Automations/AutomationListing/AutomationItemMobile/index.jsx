import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/elements/buttons/IconButton';
import Switch from 'components/elements/switchNew';

import './index.scss';

const AutomationItemMobile = ({
   item,
   openAutomation,
   onDelete,
   date,
   handleStatusChange,
}) => {
   return (
      <div
         className='automation__mobile__item'
      >
         <div>
            <span>{ item.name }</span>
            <div
               className='automation__mobile__item__actions'
            >
               <IconButton
                  onClick={ openAutomation }
                  name='AffiliateEditM'
               />
               <IconButton
                  onClick={ (event) => {
                     onDelete(event);
                  } }
                  name='AffiliateDeleteM'
               />
            </div>
         </div>
         <div>
            <span>Date</span>
            <span>{ date }</span>
         </div>
         <div>
            <span>Active</span>
            <Switch
               value={ !!item.status }
               onChange={ (value) => handleStatusChange(item.id, value) }
               size='medium'
            />
         </div>
      </div>
   );
};


AutomationItemMobile.propTypes = {
   item: PropTypes.object,
   openAutomation: PropTypes.func,
   onDelete: PropTypes.func,
   date: PropTypes.string,
   handleStatusChange: PropTypes.func,
};

export default AutomationItemMobile;
