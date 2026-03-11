import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';

const Card = ({ icon, title, content }) => {
   return (
      <div className='Card'>
         <div className='card__title'>
            <Icon name={ icon } />
            <Text
               type={ textType.mediumLarge }
               size={ textSizes.small }
               inner={ title }
            />
         </div>
         <div className='card__content'>
            <Text
               type={ textType.regular148 }
               size={ textSizes.xsmall }
               inner={ content }
            />
         </div>
      </div>
   );
};

Card.propTypes = {
   icon: PropTypes.string,
   title: PropTypes.string,
   content: PropTypes.string,
};

export default Card;
