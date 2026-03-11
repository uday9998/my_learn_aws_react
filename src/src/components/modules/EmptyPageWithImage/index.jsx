import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';
import './index.scss';

const EmptyPageWithImage = ({
   title,
}) => {
   return (
      <div className='emptyPage__founds'>
         <Text
            inner={ title }
            style={ { color: '#727978', textAlign: 'center' } }
            type={ txtTypes.mediumLargeGrey }
            size={ txtSizes.new_size_28 }
         />
         <img src={ emptyState } alt='No Products Yet' />
      </div>
   );
};

EmptyPageWithImage.propTypes = {
   title: PropTypes.string,
};

export default EmptyPageWithImage;
