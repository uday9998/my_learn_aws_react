import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import moment from 'moment';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import SliceAndConnectText from 'utils/getSplitedText';

const MemberProfileRight = ({ member }) => {
   const getActiveDate = () => {
      // let date = '';
      const params = member?.last_login_at ? moment(member.last_login_at).format('MMM DD, YYYY') : 'N/A';
      // if (member.activity) {
      //    if (params.y) {
      //       date = `${ params.y }y `;
      //    }
      //    if (params.m) {
      //       date += `${ params.m }m `;
      //    }
      //    if (params.h) {
      //       date += `${ params.h }h `;
      //    }
      //    if (params.m) {
      //       date += `${ params.m }m `;
      //    }
      //    if (params.s) {
      //       date += `${ params.s }s `;
      //    }
      // }
      return `${ params }`;
   };
   return (
      <div className='member__profile__right'>
         <div className='member__profile__right__top'>
            <Text
               inner='General Info'
               size={ sizes.large }
               type={ types.medium153 }
            />
            <div className='member__profile__right__top__item'>
               <Text
                  inner='Member Since'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Text
                  inner={ moment(member.created_at).format('MMM DD, YYYY') }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
            <div className='member__profile__right__top__item'>
               <Text
                  inner='Activity'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Text
                  inner={ getActiveDate() }
                  type={ types.regularDefault }
                  size={ sizes.xsmall }
                  style={ { color: '#727978' } }
               />
            </div>
            <div className='member__profile__right__top__blocks'>
               <div className='member__profile__right__top__block'>
                  <Text
                     inner='Followers'
                     type={ types.regularLarge }
                     size={ sizes.xsmall }
                     style={ { color: '#444C4B' } }
                  />
                  <Text
                     inner={ member.user_followers.length }
                     type={ types.regular160 }
                     size={ sizes.xxlarge }
                  />
               </div>
               <div className='member__profile__right__top__block'>
                  <Text
                     inner='Following'
                     style={ { color: '#444C4B' } }
                     type={ types.regularLarge }
                     size={ sizes.xsmall }
                  />
                  <Text
                     inner={ member.user_following.length }
                     type={ types.regular160 }
                     size={ sizes.xxlarge }
                  />
               </div>
            </div>
         </div>
         <div className='member__profile__right__bottom'>
            <Text
               inner='Personal Links'
               size={ sizes.large }
               type={ types.medium153 }
            />
            {member.socialLinks ? member.socialLinks.map((e) => {
               return (
                  <div className='d-a'>
                     <div className='d'>
                        <IconNew name={ `${ e.name }L` } />
                     </div>
                     <div className='item__right'>
                        <Text
                           inner={ e.name }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                        <Text
                           inner={ SliceAndConnectText(e.link, 20) }
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           onClick={ () => window.open(e.link, '_blank') }
                           style={ { color: '#727978', cursor: 'pointer' } }
                        />
                     </div>
                  </div>
               );
            }) : (
               <Text
                  inner='No Links Found'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: 'rgb(114, 121, 120)', textAlign: 'center', width: '100%' } }
               />
            )}
         </div>
      </div>
   );
};

MemberProfileRight.propTypes = {
   member: PropTypes.object,
};

export default MemberProfileRight;
