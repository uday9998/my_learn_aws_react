import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { getProperlyPlanNameMember } from 'utils/Plans';
import { getRole } from 'views/layout/membersNew/membersComponents/membersTypeSecond/Member';
import Acitvity from 'components/modules/Activitys';
import moment from 'moment';
import IconNew from 'components/elements/iconsSize';
import personalLinksImg from 'assets/images/personal_link.png';

const MemberGeneralPage = ({ currentMember, isMobile }) => {
   const allLinks = currentMember.social_medias ? Object.keys(currentMember.social_medias) : [];
   const links = {
      facebook: 'https://www.facebook.com/',
      pinterest: 'https://www.pinterest.com/',
      youtube: 'https://www.youtube.com/',
      linkedin: 'https://www.linkedin.com/in/',
      tumblr: 'https://www.tumblr.com/',
      tiktok: 'https://www.tiktok.com/',
      instagram: 'https://www.instagram.com/',
   };
   const linkIcons = {
      facebook: 'FaceBookM',
      pinterest: 'PinterestM',
      youtube: 'YoutubeM',
      linkedin: 'LinkedingM',
      tumblr: 'TumblrM',
      tiktok: 'TikTokM',
      instagram: 'InstagramM',
   };

   const linkNames = {
      facebook: 'Facebook',
      pinterest: 'Pinterest',
      youtube: 'Youtube',
      linkedin: 'Linkedin',
      tumblr: 'Tumblr',
      tiktok: 'TikTok',
      instagram: 'Instagram',
   };

   if (isMobile) {
      return (
         <div className='member__general'>
            <div className='member__general__blocks__list'>
               {/* <div className='member__general__blocks'>
                  <Text
                     inner='Subscription Level'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                     style={ { color: '#727978' } }
                  />
                  <div className='member__general__block__plan'>
                     <Text
                        inner={ getProperlyPlanNameMember(currentMember.plan_name) }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#A61C23', textOverflow: 'ellipsis' } }
                     />
                  </div>
               </div> */}
               <div className='member__general__blocks'>
                  <Text
                     inner='Roles'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                     style={ { color: '#727978' } }
                  />
                  <div className='member__general__block__role'>
                     <Text
                        inner={ getRole(currentMember.role) }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#8830BD' } }
                     />
                  </div>
               </div>
               <div className='member__general__blocks'>
                  <Text
                     inner='Last Sign In'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                     style={ { color: '#727978' } }
                  />
                  <div className=''>
                     <Text
                        inner={ currentMember.last_login_at ? moment(currentMember.last_login_at).format('MMM D, YYYY, HH:mm') : '-' }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#131F1E', textOverflow: 'ellipsis' } }
                     />
                  </div>
               </div>
               <div className='member__general__blocks'>
                  <Text
                     inner='Total Sign-Ins'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                     style={ { color: '#727978' } }
                  />
                  <div className=''>
                     <Text
                        inner={ currentMember.logins_count ? currentMember.logins_count : '' }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#131F1E', textOverflow: 'ellipsis' } }
                     />
                  </div>
               </div>
            </div>
            <div className='member__general__info'>
               <div className='member__general__info__block'>
                  <Text
                     inner='Email'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: '#727978', fontSize: '20px', fontWeight: '500' } }
                  />
                  <Text
                     inner={ currentMember.email }
                     type={ txtTypes.regularDefault }
                     style={ { textDecoration: 'underline' } }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='member__general__info__block'>
                  <Text
                     inner='About Me'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: '#727978' } }
                  />
                  <Text
                     inner={ currentMember.about_me || '' }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               {currentMember.field_values && currentMember.field_values.map((e) => {
                  return (
                     <div className='member__general__info__block' key={ e.id }>
                        <Text
                           inner={ e.custom_field_name }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#727978' } }
                        />
                        <Text
                           inner={ e.value }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  );
               })}
            </div>
            <div className='member__general__links'>
               <Text
                  inner='Personal links'
                  type={ txtTypes.regular160 }
                  size={ txtSizes.xlarge }
               />
               <div className='member__general__links__flex'>
                  {allLinks.length > 0 ? (
                     <>
                        {allLinks.map((linkName) => {
                           const e = currentMember.social_medias[linkName];
                           if (e === null) {
                              return null;
                           }
                           const url = `${ links[linkName] }${ e }`;
                           return (
                              <div className='member__general__link'>
                                 <div className='member__general__link__left'>
                                    <div className='member__general__link__left__top'>
                                       <IconNew name={ linkIcons[linkName] } />
                                       <Text
                                          inner={ linkNames[linkName] }
                                          type={ txtTypes.regularDefault }
                                          size={ txtSizes.small }
                                       />
                                    </div>
                                    <Text
                                       inner={ url }
                                       type={ txtTypes.regularDefault }
                                       size={ txtSizes.small }
                                       onClick={ () => window.open(url, '_blank') }
                                       style={ { color: '#727978', cursor: 'pointer' } }
                                    />
                                 </div>
                              </div>
                           );
                        })}
                     </>
                  ) : (
                     <Text
                        inner='No Results.'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#727978', textAlign: 'center' } }
                     />
                  )}
               </div>
            </div>
            <div className='member__general__recent'>
               <Text
                  inner='Recent Activity'
                  type={ txtTypes.regular160 }
                  size={ txtSizes.xlarge }
               />
               <Acitvity list={ currentMember.recent_activity || [] } image={ currentMember.picture_full_src } />
            </div>
         </div>
      );
   }
   return (
      <div className='member__general'>
         <div className='member__general__left'>
            <div className='member__general__info'>
               <div className='member__general__info__block'>
                  <Text
                     inner='Email'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.xlarge_new }
                     style={ { color: 'rgba(19, 31, 30, 1)', fontSize: '20px', fontWeight: '500' } }
                  />
                  <Text
                     inner={ currentMember.email }
                     type={ txtTypes.regularDefault }
                     style={ { textDecoration: 'underline' } }
                     size={ txtSizes.small14 }
                  />
               </div>
               <div className='member__general__info__block'>
                  <Text
                     inner='About Me'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: 'rgba(19, 31, 30, 1)' } }
                  />
                  <Text
                     inner={ currentMember.about_me || '' }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               {currentMember.field_values && currentMember.field_values.map((e) => {
                  return (
                     <div className='member__general__info__block' key={ e.id }>
                        <Text
                           inner={ e.custom_field_name }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#727978' } }
                        />
                        <Text
                           inner={ e.value }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  );
               })}
            </div>
            <div className='member__general__links'>
               <Text
                  inner='Personal links'
                  type={ txtTypes.regular160 }
                  size={ txtSizes.xlarge }
               />
               <div className='member__general__links__flex'>
                  {allLinks.length > 0 ? (
                     <>
                        {allLinks.map((linkName) => {
                           const e = currentMember.social_medias[linkName];
                           if (e === null) {
                              return null;
                           }
                           const url = `${ links[linkName] }${ e }`;
                           return (
                              <div className='member__general__link'>
                                 <div className='member__general__link__left'>
                                    <div className='member__general__link__left__top'>
                                       <IconNew name={ linkIcons[linkName] } />
                                       <Text
                                          inner={ linkNames[linkName] }
                                          type={ txtTypes.regularDefault }
                                          size={ txtSizes.small }
                                       />
                                    </div>
                                    <Text
                                       inner={ url }
                                       type={ txtTypes.regularDefault }
                                       size={ txtSizes.small }
                                       onClick={ () => window.open(url, '_blank') }
                                       style={ { color: '#727978', cursor: 'pointer' } }
                                    />
                                 </div>
                              </div>
                           );
                        })}
                     </>
                  ) : (
                     <div className='personal__links__wrapper'>
                        {/* Stex */}
                        <img src={ personalLinksImg } alt='personal links' />
                        <Text
                           inner='No personal links yet.'
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small14 }
                           style={ { color: 'rgba(19, 31, 30, 1)' } }
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className='member__general__right'>
            <div className='member__general__right__wrapper'>
               <div className='member__general__blocks__list'>
                  {/* <div className='member__general__blocks'>
                     <Text
                        inner='Subscription Level'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                        style={ { color: '#727978' } }
                     />
                     <div className='member__general__block__plan'>
                        <Text
                           inner={ getProperlyPlanNameMember(currentMember.plan_name) }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#A61C23', textOverflow: 'ellipsis' } }
                        />
                     </div>
                  </div> */}
                  <div className='member__general__blocks'>
                     <Text
                        inner='Roles'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                        style={ { color: '#727978' } }
                     />
                     <div className='member__general__block__role'>
                        <Text
                           inner={ getRole(currentMember.role) }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#8830BD' } }
                        />
                     </div>
                  </div>
                  <div className='member__general__blocks'>
                     <Text
                        inner='Last Sign In'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                        style={ { color: '#727978' } }
                     />
                     <div className=''>
                        <Text
                           inner={ currentMember.last_login_at ? moment(currentMember.last_login_at).format('MMM D, YYYY, HH:mm') : '-' }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#131F1E', textOverflow: 'ellipsis' } }
                        />
                     </div>
                  </div>
                  <div className='member__general__blocks'>
                     <Text
                        inner='Total Sign-Ins'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                        style={ { color: '#727978' } }
                     />
                     <div className=''>
                        <Text
                           inner={ currentMember.logins_count ? currentMember.logins_count : '-' }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#131F1E', textOverflow: 'ellipsis' } }
                        />
                     </div>
                  </div>
               </div>
               <div className='member__general__recent'>
                  <Text
                     inner='Recent Activity'
                     type={ txtTypes.regular160 }
                     size={ txtSizes.xlarge }
                  />
                  <Acitvity list={ currentMember.recent_activity || [] } image={ currentMember.picture_full_src } />
               </div>
            </div>
         </div>
      </div>
   );
};

MemberGeneralPage.propTypes = {
   currentMember: PropTypes.object,
   isMobile: PropTypes.bool,
};

export default MemberGeneralPage;
