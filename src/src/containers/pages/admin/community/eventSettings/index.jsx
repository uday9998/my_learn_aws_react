import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import * as selectors from 'state/modules/community/selectors';
import * as operations from 'state/modules/community/operations';
import { useHistory } from 'react-router';
import withLoading from 'utils/withLoading';
import EventSettingsView from 'views/pages/community/eventSettings';
import { getAllCoursesOperation } from 'state/modules/settings/operations';
import { allCoursesSelector } from 'state/modules/settings/selectors';
import getDeff from 'utils/getDeff';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const EventSettinsView = withLoading(EventSettingsView);

const EventSettings = ({
   match, community, getCommunity, progress, getEvent, event, eventProgress, getCourses,
   allCourses, handleSave, user,
}) => {
   useEffect(() => {
      const communityId = match.params.id;
      const roomId = match.params.roomId;
      const eventId = match.params.eventId;
      const groupId = match.params.groupId;
      getCourses();
      getCommunity(communityId, user ? user.id : null);
      getEvent(communityId, groupId, roomId, eventId);
   }, []);
   const [options, setOptions] = useState([]);
   const [inputs, setInputs] = useState({});
   useEffect(() => {
      if (allCourses) {
         const op = allCourses.map(((el) => ({ label: el.name, value: el.id })));
         setOptions(op);
      }
   }, [allCourses]);
   useEffect(() => {
      if (event && event.name) {
         setInputs({
            ...event,
            name: event.name,
            description: event.description,
            access: event.access,
            platform: event.platform,
            location_type: event.location_type,
            date: new Date(event.date),
            duration: Number.parseFloat(event.duration),
            repeat_event_status: event.repeat_event_status,
            picture_src: event.picture_src,
            address: event.address,
            link: event.link,
         });
      }
   }, [event]);
   const history = useHistory();

   const onSave = () => {
      const communityId = match.params.id;
      const roomId = match.params.roomId;
      const eventId = match.params.eventId;
      const groupId = match.params.groupId;
      handleSave(communityId, groupId, roomId, eventId, getDeff(event, inputs), () => history.goBack());
      //   history.goBack();
   };

   return (
      <div className='community communityWithoutSidebar'>
         <HeaderTypeFirst
            title='Event Settings'
            goBack={ () => history.goBack() }
            buttonText='Save & Close'
            onSave={ () => onSave() }
         />
         {progress ? (
            <LoaderSpinner />
         ) : (
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <EventSettinsView
                     inputs={ inputs }
                     setInputs={ setInputs }
                     event={ event }
                     options={ options }
                     community={ community }
                     isLoading={ progress || eventProgress || !event.id }
                     user={ user }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

EventSettings.propTypes = {
   match: PropTypes.object,
   community: PropTypes.object,
   getCommunity: PropTypes.func,
   progress: PropTypes.bool,
   getEvent: PropTypes.func,
   eventProgress: PropTypes.bool,
   event: PropTypes.bool,
   getCourses: PropTypes.func,
   allCourses: PropTypes.array,
   user: PropTypes.object,
   handleSave: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      community: selectors.communitySelector(state),
      allCourses: allCoursesSelector(state),
      user: state.common.authUser,
      progress: selectors.communityProgressSelector(state),
      event: selectors.eventSettingsSelector(state),
      eventProgress: selectors.eventSettingsProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      getEvent: (communityId, groupId, roomId, eventId) => {
         dispatch(operations.getEventSettingsOperation(communityId, groupId, roomId, eventId));
      },
      getCourses: () => {
         dispatch(getAllCoursesOperation());
      },
      handleSave: (communityId, groupId, roomId, eventId, data, callBack) => {
         dispatch(operations.putEventSettingsOperation(communityId, groupId, roomId, eventId, data, callBack));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventSettings);
