
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const EmptyPageNew = ({
   title, subtitle, iconName, buttonName, handleAction,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');

   const handleCreateEmail = () => {
      if (!Array.isArray(permissions)) {
         if (buttonName.includes('Create Product') || !buttonName) {
            handleAction();
         } else if (permissions.email_marketing && buttonName.includes('Create New Email')) {
            handleAction();
         } else {
            setPopupTitle('Email Marketing');
            setShowPopup(true);
         }
      } else {
         handleAction();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='emptyPageNew'>
         {
            showPopup && createPortal(<PricingPopup 
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <div className='info__wrapper'>
            <div className='icon__wrapper'>
               <IconNew name={ iconName } width='50px' height='50px' />
            </div>
            <div className='text__wrapper'>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner={ subtitle }
               />
               <Text
                  type={ TextType.regularDefaultSmallX }
                  size={ TextSize.small14 }
                  inner={ title }
                  style={ {
                     color: 'rgba(114, 121, 120, 1)',
                  } }
               />
            </div>
         </div>
         <div>
            {
               buttonName && (
                  <BaseButton
                     theme={ btnTheme.primary }
                     size={ btnSize.large50 }
                     text={ buttonName }
                     onClick={ handleCreateEmail }
                  />
               )
            }
         </div>
            
      </div>
   );
};

EmptyPageNew.defaultProp = {
   title: 'Title',
   subtitle: 'Subtitle',
   iconName: 'EmojiM',
   buttonName: 'Create',
};

EmptyPageNew.propTypes = {
   subtitle: PropTypes.string,
   title: PropTypes.string,
   iconName: PropTypes.string,
   buttonName: PropTypes.string,
   handleAction: PropTypes,
};

export default EmptyPageNew;