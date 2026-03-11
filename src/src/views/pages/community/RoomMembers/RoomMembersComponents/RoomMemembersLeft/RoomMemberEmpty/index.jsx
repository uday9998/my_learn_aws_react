import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import icon from 'assets/images/community/eye.png';
// import MemberItem from '../../MemberItem';

const RoomMemberEmpty = ({
   onInviteMember, role,
}) => {
   return (
      <div className='room__members__empty'>
         {/* <MemberItem
            member={ member }
            roomName={ room.name }
            isOnline={ true }
            isHiddenActions={ () => false }
            goToMemberProfile={ () => goToMemberProfile() }
            checkUserFollowing={ () => true }
         /> */}
         <div className='room__members__empty__inner'>
            <img src={ icon } alt='' />
            <Text
               inner='There are no members in this room yet'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            {role === 'admin' && (
               <>
                  <Text
                     inner="Let's invite your first members."
                     type={ types.regularDefaultSmallX }
                     size={ sizes.size_28 }
                  />
                  <div className='d-j'>
                     <Button
                        text='Invite Members'
                        onClick={ onInviteMember }
                     />
                  </div>
               </>
            )}

         </div>
      </div>
   );
};

RoomMemberEmpty.propTypes = {
   // goToMemberProfile: PropTypes.func,
   onInviteMember: PropTypes.func,
   // member: PropTypes.object,
   // room: PropTypes.object,
   role: PropTypes.string,
};

export default RoomMemberEmpty;
