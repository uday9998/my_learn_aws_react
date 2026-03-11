import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';

const LandingHeader = () => {
   return (
      <div className='landingHeader'>
         <div className='content_center'>
            <div className='landingHeader_leftSide'>
               <div className='landingHeader__logo'>
                  <Icon name='Logo' color='#3f4f65' className='desktop-logo' />
                  <Icon name='SmallLogo' color='#3f4f65' className='mobile-logo' />
               </div>
               <div className='landingHeader__nav'>
                  <div className='m-r-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.small }
                        bold
                        inner='Features'
                     />
                  </div>
                  <div className='m-r-exl m-l-exl'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.small }
                        bold
                        inner='Pricing'
                     />
                  </div>
                  <div className='m-l-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.small }
                        bold
                        inner='Blog'
                     />
                  </div>
               </div>
            </div>
            <div className='landingHeader_rightSide'>
               <div className='landingHeader__sign'>
                  <div className='m-r-exl'>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.small }
                        inner='Login'
                     />
                  </div>
                  <BaseButton
                     theme={ btnTheme.darkBlue }
                     size={ btnSize.large }
                     text='Register'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default LandingHeader;
