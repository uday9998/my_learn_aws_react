import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import level from 'assets/images/promotions/level.png';
import PopupWrapper from 'components/elements/wrappers/PopupWrapper';
import { isLocalhost } from 'utils/Helpers';
import confetti from 'assets/images/confetti.png';

const apiUrl = isLocalhost() ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;

const CongratulationsCard = ({
   badgeTitle, successMessage, handleGotit, bgColor, image, primaryTheme, btnColor, btnText, btnTextColor,
}) => {
   let imageUrl = null;
   if (image.startsWith('https://ucarecdn') || image.includes('amazonaws')) {
      imageUrl = image;
   } else {
      imageUrl = `${ apiUrl }${ image }`;
   }
   return (
      <PopupWrapper close={ false }>
         <div className='congratulationsCard' style={ { backgroundColor: bgColor } }>
            <div className='congratulations_confettiImg'>
               <img src={ confetti } alt='dandur' />
            </div>
            <div className='congratulationsCard_content'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner={ badgeTitle || 'Congratulations' }
                  style={ { fontFamily: primaryTheme } }
               />
               <div className=' m-b-m'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner={ successMessage || 'You’ve completed first level of class. Keep going!' }
                     style={ { fontFamily: primaryTheme } }
                  />
               </div>
               <BaseButton
                  theme={ btnTheme.darkBlue }
                  size={ btnSize.medium }
                  text={ btnText }
                  onClick={ () => handleGotit() }
                  style={ { fontFamily: primaryTheme, background: btnColor, color: btnTextColor } }
               />
            </div>
            <div className='congratulationsCard__image'>
               <img src={ imageUrl } alt='level' className='levelImg' />
            </div>
         </div>
      </PopupWrapper>
   );
};

CongratulationsCard.propTypes = {
   badgeTitle: PropTypes.string,
   successMessage: PropTypes.string,
   handleGotit: PropTypes.func,
   bgColor: PropTypes.string,
   image: PropTypes.string,
   primaryTheme: PropTypes.string,
   btnColor: PropTypes.string,
   btnTextColor: PropTypes.string,
   btnText: PropTypes.string,
};

CongratulationsCard.defaultProps = {
   handleGotit: () => {},
   bgColor: '#fff',
   btnColor: '#006dff',
   btnTextColor: 'red',
   btnText: 'Got it',
   image: level,
};


export default CongratulationsCard;
