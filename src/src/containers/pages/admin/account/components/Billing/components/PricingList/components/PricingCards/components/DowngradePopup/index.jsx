import React from 'react';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import './index.scss';

const DowngradePopup = ({
   handleClosePopup,
   handleUpdatePlan,
   title,
}) => {
   const closePopup = () => {
      handleClosePopup();
   };

   const handleConfirm = () => {
      handleUpdatePlan(title);
   };

   const handleNavigateSupport = () => {
      // window.open('https://support.miestro.com/', '_blank');
      if (window.OpenWidget) {
         window.OpenWidget.call('maximize');
      } 
   };

   return (
      <div className='downgrade__popup__wrapper'>
         <div className='inner__popup__wrapper'>
            <div className='top__section__wrapper'>
               <Text
                  inner='Important Notice'
                  size={ sizes.size_28 }
               />
               <div role='presentation' onClick={ closePopup }>
                  <IconNew name='Close' />
               </div>
            </div>
            <div className='center__description__section__wrapper'>
               <Text 
                  inner='Downgrading your plan will result in the system randomly removing any additional options you currently have, and this information cannot be restored. Are you sure you want to proceed with downgrading your subscription?'
                  style={ {
                     fontWeight: 400,
                     color: '#7D7D7D',
                     fontSize: '19px',
                  } }
               />
            </div>
            <div className='buttons__wrapper'>
               {/* <BaseButton 
                  text='Support'
                  theme={ themes.secondary }
                  onClick={ handleNavigateSupport }
               /> */}
               <BaseButton 
                  text='Confirm Downgrade'
                  theme={ themes.secondary }
                  onClick={ handleConfirm }
               />
               <BaseButton
                  text='Cancel'
                  theme={ themes.red }
                  onClick={ closePopup }
               />
            </div>
         </div>
      </div>
   );
};

DowngradePopup.propTypes = {
   handleClosePopup: PropTypes.func,
   handleUpdatePlan: PropTypes.func,
   title: PropTypes.string,
};

export default DowngradePopup;