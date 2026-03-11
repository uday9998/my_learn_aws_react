import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import {
   communityProgressSelector, communitySelector, eventProgressSelector,
} from 'state/modules/community/selectors';
import { createEventOperation, getCommunityOperation } from 'state/modules/community/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import EventCreate from 'views/pages/community/EventCreate';
import moment from 'moment';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import dayjs from 'dayjs';

const CommunityEventCreate = ({
   allCourses, getCourses, community, getCommunity, match, progress, createEvent,
   isLoading, user, isCalendarModal, innerDatePicker, setIsCalendarState, onCloseModal, goToRoomCreate,
}) => {
   const history = useHistory();
   const [step, setStep] = useState(1);
   const [roomId, setRoomId] = useState();
   useEffect(() => {
      getCourses();
      if (!isCalendarModal) {
         getCommunity(match.params.id, user.id);
      }
   }, []);
   const [data, setData] = useState({
      name: '',
      type: 'events',
      access: 'open',
      course_id: null,
      picture_src: '',
      date: innerDatePicker || new Date(),
      duration: 0,
      repeat_event_status: 0,
      location_type: 'local',
      address: '',
      phone: '',
      link: '',
      time: '',
      platform: 'youtube',
      defaultTime: '',
   });
   const [options, setOptions] = useState([]);
   useEffect(() => {
      if (allCourses) {
         const op = allCourses.map(((el) => ({ label: el.name, value: el.id })));
         setOptions(op);
      }
   }, [allCourses]);
   return (
      <>
         {isCalendarModal 
      && (
         <>
            {(progress || isLoading) ? (
               <LoaderSpinner />
            ) : (
               <EventCreate
                  step={ step }
                  courses={ allCourses }
                  data={ data }
                  setData={ setData }
                  courseId={ community.community_courses.length > 0 ? community.community_courses[0].id : null }
                  setStep={ setStep }
                  handleSumbit={ () => {
                     const today = moment().format('YYYY-MM-DD');
                     const currentTime = moment().format('HH:mm:ss'); 
                     const localDateTime = moment(`${ today } ${ currentTime }`, 'YYYY-MM-DD HH:mm:ss');
                     const updatedTime = localDateTime.add(2, 'hours'); 
                     const utc = updatedTime.utc().format('HH:mm:ss');
                    
                     createEvent(community.id, roomId, community.room_groups[0].id, {
                        ...data,
                        time: data.time ? data.time : utc,
                        date: moment(data.date).format('YYYY-MM-DD'),
                     }, () => {
                        onCloseModal();
                     });
                  } }
                  setRoomId={ setRoomId }
                  roomId={ roomId }
                  options={ options }
                  goBack={ () => history.goBack() }
                  user={ user }
                  isCalendarModal={ isCalendarModal }
                  setIsCalendarState={ setIsCalendarState }
                  community={ community }
                  goToRoomCreate={ goToRoomCreate }
               />
            )}
         </>
      )}
         
         {!isCalendarModal && (
            <div className='community communityWithoutSidebar'>
               <HeaderTypeFirst
                  title='Add New Event'
                  goBack={ () => history.goBack() }
               />
               {(progress || isLoading) ? (
                  <LoaderSpinner />
               ) : (
                  <div className='community__bottom community__bottom__withoutmenu'>
                     <CommunitySideBar user={ user } />
                     <div className='community__view'>
                        <EventCreate
                           step={ step }
                           courses={ allCourses }
                           data={ data }
                           setData={ setData }
                           courseId={ community.community_courses.length > 0 
                              ? community.community_courses[0].id : null }
                           setStep={ setStep }
                           handleSumbit={ () => {
                              createEvent(community.id, match.params.roomId, community.room_groups[0].id, {
                                 ...data,
                                 date: moment(data.date).format('YYYY-MM-DD'),
                              }, () => {
                                 history.goBack();
                              });
                           } }
                           options={ options }
                           goBack={ () => history.goBack() }
                           user={ user }
                        />
                     </div>
                  </div>
               )}
            </div>
         )}
      </>
   );
};
CommunityEventCreate.propTypes = {
   allCourses: PropTypes.array,
   getCourses: PropTypes.func,
   community: PropTypes.object,
   match: PropTypes.object,
   progress: PropTypes.bool,
   isLoading: PropTypes.bool,
   getCommunity: PropTypes.func,
   createEvent: PropTypes.func,
   user: PropTypes.object,
   isCalendarModal: PropTypes.bool,
   innerDatePicker: PropTypes.any,
   setIsCalendarState: PropTypes.func,
   onCloseModal: PropTypes.func,
   goToRoomCreate: PropTypes.func,
};
const mapStateToProps = (state) => {
   return {
      allCourses: allCoursesSelector(state),
      progress: communityProgressSelector(state),
      community: communitySelector(state),
      isLoading: eventProgressSelector(state),
      user: state.common.authUser,
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
      createEvent: (communtiyId, roomId, groupId, inputs, callback) => {
         dispatch(createEventOperation(communtiyId, roomId, groupId, inputs, callback));
      },
      goToRoomCreate: id => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getCompiledPath({
                  id,
               })
            )
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityEventCreate);
