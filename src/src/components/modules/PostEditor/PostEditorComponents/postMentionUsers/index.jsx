import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SliceAndConnectText from 'utils/getSplitedText';
import { getCommunityMention } from 'api';
import { uniqueId } from 'lodash';

const PostMentionUsers = ({
   position, value, clearMention, onMention, communityId,
}) => {
   const [users, setUsers] = useState([]);

   const getUsers = async () => {
      const { data } = await getCommunityMention(communityId, value.replace('@', ''));
      setUsers(data);
   };

   useEffect(() => {
      getUsers();
   }, [value]);
   if (users.length === 0) return null;

   return (
      <ClickOutside onClick={ () => clearMention() }>
         <div
            className='trix-custom-editor-innerEditor trix-custom-editor-mention'
            style={ {
               // top: position.y - 260,
               // left: position.x - 75,
               top: position.y,
               left: position.x + 2,
               minWidth: window.innerWidth > 1200 ? '300px' : '150px',
               maxWidth: window.innerWidth > 1200 ? '300px' : '150px',
            } }
         >
            <div className='trix-custom-editor-mention-users'>
               {users.map((user) => {
                  return (
                     <div key={ uniqueId() } className='trix-custom-editor-mention-user' role='presentation' onClick={ () => onMention(user.name, user.id) }>
                        <img src={ user.picture_src || user.picture_full_src } alt='' />
                        <Text
                           inner={ SliceAndConnectText(user.name, 20) }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                  );
               })}
            </div>
            <div className='trix-custom-editor-mention-warning'>
               <div>
                  <IconNew name='trixWarning' />
               </div>
               <Text
                  inner='Start typing to narrow it down, or scroll and select'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
         </div>
      </ClickOutside>
   );
};

PostMentionUsers.propTypes = {
   value: PropTypes.string,
   position: PropTypes.object,
   clearMention: PropTypes.func,
   onMention: PropTypes.func,
   communityId: PropTypes.any,
};

export default PostMentionUsers;
