import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import moment from 'moment';
import Router from 'routes/router';
import blog from 'assets/images/blog.png';
import { useTranslate } from 'react-polyglot';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const BlogListingCard = ({ post, siteInfo }) => {
   const t = useTranslate();
   useEffect(() => {
      document.body.style.setProperty('--blogbutton-bg-color', activeSchoolRoomColor(siteInfo));
   }, [siteInfo]);
   const postContent = post.content.replace(/<[^>]*>/g, '').slice(0, 80);

   return (
      <div className='blogList_card'>
         <div className='blogList_img'>
            <img src={ post.image_url ? post.image_url : blog } alt='blog_img' />
            <div className='blogOverlay hoverVisible'>
               <div className='readmore_btn'>
                  <a href={ `${ Router.route('BLOG_PREVIEW').getCompiledPath({ id: post.slug }) }` } target='_blank' rel='noopener noreferrer'>
                     <BaseButton
                        theme={ btnTheme.blueBordered }
                        size={ btnSize.small }
                        text={ t('read_more') }
                        onClick={ () => {} }
                     />
                  </a>
               </div>
            </div>

         </div>
         <div className='blogList_card_content'>
            <div className='blogList_card_title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ post.title }
                  color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#494c62' }
               />
            </div>
            <div className='blogList_card_date'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.extraSmall }
                  inner={ moment(post.publish_date).format('MM/DD/YYYY') }
                  color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#494c62' }
               />
            </div>
            <div className='blogList_card_desc'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner={ `${ postContent.replace(/&nbsp;/g, ' ').trim() }...` }
                  color='#babbc3'
               />
            </div>
         </div>


      </div>

   );
};

BlogListingCard.propTypes = {
   post: PropTypes.object,
   siteInfo: PropTypes.object,
};

BlogListingCard.defaultProps = {
   post: [],
   siteInfo: {},
};


export default BlogListingCard;
