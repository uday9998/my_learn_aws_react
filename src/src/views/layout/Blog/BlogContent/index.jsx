import React from 'react';
import PropTypes from 'prop-types';
import BlogItem from 'components/modules/blog/blogItem';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import './index.scss';


const BlogContent = ({ blog, handleDeleteBlog, goTo }) => {
   return (
      <div className='blog_content'>
         <div className='blog_content_table'>
            <ItemWrapper>
               <div className='blog_table_header'>
                  <div className='headerTitle'>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner='Title'
                        color='#A9A8A8'
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner='Published'
                        color='#A9A8A8'
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner='Created'
                        color='#A9A8A8'
                     />
                  </div>
                  <div className='headerActions'>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner='Actions'
                        color='#A9A8A8'
                     />
                  </div>
               </div>
               {blog && blog.map(post => {
                  return (
                     <BlogItem
                        key={ post.id }
                        post={ post }
                        goTo={ goTo }
                        handleDeleteBlog={ handleDeleteBlog }
                     />
                  );
               })}
            </ItemWrapper>
         </div>
      </div>

   );
};

BlogContent.propTypes = {
   blog: PropTypes.array,
   handleDeleteBlog: PropTypes.func,
   goTo: PropTypes.func,
};

export default BlogContent;
