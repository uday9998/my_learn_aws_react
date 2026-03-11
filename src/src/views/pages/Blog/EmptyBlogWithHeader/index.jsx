import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import mainhubDefaultImg from 'assets/images/mainhub.png';
import BlogContent from 'views/pages/Blog/BlogContent';
import withLoading from 'utils/withLoading';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconButton from 'components/elements/buttons/IconButton';

const BlogContentLoading = withLoading(BlogContent);

const EmptyBlogWithHeader = ({
   blogSettings, setEditBlogHeader,
   isLoading,
   blog,
   handleDeleteBlog,
   goTo,
   createBlog,
   blogSortingValue,
   onFilter,
   setSearchValue,
   searchOnEnter,
   searchValue,
   onClearSearch,
   selectedBlogIds,
   isMultiSelected,
   setIsMultiSelected,
   checkedItemsLength,
   onCheck,
   onCheckAll,
   onRemoveSelected,
   handleSaveBlogCardStatus,
}) => {
   const isSearchOrFilter = searchValue !== '' || blogSortingValue !== 'recently';
   return (
      <div className='emptyBlogWithHeader'>
         <div className='emptyBlogWithHeader_img'>
            <img src={ blogSettings.blog_page_image || mainhubDefaultImg } alt='blog' />
            <div className={ blogSettings.blog_page_image ? 'emptyBlogWithHeader_text' : 'emptyBlogWithHeader_text emptyBlogWithHeader_text_blue' }>
               <div>
                  <Text
                     type={ TextType.medium }
                     style={ { color: blogSettings.blog_page_color || '#fff' } }
                     size={ TextSize.size_40 }
                     inner={ blogSettings.blog_page_title || 'Design' }
                  />
               </div>
               <div>
                  <Text
                     type={ TextType.medium153 }
                     style={ { color: blogSettings.blog_page_color || '#fff' } }
                     size={ TextSize.large }
                     inner={ blogSettings.blog_page_description || 'keep creative minds informed, interested, and inspired' }
                  />
               </div>
            </div>
            <div className='emptyBlogWithHeader_edit'>
               <IconButton
                  name='editL'
                  theme='white'
                  onClick={ () => setEditBlogHeader(true) }
               />
            </div>

         </div>

         {blog.length === 0 && !isSearchOrFilter
            && (
               <div className='emptyBlogWithHeader_content'>
                  <IconNew name='MemberEmptyM' />
                  <div>
                     <Text
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                        inner='No articles yet'
                     />
                  </div>
                  <Button
                     theme={ themes.secondary }
                     text='Add New Article'
                     onClick={ createBlog }
                  />
               </div>
            )}
         { (blog.length > 0 || isSearchOrFilter) && (
            <BlogContentLoading
               isLoading={ false }
               blogLoading={ isLoading }
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
               selectedBlogIds={ selectedBlogIds }
               isMultiSelected={ isMultiSelected }
               setIsMultiSelected={ setIsMultiSelected }
               checkedItemsLength={ checkedItemsLength }
               onCheck={ onCheck }
               onCheckAll={ onCheckAll }
               onRemoveSelected={ onRemoveSelected }
               handleSaveBlogCardStatus={ handleSaveBlogCardStatus }
            />
         )}

      </div>
   );
};

EmptyBlogWithHeader.propTypes = {
   blogSettings: PropTypes.object,
   setEditBlogHeader: PropTypes.func,
   blog: PropTypes.array,
   handleSaveBlogCardStatus: PropTypes.func,
   isLoading: PropTypes.bool,
   handleDeleteBlog: PropTypes.func,
   goTo: PropTypes.func,
   createBlog: PropTypes.func,
   blogSortingValue: PropTypes.any,
   onFilter: PropTypes.func,
   setSearchValue: PropTypes.func,
   searchOnEnter: PropTypes.func,
   searchValue: PropTypes.string,
   onClearSearch: PropTypes.func,
   selectedBlogIds: PropTypes.array,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   checkedItemsLength: PropTypes.any,
   onCheck: PropTypes.func,
   onCheckAll: PropTypes.func,
   onRemoveSelected: PropTypes.func,
};

export default EmptyBlogWithHeader;
