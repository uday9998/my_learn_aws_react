import React from 'react';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import profile from 'assets/images/checkout/profile.png';

const advantages = [
   '2 Owners/Authors',
   'Email Support',
   'Custom domain support',
   'Drip content',
   'Basic email marketing access',
   'Access to 6 landing page templates',
   'Miestro Branding',
   'Ability To Add 10 Videos For Us To Host',
];

const AdvantagesBlock = () => {
   return (
      <div className='advantagesBlock'>
         <div className='advatagesList'>
            {
               advantages.map((advantage, index) => {
                  return (
                     // eslint-disable-next-line react/no-array-index-key
                     <div className='advatageItem' key={ index }>
                        <div className='m-r-exs'>
                           <Icon name='Checkmark' />
                        </div>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner={ advantage }
                        />
                     </div>
                  );
               })
            }
         </div>
         <div className='advantageBlock__testimonial'>
            <img src={ profile } alt='profile-pic' />
            <div>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='Elizabeth Martin'
               />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='“Miestro is the most valuable business resource we have ever purchased. I would be lost without Miestro.”'
               />
            </div>
         </div>
         <div className='advantagesBlock__btn'>
            <BaseButton
               style={ { paddingLeft: '45px', paddingRight: '44px' } }
               theme={ btnTheme.blueBordered }
               size={ btnSize.large }
               text='View More Testimonials'
            />
         </div>
      </div>
   );
};

export default AdvantagesBlock;
