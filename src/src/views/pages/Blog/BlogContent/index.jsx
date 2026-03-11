import React from 'react';
import PropTypes from 'prop-types';
import BlogCard from 'views/pages/Blog/BlogContent/BlogCard';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import withLoading from 'utils/withLoading';
import BlogFilter from './BlogFilter';
import './index.scss';


const BlogCardLoading = withLoading('div');

const BlogContent = ({
   blog, handleDeleteBlog, goTo, isMultiSelected, searchValue, searchOnEnter, onClearSearch, setSearchValue,
   checkedItemsLength, onCheck, setIsMultiSelected,
   onFilter, onRemoveSelected, options, createBlog, blogSortingValue,
   selectedBlogIds, onCheckAll, handleSaveBlogCardStatus, blogLoading,
}) => {
   return (
      <div className='blogContent'>
         <BlogFilter
            blog={ blog }
            handleDeleteBlog={ handleDeleteBlog }
            goTo={ goTo }
            isMultiSelected={ isMultiSelected }
            searchValue={ searchValue }
            onClearSearch={ onClearSearch }
            setSearchValue={ setSearchValue }
            checkedItemsLength={ checkedItemsLength }
            onCheck={ onCheckAll }
            setIsMultiSelected={ setIsMultiSelected }
            onFilter={ onFilter }
            blogSortingValue={ blogSortingValue }
            onRemoveSelected={ onRemoveSelected }
            options={ options }
            searchOnEnter={ searchOnEnter }
         />
         <BlogCardLoading className='blogContent_items' isLoading={ blogLoading }>
            {blog && blog.map(post => {
               return (
                  <BlogCard
                     key={ post.id }
                     post={ post }
                     goTo={ goTo }
                     handleDeleteBlog={ handleDeleteBlog }
                     onCheck={ () => onCheck(post.id) }
                     isChecked={ selectedBlogIds.includes(post.id) }
                     isMultiSelected={ isMultiSelected }
                     handleSaveBlogCardStatus={ handleSaveBlogCardStatus }
                  />
               );
            })}
            <div className='blogCard_plus' onClick={ createBlog } role='presentation'>
               <div><IconNew name='plus' /></div>
               <div>
                  <Text
                     type={ textType.regularDefault }
                     size={ textSizes.small }
                     style={ { color: '#24554E' } }
                     inner='Add New Article'
                  />
               </div>
            </div>
         </BlogCardLoading>
      </div>

   );
};

BlogContent.defaultProps = {
   options: [],
};

BlogContent.propTypes = {
   blog: PropTypes.array,
   handleDeleteBlog: PropTypes.func,
   goTo: PropTypes.func,
   selectedBlogIds: PropTypes.array,
   handleSaveBlogCardStatus: PropTypes.func,
   createBlog: PropTypes.func,
   blogSortingValue: PropTypes.any,
   onFilter: PropTypes.func,
   setSearchValue: PropTypes.func,
   searchOnEnter: PropTypes.func,
   searchValue: PropTypes.string,
   onClearSearch: PropTypes.func,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   checkedItemsLength: PropTypes.any,
   onCheck: PropTypes.func,
   onCheckAll: PropTypes.func,
   onRemoveSelected: PropTypes.func,
   options: PropTypes.array,
   blogLoading: PropTypes.bool,
};

export default BlogContent;
