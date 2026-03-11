import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import SimpleStatus from 'components/elements/SimpleStatus';
import DropTriggle from 'components/elements/newDropTriggle';
import defaultImage from 'assets/images/community/defaultEvent.png';
import { Calendar } from 'components/elements/CalendarNew';
import TimerDesign from 'components/elements/Timer';
import moment from 'moment';
import GoogleCalendarButton from 'components/elements/buttons/GoogleCalendarButton';

const EventView = ({
   event, goBack, activeTab, onDuplicate, onUnPin, onPin, onArchive, onInviteMember, eventSettings,
   role,
}) => {
   const getOptions = (pinned) => {
      switch (activeTab) {
         case 'upcoming': {
            const toReturn = [
               { name: 'Edit', iconName: 'EditCommunityM', onClick: () => eventSettings(event.id) },
               { name: 'Duplicate', iconName: 'DuplicateCommunityM', onClick: () => onDuplicate([event.id]) },
               {
                  name: 'Archive', style: { borderTop: '1px solid #E7E9E9', borderTopRightRadius: '0px' }, iconName: 'ArchiveCommunityM', onClick: () => onArchive([event.id]),
               },
            ];
            if (pinned === 1) {
               toReturn.unshift({ name: 'Unpin Event', iconName: 'PinCommunityM', onClick: () => onUnPin(event.id) });
               return toReturn;
            }
            toReturn.unshift({ name: 'Pin Event', iconName: 'UnPinCommunityM', onClick: () => onPin(event.id) });
            return toReturn;
         }
         case 'past': {
            const toReturn = [
               { name: 'Edit', iconName: 'EditCommunityM', onClick: () => eventSettings(event.id) },
               {
                  name: 'Archive', style: { borderTop: '1px solid #E7E9E9', borderTopRightRadius: '0px' }, iconName: 'ArchiveCommunityM', onClick: () => onArchive([event.id]),
               },
            ];
            if (pinned === 1) {
               toReturn.unshift({ name: 'Unpin Event', iconName: 'PinCommunityM', onClick: () => onUnPin(event.id) });
               return toReturn;
            }
            toReturn.unshift({ name: 'Pin Event', iconName: 'UnPinCommunityM', onClick: () => onPin(event.id) });
            return toReturn;
         }
         default: {
            const toReturn = [
               { name: 'Edit', iconName: 'EditCommunityM', onClick: () => eventSettings(event.id) },
               {
                  name: 'Delete Event', trash: true, iconName: 'DeleteCommunityM', onClick: () => {},
               },
            ];
            return toReturn;
         }
      }
   };
   return (
      <div className='event__view'>
         <div className='event__view__top'>
            <div className='event__view__top__left'>
               <div
                  role='presentation'
                  onClick={ () => goBack() }
                  className='event__view__top__left__icon'
               >
                  <IconNew name='LeftArrowL' />
               </div>
               <div className='event__view__top__left__texts'>
                  <Text
                     inner={ event.name }
                     type={ types.regularMin }
                     size={ sizes.size_28 }
                  />
                  <div className='event__view__top__left__text__bottom'>
                     <SimpleStatus
                        color='purple'
                        text={ `${ event.access } Event` }
                     />
                     <TextWithIcon
                        iconName='UsersCommunityL'
                        type={ types.regularDefault }
                        isIconRight={ true }
                        inner='0'
                        size={ sizes.small }
                     />
                  </div>
               </div>
            </div>
            <div className='event__view__top__right'>
               <div className='community__top__actions'>
                  <div
                     className='community__top__action'
                     role='presentation'
                     onClick={ () => onInviteMember() }
                  >
                     <IconNew name='addMemberCommunityS' />
                  </div>
                  <div className='community__top__action'>
                     <IconNew name='notificationCommunityM' />
                  </div>
                  {role !== 'member' && (
                     <div
                        className='community__top__action'
                        role='presentation'
                        onClick={ () => eventSettings(event.id) }
                     >
                        <IconNew name='settingsCommunityM' />
                     </div>
                  )}
                  <div className='community__top__action'>
                     <DropTriggle
                        styles={ { marginTop: '15px' } }
                        options={ getOptions(event.pinned) }
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='event__view__bottom'>
            <div className='event__view__bottom__left'>
               <img
                  src={ event.files
                     ? event.files.src : defaultImage }
                  alt='event_image'
               />
               <div className='event__view__bottom__left__status'>
                  <SimpleStatus
                     color='green'
                     iconName='LocationTypeCommunityS'
                     text={ `${ event.location_type } Meeting` }
                  />
                  <SimpleStatus
                     color='grey'
                     iconName='DateTypeCommunityS'
                     text={ `${ moment(event.date).format('MMMM DD, YYYY') } ${ event.repeat_event_status ? '- Repeat Every Week' : '' } ` }
                  />
                  <SimpleStatus
                     color='lightPink'
                     iconName='TimeTypeCommmunityS'
                     text={ `${ event.duration } Hrs` }
                  />
               </div>
               <div className='event__view__bottom__left__admin'>
                  <div className='event__view__bottom__left__admin__image'>
                     <img src={ event.author ? event.author.picture_src || event.author.picture_full_src : '' } alt='' />
                  </div>
                  <div className='event__view__bottom__left__admin__texts'>
                     <Text
                        inner={ event.author ? event.author.name : '' }
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ event.author ? event.author.about_me : '' }
                        type={ types.regular148 }
                        style={ { color: '#727978' } }
                        size={ sizes.xsmall }
                     />
                  </div>
               </div>
               <div
                  className='event__view__bottom__left__description'
                  dangerouslySetInnerHTML={ { __html: event.description } }
               />
            </div>
            <div className='event__view__bottom__right'>
               <div className='event__view__bottom__right__top'>
                  <Text
                     inner='The meeting starts in'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <TimerDesign
                     time={ moment(new Date(event.date)) }
                     theme='second'
                     onExpire={ () => {} }
                  />
                  <GoogleCalendarButton
                     date={ moment(new Date(event.date)) }
                  />
               </div>
               <Calendar
                  value={ new Date(event.date) || new Date() }
                  onChange={ () => {
                     //  setDate(value);
                  } }
               />
            </div>
         </div>
      </div>
   );
};

EventView.propTypes = {
   event: PropTypes.object,
   goBack: PropTypes.func,
   activeTab: PropTypes.string,
   onDuplicate: PropTypes.func,
   onUnPin: PropTypes.func,
   onPin: PropTypes.func,
   onArchive: PropTypes.func,
   onInviteMember: PropTypes.func,
   eventSettings: PropTypes.func,
   role: PropTypes.string,
};

export default EventView;
