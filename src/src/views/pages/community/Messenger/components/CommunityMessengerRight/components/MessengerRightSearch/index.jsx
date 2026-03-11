import React, { useEffect } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import Tabs from 'components/elements/tabs';
import moment from 'moment';
import CommunityMessage from '../../../Message';

const MessengerRightSearch = () => {
   const {
      getFilteredMessages, search, setIsSearchActive, handleSearchMessage, userUuid,
   } = React.useContext(CommunityMessengerContext);
   const [messages, setMessages] = React.useState([]);
   const [selectedTab, setSelectedTab] = React.useState('messages');
   useEffect(() => {
      setMessages(getFilteredMessages());
   }, [search]);
   const messagesText = messages.filter((e) => e.type === 'text_message');
   const messagesFile = messages.filter((e) => e.type !== 'text_message');
   const tabVariants = [
      {
         value: 'messages', key: 'Messages', count: messagesText.length, iconName: 'CommunityMailM',
      },
      {
         value: 'files', key: 'Files', count: messagesFile.length, iconName: 'CommunityFileM',
      },
   ];

   const showMessage = (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      setIsSearchActive(false);
      handleSearchMessage('');
      setTimeout(() => {
         const element = document.getElementById(`message-${ id }`);
         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
   };

   return (
      <div className='messenger__right__search'>
         <div className='messenger__right__search__content'>
            <Text
               inner='Found in messages'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            <Tabs
               hasIcon={ true }
               isButton={ false }
               selectedVariant={ selectedTab }
               variants={ tabVariants }
               onSelect={ tab => setSelectedTab(tab) }
            />
            <div className='messenger__right__search__content__messages'>
               {(selectedTab === 'messages' ? messagesText : messagesFile).map((item) => {
                  return (
                     <div
                        role='presentation'
                        onClick={ (e) => showMessage(e, item.id) }
                        className='messenger__right__search__content__message'
                     >
                        <CommunityMessage
                           user={ item.user }
                           text={ item.text }
                           id={ item.id }
                           isFile={ item.type === 'file_unlock' }
                           fileOptions={ item.type === 'file_unlock' ? item.unlock_details : {} }
                           isFrom={ userUuid !== item.member_uuid }
                           time={ item.isLocalTime ? (moment(item.created_at || item.sent_at)).format('HH:mm') : (moment.utc(item.created_at || item.sent_at)).format('HH:mm') }
                           isHaveMessageBecome={ false }
                        />
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default MessengerRightSearch;
