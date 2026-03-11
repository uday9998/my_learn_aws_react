import React from 'react';
import PropTypes from 'prop-types';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import './index.scss';
import MemberProfileLeft from './MemberProfileComponents/MemberProfileLeft';
import MemberProfileRight from './MemberProfileComponents/MemberProfileRight';

const MemberProfile = ({
   communityName, member, user, userSubscribe, onDelete, filterMember, communityOwnerId, onSelectCommunity,
   role, community,
}) => {
   const isUserFollowed = () => {
      const isFollowed = member.user_followers.filter((e) => e.follower_user_id === user.id);
      return !!isFollowed.length;
   };

   return (
      <div className='community__member__profile'>
         <BreadCrumb
            links={ [{
               text: communityName,
               goTo: () => onSelectCommunity(),
            }, {
               text: member.name,
               goTo: () => {},
            }] }
         />
         <div className='community__member__profile__bottom'>
            <MemberProfileLeft
               userSubscribe={ userSubscribe }
               onDelete={ onDelete }
               communityOwnerId={ communityOwnerId }
               user={ user }
               role={ role }
               member={ member }
               filterMember={ filterMember }
               isFollower={ isUserFollowed() }
               community={ community }
            />
            <MemberProfileRight member={ member } />
         </div>
      </div>
   );
};

MemberProfile.propTypes = {
   communityName: PropTypes.string,
   member: PropTypes.object,
   communityOwnerId: PropTypes.func,
   onDelete: PropTypes.func,
   onSelectCommunity: PropTypes.func,
   user: PropTypes.object,
   userSubscribe: PropTypes.func,
   filterMember: PropTypes.func,
   role: PropTypes.string,
   community: PropTypes.object,
};

export default MemberProfile;
