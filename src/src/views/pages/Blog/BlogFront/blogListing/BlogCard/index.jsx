import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import moment from 'moment';
import blog from 'assets/images/blog.png';
import Router from 'routes/router';

const BlogCard = ({
   post, siteInfo,
}) => {
   return (
      <div className='blogCard'>
         <div className='blogCard_img'>
            <img src={ post.image_url || blog } alt='post' />
            <div className='blogOverlay hoverVisible'>
               <div className='readmore_btn'>
                  <a href={ `${ Router.route('BLOG_PREVIEW').getCompiledPath({ id: post.slug }) }` } target='_blank' rel='noopener noreferrer'>
                     <BaseButton
                        theme={ btnTheme.primary }
                        size={ btnSize.medium }
                        text='Read more'
                        onClick={ () => {} }
                        style={ {
                           backgroundColor: siteInfo.active_school_room.school_color,
                           borderColor: 'var(--borderColor)',
                        } }
                     />
                  </a>
               </div>
            </div>
         </div>
         <div className='blogCard_content'>
            <div className='blogCard_line' />
            <div className='blogCard_title'>
               <Text
                  type={ textType.medium153 }
                  size={ textSizes.large }
                  inner={ post.title }
                  style={ {
                     color: siteInfo.active_school_room.school_text_color, 
                  } }
               />
            </div>
            {post.subtitle && (
               <div className='blogCard_subtitle'>
                  <Text
                     type={ textType.regularDefault145 }
                     size={ textSizes.small }
                     inner={ post.subtitle }
                     style={ { 
                        color: siteInfo.global_branding_brand_color.text_color 
                        || siteInfo.active_school_room.school_text_color, 
                     } }
                  />
               </div>
            )}
            <div className='blogCard_date'>
               <div>
                  <Text
                     type={ textType.regularDefaultGrey }
                     size={ textSizes.small }
                     inner='Creation Date:'
                     style={ { 
                        color: 'var(--textColor60)', 
                     } }
                  />
               </div>
               <div>
                  <Text
                     type={ textType.regularDefault }
                     size={ textSizes.small }
                     inner={ moment(post.created_at).format('DD MMM, YYYY') }
                     style={ { color: siteInfo.active_school_room.school_text_color || '#fff' } }
                  />
               </div>
            </div>
            <div>
               {post.author
            && (
               <div className='blogCard__author__content'>
                  <img src={ post.author.picture_src || blog } alt='auhtor' className='blogCard__author__img' />
                  <div>
                     <Text
                        type={ textType.regularDefault }
                        size={ textSizes.small }
                        inner={ post.author.name }
                     />
                  </div>
               </div>

            )
               }
            </div>
         </div>
      </div>
   );
};

BlogCard.propTypes = {
   post: PropTypes.object,
   siteInfo: PropTypes.object,
};

export default BlogCard;
