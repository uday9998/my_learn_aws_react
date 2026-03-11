import React from 'react';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';

const WelcomeDashboard = ({ authUser }) => {
   return (
      <div className='welcomeDashboard'>
         <div className='welcomeDashboard__content'>
            <IconNew name='WaveL' />
            <Text
               type={ textType.mediumTitle }
               size={ textSize.size_28 }
               inner={ `Welcome Back, ${ authUser.name }` }
            />
         </div>
      </div>
   );
};

WelcomeDashboard.propTypes = {
   authUser: PropTypes.object,
};

export default WelcomeDashboard;
