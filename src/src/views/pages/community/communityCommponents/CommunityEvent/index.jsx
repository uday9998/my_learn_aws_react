import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import defaultImage from 'assets/images/community/defaultEvent.png';
import SimpleStatus from 'components/elements/SimpleStatus';
import './index.scss';
import { copyToClipBoard } from 'utils/copy';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import { PostLeaveComment } from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityLeaveComment';
import { CommunityPostComments } from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPostComments';
import moment from 'moment';

const CommunityEvent = ({
   isMulti,
   event,
   isChecked,
   onCheck,
   unPin,
   options,
   goToEventView,
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
   const [localTime, setLocalTime] = useState('');
   const [isOpenComments, setIsOpenComments] = useState(false);

   useEffect(() => {
      if (event?.time) {
         const today = moment().format('YYYY-MM-DD');
         const utcDateTime = moment.utc(`${ today } ${ event.time }`, 'YYYY-MM-DD HH:mm:ss');
         
         setLocalTime(utcDateTime.local().format('HH:mm:ss'));
      } else {
         setLocalTime('00:00:00');
      }
   }, [event]);

   return (
      <div className='community__event'>
         {isMulti && (
            <CheckBox
               iconType='icon'
               checked={ isChecked }
               onChange={ onCheck }
            />
         )}
         <div
            className='community__event__content__wrapper'
         >
            <div className='community__event__content'>
               <div className='community__event__content__image'>
                  <img
                     src={ event.files
                        ? event.files.src : defaultImage }
                     alt=''
                  />
               </div>
               <div className='community__event__content__texts'>
                  <Text
                     inner={ event.name }
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  {/* <div className='community__event__content__type'> */}

                  {/* <TextWithIcon
                        iconName='UsersCommunityL'
                        type={ types.regularDefault }
                        isIconRight={ true }
                        inner={ room?.room_member?.length || 0 }
                        size={ sizes.small }
                     /> */}
                  {/* </div> */}
                  <div className='community__event__content__texts__content'>
                     <div className='community__event__content__texts__content__left'>
                        <div className='community__event__content__bottom'>
                           <SimpleStatus
                              color='pink'
                              text={ `${ event.access } Event` }
                           />
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
                              color='navy'
                              iconName='ClockS'
                              text={ `${ localTime }` }
                           />
                           <SimpleStatus
                              color='lightPink'
                              iconName='TimeTypeCommmunityS'
                              text={ `${ event.duration } Hrs` }
                           />
                           {event.address && (
                              <SimpleStatus
                                 color='purple'
                                 iconName='AddressS'
                                 text={ `${ event.address }` }
                              />
                           )}
                           {event.phone && (
                              <SimpleStatus
                                 color='orange'
                                 iconName='PhoneContactS'
                                 text={ `${ event.phone }` }
                              />
                           )}
                        </div>
                        {event.description && (
                           <Text
                              inner={ event.description }
                              type={ types.regular148 }
                              size={ sizes.small14 }
                           />
                        )}
                     </div>
                     {!!event.link && (
                        <div className='community__event__content__edit'>
                           <div className='community__event__content__edit__link'>
                              <TextWithIcon
                                 iconName='LinkCommunityM'
                                 inner='Link'
                                 onClick={ () => copyToClipBoard(event.link) }
                                 generalStyles={ { cursor: 'pointer' } }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                           </div>
                        </div>
                     )}
                     {role !== 'member' && !community.userSuspended && (
                        <DropTriggle
                        // activeStyles={ { background: '#A6C9C5', border: '1px solid #153833' } }
                           options={ options }
                        />
                     )}
                  </div>
               </div>
         
            </div>
            {/* <div
               className='community__event__content__wrapper__actions'
            >
               <TextWithIcon
                  iconName='PostCommentCount'
                  inner={ event.comments ? event.comments.length : 0 }
                  type={ types.regularDefaultSmall }
                  size={ sizes.small }
                  style={ { color: '#24554E' } }
                  onClick={ () => setIsOpenComments(!isOpenComments) }
                  generalStyles={ { cursor: 'pointer', background: isOpenComments ? '#A6C9C5' : 'inherit' } }
               />
            </div>
            {isOpenComments && event.comments.length > 0 && (
               <CommunityPostComments
                  community={ community }
                  commentReplyPost={ (commentId, text) => eventReplyComment(event.id, commentId, text) }
                  user={ user }
                  goToMemberProfile={ goToMemberProfile }
                  comments={ event.comments }
                  // commentType={ commentType }
                  onLike={ (id, parentId) => {
                     eventCommentLike(event.id, id, parentId);
                  } }
                  showReplyes
                  role={ role }
                  onDelete={ (comment) => {
                     eventCommentDelete(comment);
                  } }
               />
            )}
            {(user && !community.userSuspended) && (
               <PostLeaveComment
                  user={ {
                     picture_src: user.picture_src || user.picture_full_src,
                  } }
                  onPost={ (text) => commentEvent(event.id, text) }
                  community={ community }
               />
            )} */}
         </div>
      </div>
   );
};

CommunityEvent.propTypes = {
   event: PropTypes.object,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   isMulti: PropTypes.bool,
   unPin: PropTypes.func,
   options: PropTypes.array,
   goToEventView: PropTypes.func,
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

export default CommunityEvent;
