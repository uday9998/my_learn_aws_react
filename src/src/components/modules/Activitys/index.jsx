import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import moment from 'moment';
// import recentActivityImg from 'assets/images/dashboard/recentactivity.png';
import { parseFloat } from 'utils/numberParseFloat';
import recentActivity from 'assets/images/activity_img.png';
// import IToolTipNew from 'components/elements/IToolTipNew';
import IToolTip from 'components/elements/IToolTIp';

const RefundBlock = ({ item }) => {
   return (
      <div className='activity__block'>
         <div className='activity__block__left'>
            <div className={ `activity__status activity__status__${ item.isActive ? 'active' : 'inactive' }` } />
            <img src={ item.picture_full_src } alt='' />
         </div>
         <div className='activity__block__right'>
            <div className='activity__block__right__top'>
               <Text
                  inner={ parseFloat(item.price) }
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: item.isActive ? '#36796F' : '#D12D36' } }
               />
               <Text
                  inner='refunded to'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
            <div className='activity__block__right__bottom'>
               <Text
                  inner={ item.name }
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { textDecoration: 'underline' } }
               />
            </div>
         </div>
      </div>
   );
};

const SubscribeBlock = ({ item, image }) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const actionText = (action, lessonName, isToolTip = false) => {
      let text = '';
      switch (action) {
         case 'comment':
            text = ` replied to a comment on ${ lessonName }`;
            break;
         case 'joined_course':
            text = ' joined to course';
            break;
         case 'comment_reply':
            text = ` commented on ${ lessonName }`;
            break;
         case 'delete_comment':
            text = ` deleted a comment  ${ lessonName }`;
            break;
         case 'comment_like':
            text = ` liked a comment  ${ lessonName }`;
            break;
         case 'comment_dislike':
            text = ` disliked a comment  ${ lessonName }`;
            break;
         case 'complete_lesson':
            text = ` completed the  ${ lessonName }`;
            break;
         case 'finished_course':
            text = ' finished the';
            break;
         case 'login':
            text = ' Logged in';
            break;
         case 'signup':
            text = ' Signed up';
            break;
         default:
            text = ' joined';
      }
      return text;
   };

   return (
      <div className='activity__block'>
         <div className='activity__block__left'>
            {/* <div className={ `activity__status activity__status__${ 'active' }` } /> */}
            <img src={ image } alt='' />
         </div>
         <div className='activity__block__right'>
            <div className='activity__block__right__top'>
               <div className='activity__block__right__top__flex'>
                  {(item.user || item.member_name) && (
                     <Text
                        inner={ (item.user && item.user.name) || item.member_name }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { textDecoration: 'underline' } }
                     />
                  )}
                  {
                     ![
                        'comment',
                        'comment_reply',
                        'delete_comment',
                        'comment_like',
                        'comment_dislike',
                        'complete_lesson',
                        'joined_course',
                     ].includes(item.action)
                        ? (
                           <Text
                              inner={ actionText(item.action, item.data && item.data.sub_name) }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                              style={ { color: '#727978' } }
                           />
                        ) : (
                           <IToolTip tooltip={ actionText(item.action, item.data && item.data.sub_name, true) } id='vahe'> 
                              <Text
                                 inner={ actionText('comment', 'asd assdfew') }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                                 style={ { color: '#727978' } }
                              />
                           </IToolTip>
                        )
                  }
               </div>
               <div className='activity__block__right__top__date'>
                  <Text
                     inner={ item.created_at ? moment(item.created_at).format('MMMM D, YYYY hh:mm A') : '' }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: '#A1A5A5', whiteSpace: 'nowrap' } }
                  />
               </div>
            </div>
            {((item.data && item.data.name) || item.course_name) && (
               <div className='activity__block__right__bottom'>
                  <Text
                     inner={ `[${ (item.data && item.data.name) || item.course_name }]` }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: '#36796F' } }
                  />
               </div>
            )}
         </div>
      </div>
   );
};


const Acitvity = ({ list, image }) => {
   return (
      <div className='activity__list'>
         {
            Object.keys(list).length ? (
               Object.keys(list).map((key) => {
                  return (
                     <SubscribeBlock image={ image } key={ uniqueId() } item={ list[key] } />
                  );
               })
            ) : (
               <div className='no__activity__wrapper'>
                  <img src={ recentActivity } alt='recentActivity' />
                  <div className='text__wrapper'>
                     <Text
                        inner='It seems that there has been'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small14 }
                        style={ { color: 'rgba(19, 31, 30, 1)', textAlign: 'center' } }
                     />
                     <Text
                        inner='no recent activity.'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small14 }
                        style={ { color: 'rgba(19, 31, 30, 1)', textAlign: 'center' } }
                     />
                  </div>
               </div>
            )
         }
      </div>
   );
};

Acitvity.propTypes = {
   list: PropTypes.array,
   image: PropTypes.string,
};

SubscribeBlock.propTypes = {
   item: PropTypes.object,
   image: PropTypes.string,
};

RefundBlock.propTypes = {
   item: PropTypes.object,
};

export default Acitvity;
