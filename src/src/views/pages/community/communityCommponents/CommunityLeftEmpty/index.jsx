import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import HiImage from 'assets/images/community/Hi.png';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';


const CommunityLeftEmpty = ({
   createEvent, onInviteMember, isFromPostPage, createPost, role, allowedButton, community,
}) => {
   return (
      <div className='community__left__empty'>
         <img src={ HiImage } alt='' />
         <div className='community__left__empty__text'>
            <Text
               inner={ `You don't have any  ${ isFromPostPage ? 'posts' : 'events' } yet` }
               type={ types.regularDefault }
               size={ sizes.small }
            />
            {(allowedButton || role === 'admin') && (
               <Text
                  inner={ `Create the first ${ isFromPostPage ? 'post' : 'event' }${ role === 'admin' ? ' and invite people' : '' }` }
                  type={ types.regularDefaultSmall }
                  size={ sizes.size_28 }
               />
            )}
         </div>
         <div className='community__left__empty__buttons'>
            {(allowedButton || role === 'admin') && (
               <Button
                  text={ `Create ${ isFromPostPage ? 'Post' : 'Event' }` }
                  onClick={ () => {
                     if (isFromPostPage) {
                        createPost();
                        return;
                     }
                     createEvent();
                  } }
                  style={ communityButtonColors(community, role) }
               />
            )}
            {role === 'admin' && (
               <Button
                  text='Invite Members'
                  theme={ themes.secondary }
                  onClick={ () => onInviteMember() }
                  iconName='CommunityAddUserGreen'
                  iconColor={ community?.community_settings?.branding?.bg_color || '#24554E' }
                  isIconRight={ true }
                  isHidenDiv={ true }
                  style={ communitySecondaryButtonColors(community, role) }
               />
            )}
         </div>
      </div>
   );
};

CommunityLeftEmpty.propTypes = {
   createEvent: PropTypes.func,
   isFromPostPage: PropTypes.bool,
   onInviteMember: PropTypes.func,
   createPost: PropTypes.func,
   role: PropTypes.string,
   allowedButton: PropTypes.bool,
   community: PropTypes.object,
};

export default CommunityLeftEmpty;
