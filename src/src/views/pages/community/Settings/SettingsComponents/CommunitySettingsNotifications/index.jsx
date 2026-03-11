import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import getDeff from 'utils/getDeff';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';

const CommunitySettingsNotifications = ({ settings, onSave }) => {
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
      { key: 'When someone comments', value: 'when_someone_comment' },
      { key: 'When someone likes your post', value: 'when_someone_likes_your_post' },
      { key: 'When someone like your comment', value: 'when_someone_likes_your_comment' },
      { key: 'When someone replies to your comment', value: 'when_someone_replies_your_comment' },
      { key: 'When someone replies to your reply', value: 'when_someone_replies_your_reply' },
      { key: 'When someone mentions you', value: 'when_someone_mentions_you' },
      { key: 'When you receive a private message', value: 'when_you_receive_private_message' },
      { key: 'When a post, comment or reply is reported', value: 'when_post_comment_reply_is_reported' },
      { key: 'When a new member joins your community', value: 'when_new_member_joins_your_community' },
      { key: 'When a new member joins your space', value: 'when_new_member_joins_your_space' },
   ];

   return (
      <CommunitySettingsWrapper
         title='Community Notifications'
         isDisabled={ isDisabledButton() }
         onSave={ () => onSave(innerInputs) }
         tooltip='text'
      >
         <div className='community__settings__notifications'>
            <div className='community__settings__notifications__top'>
               <Text
                  inner='General Notifications'
                  type={ types.medium }
                  size={ sizes.medium }
               />
               <Text
                  inner='Notify Me'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div className='community__settings__notifications__options'>
               {items.map((e) => {
                  return (
                     <div className='community__settings__notifications__option'>
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
         </div>
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsNotifications.propTypes = {
   settings: PropTypes.object,
   onSave: PropTypes.func,
};

export default CommunitySettingsNotifications;
