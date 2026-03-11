import React from 'react';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';

const LoginItem = ({ name, icon }) => (
   <div className='loginItem'>
      <div className='loginItem__left'>
         <Icon name={ icon } />
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner={ name }
         />
      </div>
      <div className='loginItem__right'>
         <BaseButton
            theme={ btnTheme.lightBlue }
            size={ btnSize.medium }
            text='Connect'
         />
      </div>
   </div>
);

LoginItem.propTypes = {
   name: PropTypes.string,
   icon: PropTypes.string,
};

export default LoginItem;
