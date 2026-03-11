import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/elements/Icon';
import Text, { SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const CheckListLeftComp = ({
   inner, verified, notVerifiedIconName,
}) => {
   return (
      <div className='icon__text__wrapper' role='presentation'>
         <Icon name={ verified ? 'CheckListCheck' : notVerifiedIconName } />

         <Text 
            inner={ inner }
            size={ sizes.small14_500 }
            style={ {
               color: verified ? '#A1A5A5' : '#131F1E', 
            } }
         />
      </div>
   );
};

CheckListLeftComp.propTypes = {
   inner: PropTypes.string,
   verified: PropTypes.bool,
   notVerifiedIconName: PropTypes.string,
};

export default CheckListLeftComp;