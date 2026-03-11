import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import { uniqueId } from 'lodash';
import IconNew from 'components/elements/iconsSize';
import CommunityCover from 'views/pages/community/communityCover';
import CommunityTrendingPost from '../CommunityTrendingPost';
// import { CommunityEngagedUser } from '../CommunityEngagedUser';
// import cup from './cup.png';

const CommunityPostsRight = ({
   room, trendingPosts, mostUsers, goToMemberProfile, openRoomMembers,
   isEventMemberRoom, community, role, user, handlePinPost, goToRoom, isNotRoom,
}) => {
   const blocks = [
      { name: 'Members', value: room.room_member.length === 0 ? 0 : room.room_member.length, onClick: () => openRoomMembers() },
      { name: 'Online', value: room.online_members_count, onClick: () => openRoomMembers() },
      { name: room.type === 'posts' ? 'Posts' : ' Events', value: room.posts.length, onClick: () => goToRoom(room) },
   ];
   return (
      <div className='community__right'>
         <div className='community__right__info'>
            <CommunityCover community={ community } />
            {/* <Text
               inner={ `# ${ room.name }` }
               type={ types.medium153 }
               size={ sizes.large }
            />
            <div className='communityStatusSimple'>
               <Text
                  inner='Open Room'
                  type={ types.regularDefault }
                  size={ sizes.small14 }
                  style={ { color: 'rgb(255, 97, 173)' } }
               />
            </div>
            <Text
               inner='This space was created to discuss the monthly workshops'
               type={ types.regularDefault }
               size={ sizes.small_14 }
               style={ { color: '#444C4B' } }
            /> */}
            <div className='community__right__info__blocks'>
               {blocks.map((block) => {
                  return (
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
                           style={ { color: '#444C4B', cursor: 'pointer' } }
                        />
                     </div>
                  );
               })}
            </div>
         </div>
         {!isEventMemberRoom && (
            <>
               <div className='community__right__block'>
                  <Text
                     inner='Pinned Posts'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  {trendingPosts.length > 0 ? (
                     <div className='community__right__block__content'>
                        {trendingPosts.map((el) => {
                           return (
                              <CommunityTrendingPost
                                 key={ el.id }
                                 post={ el }
                                 role={ role }
                                 user={ user }
                                 handlePinPost={ handlePinPost }
                                 goToRoom={ isNotRoom ? () => goToRoom(room) : null }
                              />
                           );
                        })}
                        {/* <PostArrowIcon
                     isOpen={ isOpenList }
                     text={ isOpenList ? 'Hide Full List' : 'See Full List' }
                     onClick={ () => setIsOpenList(!isOpenList) }
                  /> */}
                     </div>
                  ) : (
                     <div className='community__right__block__empty'>
                        {/* <img src={ cup } alt='cup' style={ { width: '32px' } } /> */}
                        <IconNew name='CommunityPinned' />
                        <Text
                           inner='There are no pinned posts yet.'
                           type={ types.mediumLarge }
                           size={ sizes.small_14 }
                           style={ { color: '#727978' } }
                        />
                        {/* <div className='community__highest__activity'>
                           <IconNew name='CommunityAttention' />
                           <Text
                              inner='Add a user to this room and start creating posts together to see pinned posts.'
                              type={ types.regularDefault }
                              size={ sizes.xsmall }
                              style={ { color: '#131F1E' } }
                           />
                        </div> */}
                     </div>
                  )}
               </div>
               {/* <div className='community__right__block'>
                  <Text
                     inner={ `Most Engaged Users${ mostUsers.length > 0 ? ` (${ mostUsers.length })` : '' }` }
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  {mostUsers.length > 0 ? (
                     <div className='community__right__block__content'>
                        {mostUsers.map((el, index) => {
                           return (
                              <CommunityEngagedUser
                                 user={ el }
                                 onClick={ () => goToMemberProfile(el.id) }
                                 index={ index + 1 }
                                 // eslint-disable-next-line react/no-array-index-key
                                 key={ index }
                              />
                           );
                        })}
                     </div>
                  ) : (
                     <div className='community__right__block__empty'>
                        <Text
                           inner='There are no most engaged users yet.'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                        <Text
                           inner='Here you can see the users with the highest activity.'
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#727978' } }
                        />
                     </div>
                  )}
               </div> */}
            </>
         )}

      </div>
   );
};

CommunityPostsRight.propTypes = {
   openRoomMembers: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   room: PropTypes.object,
   isEventMemberRoom: PropTypes.bool,
   trendingPosts: PropTypes.array,
   mostUsers: PropTypes.array,
   community: PropTypes.object,
   role: PropTypes.string,
   user: PropTypes.object,
   handlePinPost: PropTypes.func,
   goToRoom: PropTypes.func,
   isNotRoom: PropTypes.bool,
};

export default CommunityPostsRight;
