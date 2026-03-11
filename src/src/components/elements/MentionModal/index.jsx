import { useEffect, useState } from 'react';
import { getCommunityMention } from 'api';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes, TYPES as types } from '../TextNew';
import IconNew from '../iconsSize';

import './index.scss';

const MentionModal = ({
   modalPosition,
   modalRef,
   communityId,
   value,
   handleMention,
   hiddenScrollElementName,
   isMobile,
}) => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      if (hiddenScrollElementName && !isMobile) {
         const element = document.querySelector(`.${ hiddenScrollElementName }`);
         element.style.overflow = 'hidden';
   
         return () => {
            element.style.overflowY = 'auto';
         };
      }
   }, []);

   const getUsers = async () => {
      const { data } = await getCommunityMention(communityId, value.substring(value.indexOf('@')).replace('@', ''));
      setUsers(data);
   };
     
   useEffect(() => {
      getUsers();
   }, [value]);

   const onHandleMention = (name, id) => {
      handleMention(name, id);
   };

   return (
      <div
         style={ {
            top: !isMobile ? modalPosition?.y : '-204px',
            left: !isMobile ? modalPosition?.x + 3 : 0,
         } }
         className='mention_modal_wrapper'
         ref={ modalRef }
      >
         {
            users.length ? users.map(user => {
               return (
                  <div onClick={ () => onHandleMention(user.name, user.id) } role='presentation' key={ user.id } className='user_wrapper'>
                     <img src={ user.picture_src || user.picture_full_src } alt='avatar' />
                     <Text 
                        inner={ user.name }
                        size={ sizes.large_new }
                     />
                  </div>
               );
            }) : (
               <div style={ {
                  textAlign: 'center',
                  height: '91px',
                  display: 'flex',
                  alignItems: 'center',
               } }>
                  <Text 
                     inner='The mentioned user does not exist. Please check the username and try again.'
                     size={ sizes.small }
                     style={ { color: '#727978', textAlign: 'center' } }
                  />
               </div>
            )
         }
         <div className='footer__wrapper'>
            <div
               style={ {
                  marginTop: '2px',
               } }
            >
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
   );
};

MentionModal.propTypes = {
   modalPosition: PropTypes.object,
   modalRef: PropTypes.any,
   communityId: PropTypes.number,
   value: PropTypes.string,
   hiddenScrollElementName: PropTypes.string,
   handleMention: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default MentionModal;