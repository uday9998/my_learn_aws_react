import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import mainhubDefaultImg from 'assets/images/mainhub.png';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const BlogHeaderImage = ({ blogSettingsFront, siteInfo }) => {
   return (
      <div className='blogHeaderImageText'>
         <img src={ blogSettingsFront.blog_page_image || mainhubDefaultImg } alt='blog' />
         <div className={ blogSettingsFront.blog_page_image ? 'blogHeaderImage' : 'blogHeaderImage blogHeaderImage_blue' }>
            <div>
               <Text
                  type={ TextType.medium }
                  style={ {
                     color: blogSettingsFront.blog_page_color
                     || siteInfo.active_school_room.school_text_color, 
                  } }
                  size={ TextSize.size_40 }
                  inner={ blogSettingsFront.blog_page_title || 'Design' }
               />
            </div>
            <div>
               <Text
                  type={ TextType.medium153 }
                  style={ {
                     color: blogSettingsFront.blog_page_color
                      || siteInfo.active_school_room.school_text_color, 
                  } }
                  size={ TextSize.large }
                  inner={ blogSettingsFront.blog_page_description || 'keep creative minds informed, interested, and inspired' }
               />
            </div>
         </div>
      </div>


   // <div
   //    style={ {
   //       height: '256px',
   //       width: '100%',
   //       backgroundImage: `url(${ macbookImg })`,
   //       backgroundRepeat: 'no-repeat',
   //       backgroundSize: 'cover',
   //    } }
   // />

   );
};

BlogHeaderImage.propTypes = {
   blogSettingsFront: PropTypes.object,
   siteInfo: PropTypes.object,
};


export default BlogHeaderImage;
