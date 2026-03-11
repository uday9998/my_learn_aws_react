import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import IconNew from '../iconsSize';
import Text, { SIZES as sizes } from '../TextNew';
import BaseButton, { THEMES as themes } from '../buttons/BaseButtonNew';

import './index.scss';

const PricingPopup = ({
   handleClosePopup,
   handleChangeVideo,
   popupTitle,
   isProduct = false,
   isCheckout = false,
   isEvent = false,
   isUpload = false,
   isCommunity = false,
}) => {
   const history = useHistory();
   const navigateToAllPlans = () => {
      if (!history.location.pathname.includes('/account')) {
         history.push('/admin/account');
         localStorage.setItem('showPlans', 'showPlans');
      } 

      handleClosePopup();
   };

   return (
      <div className='popup__wrapper'>
         <div className='popup__inner__wrapper'>
            <span role='presentation' onClick={ handleClosePopup }>
               <IconNew name='Close' />
            </span>
            <div className='bottom__wrapper'>
               <div className='text__icon__wrapper'>
                  <IconNew name='PermissionPopup' />
                  <div className='title__wrapper'>
                     <Text
                        inner={ isCommunity ? popupTitle 
                           : popupTitle.slice(0, 1).toUpperCase() + popupTitle.slice(1).toLowerCase()
                        }
                        size={ sizes.size_28 }
                     />
                  </div>
                  <div className='subtitle__wrapper'>
                     <Text
                        inner={ isProduct ? 'Updrage your plan to add more products.' : isCheckout ? 'Upgrade you plan to be able to edit the checkout' : isEvent ? 'Upgrade your plan to allow event creation! ' : isUpload ? 'The file size is over the current plan limit' : isCommunity ? 'Upgrade your plan to add more rooms!' : `Upgrade your plan to have access to ${ popupTitle.toLowerCase() }` }
                        size={ sizes.size_14 }
                        style={ {
                           color: '#727978',
                        } }
                     />
                  </div>
               </div>
               {
                  isUpload ? (
                     <div className='buttons__wrapper'>
                        <BaseButton
                           text='Change Video'
                           theme={ themes.new_privacy }
                           onClick={ handleChangeVideo }
                        />
                        <BaseButton
                           text='Upgrade'
                           onClick={ navigateToAllPlans }
                        />
                     </div>
                  ) : (
                     <div className='buttons__wrapper'>
                        <BaseButton
                           text='See All Plans'
                           theme={ themes.new_privacy }
                           onClick={ navigateToAllPlans }
                        />
                        <BaseButton
                           text='Upgrade'
                           onClick={ navigateToAllPlans }
                        />
                     </div>
                  )
               }
            </div>
         </div>
      </div>
   );
};

PricingPopup.propTypes = {
   handleClosePopup: PropTypes.func,
   handleChangeVideo: PropTypes.func,
   popupTitle: PropTypes.string,
   isProduct: PropTypes.bool,
   isCheckout: PropTypes.bool,
   isEvent: PropTypes.bool,
   isUpload: PropTypes.bool,
   isCommunity: PropTypes.bool,
};

export default PricingPopup;