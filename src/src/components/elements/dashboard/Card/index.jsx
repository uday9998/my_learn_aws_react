import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';


const Card = ({
   title, text, icon, buttonText, buttonLink, style, isAction, iconName,
}) => {
   function extLink() {
      const settingsPath = '/admin/settings#general';
      if (buttonLink.includes('#')) {
         localStorage.setItem('openModal', true);
         window.open(settingsPath, '_blank');
      } else if (buttonLink) {
         if (isAction) {
            buttonLink();
         } else {
            window.open(buttonLink, '_blank');
         }
      }
   }

   return (
      <div
         className='dashboardCard'
         style={ style }
      >
         <div className='dashboardCard__icon'>
            <IconNew
               name={ icon }
            />
         </div>
         <div className='dashboardCard__title'>
            <Text
               type={ TextType.mediumTitle }
               size={ TextSize.medium }
               inner={ title }
            />
         </div>
         <div className='dashboardCard__content'>
            <Text
               type={ TextType.regularDefaultGrey145 }
               size={ TextSize.medium }
               inner={ text }
            />
         </div>
         <BaseButton
            theme={ btnTheme.tertiary }
            size={ btnSize.full }
            text={ buttonText }
            onClick={ extLink }
            isIconRight={ iconName === 'PlusM' }
            isIconLeft={ iconName === 'ArrowRightM' }
            iconName={ iconName }
         />
      </div>
   );
};

Card.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   icon: PropTypes.string,
   buttonText: PropTypes.string,
   style: PropTypes.object,
   buttonLink: PropTypes.any,
   isAction: PropTypes.bool,
   iconName: PropTypes.string,
};

Card.defaultProps = {
   title: 'New Project',
   text: 'Start your new project in five easy steps and start by adding new class information to get started.',
   icon: 'Rocket',
   buttonText: 'Learn More',
   isAction: false,
};

export default Card;
