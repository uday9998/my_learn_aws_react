import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const CommunityTrendingPost = ({
   post, role, user, handlePinPost, goToRoom,
}) => {
   const onClickPost = () => {
      if (goToRoom) {
         goToRoom();
         setTimeout(() => {
            const element = document.getElementById(post.id);
            if (element) {
               element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
         }, 1000);
      } else {
         const element = document.getElementById(post.id);
         if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      }
   };
   return (
      <div className='community__trending__post' role='presentation' onClick={ () => onClickPost() }>
         <div className='community__trending__post__general'>
            <div className='community__trending__post__top'>
               <div className='community__trending__post__top__left'>
                  <img src={ post.author ? post.author.picture_src || post.author.picture_full_src : '' } alt='' />
               </div>
               <div className='community__trending__post__top__right'>
                  <Text
                     inner={ post.author ? post.author.name : '' }
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </div>
            </div>
            {
               (role === 'admin' || (user && user.id === post.author.id)) && handlePinPost && (
                  <div
                     className='community__trending__post__top__left'
                     role='presentation' 
                     onClick={ (e) => { e.stopPropagation(); handlePinPost(post.id, !post.is_pinned); } }>
                     { post.is_pinned ? <IconNew name='CommunityPinFillM' /> : <IconNew name='CommunityPinM' />}
                  </div>
               )
            }
         </div>

         {post.cover ? <img className='community__cover' src={ post.cover } alt='cover' /> : ''}
         <Text
            inner={ post.title }
            type={ types.medium150 }
            size={ sizes.medium }
         />
         <div className='community__trending__post__line' />
         <div className='community__trending__post__actions'>
            <TextWithIcon
               iconName='CommunityTrendingDateS'
               inner={ moment(post.created_at).format('MMM D') }
               generalStyles={ { gap: '6px' } }
               type={ types.regularDefault }
               size={ sizes.small_14 }
            />
            <div className='community__trending__post__actions__line' />
            <TextWithIcon
               iconName='CommunityTrendingComment'
               inner={ post.comments.length }
               generalStyles={ { gap: '6px' } }
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <div className='community__trending__post__actions__line' />
            <TextWithIcon
               iconName='CommunityTrendingLikeS'
               inner={ post.likes.length }
               generalStyles={ { gap: '6px' } }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
      </div>
   );
};

CommunityTrendingPost.propTypes = {
   post: PropTypes.object,
   role: PropTypes.string,
   user: PropTypes.object,
   handlePinPost: PropTypes.func,
   goToRoom: PropTypes.func,
};

export default CommunityTrendingPost;