import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Switch from 'components/elements/switchNew';
import image from 'assets/images/schoolRoom/browser.png';

const SchoolRoomWatchingSettings = ({ inputs, onChange }) => {
   return (
      <div className='watching__section'>
         <div className='watching__section__top'>
            <Text
               inner='Enable Continue Watching'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Switch
               value={ inputs.continue_watching }
               size='medium'
               onChange={ () => onChange('continue_watching', !inputs.continue_watching) }
            />
         </div>
         <img src={ image } alt='' />
      </div>
   );
};

SchoolRoomWatchingSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default SchoolRoomWatchingSettings;
