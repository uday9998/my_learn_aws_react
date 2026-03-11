import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const SettingItem = ({
   text, active, tabId, switchTab, iconName,
}) => {
   return (
      <div className={ `settingItem__wrapper ${ active ? 'settingItem__wrapper__active' : '' }` }>
         <div
            className='settingItem'
            role='presentation'
            id={ tabId }
            onClick={ () => {
               switchTab(tabId);
            } }
         >
            <IconNew name={ iconName } />
            <Text
               inner={ text }
               type={ txtType.regularDefault }
               size={ txtSizes.small }
            />
         </div>
         <IconNew name='SelectSettingsTabM' />
      </div>
   );
};

export default SettingItem;

SettingItem.propTypes = {
   text: PropTypes.string,
   active: PropTypes.bool,
   tabId: PropTypes.any,
   iconName: PropTypes.string,
   switchTab: PropTypes.func,
};
