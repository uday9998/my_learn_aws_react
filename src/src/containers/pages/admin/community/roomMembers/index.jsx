import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import RoomMembersView from 'views/pages/community/RoomMembers';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import { onlineUsersSelector } from 'state/modules/common/selectors';

const CommunityRoomMembers = ({
   match, onInviteMember, user, init, progress, data, filter, goToMemberProfile, followUnfollow,
   deleteMember, handleReport, onlineUsers, goToCommunity, handleSelectRoom,
}) => {
   const history = useHistory();
   const [searchInput, setSearchInput] = useState('');
   useEffect(() => {
      init(match.params.id, match.params.roomId, match.params.groupId, match.params.type);
   }, []);

   const [filterOptions, setFilterOptions] = useState({
      filter: 'all',
      sorting: 'newest',
   });


   const handleFilter = (filterData, search) => {
      let queryParams = '&';
      if (filterOptions.filter !== 'all') {
         queryParams += `status=${ filterData.filter }`;
      }
      queryParams += `${ queryParams === '&' ? '' : '&' }sort=${ filterData.sorting }`;
      if (search) {
         queryParams += `&search=${ search }`;
      }
      filter(match.params.id, queryParams, data.current_page, match.params.roomId, match.params.groupId);
   };

   useEffect(() => {
      if (!progress) {
         handleFilter(filterOptions, searchInput);
      }
   }, [filterOptions, searchInput]);

   const handleChangePage = (number) => {
      let queryParams = '&';
      if (filterOptions.filter !== 'all') {
         queryParams += `status=${ filterOptions.filter }`;
      }
      queryParams += `${ queryParams === '&' ? '' : '&' }sort=${ filterOptions.sorting }`;
      if (searchInput) {
         queryParams += `&search=${ searchInput }`;
      }
      filter(match.params.id, queryParams, number, match.params.roomId, match.params.groupId);
   };

   const eventDefaultQuery = '?type=events&status=upcoming';
   const postDefaultQuery = '?type=posts&status=community';

   const goToRoom = (room) => {
      goToCommunity(match.params.id);
      handleSelectRoom(
         match.params.id,
         room.id,
         data.community.room_groups[0].id,
         room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
      );
   };

   const admin = data.community ? data.community.owner : {};
   return (
      <div className='community communityWithoutSidebar'>
         <ComponentProgress loading={ progress }>
            <HeaderTypeFirst
               title={ `Members of ${ data.room ? data.room.name : '' }` }
               goBack={ () => history.goBack() }
            />
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <RoomMembersView
                     goToRoom={ goToRoom }
                     onInviteMember={ () => onInviteMember(match.params.id, match.params.roomId) }
                     searchInput={ searchInput }
                     setSearchInput={ setSearchInput }
                     handleReport={ (...params) => handleReport(...params, match.params.roomId, match.params.groupId) }
                     user={ user }
                     handleFilter={ handleFilter }
                     filterOptions={ filterOptions }
                     setFilterOptions={ setFilterOptions }
                     onlineUsers={ onlineUsers }
                     followUnfollow={ (...props) => {
                        followUnfollow(...props, match.params.roomId, match.params.groupId);
                     } }
                     goToMemberProfile={ (memberId) => goToMemberProfile(match.params.id, memberId) }
                     handleChangePage={ handleChangePage }
                     data={ data.members }
                     deleteMember={ (...props) => deleteMember(...props, match.params.roomId, match.params.groupId) }
                     members={ data.members && data.members.data.length ? data.members.data : [admin] }
                     community={ data.community }
                     initialCount={ data.initialMembersCount }
                     room={ data.room }
                     goToCommunity={ goToCommunity }
                  />
               </div>
            </div>
         </ComponentProgress>
      </div>
   );
};

CommunityRoomMembers.propTypes = {
   match: PropTypes.object,
   progress: PropTypes.bool,
   data: PropTypes.object,
   goToMemberProfile: PropTypes.func,
   filter: PropTypes.func,
   handleReport: PropTypes.func,
   followUnfollow: PropTypes.func,
   user: PropTypes.object,
   onInviteMember: PropTypes.func,
   init: PropTypes.func,
   deleteMember: PropTypes.func,
   onlineUsers: PropTypes.array,
   goToCommunity: PropTypes.func,
   handleSelectRoom: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      progress: selectors.membersPageProgressSelector(state),
      data: selectors.membersPageSelector(state),
      onlineUsers: onlineUsersSelector(state),
      role: selectors.selectLoginedUserRole(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onInviteMember: (id, roomId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getCompiledPath({
                  id,
               }) }${ roomId ? `#${ roomId }` : '' }`
            )
         );
      },
      init: (...params) => {
         dispatch(
            operations.getMembersPageInformation(...params)
         );
      },
      filter: (...params) => {
         dispatch(
            operations.filterMembersPage(...params)
         );
      },
      goToMemberProfile: (id, memberId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getCompiledPath({
                  id,
                  memberId,
               })
            )
         );
      },
      followUnfollow: (id, userId, roomId, groupId) => {
         dispatch(operations.subscribeUserOperation(id, userId, roomId, groupId));
      },
      deleteMember: (communityId, id, roomId, groupId) => {
         dispatch(operations.deleteMemberOperation(communityId, id, roomId, groupId));
      },
      handleReport: (...params) => {
         dispatch(operations.ReportMembersOperation(...params));
      },
      goToCommunity: id => {
         dispatch(push(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id })));
      },
      handleSelectRoom: (communityId, roomId, groupId, query) => {
         dispatch(
            operations.getRoomAndFilterOperation(communityId, roomId, groupId, query)
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityRoomMembers);
