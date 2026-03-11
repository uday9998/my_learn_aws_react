import React from 'react';
import './index.scss';
// import PropTypes from 'prop-types';
import joinImg from 'assets/images/dashboard/block.png';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';

const Academy = () => {
   return (
      <div className='miestro_community'>
         <div className='miestro_community__title'>
            <Text
               type={ textType.medium153 }
               size={ textSize.large }
               inner='Miestro Community'
            />
         </div>
         <div className='grey_scale' />
         <div
            role='presentation'
            onClick={ () => {
               window.open('https://www.facebook.com/groups/miestro', { target: '_blank' });
            } }
         >
            <img src={ joinImg } alt='join' />
         </div>
      </div>
   );
};

Academy.propTypes = {

};

export default Academy;
