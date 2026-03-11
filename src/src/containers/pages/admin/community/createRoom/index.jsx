import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import NewRoom from 'views/pages/community/newRoom';
import { connect } from 'react-redux';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import {
   communityProgressSelector, communitySelector, roomProgressSelector, selectLoginedUserRole,
} from 'state/modules/community/selectors';
import { createRoomCommunity, getCommunityOperation } from 'state/modules/community/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import {
   getCommunityCategories,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';

const CommunityRoomCreate = ({
   allCourses, getCourses, community, getCommunity, match, progress, createRoom,
   roomProgress, goToCommunity, role, user,
}) => {
   const history = useHistory();
   const [step, setStep] = useState(1);
   const [isOpenMembersSaved, setIsOpenMembersSaved] = useState(false);

   const {
      data: categories, loading,
   } = useApiQuery(getCommunityCategories);

   const [savedData, setSavedData] = useState({
      name: '',
      type: 'posts',
      access_type: 'open',
      course_id: [],
      allow_create: 0,
   });
   useEffect(() => {
      getCourses();
      getCommunity(match.params.id, user ? user.id : null);
   }, []);

   if (role !== 'admin' && community.id && community.allow_create_room === 0) {
      history.goBack();
      goToCommunity(community.id, '');
   }

   const [options, setOptions] = useState([]);
   useEffect(() => {
      if (allCourses) {
         const op = allCourses.map(((el) => ({ label: el.name, value: el.id })));
         setOptions(op);
      }
   }, [allCourses]);
   return (
      <div className='community communityWithoutSidebar'>
         <HeaderTypeFirst
            title='Add New Room'
            goBack={ () => history.goBack() }
         />
         {(progress || roomProgress || loading) ? (
            <LoaderSpinner />
         ) : (
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <NewRoom
                     step={ step }
                     courses={ allCourses }
                     courseId={ community.community_courses.length > 0 ? community.community_courses[0].id : null }
                     setStep={ setStep }
                     handleSumbit={ (data) => {
                        createRoom(community.id, community.room_groups[0].id, data, (room) => {
                           goToCommunity(community.id, `${ room.id }-${ room.room_group_id }-${ room.type }`);
                        });
                     } }
                     options={ options }
                     goBack={ () => history.goBack() }
                     isOpenMembersSavedState={ [isOpenMembersSaved, setIsOpenMembersSaved] }
                     savedDataState={ [savedData, setSavedData] }
                     community={ community }
                     categories={ categories }
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
   goToCommunity: PropTypes.func,
   community: PropTypes.object,
   progress: PropTypes.bool,
   createRoom: PropTypes.func,
   match: PropTypes.object,
   roomProgress: PropTypes.bool,
   getCommunity: PropTypes.func,
   role: PropTypes.string,
   user: PropTypes.object,
};
const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      allCourses: allCoursesSelector(state),
      progress: communityProgressSelector(state),
      community: communitySelector(state),
      role: selectLoginedUserRole(state),
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
      createRoom: (communityId, groupId, data, callBack) => {
         dispatch(createRoomCommunity(data, communityId, groupId, callBack));
      },
      goToCommunity: (id, hash) => {
         dispatch(push(`${ Router.route('ADMIN_COMMUNITY').getCompiledPath({ id }) }#${ hash }`));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityRoomCreate);
