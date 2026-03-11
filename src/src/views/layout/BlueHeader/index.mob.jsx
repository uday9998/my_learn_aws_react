import React from 'react';
import './index.mob.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';

const BlueHeader = ({ rightText }) => {
   return (
      <div className='mob-BlueHeader'>
         <Icon name='Logo' style={ { width: '104px', height: '24px' } } color='#ffffff' />
         <Text
            color='#ffffff'
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner={ rightText }
         />
      </div>
   );
};

BlueHeader.propTypes = {
   rightText: PropTypes.string,
};

BlueHeader.defaultProps = {
   rightText: 'Log in',
};

export default BlueHeader;
