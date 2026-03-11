import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import SliceAndConnectText from 'utils/getSplitedText';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';

import CommunityPost from 'views/pages/CommunityPosts/CommunityPostsComponents/CommunityPost';


const MemberCommunityPage = ({
   communities, onSelectCommunity, selectedCommunity, goBack, isLoadingCommunity,
}) => {
   // used to work like this
   //    const [selectedTab, setSelectedTab] = useState('posts');
   //    const memberCommunityVariants = [
   //       { key: `Posts (${ selectedCommunity ? selectedCommunity.posts.length : 0 })`, value: 'posts', iconName: 'MemberCommunityPostM' },
   //       { key: `Comments (${ selectedCommunity ? selectedCommunity.allCommentsCount : 0 })`, value: 'comments', iconName: 'MemberCommunityCommentsM' },
   //    ];

   const getActiveDate = () => {
      let date = '';
      const params = selectedCommunity.generalInfo.activity;
      if (params.y) {
         date = `${ params.y }y `;
      }
      if (params.m) {
         date += `${ params.m }m `;
      }
      if (params.h) {
         date += `${ params.h }h `;
      }
      if (params.m) {
         date += `${ params.m }m `;
      }
      if (params.s) {
         date += `${ params.s }s `;
      }
      return `Active ${ date }ago`;
   };

   return (
      <div className='member__community'>
         {isLoadingCommunity && (
            <LoaderSpinner />
         )}
         {selectedCommunity ? (
            <div className='member__community__view'>
               <div className='member__community__view__top'>
                  <div
                     className='member__community__view__top__icon'
                     role='presentation'
                     onClick={ goBack }
                  >
                     <Icon name='ArrowLeftLarge' />
                  </div>
                  <Text
                     inner={ selectedCommunity.communtity_name }
                     type={ types.regularMin }
                     size={ sizes.size_28 }
                  />
               </div>
               <TextWithIcon
                  iconName='MemberCommunityPostMActive'
                  type={ types.regularDefault }
                  inner={ `Posts (${ selectedCommunity ? (selectedCommunity.posts || []).length : 0 }) ` }
                  size={ sizes.small }
                  style={ { color: '#275F56' } }
               />
               {/* <Tabs
                  variants={ memberCommunityVariants }
                  selectedVariant={ selectedTab }
                  onSelect={ setSelectedTab }
                  isButton={ false }
                  hasIcon={ true }
               /> */}
               <div className='member__community__view__bottom'>
                  {selectedCommunity && selectedCommunity.posts && (
                     <div className='member__community__view__posts'>
                        {selectedCommunity.posts.map((post) => {
                           return (
                              <CommunityPost
                                 post={ {
                                    ...post,
                                    courses: [],
                                    posts_poll: [],
                                    comments: post.comments_without_replay,
                                    author: post.post_author,
                                 } }
                                 goToMemberProfile={ () => {} }
                              />
                           );
                        })}
                     </div>
                  )}
                  {/* {selectedTab === 'posts' ? (
                     <div className='member__community__view__posts'>
                        {selectedCommunity.posts.map((post) => {
                           return (
                              <CommunityPost
                                 post={ {
                                    ...post,
                                    courses: [],
                                    posts_poll: [],
                                    comments: post.comments_without_replay,
                                    author: post.post_author,
                                 } }
                              />
                           );
                        })}
                     </div>
                  ) : (
                     <div className='member__community__view__comments'>
                        { selectedCommunity.allComments.map((comment) => {
                           return (
                              <div className='member__community__view__comment'>
                                 <div className='member__community__view__comment__top'>
                                    <img src={ comment.user.picture_src || comment.user.picture_full_src } alt='' />
                                    <div className='member__community__view__comment__top__right'>
                                       <Text
                                          inner={ comment.user.name }
                                          type={ types.mediumLarge }
                                          size={ sizes.small }
                                       />
                                       <Text
                                          inner={ moment(comment.created_at).format('MMM D / HH:mm a') }
                                          type={ types.regularLarge }
                                          size={ sizes.xsmall }
                                          style={ { color: '#727978' } }
                                       />
                                    </div>
                                 </div>
                                 <Text
                                    inner={ comment.text }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                              </div>
                           );
                        })}
                     </div>
                  )} */}
                  <div className='member__community__view__general'>
                     <Text
                        inner='General Info'
                        type={ types.regular160 }
                        size={ sizes.xlarge }
                     />
                     <div className='member__community__view__general__block'>
                        <Text
                           inner='Member Since'
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <Text
                           inner={ moment(selectedCommunity.generalInfo.member_since).format('DD/MM/YY') }
                           type={ types.regularLarge }
                           size={ sizes.xsmall }
                        />
                     </div>
                     {selectedCommunity.generalInfo.activity && (
                        <div className='member__community__view__general__block'>
                           <Text
                              inner='Activity'
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                           <Text
                              inner={ getActiveDate() }
                              type={ types.regularLarge }
                              size={ sizes.xsmall }
                           />
                        </div>
                     )}
                     <div className='member__community__view__general__blocks'>
                        <div className='member__community__view__general__lblock'>
                           <Text
                              inner='Followers'
                              type={ types.regularLarge }
                              size={ sizes.xsmall }
                              style={ { color: '#444C4B' } }
                           />
                           <Text
                              inner='0'
                              type={ types.regular160 }
                              size={ sizes.xxlarge }
                           />
                        </div>
                        <div className='member__community__view__general__lblock'>
                           <Text
                              inner='Following'
                              style={ { color: '#444C4B' } }
                              type={ types.regularLarge }
                              size={ sizes.xsmall }
                           />
                           <Text
                              inner='0'
                              type={ types.regular160 }
                              size={ sizes.xxlarge }
                           />
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         ) : (
            <div className='member__communities'>
               {!communities.length ? (
                  <div className='member__classes__wrapper__founds'>
                     <Text
                        inner='No Communities yet'
                        style={ { color: '#727978', textAlign: 'center' } }
                        type={ types.mediumLargeGrey }
                        size={ sizes.new_size_28 }
                     />
                     <img src={ emptyState } alt='No Communities Yet' />
                  </div>
               ) : ''}
               {!!communities.length 
                  && (
                     <table>
                        <thead>
                           <tr>
                              <th>
                                 <Text
                                    inner='Communities'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                              </th>
                              {/* <th>
                                 <Text
                                       inner='Owner'
                                       type={types.mediumLarge}
                                       size={sizes.small}
                                 />
                              </th> */}
                              <th>
                                 <Text
                                    inner='Posts'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                              </th>
                              <th>
                                 <Text
                                    inner='Comments'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                              </th>
                              <th />
                           </tr>
                        </thead>
                        <tbody>
                           {communities.map((community) => {
                              return (
                                 <tr key={ uniqueId() }>
                                    <td>
                                       <Text
                                          inner={ SliceAndConnectText(community.name, 30) }
                                          type={ types.regularDefault }
                                          onClick={ () => onSelectCommunity(community.id) }
                                          size={ sizes.small }
                                          style={ { textDecoration: 'underline', cursor: 'pointer' } }
                                       />
                                    </td>
                                    {/* <td>
                                          <Text
                                             inner={community.name}
                                             type={types.regularDefault}
                                             size={sizes.small}
                                             style={{ textDecoration: 'underline' }}
                                          />
                                       </td> */}
                                    <td>
                                       <Text
                                          inner={ community.postsCount }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <Text
                                          inner={ community.commentsCount }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td className='tb-buttons'>
                                       <BaseButton
                                          text='More Info'
                                          theme={ btnTheme.more }
                                          onClick={ () => onSelectCommunity(community.id) }
                                          size={ btnSizes.small }
                                       />
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  )
               }
            </div>
         )}
      </div>
   );
};

MemberCommunityPage.propTypes = {
   selectedCommunity: PropTypes.object,
   isLoadingCommunity: PropTypes.bool,
   goBack: PropTypes.func,
   onSelectCommunity: PropTypes.func,
   communities: PropTypes.array,
};

export default MemberCommunityPage;
