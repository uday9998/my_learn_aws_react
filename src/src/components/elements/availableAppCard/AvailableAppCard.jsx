import React from 'react';
import './availableAppCard.scss';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';
import Text, { SIZES as sizes, TYPES as types } from '../TextNew';

const AvailableAppCard = ({ iconName, text }) => {
   return (
      <div className='availableAppCard'>
         <IconNew name={ iconName } />
         <Text
            inner={ text }
            type={ types.regularLarge }
            size={ sizes.small_new }
         />
      </div>
   );
};

AvailableAppCard.propTypes = {
   iconName: PropTypes.string,
   text: PropTypes.string,
};

export default AvailableAppCard;