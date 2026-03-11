import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import { useHistory } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import EditCoursePlan from 'containers/pages/admin/designCourse/plans/edit';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import CommunityHeader from 'components/modules/community/CommunityHeader';
import { clearHash } from '..';

const CommunityPricing = ({
   match, getCommunity, progress, community, handleSelectRoom, goToRoomCreate,
   goToInviteMember, createExternalLink, deleteExternalLink, user,
   getCourses,
}) => {
   const history = useHistory();
   const [getIds, setGetIds] = useState({
      groupId: null,
      communityId: null,
   });
   useEffect(() => {
      getCommunity(match.params.id, user ? user.id : null);
      getCourses();
      document.body.style.overflow = 'hidden';
      return () => {
         document.body.style.overflow = 'auto'; 
      };
   }, []);
   useEffect(
      () => {
         if (!progress) {
            setGetIds({
               groupId: community.room_groups[0].id,
               communityId: match.params.id,
            });
         }
      },
      [community]
   );
   const eventDefaultQuery = '?type=events&status=upcomin';
   const postDefaultQuery = '?type=posts&status=community';
   return (
      <div className='community communityWithoutSidebar'>
         <CommunityHeader goBack={ () => {
            history.goBack();
            // handleSelectRoom(
            //    getIds.communityId,
            //    'welcome',
            //    getIds.groupId
            // );
         } }
         /> 
         {progress ? (
            <LoaderSpinner />
         ) : (
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar
                  user={ user }
                  community={ community }
                  onPlus={ () => {
                     clearHash();
                     goToRoomCreate(getIds.communityId);
                  } }
                  onInviteMember={ () => goToInviteMember(getIds.communityId) }
                  // onSelectRoom={ room => {
                  //    handleSelectRoom(
                  //       getIds.communityId,
                  //       room.id,
                  //       getIds.groupId,
                  //       room.type === 'posts' ? postDefaultQuery : eventDefaultQuery
                  //    );
                  //    history.goBack();
                  // } }
                  selectedRoom={ {} }
                  handleAddLink={ (content, callBack) => {
                     createExternalLink(getIds.communityId, community.room_groups[2].id, content, callBack);
                  } }
                  handleRemoveLink={ (id, callBack) => {
                     deleteExternalLink(getIds.communityId, community.room_groups[2].id, id, callBack);
                  } }
                  openSettings={ () => {} }
                  isActiveSettings={ true }
               />
               <EditCoursePlan
                  type='community'
                  match={ {
                     ...match,
                     'params': { ...match.params, 'id': match.params.planId || match.params.courseId, communityId: match.params.id },
                  } }
               />

            </div>
         )}
      </div>
   );
};

CommunityPricing.propTypes = {
   match: PropTypes.object,
   getCommunity: PropTypes.func,
   progress: PropTypes.func,
   community: PropTypes.object,
   goToRoomCreate: PropTypes.func,
   handleSelectRoom: PropTypes.func,
   createExternalLink: PropTypes.func,
   goToInviteMember: PropTypes.func,
   user: PropTypes.object,
   getCourses: PropTypes.func,
   deleteExternalLink: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      community: selectors.communitySelector(state),
      progress: selectors.communityProgressSelector(state),
      allCourses: allCoursesSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToRoomCreate: id => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getCompiledPath({
                  id,
               })
            )
         );
      },
      goToInviteMember: id => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getCompiledPath({
                  id,
               })
            )
         );
      },
      getCourses: () => {
         dispatch(getAllCoursesOperation());
      },
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      handleSelectRoom: (communityId, roomId, groupId, query) => {
         dispatch(
            operations.getRoomAndFilterOperation(communityId, roomId, groupId, query)
         );
      },
      createExternalLink: (communityId, groupId, inputs, callBack) => {
         dispatch(operations.createExternalLinkOperation(communityId, groupId, inputs, callBack));
      },
      deleteExternalLink: (communityId, groupId, id, callBack) => {
         dispatch(operations.deleteExternalLinkOperation(communityId, groupId, id, callBack));
      },
      saveSettings: (communityId, slag, inputs, parentKey, courses) => {
         dispatch(operations.saveCommunitySettingsOperation(communityId, slag, inputs, parentKey, courses));
      },
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CommunityPricing);
