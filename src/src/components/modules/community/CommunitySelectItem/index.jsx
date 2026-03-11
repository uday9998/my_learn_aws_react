import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Button from 'components/elements/buttons/BaseButtonNew';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import IconNew from 'components/elements/iconsSize';
import wave from './wave.svg';
import external from './external.svg';

const CommunitySelectItem = ({
   title, items, onClick, isHavePlus, iconName, selectedId = 1, onPlus, isHaveDelete,
   onDelete, role, community, user, onInviteMember, goToRoomSettings,
}) => {
   const [isOpen, setIsOpen] = useState(true);
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setShowTitle] = useState('');
   const { pathname } = useLocation();

   const handleAddRoom = () => {
      if (!Array.isArray(permissions) && !pathname.includes('portal')) {
         if (title === 'Rooms') {
            if (items.length < permissions.commmunities.rooms_count) {
               onPlus();
            } else {
               setShowTitle('Need More Room?');
               setShowPopup(true);
            }
         } else {
            onPlus();
         }
      } else if (pathname.includes('portal') && !Array.isArray(permissions) && items.length < permissions.commmunities.rooms_count) {
         onPlus();
      } else if (Array.isArray(permissions)) {
         onPlus();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };


   const isAllowedButton = (room) => {
      if ((role === 'subadmin' || room.allow_create) && !community.userSuspended) {
         return true;
      }
      if (room.author && room.author.id === user.id && !community.userSuspended) {
         return true;
      }
      return false;
   };


   const isAuthorOfRoom = (room) => {
      if ((room.author && room.author.id === user.id && !community.userSuspended)) {
         return true;
      }
      return false;
   };


   return (
      <>
         {
            showPopup && createPortal(<PricingPopup
               popupTitle={ popupTitle }
               handleClosePopup={ handleClosePopup }
               isCommunity={ true }
            />, document.body)
         }
         <div className='community__select__item'>
            <div className='community__select__item__top'>
               <div className='community__select__item__left' role='presentation' onClick={ () => setIsOpen(!isOpen) }>
                  {title === 'External Sources' 
                     ? <img src={ external } alt='external' />
                     : (
                        <div style={ { transform: `rotate(${ isOpen ? '180deg' : '0deg' })` } }>
                           <IconNew name='ArrowSelectorS' />
                        </div>
                     )
                  }
                  <Text
                     inner={ title }
                     type={ types.medium }
                     size={ sizes.large }
                     style={ { color: '#444C4B' } }
                  />
               </div>
               {isHavePlus && title === 'External Sources' && (
                  <div
                     className='community__select__item__right'
                     role='presentation'
                     onClick={ handleAddRoom }
                  >
                     <div style={ {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                     } }>
                        <IconNew name='plusSelectorS' />
                        {/* <span>Add New Room</span> */}
                     </div>
                  </div>
               )}
            </div>
            {isOpen && (
               <div className='community__select__item__bottom'>
                  {items.map((item) => {
                     return (
                        <div
                           style={ { backgroundColor: selectedId === item.id ? '#E8F2F1' : 'inherit' } }
                           className='community__select__item__option'
                           role='presentation'
                           onClick={ () => onClick(item) }
                           key={ uniqueId() }
                        >
                           <div className='community__select__item__option__title'>
                              {item.is_default ? <img src={ wave } alt='wave' />
                                 : title === 'External Sources' ? <IconNew name={ iconName } />
                                    : <span className='room_icon' style={ { color: selectedId === item.id ? '#24554E' : '#444C4B' } }>#</span>

                              }
                              <TextWithTooltip
                                 inner={ item.name || item.text }
                                 style={ { color: selectedId === item.id ? '#24554E' : '#444C4B' } }
                                 type={ title === 'External Sources' ? types.regularDefault : types.bold700 }
                                 size={ title === 'External Sources' ? sizes.small_new : sizes.large }
                                 onClick={ () => onClick(item) }
                                 tooltipWithoutIcon={ item.name || item.text }
                                 nameLength={ 15 }
                              />
                              {/* Notification Badge */}
                              {title === 'Rooms' && item.unread_count && item.unread_count > 0 && (
                                 <span className='notification-badge'>
                                    {item.unread_count > 99 ? '99+' : item.unread_count}
                                 </span>
                              )}
                           </div>
                           {title === 'Rooms' && (isAllowedButton(item) || role === 'admin') && (
                              <div className='community__select__item__option__btns'>
                                 {isAuthorOfRoom(item) && selectedId === item.id && (
                                    <div
                                       role='presentation'
                                       onClick={ (e) => {
                                          e.stopPropagation(); 
                                          goToRoomSettings(community.id, item.id); 
                                       } }
                                    >
                                       <IconNew name='SettingsCommunity' />
                                    </div>
                                 )}
                                 {role === 'admin' && selectedId === item.id && (
                                    <div
                                       onClick={ (e) => {
                                          e.stopPropagation(); 
                                          onInviteMember(community.id, item.id); 
                                       } }
                                       role='presentation'>
                                       <IconNew name='UserPlusCommunity' />
                                    </div>
                                 )}
                                 {/* {isAuthorOfRoom(item) && (
                                    <div
                                       className='community__top__action community__top__action__delete'
                                       role='presentation'
                                       //  onClick={ () => setIsOpenDeletePopup(true) }
                                    >
                                       <IconNew name='deleteCommunityM' />
                                    </div>
                                 )} */}
                              </div>
                           )}
                           {isHaveDelete && (
                              <div
                                 className='community__select__item__option__remove'
                                 role='presentation'
                                 onClick={ (e) => {
                                    e.preventDefault(); e.stopPropagation(); onDelete(item.id);
                                 } }
                              >
                                 <IconNew name='deleteCommunityM' />
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            )}
            {isHavePlus && title === 'Rooms' && (
               <div
                  className='community__select__item__right__room'
                  role='presentation'
                  onClick={ handleAddRoom }
               >
                  {/* <div style={ {
                     display: 'flex',
                     alignItems: 'center',
                     gap: '5px',
                     cursor: 'pointer',
                  } }>
                     <IconNew name='plusSelectorS' />
                     <span>Add New Room</span>
                  </div> */}
                  <Button
                     iconName='plusNew'
                     theme='tertiary'
                     size='xLarge'
                     text='Add New Room'
                     isIconRight={ true }
                     isHidenDiv={ true }
                     onClick={ handleAddRoom }
                     iconColor='#22272F'
                  />
               </div>
            )}
         </div>
      </>

   );
};

CommunitySelectItem.propTypes = {
   items: PropTypes.array,
   title: PropTypes.string,
   onClick: PropTypes.func,
   isHavePlus: PropTypes.bool,
   iconName: PropTypes.string,
   onPlus: PropTypes.func,
   selectedId: PropTypes.any,
   isHaveDelete: PropTypes.bool,
   onDelete: PropTypes.func,
   role: PropTypes.string,
   community: PropTypes.object,
   user: PropTypes.object,
   onInviteMember: PropTypes.func,
   goToRoomSettings: PropTypes.func,
};

export default CommunitySelectItem;
