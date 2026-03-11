import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSize } from 'components/elements/TextNew';


function LearnMoreButton({ uri, className }) {
   return (
      <a
         style={ { textDecoration: 'none' } }
         href={ uri }
         className={ className }
         target='_blank'
         rel='noopener noreferrer'
      >
         <Text
            inner='Learn More'
            type={ txtTypes.regularLarge }
            size={ txtSize.xsmall }
            style={ { color: '#24554E', whiteSpace: 'nowrap', textDecoration: 'none' } }
         />
      </a>
   );
}

LearnMoreButton.propTypes = {
   uri: PropTypes.string,
   className: PropTypes.string,
};

export default LearnMoreButton;
