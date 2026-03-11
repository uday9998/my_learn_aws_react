import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';


const AdminFreeTrial = ({ trialDays, inTrial }) => {
   const [isClose, setIsClose] = useState(false);
   if(!isClose && !inTrial) return null
   return (
         <div className='adminfreetrial'>
            <div className='adminfreetrial__content'>
               <Text
                  color='#7cb740'
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ `Your trial ends in ${ trialDays } days! Upgrade your account to continue working with Miestro!` }
               />
               <div role='presentation' className='closeIcon' onClick={ () => setIsClose(true) }>
                  <Icon name='CloseX' />
               </div>
            </div>
         </div>
   );
};

AdminFreeTrial.propTypes = {
   trialDays: PropTypes.number,
};

export default AdminFreeTrial;
