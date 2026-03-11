import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

const PlanTypeMenuItem = ({
   text, icon, style, onClick,
}) => {
   return (
      <div
         className='planTypeMenuItem'
         style={ style }
         onClick={ () => onClick() }
         role='presentation'
      >
         <div className='planTypeMenuItem__content'>
            <Icon
               name={ icon }
               className='planTypeMenuItem__svg'
               color='#A9A8A8'
            />
            <Text
               size={ txtSizes.extraSmall }
               type={ txtType.normal }
               inner={ text }
            />
         </div>
      </div>
   );
};

PlanTypeMenuItem.propTypes = {
   text: PropTypes.string,
   icon: PropTypes.string,
   style: PropTypes.object,
   onClick: PropTypes.func,
};


export default PlanTypeMenuItem;
