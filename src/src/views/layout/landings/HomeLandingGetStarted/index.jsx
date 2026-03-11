import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const HomeLandingGetStarted = () => {
   return (
      <div className='homeLandingGetStarted'>
         <div className='homeLandingGetStarted__desc'>
            <div>
               <Text
                  type={ TextType.heavy }
                  size={ TextSize.extraLarge }
                  inner='Ready to get started?'
               />
            </div>
            <div className='m-t-m title'>

               <Text
                  type={ TextType.regular }
                  size={ TextSize.large }
                  inner='Join countless coaches, consultants, teachers and experts who are creating their own online memberships!'
               />
            </div>
            <div className='m-t-exl button-content'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  style={ { height: '48px' } }
                  text='Start Free Trial'
               />
            </div>
         </div>
      </div>
   );
};

export default HomeLandingGetStarted;
