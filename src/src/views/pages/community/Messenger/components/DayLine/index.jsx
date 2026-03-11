import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const MessengerDayLine = ({ text }) => {
   return (
      <div className='messenger__day__line'>
         <div className='row' />
         <Text
            inner={ text }
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { color: '#444C4B' } }
         />
         <div className='row' />
      </div>
   );
};

MessengerDayLine.propTypes = {
   text: PropTypes.string,
};

export default MessengerDayLine;
