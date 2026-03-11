import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import mainhubDefaultImg from 'assets/images/mainhub.png';
// import BlueHeader from 'views/pages/Blog/BlogFront/blogHeader';
// import CourseFooter from 'components/modules/mainHub/CourseFooter';
// import CourseFooterOld from 'components/modules/mainHubOld/CourseFooter';
import withLoading from 'utils/withLoading';
import BlogCategories from 'components/modules/blog/blogCategories';
import categories from 'containers/pages/admin/categories';
// import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const BlogPreviewLoding = withLoading('div');

const BlogPreview = ({
   postFront, getFrontBlogSettingsInProgress, categoriesFront, handleBlogByCategory,
   siteInfo,
}) => {
   // useEffect(() => {
   //    if (siteInfo && siteInfo.school_theme_mode === 'dark') {
   //       document.body.style.setProperty('--bg-color', siteInfo.landing_data[0].school_room_section.props.bgColor);
   //       document.body.style.setProperty('--text-color-title', '#ffffff');
   //       document.body.style.setProperty('--text-color-desc', '#babbc3');
   //       document.body.style.setProperty('--bg-color-cat', 'rgb(39, 39, 39)');
   //       document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
   //       document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   //    } else {
   //       document.body.style.setProperty('--bg-color', siteInfo.landing_data[0].school_room_section.props.bgColor);
   //       document.body.style.setProperty('--text-color-title', '#494c62');
   //       document.body.style.setProperty('--text-color-desc', 'rgb(63, 79, 101)');
   //       document.body.style.setProperty('--bg-color-cat', '#fff');
   //       document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
   //       document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   //    }
   // }, [siteInfo]);
   return (
      <div className='blogSingle'>
         <BlogPreviewLoding className='blogSingleContent' isLoading={ getFrontBlogSettingsInProgress }>
            {/* <BlueHeader blogSettingsFront={ blogSettingsFront } isSingle={ true } /> */}
            <img src={ postFront.image_url || mainhubDefaultImg } alt='blog' className='blogSingleContent__img' />
            <div className='blogSingleContent__container'>
               <div className='blogTitle'>
                  <Text
                     type={ TextType.mediumSmall }
                     size={ TextSize.size_28 }
                     inner={ postFront.title }
                     color={ siteInfo.active_school_room.school_text_color }
                     // color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#3f4f65' }
                  />
               </div>

               <div className='blogContent__text'>
                  <div className='text'>
                     <div
                     // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={ { __html: postFront.content } }
                        style={ { color: siteInfo.active_school_room.school_text_color } }
                     />
                  </div>
                  {!!postFront.categories && !!postFront.categories.length
                  && (
                     <BlogCategories
                        categoriesFront={ postFront.categories }
                        handleBlogByCategory={ handleBlogByCategory }
                        siteInfo={ siteInfo }
                     />
                  )}
               </div>
            </div>
            {/* {siteInfo.landing_data ? (
            // <CourseFooter
            //    siteInfo={ siteInfo }
            //    footer={ siteInfo.landing_data[6] }
            //    footerIndex={ 6 }
            //    isPreview={ true }
            //    primaryTheme={ siteInfo.active_school_room && siteInfo.active_school_room.school_font }
            // />
            <div>ddd</div>
         ) : (
            <CourseFooterOld
               siteInfo={ siteInfo }
            />
         ) } */}
         </BlogPreviewLoding>
      </div>
   );
};

BlogPreview.propTypes = {
   postFront: PropTypes.object,
   getFrontBlogSettingsInProgress: PropTypes.bool,
   categoriesFront: PropTypes.array,
   handleBlogByCategory: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default BlogPreview;
