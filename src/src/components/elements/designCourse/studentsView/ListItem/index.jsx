import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';

const ListItem = ({ text }) => {
   return (
      <div className='listItem'>
         <div className='listItem__check'>
            <div className='checkmark' />
         </div>
         <Text
            style={ { marginLeft: '18px', letterSpacing: 'normal' } }
            type={ TextType.regular }
            size={ TextSize.small }
            inner={ text }
            bold
         />
      </div>
   );
};

ListItem.propTypes = {
   text: PropTypes.string,
};

ListItem.defaultProps = {
   text: '',
};

export default ListItem;
