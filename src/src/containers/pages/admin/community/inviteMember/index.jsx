import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import CommunityInviteMember from 'views/pages/community/inviteMember';
import { connect } from 'react-redux';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import { communityProgressSelector, communitySelector, roomProgressSelector } from 'state/modules/community/selectors';
import { getCommunityOperation, inviteMemberOperation } from 'state/modules/community/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';

const CommunityRoomCreate = ({
   allCourses, getCourses, community, getCommunity, match, progress, inviteMember,
   user,
}) => {
   const history = useHistory();
   useEffect(() => {
      getCourses();
      getCommunity(match.params.id, user ? user.id : null);
   }, []);
   const [options, setOptions] = useState([]);
   const [coursesOptions, setCoursesOptions] = useState([]);
   useEffect(() => {
      if (community.rooms) {
         const op = community.rooms.map(((el) => ({ label: el.name, value: el.id })));
         setOptions(op);
      }
   }, [community]);
   useEffect(() => {
      if (allCourses && community.community_courses) {
         const filteredCourses = allCourses.filter((e) => {
            const courses = community.community_courses.filter((i) => i.id === e.id);
            if (courses.length === 0) {
               return true;
            }
            return false;
         });
         const op = filteredCourses.map(((el) => ({ label: el.name, value: el.id })));
         setCoursesOptions(op);
      }
   }, [allCourses, community]);

   const handleInviteMember = (data) => {
      inviteMember(community.id, community.room_groups[0].id, data, () => history.goBack());
   };

   return (
      <div className='community communityWithoutSidebar'>
         <HeaderTypeFirst
            title='Invite Members'
            goBack={ () => history.goBack() }
         />
         {progress ? (
            <LoaderSpinner />
         ) : (
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <CommunityInviteMember
                     handleInviteMember={ handleInviteMember }
                     coursesOptions={ coursesOptions }
                     options={ options }
                  />
               </div>
            </div>
         )}
      </div>
   );
};
CommunityRoomCreate.propTypes = {
   allCourses: PropTypes.array,
   getCourses: PropTypes.func,
   community: PropTypes.object,
   match: PropTypes.object,
   progress: PropTypes.bool,
   inviteMember: PropTypes.func,
   user: PropTypes.object,
   getCommunity: PropTypes.func,
};
const mapStateToProps = (state) => {
   return {
      allCourses: allCoursesSelector(state),
      user: state.common.authUser,
      progress: communityProgressSelector(state),
      community: communitySelector(state),
      roomProgress: roomProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCourses: () => {
         dispatch(getAllCoursesOperation());
      },
      getCommunity: (id, userId) => {
         dispatch(getCommunityOperation(id, userId));
      },
      inviteMember: (communityId, groupId, inputs, callBack) => {
         dispatch(inviteMemberOperation(communityId, groupId, inputs, callBack));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityRoomCreate);
