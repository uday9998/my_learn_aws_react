import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import ColorInput from 'components/elements/form/ColorInput';

const AffiliateEditForm = ({ props, changeProp }) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, color, linksColor = '#24554E'
   } = props;
   return (
      <div className='affiliate__edit__form'>
         <Spacing
            changeProp={ (value, name) => changeProp(value, name) }
            left={ paddingLeft }
            right={ paddingRight }
            bottom={ paddingBottom }
            top={ paddingTop }
         />
         <ColorInput
            label='Text Color'
            name='color'
            value={ color }
            onChange={ (key, value) => changeProp(value, 'color') }
            isPageBuilder={ true }
         />
         <ColorInput
            label='Links Color'
            name='linksColor'
            value={ linksColor }
            onChange={ (key, value) => changeProp(value, 'linksColor') }
            isPageBuilder={ true }
         />
      </div>
   );
};

AffiliateEditForm.propTypes = {
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   props: PropTypes.object,
   color: PropTypes.string,
   linksColor: PropTypes.string,
   changeProp: PropTypes.func,
};

export default AffiliateEditForm;
