import React from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';

const MessengerTyping = () => {
   const { selectedConverstation, role, typingData } = React.useContext(CommunityMessengerContext);
   if (typingData && typingData.conversationId === selectedConverstation[role]?.chat_room_id) {
      return (
         <div className='messenger__typing'>
            <Text
               inner={ `${ typingData.user.username } is typing` }
               type={ types.regular148 }
               size={ sizes.small }
               style={ { color: '#8E8D94' } }
            />
            <div className='circle' />
            <div className='circle' />
            <div className='circle' />
         </div>
      );
   }
   return null;
};

MessengerTyping.propTypes = {
};

export default MessengerTyping;
