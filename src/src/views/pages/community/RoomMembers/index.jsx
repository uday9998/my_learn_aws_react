import React from 'react';
import PropTypes from 'prop-types';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import Input from 'components/elements/inputNew';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';
import CommunityPostsRight from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPostsRight';
import Pagination from 'components/elements/Pagination';
import { getMemberRole } from 'utils/getMemberRoleCommunity';
import RoomMembersLeft from './RoomMembersComponents/RoomMemembersLeft';
import RoomMemberEmpty from './RoomMembersComponents/RoomMemembersLeft/RoomMemberEmpty';

const options = {
   newest: 'Recently Added',
   oldest: 'Oldest First',
   A_Z: 'Name A to Z',
   Z_A: 'Name Z to A',
};

const firstOtions = {
   all: 'All Users',
   online: 'Online Members',
   admin: 'Admins',
};

const RoomMembersView = ({
   community, room, members, searchInput, setSearchInput, onInviteMember, user, data, filterOptions, setFilterOptions,
   handleChangePage, initialCount, goToMemberProfile, followUnfollow, deleteMember, handleReport, onlineUsers,
   goToCommunity, goToRoom,
}) => {
   const getOnlineCount = () => {
      if (members && members.length && members[0]) {
         return members && members[0] && members.filter(e => onlineUsers?.includes(e?.id)).length; 
      }
      return null;
   };
   const memberRole = getMemberRole(community.community_member, user.id);
   const actions = {
      isAdminView: community.user_id === user.id,
      userSubscribe: id => followUnfollow(community.id, id),
      isHiddenActions: (id) => id !== user.id,
      onReport: (id, text) => handleReport(community.id, id, text),
      onDelete: (id) => deleteMember(community.id, id),
      goToMemberProfile: (id) => goToMemberProfile(id),
      checkUserFollowing: (followers) => followers.filter((e) => e.follower_user_id === user.id).length > 0,
   };

   return (
      <div className='room__members__view'>
         <div className='room__members__view__top'>
            <BreadCrumb
               links={ [{
                  text: community.name,
                  goTo: () => goToCommunity(community.id),
               }, {
                  text: room.name,
                  goTo: () => {},
               }] }
            />
            {initialCount !== 1 && (
               <Input
                  placeholder='Search'
                  name='search'
                  type='search'
                  value={ searchInput }
                  onChange={ (name, value) => setSearchInput(value) }
               />
            )}
         </div>
         <div className='room__members__view__bottom'>
            <div className='room__members__view__bottom__content'>
               <div className='room__members__view__bottom__filter'>
                  {initialCount === 1 ? (
                     <Text
                        inner='1 Member'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  ) : (
                     <Text
                        inner={ getOnlineCount() ? `${ getOnlineCount() } / ${ members.length } Members` : '' }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  )}
                  {initialCount !== 1 && (
                     <div className='right'>
                        <SortButton
                           value={ filterOptions.filter }
                           filterType='Filter'
                           iconName='FilterM'
                           options={ firstOtions }
                           onFilter={ (value) => setFilterOptions({ ...filterOptions, filter: value }) }
                        />
                        <SortButton
                           value={ filterOptions.sorting }
                           onFilter={ (value) => setFilterOptions({ ...filterOptions, sorting: value }) }
                           options={ options }
                        />
                     </div>
                  )}
               </div>
               {initialCount === 0 ? (
                  <RoomMemberEmpty
                     goToMemberProfile={ () => goToMemberProfile(members[0].id) }
                     member={ members[0] }
                     role={ memberRole }
                     room={ { name: 'Course Discusion' } }
                     onInviteMember={ onInviteMember }
                  />
               ) : (
                  <div className='room__members__view__bottom__content__left'>
                     <RoomMembersLeft
                        onlineUsers={ onlineUsers }
                        actions={ actions }
                        members={ members } 
                        community={ community } />
                     {data.total > 2 && (
                        <Pagination
                           totalRecords={ data.total }
                           pageLimit={ 20 }
                           pageNeighbours={ 1 }
                           onPageChanged={ ({ currentPage }) => handleChangePage(currentPage) }
                        />
                     )}
                  </div>
               )}
            </div>
            <CommunityPostsRight
               openRoomMembers={ () => {} }
               isEventMemberRoom={ room.type === 'events' }
               room={ room }
               mostUsers={ room.popular_members }
               trendingPosts={ room.posts.filter(post => !!post.is_pinned) }
               goToMemberProfile={ goToMemberProfile }
               community={ community }
               goToRoom={ goToRoom }
               isNotRoom={ true }
            />
         </div>

      </div>
   );
};

RoomMembersView.propTypes = {
   room: PropTypes.object,
   searchInput: PropTypes.string,
   user: PropTypes.object,
   setSearchInput: PropTypes.func,
   members: PropTypes.array,
   community: PropTypes.object,
   initialCount: PropTypes.number,
   data: PropTypes.object,
   deleteMember: PropTypes.func,
   handleReport: PropTypes.func,
   handleChangePage: PropTypes.func,
   onInviteMember: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   filterOptions: PropTypes.object,
   followUnfollow: PropTypes.func,
   setFilterOptions: PropTypes.func,
   onlineUsers: PropTypes.array,
   goToCommunity: PropTypes.func,
   goToRoom: PropTypes.func,
};

export default RoomMembersView;
