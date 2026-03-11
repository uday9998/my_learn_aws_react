import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import MemberItem from '../MemberItem';
import './index.scss';
import MemberItemSquare from '../MemberItemSquare';

const RoomMembersLeft = ({
   members, actions, onlineUsers, viewMode, community, updateMemberData,
}) => {
   return (
      <div className={ `room__members__list ${ viewMode === 'list' ? '' : 'room__members__list__square' }` }>
         {members.length === 0 ? (
            <Text
               inner='No Results Found'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: 'rgba(19, 31, 30, 0.6)', width: '100%', textAlign: 'center' } }
            />
         ) : (
            <>
               {
                  viewMode === 'list' 
                     ? members.map((e) => {
                        return (
                           <MemberItem
                              { ...actions }
                              key={ e.id }
                              member={ e }
                              community={ community }
                              isOnline={ onlineUsers.includes(e.id) }
                              updateMemberData={ updateMemberData }
                           />
                        );
                     })
                     : members.map((e) => {
                        return (
                           <MemberItemSquare
                              { ...actions }
                              key={ e.id }
                              member={ e }
                              community={ community }
                              isOnline={ onlineUsers.includes(e.id) }
                              updateMemberData={ updateMemberData }
                           />
                        );
                     })
               }
            </>
         )}
      </div>
   );
};

RoomMembersLeft.propTypes = {
   members: PropTypes.array,
   onlineUsers: PropTypes.array,
   actions: PropTypes.object,
   viewMode: PropTypes.string,
   community: PropTypes.object,
   updateMemberData: PropTypes.func,
};

export default RoomMembersLeft;
