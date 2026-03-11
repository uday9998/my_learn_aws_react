import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Switch from 'components/elements/switchNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import SortButton from 'components/elements/buttons/SortButton';
import CommunityEvent from '../CommunityEvent';

const filterOptions = {
   newest: 'Newest',
   oldest: 'Oldest',
};
const CommunityEvents = ({
   events,
   activeTab,
   onPin,
   onUnPin,
   onArchive,
   onDuplicate,
   handleSortOptionsChange,
   sortingOptions,
   handleFilter,
   goToEventView,
   eventsCount,
   eventSettings,
   locationCounts,
   accessCounts,
   handleBulkRemove,
   role,
   commentEvent,
   user,
   eventCommentLike,
   eventReplyComment,
   goToMemberProfile,
   eventCommentDelete,
   community,
   room,
}) => {
   const [isMultiSelect, setIsMultiSelect] = useState(false);
   const [chekedEventsIds, setCheckedEventsIds] = useState([]);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const handleRefresh = () => {
      setIsMultiSelect(false);
   };
   const getOptions = (pinned, event) => {
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
                  name: 'Delete Event', trash: true, iconName: 'DeleteCommunityM', onClick: () => handleBulkRemove([event.id]),
               },
            ];
            return toReturn;
         }
      }
   };

   useEffect(() => {
      handleRefresh();
   }, [events]);

   const handleCheckAll = (name, value) => {
      if (value) {
         const ids = events.map((event) => event.id);
         setCheckedEventsIds(ids);
         return;
      }
      setCheckedEventsIds([]);
   };

   const handleCheck = (value, id) => {
      if (value) {
         setCheckedEventsIds([...chekedEventsIds, id]);
         return;
      }
      setCheckedEventsIds(chekedEventsIds.filter(ids => ids !== id));
   };
   const getNames = () => {
      const filteredEvents = events.filter(ev => chekedEventsIds.includes(ev.id));
      const names = filteredEvents.map((ev) => `[${ ev.name }]`);
      return names.join(' and ');
   };

   const handleOptionsChange = (isLocation, boolValue, value) => {
      if (isLocation) {
         const newLocations = sortingOptions.locationTypes;
         handleSortOptionsChange({
            locationTypes: boolValue ? [...newLocations, value] : newLocations.filter(i => i !== value),
         });
         return;
      }
      const newAccess = sortingOptions.eventAccess;
      handleSortOptionsChange({
         eventAccess: boolValue ? [...newAccess, value] : newAccess.filter(i => i !== value),
      });
   };

   return (
      <div className='community__events'>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to ${ activeTab === 'archive' ? 'delete' : 'archive' } the ${ chekedEventsIds.length } events ${ getNames() }?` }
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  setCheckedEventsIds([]);
                  setIsOpenDeleteModal(false);
                  if (activeTab === 'archive') {
                     handleBulkRemove(chekedEventsIds);
                     return;
                  }
                  onArchive(chekedEventsIds);
               } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         {eventsCount < 2 ? (
            <div className='community__events__empty__top'>
               <Text
                  inner={ `${ events.length } Event` }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
         ) : (
            <div className='community__events__top'>
               <div className='community__events__top__left'>
                  {isMultiSelect ? (
                     <div className='community__events__top__left__check'>
                        <CheckBox
                           iconType='icon'
                           checked={ chekedEventsIds.length === events.length }
                           onChange={ handleCheckAll }
                        />
                        <Text
                           inner={ `${ chekedEventsIds.length }/${ events.length } Events` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                  ) : (
                     <Text
                        inner={ `${ events.length } Events` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  )}
                  <div className='community__events__top__left__line' />
                  <Switch
                     value={ isMultiSelect }
                     onChange={ setIsMultiSelect }
                     label='Multiselect'
                     positionText='right'
                     size='medium'
                  />
                  {chekedEventsIds.length > 0 && (<div className='community__events__top__left__line' />)}
                  {chekedEventsIds.length > 0 && (
                     <div className='community__events__top__left__actions'>
                        <Text
                           inner='Actions: '
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <div className='community__events__top__left__actions__buttons'>
                           {activeTab !== 'archive' && (
                              <div
                                 className='community__events__top__left__actions__archive'
                                 role='presentation'
                                 onClick={ () => {
                                    onDuplicate(chekedEventsIds);
                                    setCheckedEventsIds([]);
                                 } }
                              >
                                 <IconNew name='DuplicateCommunityM' style={ { fill: '#24554E' } } />
                              </div>
                           )}
                           {activeTab === 'archive' ? (
                              (
                                 <div
                                    role='presentation'
                                    onClick={ () => setIsOpenDeleteModal(true) }
                                    className='community__events__top__left__actions__delete'
                                 >
                                    <IconNew name='CertificatesDeleteS' />
                                 </div>
                              )
                           ) : (
                              <div
                                 className='community__events__top__left__actions__archive'
                                 role='presentation'
                                 onClick={ () => setIsOpenDeleteModal(true) }
                              >
                                 <IconNew name='DeleteCommunityS' />
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
               <div className='community__events__top__right'>
                  <SortButton
                     onFilter={ () => handleFilter() }
                     type='second'
                     isHidenButtons={ true }
                     iconName='FilterM'
                  >
                     <div className='community__events__top__right__checklist'>
                        {/* <div className='community__events__top__right__checklist__row'>
                           <Text
                              inner='Event Access'
                              type={ types.medium168 }
                              style={ { padding: '4px 0px' } }
                              size={ sizes.small }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `Open (${ accessCounts.open })` }
                              name='open'
                              checked={ sortingOptions.eventAccess.includes('open') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(false, value, 'open') }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `Private (${ accessCounts.private })` }
                              name='open'
                              checked={ sortingOptions.eventAccess.includes('private') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(false, value, 'private') }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `Secret (${ accessCounts.secret })` }
                              name='open'
                              checked={ sortingOptions.eventAccess.includes('secret') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(false, value, 'secret') }
                           />
                        </div>
                        <div className='community__events__top__right__checklist__line' /> */}
                        <div className='community__events__top__right__checklist__row'>
                           <Text
                              inner='Location Type'
                              type={ types.medium168 }
                              style={ { padding: '4px 0px' } }
                              size={ sizes.small }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `Virtual (${ locationCounts.virtual })` }
                              name='open'
                              checked={ sortingOptions.locationTypes.includes('virtual') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(true, value, 'virtual') }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `Local (${ locationCounts.local })` }
                              name='open'
                              checked={ sortingOptions.locationTypes.includes('local') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(true, value, 'local') }
                           />
                           <CheckBox
                              iconType='icon'
                              label={ `TBD (${ locationCounts.tbd })` }
                              name='open'
                              checked={ sortingOptions.locationTypes.includes('tbd') }
                              textProps={ {
                                 type: types.regularDefault,
                                 size: sizes.small,
                                 style: { color: '#131F1E' },
                              } }
                              onChange={ (name, value) => handleOptionsChange(true, value, 'tbd') }
                           />
                        </div>
                        <div className='community__events__top__right__checklist__line' />
                     </div>
                  </SortButton>
                  <SortButton
                     onFilter={ (value) => handleSortOptionsChange({ date: value }) }
                     value={ sortingOptions.date }
                     options={ filterOptions }
                  />
               </div>
            </div>
         )}
         <div className='community__events__list'>
            {events.map((event) => {
               return (
                  <CommunityEvent
                     unPin={ () => onUnPin(event.id) }
                     key={ event.id }
                     isMulti={ isMultiSelect }
                     goToEventView={ goToEventView }
                     event={ event }
                     options={ getOptions(event.pinned, event) }
                     onCheck={ (name, value) => handleCheck(value, event.id) }
                     isChecked={ chekedEventsIds.includes(event.id) }
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
               );
            })}
         </div>
      </div>
   );
};

CommunityEvents.propTypes = {
   events: PropTypes.array,
   onPin: PropTypes.func,
   onUnPin: PropTypes.func,
   onDuplicate: PropTypes.func,
   handleFilter: PropTypes.func,
   onArchive: PropTypes.func,
   activeTab: PropTypes.string,
   handleSortOptionsChange: PropTypes.func,
   sortingOptions: PropTypes.object,
   goToEventView: PropTypes.func,
   eventsCount: PropTypes.number,
   eventSettings: PropTypes.func,
   locationCounts: PropTypes.object,
   accessCounts: PropTypes.object,
   handleBulkRemove: PropTypes.func,
   role: PropTypes.string,
   commentEvent: PropTypes.func,
   user: PropTypes.object,
   eventCommentLike: PropTypes.func,
   eventReplyComment: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   eventCommentDelete: PropTypes.func,
   community: PropTypes.object,
   room: PropTypes.object,
};

export default CommunityEvents;
