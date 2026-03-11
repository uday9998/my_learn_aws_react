
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import EmptyBlog from 'views/pages/Blog/EmptyBlog';
import BlogHeaderCreate from 'views/pages/Blog/BlogHeaderCreate';
import EmptyBlogWithHeader from 'views/pages/Blog/EmptyBlogWithHeader';


const Blog = ({
   blog, getBlogInProgress, handleDeleteBlog, saveBlogSettings, createBlog, goTo, blogSettings,
   getBlogSettingsInProgress, handleInputChange, searchValue,
   blogTotal, turnOnBlog, setTurnOnBlog, editBlogHeader, setEditBlogHeader, blogSortingValue,
   onFilter, setSearchValue, onClearSearch, searchOnEnter, selectedBlogIds, isMultiSelected, setIsMultiSelected,
   checkedItemsLength, onCheck, onCheckAll, onRemoveSelected, handleSaveBlogCardStatus,
}) => {
   if (!turnOnBlog || blogSettings.blog_page_status === 'off') {
      return <EmptyBlog setTurnOnBlog={ setTurnOnBlog } />;
   }
   if (editBlogHeader) {
      return (
         <BlogHeaderCreate
            isLoading={ getBlogSettingsInProgress }
            saveBlogSettings={ saveBlogSettings }
            blogSettings={ blogSettings }
            handleInputChange={ handleInputChange }
            blogTotal={ blogTotal }
         />
      );
   }
   return (
      <EmptyBlogWithHeader
         // isLoading={ getBlogSettingsInProgress }
         saveBlogSettings={ saveBlogSettings }
         blogSettings={ blogSettings }
         handleInputChange={ handleInputChange }
         blogTotal={ blogTotal }
         setEditBlogHeader={ setEditBlogHeader }
         isLoading={ getBlogInProgress }
         blog={ blog }
         handleDeleteBlog={ handleDeleteBlog }
         goTo={ goTo }
         createBlog={ createBlog }
         blogSortingValue={ blogSortingValue }
         onFilter={ onFilter }
         setSearchValue={ setSearchValue }
         onClearSearch={ onClearSearch }
         searchOnEnter={ searchOnEnter }
         searchValue={ searchValue }
         getBlogInProgress={ getBlogInProgress }
         selectedBlogIds={ selectedBlogIds }
         isMultiSelected={ isMultiSelected }
         setIsMultiSelected={ setIsMultiSelected }
         checkedItemsLength={ checkedItemsLength }
         onCheck={ onCheck }
         onCheckAll={ onCheckAll }
         onRemoveSelected={ onRemoveSelected }
         handleSaveBlogCardStatus={ handleSaveBlogCardStatus }
      />
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
   setTurnOnBlog: PropTypes.func,
   blogTotal: PropTypes.number,
   editBlogHeader: PropTypes.bool,
   turnOnBlog: PropTypes.bool,
   setEditBlogHeader: PropTypes.func,
   handleSaveBlogCardStatus: PropTypes.func,
   blogSortingValue: PropTypes.any,
   onFilter: PropTypes.func,
   setSearchValue: PropTypes.func,
   searchOnEnter: PropTypes.func,
   onClearSearch: PropTypes.func,
   selectedBlogIds: PropTypes.array,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   checkedItemsLength: PropTypes.any,
   onCheck: PropTypes.func,
   onCheckAll: PropTypes.func,
   onRemoveSelected: PropTypes.func,
};

export default Blog;
