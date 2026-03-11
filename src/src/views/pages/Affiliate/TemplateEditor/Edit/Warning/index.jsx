import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';

const AffiliateEditWarning = ({ props, changeProp }) => {
   const { color } = props;
   return (
      <div className='affiliate__edit__warning'>
         <ColorInput
            label='Text Color'
            name='color'
            value={ color }
            onChange={ (key, value) => changeProp(value, 'color') }
            isPageBuilder={ true }
         />
      </div>
   );
};

AffiliateEditWarning.propTypes = {
   props: PropTypes.object,
   changeProp: PropTypes.func,
   color: PropTypes.string,
};

export default AffiliateEditWarning;
