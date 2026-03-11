import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BlogHeader from 'views/pages/Blog/BlogFront/blogHeader';
// import CourseFooter from 'components/modules/mainHub/CourseFooter';
// import CourseFooterOld from 'components/modules/mainHubOld/CourseFooter';
// import BlogListingCard from 'components/modules/blog/blogListingCard';
import BlogCategories from 'components/modules/blog/blogCategories';
import withLoading from 'utils/withLoading';
import CourseNotFoundImg from 'assets/images/course-not-found.svg';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import OffersHeader from 'views/pages/Offers/components/OffersHeader';
// import OffersHeaderContainer from 'containers/pages/mixed/OffersHeaderContainer';
import BlogFilter from './BlogFilter';
import BlogCard from './BlogCard';
// import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const BlogListingLoading = withLoading('div');
const BlogListingContentLoading = withLoading('div');

// 'var(--mainBg005)'

const BlogListing = ({
   blogFront, blogSettingsFront, getFrontBlogSettingsInProgress, categoriesFront, handleBlogByCategory,
   siteInfo, searchValue, onClearSearch, setSearchValue, isLoading,
}) => {
   return (
      <>
         {/* <OffersHeaderContainer /> */}
         <div className='blogListingContent' style={ { background: siteInfo.active_school_room.school_bg_color } }>
            <BlogListingLoading className='blogListing' isLoading={ getFrontBlogSettingsInProgress }>
               {!isLoading && <BlogHeader blogSettingsFront={ blogSettingsFront } title='Blog' siteInfo={ siteInfo } />}
               <BlogFilter
                  searchValue={ searchValue }
                  onClearSearch={ onClearSearch }
                  setSearchValue={ setSearchValue }
               />
               <BlogListingContentLoading className='blogListing__container' isLoading={ isLoading }>
                  {blogFront.length !== 0 ? (
                     <div className='blogListing__text'>
                        {blogFront.map((post) => {
                           return (
                              <BlogCard
                                 key={ post.id }
                                 post={ post }
                                 siteInfo={ siteInfo }
                              />
                           );
                        })}
                     </div>
                  )
                     : (
                        <div className='noCourseFound'>
                           <Text
                           // color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#8a94a2' }
                              type={ TextType.bold }
                              size={ TextSize.large }
                              inner='No Blog Post Yet'
                           />
                           <img src={ CourseNotFoundImg } alt='not found' className='notFoundImg' />
                        </div>
                     )}
                  {categoriesFront.length !== 0
               && (
                  <div>
                     <div>
                        <Text
                        // color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#8a94a2' }
                           type={ TextType.bold }
                           size={ TextSize.large }
                           inner='Categories'
                           style={ { color: siteInfo.active_school_room.school_text_color || '#fff' } }
                        />
                     </div>
                     <BlogCategories
                        categoriesFront={ categoriesFront }
                        handleBlogByCategory={ handleBlogByCategory }
                        siteInfo={ siteInfo }
                     />
                  </div>

               )
                  }
               </BlogListingContentLoading>
               {/* {siteInfo.landing_data ? (
            // <CourseFooter
            //    siteInfo={ siteInfo }
            //    footer={ siteInfo.landing_data[6] }
            //    footerIndex={ 6 }
            //    isPreview={ true }
            //    primaryTheme={ siteInfo.active_school_room && siteInfo.active_school_room.school_font }
            // />
               <div />
            ) : (
               <CourseFooterOld
                  siteInfo={ siteInfo }
               />
            ) } */}
            </BlogListingLoading>
         </div>
      </>
   );
};

BlogListing.propTypes = {
   blogFront: PropTypes.array,
   blogSettingsFront: PropTypes.object,
   getFrontBlogSettingsInProgress: PropTypes.bool,
   categoriesFront: PropTypes.array,
   handleBlogByCategory: PropTypes.func,
   siteInfo: PropTypes.object,
   searchValue: PropTypes.string,
   onClearSearch: PropTypes.func,
   setSearchValue: PropTypes.func,
   isLoading: PropTypes.bool,
};

export default BlogListing;
