import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import DropTriggle from 'components/elements/newDropTriggle';
import Tabs from 'components/elements/tabs';
import CommunityPost from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPost';
import { uniqueId } from 'lodash';
import DeleteModal from 'components/elements/DeleteModal';
import { communitySecondaryButtonColors } from 'utils/communityButtonColors';
import MemberProfileCommunities from '../MemberProfileCommunities';
import MemberProfileComments from '../MemberProfileComments';

const MemberProfileLeft = ({
   member, isFollower, user, userSubscribe, onDelete, filterMember, communityOwnerId, community,
   role,
}) => {
   const [selectedTab, setSelectedTab] = useState('posts');
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
 
   let membersPosts = member.user_posts;
   if (member.user_posts.length > 0) {
      membersPosts = member.user_posts.filter(post => post.room.room_groups.community_id === community.id);
   }
   

   const tabVariants = [
      { value: 'posts', key: `Posts (${ membersPosts.length })`, iconName: 'CommunityTabM' },
      { value: 'comments', key: `Comments (${ member.user_post_comments.length })`, iconName: 'CommunityMemberTabCommentM' },
      { value: 'communities', key: `Communities (${ member.communities.length })`, iconName: 'CommunityMemberCommunityesM' },
   ];

   const getComments = (id) => {
      const comments = member.user_post_comments;
      const thisPostComments = comments.filter((e) => e.post_id === id);
      return thisPostComments;
   };

   const getLikes = (id) => {
      const likes = member.user_post_likes;
      const thisPostLikes = likes.filter((e) => e.post_id === id);
      return thisPostLikes;
   };

   return (
      <div className='member__profile__left'>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to delete the ${ member.name } user?` }
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  onDelete();
                  setIsOpenDeleteModal(false);
               } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <div className='member__profile__left__top'>
            <div className='d-a-j'>
               <div className='user'>
                  <img src={ member.picture_src || member.picture_full_src } alt='' />
                  <Text
                     inner={ member.name }
                     type={ types.medium160 }
                     size={ sizes.small }
                  />
               </div>
               <div className='actions'>
                  { user.id !== member.id && (
                     <>
                        {isFollower ? (
                           <Button
                              text='Unfollow'
                              onClick={ () => userSubscribe(member.id) }
                              theme={ themes.error }
                           />
                        ) : (
                           <Button
                              text={ `Follow | ${ member.follow_count }` }
                              theme={ themes.secondary }
                              onClick={ () => userSubscribe(member.id) }
                              style={ communitySecondaryButtonColors(community) }
                           />
                        )}
                     </>
                  ) }

                  {communityOwnerId !== member.id && role === 'admin' && (
                     <DropTriggle
                        activeStyles={ { boxShadow: '0px 0px 4px #54938B', background: '#A6C9C5', border: 'none' } }
                        options={ [
                           // {
                           //    trash: false, iconName: 'CommunitySettingsMemberMuteM', name: 'Mute', onClick: () => {},
                           // },
                           {
                              trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => setIsOpenDeleteModal(true),
                           },
                        ] }
                     />
                  )}
               </div>
            </div>
            <Text
               inner='Introduction'
               type={ types.medium153 }
               size={ sizes.large }
               style={ { margin: '0px 0px -6px 0px' } }
            />
            <Text
               inner={ member.description || '' }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
         <div className='member__profile__left__tabs'>
            <Tabs
               variants={ tabVariants }
               selectedVariant={ selectedTab }
               isButton={ false }
               onSelect={ (tab) => setSelectedTab(tab) }
               hasIcon={ true }
            />
         </div>
         {selectedTab === 'communities' && (
            <MemberProfileCommunities
               filterMember={ filterMember }
               member={ member }
               communities={ member.communities }
            />
         )}
         {selectedTab === 'posts' && (
            <div className='member__profile__left__posts'>
               {membersPosts.map((post) => {
                  return (
                     <CommunityPost
                        key={ uniqueId() }
                        post={ {
                           ...post,
                           courses: [],
                           posts_poll: [],
                           likes: getLikes(post.id),
                           comments: getComments(post.id),
                           author: member,
                        } }
                        goToMemberProfile={ () => {} }
                        user={ user }
                        role={ role }
                     />
                  );
               })}
            </div>
         )}
         {selectedTab === 'comments' && (
            <MemberProfileComments
               user={ user }
               comments={ member.user_post_comments }
               member={ member }
               filterMember={ filterMember }
            />
         )}
      </div>
   );
};

MemberProfileLeft.propTypes = {
   onDelete: PropTypes.func,
   userSubscribe: PropTypes.func,
   member: PropTypes.object,
   user: PropTypes.object,
   isFollower: PropTypes.bool,
   communityOwnerId: PropTypes.func,
   role: PropTypes.string,
   filterMember: PropTypes.func,
   community: PropTypes.object,
};

export default MemberProfileLeft;
