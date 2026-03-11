import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import moment from 'moment';
import classNames from 'classnames';

const MessengerUserProfile = ({
   image, isOnline, text, name, isActive, chatRoomId, isGroup, time, messagesNotificationsCount, isAdmin,
   hideTime, keepTextLength
}) => {
   const { typingData } = React.useContext(CommunityMessengerContext);
   return (
      <div className='messenger__user__info'>
         <div className='messenger__user__info__picture'>
            {image ? (
               <img src={ image } alt='' />
            ) : (
               <IconNew name='GroupChatSvgM' />
            )}
            {isOnline && (
               <div className='messenger__user__info__picture__circle' />
            )}
            {isAdmin && (
               <div className='messenger__user__info__picture__isAdmin'>
                  <p>A</p>
               </div>
            )}
         </div>
         <div className='messenger__user__info__info'>
            <div className='name__time__wrapper'>
               <Text
                  inner={ name }
                  type={ types.mediumLarge }
                  size={ sizes.small }
                  style={ { color: isActive ? '#fff' : '#131F1E' } }
               />
               {
                  !isGroup && !hideTime && (
                     <Text
                        inner={ moment(time).isValid() ? `${ (moment(time)).format('HH:mm') } am` : '' }
                        type={ types.regular148 }
                        size={ sizes.xsmall }
                        style={ { color: isActive ? '#A6C9C5' : '#444C4B' } }
                     />
                  )
               }
            </div>
            {typingData && typingData.conversationId === chatRoomId ? (
               <div className='messenger__left__typing'>
                  <Text
                     inner={ isGroup ? `${ typingData.user.username }` : 'typing' }
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                     style={ { color: isActive ? '#fff' : '#8E8D94' } }
                  />
                  <div className='circle' style={ { background: isActive ? '#fff' : '#8E8D94' } } />
                  <div className='circle' style={ { background: isActive ? '#fff' : '#8E8D94' } } />
                  <div className='circle' style={ { background: isActive ? '#fff' : '#8E8D94' } } />
               </div>
            ) : (
               <div className='text__notifications__wrapper'>
                  <div
                     className={classNames(
                        'messenger__user__info__text',
                        {
                           messenger__user__info__text__cut: !keepTextLength,
                           messenger__user__info__text__group: isGroup,
                           messenger__user__info__text__keepLength: keepTextLength,
                        }
                     )}
                     style={ { color: isActive ? '#F8FAFA' : '#727978' } }
                     dangerouslySetInnerHTML={ { __html: text } }
                  />
                  {messagesNotificationsCount !== 0 && (
                     <div className='messenger__user__right__messages'>
                        <Text
                           inner={ messagesNotificationsCount }
                           type={ types.medium150 }
                           size={ sizes.xsmall }
                           style={ { color: '#fff' } }
                        />
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

MessengerUserProfile.propTypes = {
   image: PropTypes.string,
   isOnline: PropTypes.bool,
   text: PropTypes.string,
   name: PropTypes.string,
   chatRoomId: PropTypes.number,
   isActive: PropTypes.bool,
   isGroup: PropTypes.bool,
   time: PropTypes.string,
   messagesNotificationsCount: PropTypes.number,
   isAdmin: PropTypes.bool,
   hideTime: PropTypes.bool,
   keepTextLength: PropTypes.bool,
};

export default MessengerUserProfile;
