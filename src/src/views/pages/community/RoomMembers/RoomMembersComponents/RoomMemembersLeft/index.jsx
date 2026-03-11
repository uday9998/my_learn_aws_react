import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import MemberItem from '../MemberItem';
import './index.scss';

const RoomMembersLeft = ({
   members, actions, onlineUsers, community, 
}) => {
   return (
      <div className='room__members__list'>
         {members.length === 0 || (members.length === 1 && !members[0]) ? (
            <Text
               inner='No Results Found'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: 'rgba(19, 31, 30, 0.6)', width: '100%', textAlign: 'center' } }
            />
         ) : (
            <>
               {members.map((e) => {
                  return (
                     <MemberItem
                        { ...actions }
                        key={ e.id }
                        member={ e }
                        community={ community }
                        isOnline={ onlineUsers.includes(e.id) }
                     />
                  );
               })}
            </>
         )}
      </div>
   );
};

RoomMembersLeft.propTypes = {
   members: PropTypes.array,
   actions: PropTypes.object,
   onlineUsers: PropTypes.array,
   community: PropTypes.object,
};

export default RoomMembersLeft;
