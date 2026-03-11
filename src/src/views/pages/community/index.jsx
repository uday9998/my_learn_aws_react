import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import { communityButtonColors } from 'utils/communityButtonColors';
import SimpleStatus from 'components/elements/SimpleStatus';
import CommunityTop from './communityCommponents/CommunityTop';
import CommunityLeftEmpty from './communityCommponents/CommunityLeftEmpty';
import CommunityRight from './communityCommponents/CommunityRight';
import CommunityEvents from './communityCommponents/CommunityEvents';
import EventView from './EventView';

const CommunityView = ({
   room, onInviteMember, goToEvent, onPin, onUnPin, eventProgress, onArchive,
   onDuplicate, handleSortOptionsChange, sortingOptions, goToEventView, selectedEvent,
   handleChangeTab, selectedTab, setSelectedTab, initialEventsLength, handleFilter,
   eventSettings, locationCounts, accessCounts, handleBulkRemove, handleDeleteRoom,
   searchValue, setSearchValue, date, setDate, initialEvents, goToRoomSettings, openRoomMembers,
   markAsRead, role, user, commentEvent, eventCommentLike, eventReplyComment, goToMemberProfile, 
   eventCommentDelete, community, goToMessenger, goToRoom,
}) => {
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

   const handleInputChange = (name, value) => {
      if (name === 'search') {
         setSearchValue(value);
      }
   };


   const variants = [
      { key: 'Upcoming', value: 'upcoming', iconName: 'UpcomingCommunityM' },
      { key: 'Past', value: 'past', iconName: 'PastCommunityM' },
      { key: 'Archive', value: 'archive', iconName: 'ArchiveCommunityM' },
   ];
   const isAllowedButton = () => {
      if ((role === 'subadmin' || room.allow_create) && !community.userSuspended) {
         return true;
      }
      if (room.author && room.author.id === user.id && !community.userSuspended) {
         return true;
      }
      return false;
   };

   const isAuthorOfEvent = () => {
      if ((room.author && room.author.id === user.id && !community.userSuspended) || role === 'admin') {
         return true;
      }
      return false;
   };


   if (selectedEvent) {
      return (
         <EventView
            onInviteMember={ onInviteMember }
            goBack={ () => goToEventView(null) }
            event={ selectedEvent }
            onUnPin={ onUnPin }
            role={ role }
            onPin={ onPin }
            eventSettings={ eventSettings }
            onDuplicate={ onDuplicate }
            onArchive={ onArchive }
            activeTab={ selectedTab }
         />
      );
   }
   return (
      <div className='community__view'>
         {/* <CommunityTop
            markAsRead={ markAsRead }
            user={ user }
            role={ role }
            onInviteMember={ onInviteMember }
            openSettings={ () => goToRoomSettings(room.id) }
            searchValue={ searchValue }
            room={ room }
            handleDeleteRoom={ handleDeleteRoom }
            handleInputChange={ handleInputChange }
            community={ community }
            goToMessenger={ goToMessenger }
         /> */}

         {/* <div className='community__view__tabs'>
            <Tabs
               variants={ variants }
               selectedVariant={ selectedTab }
               onSelect={ (tab) => {
                  setSelectedTab(tab);
                  handleChangeTab(tab);
               } }
               isButton={ false }
               hasIcon={ true }
            />
         </div> */}
         <div className='community__view__bottom'>
            <div className='community__view__bottom__left'>
               <div className='community__view__name'>
                  <div className='community__view__name__container'>
                     <Text
                        inner={ `# ${ room.name }` }
                        type={ types.regularMin }
                        size={ sizes.xxlarge }
                     />
                     {room.room_category && room.room_category.name
                  && (
                     <SimpleStatus color='grey' text={ room.room_category.name } size='medium' />
                  )}
                  </div>

                  {/* {(room.allow_create || role === 'admin' || (room.author ? room.author.id : null) === user.id) && (
               <Button
                  text='New Event'
                  onClick={ () => goToEvent() }
               />
            )} */}
                  {(isAllowedButton() || role === 'admin') && (
                     <div className='community__event__actions'>
                        {/* {isAuthorOfEvent() && (
                     <div
                        className='community__top__action'
                        role='presentation'
                        onClick={ () => goToRoomSettings(room.id) }
                     >
                        <IconNew name='settingsCommunityM' />
                     </div>
                  )} */}
                        {isAuthorOfEvent() && (
                           <div
                              className='community__top__action community__top__action__delete'
                              role='presentation'
                              onClick={ () => setIsOpenDeletePopup(true) }
                           >
                              <IconNew name='deleteCommunityM' />
                           </div>
                        )}
                        <Button
                           text='New Event'
                           onClick={ () => goToEvent() }
                           style={ communityButtonColors(community, role) }
                        />
                     </div>
                  )}
               </div>
               {eventProgress ? (
                  <LoaderSpinner />
               ) : (
                  <>
                     {room.events && room.events.length ? (
                        <CommunityEvents
                           handleSortOptionsChange={ handleSortOptionsChange }
                           onUnPin={ onUnPin }
                           locationCounts={ locationCounts }
                           handleFilter={ handleFilter }
                           onPin={ onPin }
                           goToEventView={ goToEventView }
                           handleBulkRemove={ handleBulkRemove }
                           accessCounts={ accessCounts }
                           eventsCount={ initialEventsLength }
                           activeTab={ selectedTab }
                           eventSettings={ eventSettings }
                           events={ room.events }
                           sortingOptions={ sortingOptions }
                           onDuplicate={ onDuplicate }
                           onArchive={ onArchive }
                           role={ role }
                           commentEvent={ commentEvent }
                           user={ user }
                           eventCommentLike={ eventCommentLike }
                           eventReplyComment={ eventReplyComment }
                           goToMemberProfile={ goToMemberProfile }
                           eventCommentDelete={ eventCommentDelete }
                           community={ community }
                           room={ room }
                        />
                     ) : (
                        <>
                           {!searchValue && (
                              <CommunityLeftEmpty
                                 allowedButton={ isAllowedButton() }
                                 createEvent={ () => goToEvent() }
                                 onInviteMember={ onInviteMember }
                                 community={ community }
                                 role={ role }
                              />
                           )}
                           {searchValue 
                     && (
                        <Text
                           inner='No Results Found'
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: 'rgba(19, 31, 30, 0.6)', width: '100%', textAlign: 'center' } }
                        />
                     )}
                        </>
                     )}
                  </>
               )}
            </div>
            <CommunityRight
               openRoomMembers={ openRoomMembers }
               initialEvents={ initialEvents }
               room={ room }
               date={ date }
               setDate={ setDate }
               community={ community }
               goToRoom={ goToRoom }
            />
         </div>
         {isOpenDeletePopup && (
            <DeleteModal
               onDelete={ () => handleDeleteRoom(room.id)
               }
               onCancel={ () => setIsOpenDeletePopup(null) }
               deleteText='Delete'
               title='Are you sure you want to delete this room?'
            />
         )}
      </div>
   );
};

CommunityView.propTypes = {
   onDuplicate: PropTypes.func,
   room: PropTypes.object,
   onInviteMember: PropTypes.func,
   eventProgress: PropTypes.bool,
   selectedEvent: PropTypes.object,
   goToEvent: PropTypes.func,
   onPin: PropTypes.func,
   sortingOptions: PropTypes.func,
   onArchive: PropTypes.func,
   onUnPin: PropTypes.func,
   handleSortOptionsChange: PropTypes.func,
   goToEventView: PropTypes.func,
   handleChangeTab: PropTypes.func,
   initialEventsLength: PropTypes.number,
   setSelectedTab: PropTypes.func,
   selectedTab: PropTypes.string,
   handleFilter: PropTypes.func,
   eventSettings: PropTypes.func,
   locationCounts: PropTypes.object,
   accessCounts: PropTypes.object,
   handleBulkRemove: PropTypes.func,
   handleDeleteRoom: PropTypes.func,
   goToRoomSettings: PropTypes.func,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
   date: PropTypes.any,
   setDate: PropTypes.func,
   markAsRead: PropTypes.func,
   openRoomMembers: PropTypes.func,
   initialEvents: PropTypes.array,
   role: PropTypes.string,
   user: PropTypes.object,
   community: PropTypes.object,
   commentEvent: PropTypes.func,
   eventCommentLike: PropTypes.func,
   eventReplyComment: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   eventCommentDelete: PropTypes.func,
   goToMessenger: PropTypes.func,
   goToRoom: PropTypes.func,
};

export default CommunityView;
