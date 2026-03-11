import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';

const LandingGetStarted = ({ isColorBlue }) => {
   return (
      <div className='landingGetStarted'>
         <div>
            <Text
               style={ { fontSize: '40px' } }
               type={ TextType.normal }
               size={ TextSize.extraLarge }
               inner='Ready to get started?'
            />
         </div>
         <div className='m-t-m'>
            <Text
               type={ TextType.regular }
               size={ TextSize.medium }
               inner={ ['Join countless coaches, consultants, teachers and', <br />, 'experts who are creating their own online', <br />, 'memberships!'] }
            />
            <Text
               type={ TextType.regular }
               size={ TextSize.medium }
               inner='Join countless coaches, consultants, teachers and experts who are creating their own online memberships!'
            />
         </div>
         <div className='m-t-exl'>
            <BaseButton
               theme={ isColorBlue ? btnTheme.darkBlue : btnTheme.darkGreen }
               size={ btnSize.large }
               style={ { height: '48px' } }
               text='Start Free Trial'
            />
         </div>
      </div>
   );
};

LandingGetStarted.propTypes = {
   isColorBlue: PropTypes.bool,

};

LandingGetStarted.defaultProps = {
   isColorBlue: false,
};

export default LandingGetStarted;
