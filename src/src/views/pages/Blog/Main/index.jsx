import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BlogHeader from 'views/layout/Blog/BlogHeader';
import BlogContent from 'views/layout/Blog/BlogContent';
import withLoading from 'utils/withLoading';
import BlogSettings from 'components/modules/blog/BlogSettings';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const BlogSettingsLoading = withLoading(BlogSettings);
const BlogContentLoading = withLoading(BlogContent);

const Blog = ({
   blog, getBlogInProgress, handleDeleteBlog, saveBlogSettings, createBlog, goTo, blogSettings,
   getBlogSettingsInProgress, handleInputChange, searchValue, handleBlogSearch, handleBlogSearchInput,
   isSearch, blogTotal, getFrontBlogCountInProgress,
}) => {
   return (
      <div className='blog'>
         <BlogHeader
            createBlog={ createBlog }
            handleBlogSearchInput={ handleBlogSearchInput }
            handleBlogSearch={ handleBlogSearch }
            searchValue={ searchValue }
         />
         {!getBlogInProgress && !getFrontBlogCountInProgress
            ? (
               <BlogSettingsLoading
                  isLoading={ getBlogSettingsInProgress }
                  saveBlogSettings={ saveBlogSettings }
                  blogSettings={ blogSettings }
                  handleInputChange={ handleInputChange }
                  blogTotal={ blogTotal }
               />
            ) : (
               <div className='m-l-exl loader-spinner'>
                  <LoaderSpinner />
               </div>
            )
         }
         {blog.length !== 0 && (
            <BlogContentLoading
               isLoading={ getBlogInProgress }
               blog={ blog }
               handleDeleteBlog={ handleDeleteBlog }
               goTo={ goTo }
            />
         ) }
         {blog.length === 0 && isSearch && (
            <div
               className='noCredit'
            >
               <img src={ NoSearchSvg } alt='noCredit' />
               <Text
                  color='#8A94A8'
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='No Search Results'
               />
            </div>
         )}

      </div>
   );
};

Blog.propTypes = {
   blog: PropTypes.array,
   getBlogInProgress: PropTypes.bool,
   handleDeleteBlog: PropTypes.func,
   saveBlogSettings: PropTypes.func,
   createBlog: PropTypes.func,
   goTo: PropTypes.func,
   blogSettings: PropTypes.object,
   getBlogSettingsInProgress: PropTypes.bool,
   handleInputChange: PropTypes.func,
   searchValue: PropTypes.string,
   handleBlogSearch: PropTypes.func,
   handleBlogSearchInput: PropTypes.func,
   isSearch: PropTypes.bool,
   blogTotal: PropTypes.number,
   getFrontBlogCountInProgress: PropTypes.bool,
};

export default Blog;
