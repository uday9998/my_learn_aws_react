import React, { useEffect, useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import SimpleStatus from 'components/elements/SimpleStatus';
import './index.scss';
import { Calendar } from 'components/elements/CalendarNew';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import ModalNew from 'components/elements/ModalNew';
import { uniqueId } from 'lodash';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import CommunityCover from 'views/pages/community/communityCover';
import { communitySecondaryButtonColors } from 'utils/communityButtonColors';


const CommunityRight = ({
   room, setDate, initialEvents, openRoomMembers, community, goToRoom,
}) => {
   const blocks = [
      { name: 'Members', value: room.room_member.length === 0 ? 0 : room.room_member.length, onClick: () => openRoomMembers() },
      { name: 'Online', value: room.online_members_count, onClick: () => openRoomMembers() },
      { name: 'Events', value: room.events.length, onClick: () => goToRoom(room) },
   ];
   const [innerDatePicker, setInnerDatePicker] = useState('');
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [dates, setDates] = useState([]);
   useEffect(() => {
      const eventDates = initialEvents.map((e) => e.date);
      setDates(eventDates);
   }, [initialEvents]);
   const windowSize = useWindowSizeChange();

   return (
      <div className='community__right'>
         {isOpenModal && windowSize.innerWidth < 1440 && (
            <ModalNew onCloseModal={ () => setIsOpenModal(false) }>
               <div className='community__right__info'>
                  <Text
                     inner={ `# ${ room.name }` }
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <SimpleStatus color='pink' text='Open Room' />
                  <Text
                     inner='This space was created to discuss the monthly workshops'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
                  <div className='community__right__info__blocks'>
                     {blocks.map((block) => {
                        return (
                           // eslint-disable-next-line react/no-array-index-key
                           <div
                              key={ uniqueId() }
                              style={ { cursor: 'pointer' } }
                              role='presentation'
                              onClick={ () => (block.onClick ? block.onClick() : {}) }
                              className='community__right__info__block'
                           >
                              <Text
                                 inner={ block.name }
                                 type={ types.regular148 }
                                 size={ sizes.xsmall }
                                 style={ { color: '#444C4B' } }
                              />
                              <Text
                                 inner={ block.value }
                                 type={ types.medium }
                                 size={ sizes.xxlarge }
                                 style={ { color: '#444C4B' } }
                              />
                           </div>
                        );
                     })}
                  </div>
               </div>
               <Calendar
                  value={ innerDatePicker || new Date() }
                  dates={ dates }
                  isCalendar={ true }
                  onSelectCalendarDate={ (i) => {
                     setDate(i);
                  } }
                  onChange={ (value) => {
                     setInnerDatePicker(value);
                  } }
               />
            </ModalNew>
         )}
         {windowSize.innerWidth < 1440 ? (
            <Button
               theme={ themes.secondary }
               onClick={ () => setIsOpenModal(true) }
               text='Calendar'
               size='small'
               style={ communitySecondaryButtonColors(community) }
            />
         ) : (
            <>
               <div className='community__right__info'>
                  <CommunityCover community={ community } />
                  {/* <Text
                     inner={ `# ${ room.name }` }
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <SimpleStatus color='pink' text='Open Room' /> */}
                  {/* <Text
                     inner='This space was created to discuss the monthly workshops'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  /> */}
                  <div className='community__right__info__blocks'>
                     {blocks.map((block) => {
                        return (
                           // eslint-disable-next-line react/no-array-index-key
                           <div
                              key={ uniqueId() }
                              style={ { cursor: block.onClick ? 'pointer' : 'text' } }
                              role='presentation'
                              onClick={ () => (block.onClick ? block.onClick() : {}) }
                              className='community__right__info__block'
                           >
                              <Text
                                 inner={ block.name }
                                 type={ types.regular148 }
                                 size={ sizes.xsmall }
                                 style={ { color: '#444C4B' } }
                              />
                              <Text
                                 inner={ block.value }
                                 type={ types.medium }
                                 size={ sizes.xxlarge }
                                 style={ { color: '#444C4B' } }
                              />
                           </div>
                        );
                     })}
                  </div>
               </div>
               <Calendar
                  value={ innerDatePicker || new Date() }
                  dates={ dates }
                  isCalendar={ true }
                  onSelectCalendarDate={ (i) => {
                     setDate(i);
                  } }
                  onChange={ (value) => {
                     setInnerDatePicker(value);
                  } }
               />
            </>
         )}
      </div>
   );
};

CommunityRight.propTypes = {
   room: PropTypes.object,
   openRoomMembers: PropTypes.func,
   initialEvents: PropTypes.array,
   setDate: PropTypes.func,
   community: PropTypes.object,
   goToRoom: PropTypes.func,
};

export default CommunityRight;
