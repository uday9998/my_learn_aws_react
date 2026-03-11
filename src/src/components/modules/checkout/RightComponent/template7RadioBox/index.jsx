import React from 'react';
import PropTypes from 'prop-types';

import RadioBox from 'components/elements/form/RadioNew';
import Icon from 'components/elements/Icon';

import './index.scss';
import Text from 'components/elements/TextNew';

const NewRadioBox = ({
   checked, iconName, innerText, textColor, borderColor,
}) => {
   return (
      <div className={ checked ? 'box__wrapper active' : 'box__wrapper' }>
         <div>
            <RadioBox 
               checked={ checked }
               label=''
               borderColor={ borderColor }
            />
         </div>
         <div className='text__title__wrapper'>
            <Icon name={ iconName } />
            <Text 
               inner={ innerText }
               style={ {
                  color: textColor,
               } }
            />
         </div>
      </div>
   );
};

NewRadioBox.propTypes = {
   checked: PropTypes.bool,
   iconName: PropTypes.string,
   innerText: PropTypes.string,
   textColor: PropTypes.string,
   borderColor: PropTypes.string,
};

export default NewRadioBox;