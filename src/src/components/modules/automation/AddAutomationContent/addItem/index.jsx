import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';

const AddItem = ({ onClick }) => {
   return (
      <div
         role='presentation'
         onClick={ onClick }
         className='add_item'
      >
         <Text
            inner='Add Trigger'
            type={ types.regular148 }
            size={ sizes.medium }
            style={ { color: '#24554E' } }
         />
      </div>
   );
};

AddItem.propTypes = {
   onClick: PropTypes.func,
};

export default AddItem;
