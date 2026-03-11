import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import {
   communityProgressSelector, communitySelector, postCreateProgressSelector,
} from 'state/modules/community/selectors';
import { createPostOperation, getCommunityOperation } from 'state/modules/community/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CommunityPostCreateView from 'views/pages/CommunityPosts/CommunityPostCreate';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import ComponentProgress from 'components/modules/ComponentProgress';
import { toast } from 'react-toastify';

const CommunityPostCreate = ({
   allCourses, getCourses, community, getCommunity, match, progress, createPost, createProgressSelector, user,
}) => {
   const [options, setOptions] = useState([]);
   const history = useHistory();
   const [roomOptions, setRoomOptions] = useState([]);
   const [data, setData] = useState({
      title: '',
      value: '',
      mentions: [],
      polls: [],
      files: [],
   });
   const a = useRef({
      title: '',
      value: '',
      mentions: [],
      polls: [],
      files: [],
   });
   const [errorMessages, setErrorMessages] = useState({ title: [], value: [] });

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   useEffect(() => {
      getCourses();
      getCommunity(match.params.id, user ? user.id : null);
   }, []);
   useEffect(() => {
      if (community && community.rooms) {
         const newOptions = community.rooms.map((room) => {
            return {
               label: room.id === Number.parseFloat(match.params.roomId) ? `# ${ room.name } (Current room)` : `# ${ room.name }`,
               value: room.id,
            };
         });
         setRoomOptions(newOptions);
      }
   }, [community]);
   useEffect(() => {
      if (allCourses) {
         const op = allCourses.map(((el) => ({ label: el.name, value: el.id })));
         setOptions(op);
      }
   }, [allCourses]);

   const handleDataChange = (name, value) => {
      if (name === 'value' || errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      a.current = {
         ...a.current,
         [name]: value,
      };
      setData(a.current);
   };

   const handleRemoveMention = (id) => {
      let toFilter = id;
      const filter = a.current.mentions.filter((mention) => {
         if (mention.id === toFilter) {
            toFilter = null;
            return false;
         }
         return true;
      });
      handleDataChange('mentions', filter);
   };

   const handleRemovePoll = (id) => {
      const filter = a.current.polls.filter((poll) => Number.parseFloat(poll.id) !== id);
      handleDataChange('polls', filter);
   };
   const handleSumbit = () => {
      const newErrorMessages = {};

      if (!data.title.trim().length) {
         newErrorMessages.title = ['Add Title to the post'];
      }

      if (!data.value.trim().length) {
         newErrorMessages.value = ['Add Text to the post'];
      }

      if (Object.keys(newErrorMessages).length) {
         addErrorMessages(newErrorMessages);
         return;
      }

      const mentionedUsersIds = data.mentions.map((mention) => mention.id);
      const inputs = {
         picture_src: data.cover,
         title: data.title,
         content: data.value,
         mentions: mentionedUsersIds,
         polls: data.polls,
         files: data.files,
      };
      if (data.courseId) {
         inputs.course_id = data.courseId;
      }
      const communityId = community.id;
      const communityGroupId = community.room_groups[0].id;
      const roomId = Number.parseFloat(match.params.roomId);
      createPost(communityId, communityGroupId, roomId, inputs, () => history.goBack());
   };

   return (
      <div className='community communityWithoutSidebar'>
         <ComponentProgress loading={ progress }>
            <HeaderTypeFirst
               title='Add New Post'
               goBack={ () => history.goBack() }
            />
            {createProgressSelector && (
               <LoaderSpinner />
            )}
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <CommunityPostCreateView
                     roomOptions={ roomOptions }
                     inputs={ {
                        ...data,
                        mentions: a.current.mentions,
                     } }
                     groupId={ community.room_groups ? community.room_groups[0].id : 0 }
                     roomId={ Number.parseFloat(match.params.roomId) }
                     onChange={ handleDataChange }
                     handleRemovePoll={ handleRemovePoll }
                     communityId={ community.id }
                     onSumbit={ handleSumbit }
                     coursesOptions={ options }
                     handleRemoveMention={ handleRemoveMention }
                     user={ user }
                     errorMessages={ errorMessages }
                  />
               </div>
            </div>
         </ComponentProgress>
      </div>
   );
};
CommunityPostCreate.propTypes = {
   allCourses: PropTypes.array,
   getCourses: PropTypes.func,
   community: PropTypes.object,
   match: PropTypes.object,
   progress: PropTypes.bool,
   getCommunity: PropTypes.func,
   createProgressSelector: PropTypes.func,
   user: PropTypes.object,
   createPost: PropTypes.func,
};
const mapStateToProps = (state) => {
   return {
      allCourses: allCoursesSelector(state),
      progress: communityProgressSelector(state),
      community: communitySelector(state),
      user: state.common.authUser,
      createProgressSelector: postCreateProgressSelector(state),
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
      createPost: (communityId, groupId, roomId, inputs, callBack) => {
         dispatch(createPostOperation(communityId, groupId, roomId, inputs, callBack));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPostCreate);
