import React, { useEffect, useState } from 'react';
// import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
// import { Calendar } from 'components/elements/CalendarNew';
// import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import ModalNew from 'components/elements/ModalNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
// import { communitySecondaryButtonColors } from 'utils/communityButtonColors';
import CommunityEventCreate from 'containers/pages/admin/community/eventCreate';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CommunityEvent from 'views/pages/community/communityCommponents/CommunityEvent';
import { communityButtonColors } from 'utils/communityButtonColors';
import getDeff from 'utils/getDeff';
import EventSettingsView from 'views/pages/community/eventSettings';
import DeleteModal from 'components/elements/DeleteModal';

const localizer = momentLocalizer(moment); // Configure moment.js for React Big Calendar


const EventsCalendar = ({                                          
   community, role, user, eventCommentDelete, handleEventSave, handleBulkRemove,
}) => {
   const [innerDatePicker, setInnerDatePicker] = useState('');
   const [isCalendarState, setIsCalendarState] = useState(true);
   const [selectedDate, setSelectedDate] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [popupEvents, setPopupEvents] = useState([]);
   const [inputs, setInputs] = useState({});
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);


   const [events, setEvents] = useState([]);
   const [currentEvent, setcurrentEvent] = useState({});
   const [isOpenEditEvent, setIsOpenEditEvent] = useState(false);

   const onCloseModal = () => {
      setIsCalendarState(true);
      setShowModal(false);
      setInnerDatePicker('');
      setIsOpenEditEvent(false);
      setcurrentEvent({});
      setIsOpenDeleteModal(false);
   };

   useEffect(() => {
      const newEvents = community.events.sort((a, b) => {
         const timeA = moment(a.time, 'HH:mm:ss');
         const timeB = moment(b.time, 'HH:mm:ss');
         return timeA - timeB;
      }).map((event) => {
         return (
            {
               ...event,
               title: event.name,
               allDay: true,
               start: event.date,
               end: event.date,
            }
         ); 
      });
      setEvents(newEvents);
   }, [community, community.events.length]);

 
   useEffect(() => {
      if (currentEvent && currentEvent.name) {
         setInputs({
            ...currentEvent,
            name: currentEvent.name,
            description: currentEvent.description,
            access: currentEvent.access,
            platform: currentEvent.platform,
            location_type: currentEvent.location_type,
            date: new Date(currentEvent.date),
            duration: Number.parseFloat(currentEvent.duration),
            repeat_event_status: currentEvent.repeat_event_status,
            picture_src: currentEvent.files && currentEvent.files.src,
            address: currentEvent.address,
            link: currentEvent.link,
         });
      }
   }, [currentEvent]);

   const handleSelectSlot = (slotInfo) => {
      const checkedDate = new Date(slotInfo.start); 
      const currentDate = new Date();
      const checkedDay = new Date(checkedDate.getFullYear(), checkedDate.getMonth(), checkedDate.getDate());
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      if ((role === 'member' || community.userSuspended) || (checkedDay.getTime() < currentDay.getTime())) {
         return;
      }
      setInnerDatePicker(slotInfo.start);
      setIsCalendarState(false);
   };

   const handleEventClick = (event) => {
      setcurrentEvent(event);
   };

   const handleShowMore = (events, date) => {
      setPopupEvents(events);
      setSelectedDate(date);
      setShowModal(true);
   };

   useEffect(() => {
      document.body.style.setProperty('--communityButtonColor', community?.community_settings?.branding?.color || '#fff');
      document.body.style.setProperty('--communityButtonBgColor', community?.community_settings?.branding?.bg_color || '#24554E');
   }, [community?.community_settings]);


   const getOptions = (event) => {
      const toReturn = [
         { name: 'Edit', iconName: 'EditCommunityM', onClick: () => setIsOpenEditEvent(event.id) },
         {
            name: 'Delete', trash: true, iconName: 'DeleteCommunityM', onClick: () => setIsOpenDeleteModal(true),
         },
      ];

      return toReturn;
   };

   const onEventSave = () => {
      handleEventSave(community.id, currentEvent.id, getDeff(currentEvent, inputs), () => onCloseModal());
   };

   return (
      <div className='calendarMenu'>
         {isOpenDeleteModal && (
            <DeleteModal
               className='calendarDelete'
               title='Are you sure you want to delete this  event?'
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  handleBulkRemove([currentEvent.id], onCloseModal);
               } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         {!isCalendarState && (
            <ModalNew onCloseModal={ () => onCloseModal() } className='calendarMenu__modal'>
               <CommunityEventCreate 
                  isCalendarModal={ true }
                  innerDatePicker={ innerDatePicker }
                  setIsCalendarState={ setIsCalendarState }
                  onCloseModal={ onCloseModal }
               /> 
            </ModalNew>
         )}

         {currentEvent?.id && isOpenEditEvent && (
            <ModalNew onCloseModal={ () => onCloseModal() } className='calendarMenu__modal'>
               <EventSettingsView
                  inputs={ inputs }
                  setInputs={ setInputs }
                  event={ currentEvent }
                  onEventSave={ onEventSave }
                  // options={ options }
                  community={ community }
                  // isLoading={ progress || eventProgress || !event.id }
                  user={ user }
               />
            </ModalNew>
         )}

                       
         {currentEvent?.id && (
            <ModalNew onCloseModal={ () => setcurrentEvent({}) } className='calendarMenu__modal'>
               <CommunityEvent 
                  unPin={ () => {} }
                  key={ currentEvent.id }
                  isMulti={ false }
                  goToEventView={ false }
                  event={ currentEvent }
                  options={ getOptions(currentEvent) }

                  role={ role }
                  user={ user }  
                  eventCommentDelete={ eventCommentDelete }
                  community={ community }
               />
            </ModalNew>
         )}
         {isCalendarState && (
            <div className='calendarMenu__content'>
               {role !== 'member' && !community.userSuspended && (
                  <Button
                     text='Create Event'
                     className='calendarMenu__content__button'
                     onClick={ () => setIsCalendarState(false) }
                     style={ { ...communityButtonColors(community) } }
                  />
               )}
               <div className='calendarMenu__content__full'>
                  <Calendar
                     localizer={ localizer }
                     events={ events }
                     selectable
                     onSelectSlot={ handleSelectSlot }
                     startAccessor='start'
                     endAccessor='end'
                     defaultView='month'
                     views={ ['month'] }
                     onSelectEvent={ handleEventClick }
                     onShowMore={ handleShowMore } 
                  />
               </div>
            </div>
         ) }
         {showModal && (
            <div
               className='showMoreModal'
            >
               <h3>Events on {moment(selectedDate).format('MMMM D, YYYY')}</h3>
               {popupEvents.map((event) => (
                  <div
                     key={ event.id }
                     onClick={ () => handleEventClick(event) }
                     role='presentation'
                     className='rbc-event rbc-event-allday'>
                     <div className='rbc-event-content' title={ event.title }>
                        {event.title}
                     </div>
                  </div>
               ))}
               <Button
                  text='Close'
                  className='close__btn'
                  onClick={ () => setShowModal(false) }
                  theme={ themes.grey_white }
                  size='small'
                  style={ { padding: '5px 16px' } }
               />
            </div>
         )}
      </div>
   );
};

EventsCalendar.propTypes = {
   community: PropTypes.object,
   user: PropTypes.object,
   role: PropTypes.string,
   eventCommentDelete: PropTypes.func,
   handleEventSave: PropTypes.func, 
   handleBulkRemove: PropTypes.func,
};

export default EventsCalendar;
