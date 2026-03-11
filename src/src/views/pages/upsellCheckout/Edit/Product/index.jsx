import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';

const UpsellEditProduct = ({ props, changeProp }) => {
   const {
      bgColor, paddingTop, paddingBottom, paddingLeft, paddingRight,
   } = props;
   return (
      <div className='upsell__edit__product'>
         <ColorInput
            label='Background Color'
            name='bgColor'
            value={ bgColor }
            onChange={ (key, value) => changeProp(value, 'bgColor') }
            isPageBuilder={ true }
         />
         <Spacing
            top={ paddingTop }
            bottom={ paddingBottom }
            left={ paddingLeft }
            right={ paddingRight }
            changeProp={ changeProp }
         />
      </div>
   );
};

UpsellEditProduct.propTypes = {
   bgColor: PropTypes.string,
   props: PropTypes.object,
   changeProp: PropTypes.func,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
};

export default UpsellEditProduct;
