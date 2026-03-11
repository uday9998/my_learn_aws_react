import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import { onlineUsersSelector } from 'state/modules/common/selectors';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import IconNew from 'components/elements/iconsSize';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DropTriggle from 'components/elements/newDropTriggle';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const CommunityHome = ({
   role, user, onInviteMember, community,
   // markAsRead, searchValue, room, onAddRoom,
   goToRoomCreate, handleOpenRoomMembers, deleteRoomComm, goToRoom,
   permissions, setPopupTitle, setShowPopup, showPopup, popupTitle,
}) => {
   const [disableAddRoom, setDisableAddRoom] = useState(false);


   const { pathname } = useLocation();

   useEffect(() => {
      if (!Array.isArray(permissions)) {
         if (pathname.includes('portal') && community.room?.length === permissions?.commmunities?.rooms_count) {
            setDisableAddRoom(true);
         } else if (pathname.includes('portal') && community.rooms?.length < permissions?.commmunities?.rooms_count) {
            setDisableAddRoom(false);
         }
      } else {
         setDisableAddRoom(false);
      }
   }, [permissions?.commmunities?.rooms_count]);

   
   const openRoomMembers = (id, type, block, room) => {
      if (block === 'Members' || block === 'Online') {
         if (room.room_member_count > 0) {
            handleOpenRoomMembers(community.id, id, community.id, type);  
         }
      } else {
         goToRoom(room);
      }
   };


   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const goToAddRoom = (id) => {
      if (Array.isArray(permissions)) {
         goToRoomCreate(id);
      } else if (community.rooms.length < permissions.commmunities.rooms_count) {
         goToRoomCreate(id);
      } else if (!pathname.includes('portal')) {
         setShowPopup(true);
         setPopupTitle('Need More Room? ');
      }
   };

   // const goToGeneralSettings = (id) => {
   //    history.push(`/admin/community/${ id }/settings#general`);
   // };


   return (
      <div className='communityHome'>
         {
            showPopup && createPortal(<PricingPopup 
               isCommunity={ true }
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle } />, document.body)
         }
         <div>
            <h2 className='communityHomeName'>Hi {user.name},</h2>
            <span className='communityHomeWelcome'>{`Welcome to the ${ community.name } Community`}</span>
         </div>
         <div className='communityHomeBoxes'>
            { (role === 'admin' || ((role === 'subadmin' || community.allow_create_room === 1) && !community.userSuspended))
            && (
               <div
                  onFocus={ () => { } }
                  role='presentation'
                  onClick={ !disableAddRoom ? () => goToAddRoom(community.id) : () => {} }
                  className={ disableAddRoom ? 'community__welcome__content__item disable__item' : 'community__welcome__content__item' }
               >
                  <div className='community__welcome__content__item__icon icon__pink'>
                     <IconNew name='ProgramCommunityL' />
                  </div>
                  <Text
                     inner='Add New Room'
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner="Create new rooms for your students to interact in. It's best if they are organized around a theme, like #rules."
                     type={ types.regularLarge }
                     size={ sizes.xsmall }
                     style={ { color: '#727978', margin: '4px 0px 16px', height: '72px' } }
                  />
                  <div
                     className='community__welcome__content__item__select'

                  >
                     <Text
                        inner='Add Room'
                        type={ types.regular148 }
                        size={ sizes.xsmall }
                        style={ { cursor: 'pointer' } }
                     />
                  </div>
               </div>
            )}
            {role === 'admin' && (
               <>
                  <div
                     onFocus={ () => { } }
                     role='presentation'
                     onClick={ () => onInviteMember(community.id) }
                     className='community__welcome__content__item'
                  >
                     <div className='community__welcome__content__item__icon icon__green'>
                        <IconNew name='CommunityAddUserL' />
                     </div>
                     <Text
                        inner='Invite Members'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <Text
                        inner='You can add members manually. For example, you need technical staff for the community or for some other reason.'
                        type={ types.regularLarge }
                        size={ sizes.xsmall }
                        style={ { color: '#727978', margin: '4px 0px 16px', height: '72px' } }
                     />
                     <div
                        className='community__welcome__content__item__select'

                     >
                        <Text
                           inner='Invite'
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { cursor: 'pointer' } }
                        />
                     </div>
                  </div>
                  <div
                     onFocus={ () => { } }
                     role='presentation'
                     className='community__welcome__content__item community__welcome__content__item__disabled'
                  >
                     <div className='community__welcome__content__item__icon icon__orange'>
                        <IconNew name='CommunityAddPost' />
                     </div>
                     <Text
                        inner='Create a Post'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <Text
                        inner='By creating posts, you can share information with other users and gain their attention.'
                        type={ types.regularLarge }
                        size={ sizes.xsmall }
                        style={ { color: '#727978', margin: '4px 0px 16px', height: '72px' } }
                     />
                     <div
                        className='community__welcome__content__item__select'

                     >
                        <Text
                           inner='Create a Post'
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { cursor: 'pointer' } }
                        />
                     </div>
                  </div>
                  <div
                     onFocus={ () => { } }
                     role='presentation'
                     className='community__welcome__content__item community__welcome__content__item__disabled'
                  >
                     <div className='community__welcome__content__item__icon icon__green'>
                        <IconNew name='CommunityAddEvent' />
                     </div>
                     <Text
                        inner='Create an Event'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <Text
                        inner='By creating events, you can schedule events with other users and meet together.'
                        type={ types.regularLarge }
                        size={ sizes.xsmall }
                        style={ { color: '#727978', margin: '4px 0px 16px', height: '72px' } }
                     />
                     <div
                        className='community__welcome__content__item__select'

                     >
                        <Text
                           inner='Create an Event'
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { cursor: 'pointer' } }
                        />
                     </div>
                  </div>
               </>
            )}
         </div>
         { role === 'admin' && (
            <div className='communityHomeRoomBox'>
               <Text
                  inner='Rooms'
                  type={ types.regularDefault }
                  size={ sizes.large_new }
                  style={ { color: '#131F1E' } }
               />
               <div className='communityHomeRooms'>
                  {
                     community.rooms.map(room => {
                        const blocks = [
                           { name: 'Members', value: room.room_member_count },
                           { name: 'Online', value: room.room_online_member_count },
                           { name: 'Posts', value: room.posts.length },
                        ];
                        return (
                           <div className='communityHomeRoom' key={ room.id }>
                              <div className='communityHomeRoomTop'>
                                 <div className='communityHomeRoomTopTitle'>
                                    <Text
                                       inner={ `# ${ room.name }` }
                                       type={ types.regularDefault }
                                       size={ sizes.large_new }
                                       style={ { color: '#131F1E' } }
                                    />
                                    <DropTriggle
                                       options={ [
                                          {
                                             trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => { deleteRoomComm(community.id, room.room_group_id, room.id); },
                                          },
                                       ] }
                                    />
                                 </div>
                                 <div className='communityStatusSimple' style={ { background: 'rgb(255, 238, 246)' } }>
                                    <Text
                                       inner='Open Room'
                                       type={ types.regularDefault }
                                       size={ sizes.small14 }
                                       style={ { color: 'rgb(255, 97, 173)' } }
                                    />
                                 </div>
                              </div>
                              <Text
                                 inner='This space was created to discuss the monthly workshops'
                                 type={ types.regularDefault }
                                 size={ sizes.xsmall }
                                 style={ { color: '#727978' } }
                              />
                              <div className='community__right__info__blocks communityRightInfoBlock'>
                                 {blocks.map((block) => {
                                    return (
                                       <div
                                          key={ uniqueId() }
                                          style={ { cursor: 'pointer' } }
                                          role='presentation'
                                          onClick={ () => openRoomMembers(room.id, room.type, block.name, room) }
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
                                             style={ { color: '#444C4B', cursor: 'pointer' } }
                                          />
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        );
                     })
                  }
                  <div
                     className='communityHomeRoomBottom'
                     onClick={ () => {
                        if (!Array.isArray(permissions)) {
                           if (community.rooms.length < permissions.commmunities.rooms_count) {
                              goToRoomCreate(community.id);
                           } else {
                              setShowPopup(true);
                              setPopupTitle('Need More Room? ');
                           }
                        } else {
                           goToRoomCreate(community.id);
                        }
                     } }
                     role='presentation'>
                     <IconNew name='plusSelectorM' />
                     <Text
                        inner='Add New Rooms'
                        type={ types.regularDefault }
                        size={ sizes.small14 }
                        style={ { color: '#24554E' } }
                     />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

CommunityHome.propTypes = {
   user: PropTypes.object,
   community: PropTypes.object,
   role: PropTypes.string, 
   onInviteMember: PropTypes.func,
   goToRoomCreate: PropTypes.func,
   handleOpenRoomMembers: PropTypes.func,
   deleteRoomComm: PropTypes.func,
   goToRoom: PropTypes.func,
   permissions: PropTypes.object,
   setPopupTitle: PropTypes.func,
   setShowPopup: PropTypes.func, 
   showPopup: PropTypes.bool,
   popupTitle: PropTypes.string,
}; 

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      data: selectors.membersPageSelector(state),
      community: selectors.communitySelector(state),
      progress: selectors.communityProgressSelector(state),
      onlineUsers: onlineUsersSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToRoomCreate: id => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getCompiledPath({
                  id,
               })
            )
         );
      },
      onInviteMember: (id, roomId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getCompiledPath({
                  id,
               }) }${ roomId ? `#${ roomId }` : '' }`
            )
         );
      },
      goToMemberProfile: (id, memberId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getCompiledPath({
                  id,
                  memberId,
               })
            )
         );
      },
      handleReport: (...params) => {
         dispatch(operations.ReportMembersOperation(...params));
      },
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      deleteRoomComm: (communityId, roomGroupId, roomId) => {
         dispatch(operations.deleteRoomCommunity(communityId, roomGroupId, roomId));
      },
      handleOpenRoomMembers: (id, roomId, groupId, type) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').getCompiledPath({
                  id,
                  roomId,
                  type,
                  groupId,
               })
            )
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHome);
