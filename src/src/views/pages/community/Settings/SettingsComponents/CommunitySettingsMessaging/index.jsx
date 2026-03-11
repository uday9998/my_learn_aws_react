import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import getDeff from 'utils/getDeff';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';

const CommunitySettingsMessaging = ({ settings, onSave }) => {
   const [innerInputs, setInnerInputs] = useState({
      ...settings,
   });

   useEffect(() => {
      setInnerInputs({
         ...innerInputs,
      });
   }, [settings]);

   const handleInnerInputChannge = (name, value) => {
      setInnerInputs({
         ...innerInputs,
         [name]: value ? 1 : 0,
      });
   };

   const isDisabledButton = () => {
      const deff = getDeff(settings, innerInputs);
      return Object.keys(deff).length === 0;
   };

   const items = [
      { key: 'Enable group messaging', value: 'enable_group_messaging' },
      { key: 'Enable private messaging', value: 'enable_private_messaging' },
   ];

   return (
      <CommunitySettingsWrapper
         title='Community Messaging'
         isDisabled={ isDisabledButton() }
         tooltip='text'
         onSave={ () => onSave(innerInputs) }
      >
         <div className='community__settings__messaging'>
            {items.map((e) => {
               return (
                  <div className='community__settings__messaging__option'>
                     <Text
                        inner={ e.key }
                        size={ sizes.small }
                        type={ types.regularDefault }
                     />
                     <Switch
                        size='medium'
                        value={ innerInputs[e.value] }
                        onChange={ (val) => handleInnerInputChannge(e.value, val) }
                     />
                  </div>
               );
            })}
         </div>
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsMessaging.propTypes = {
   onSave: PropTypes.func,
   settings: PropTypes.object,
};

export default CommunitySettingsMessaging;
