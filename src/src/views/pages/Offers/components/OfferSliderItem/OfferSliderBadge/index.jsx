import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';

const OfferSliderBadge = ({
   text,
   backgroundColor,
   color,
   iconName,
   border,
}) => {
   return (
      <div
         className='offer__badge'
         style={ { backgroundColor, border } }
      >
         <IconNew
            name={ iconName }
            color={ color }
         />
         <span
            style={ { color } }
         >
            {text}
         </span>
      </div>
   );
};

OfferSliderBadge.defaultProps = {
   border: 'none',
};

OfferSliderBadge.propTypes = {
   text: PropTypes.string,
   backgroundColor: PropTypes.string,
   color: PropTypes.string,
   iconName: PropTypes.string,
   border: PropTypes.string,
};

export default OfferSliderBadge;
