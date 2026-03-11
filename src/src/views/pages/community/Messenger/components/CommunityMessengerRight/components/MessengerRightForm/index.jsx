import React from 'react';
import './index.scss';
import Button from 'components/elements/buttons/BaseButtonNew';
import MessageEditor from 'components/modules/messageEditor';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';

const MessengerRightForm = () => {
   const {
      onTyping, onSendMessage, message, onSendFile, role, onFocusInput,
      selectedConverstation, isSearchActive, community,
   } = React.useContext(CommunityMessengerContext);
   if (isSearchActive) return null;
   const settings = community.community_settings.community_messaging_settings;
   if (selectedConverstation[role]?.member.muted_since && !selectedConverstation?.isGroup) {
      return (
         <div className='messenger__right__form__muted'>
            <Text
               inner='Muted'
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
      );
   }
   const type = selectedConverstation.isGroup ? 'enable_group_messaging' : 'enable_private_messaging';
   const isHydden = settings[type] === 0 && role !== 'admin';
   if (isHydden) {
      return null;
   }
   return (
      <div className='messenger__right__form'>
         <MessageEditor
            logginedUserRole={ role }
            value={ message }
            onFocusInput={ onFocusInput }
            onChange={ (name, v) => {
               onTyping(v);
            } }
            onSendFile={ onSendFile }
            onSendMessage={ onSendMessage }
            role={ role }
            community={ community }
         />
         <Button
            onClick={ () => onSendMessage() }
            text='Send'
            disabled={ community.userSuspended }
         />
      </div>
   );
};

export default MessengerRightForm;
