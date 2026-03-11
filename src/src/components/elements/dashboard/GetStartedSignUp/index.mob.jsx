import React from 'react';
import './index.mob.scss';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';

const GetStartedSignUp = () => {
   return (
      <div className='getStartedSignUp'>
         <div className='getStartedSignUp__text'>
            <Text
               type={ textType.regular }
               size={ textSize.extraSmall }
               inner='I will tell you from experience my webinars fill up ridiculously fast... but themain reason I will tell you from experience my webinars fill up ridiculously fast... but themain reason'
               color='#6c7f99'
            />
         </div>
         <div className='getStartedSignUp__buttons'>
            <BaseButton
               theme={ buttonTheme.lightGreen }
               size={ buttonSizes.full }
               text='Learn More'
            />
            <div className='m-t-m w-full'>
               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.full }
                  text='Sign Up For Training'
               />
            </div>
         </div>
      </div>
   );
};

export default GetStartedSignUp;
