import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';

const DropDownItem = ({ text, onClick }) => {
   return (
      <div className='dropDown__item' role='presentation' onClick={ onClick }>
         <Text
            inner={ text }
            type={ txtTypes.regularLarge }
            size={ txtSizes.xsmall }
         />
      </div>
   );
};

DropDownItem.propTypes = {
   text: PropTypes.string,
   onClick: PropTypes.func,
};

export default DropDownItem;
