import React, { useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import TextInput from 'components/elements/form/TextInput';
// import Icon from 'components/elements/Icon';
import withLoading from 'utils/withLoading';
import BlogCategoryEngineContainer from 'components/modules/categoryTagEngine/BlogCategoryEngineContainer';


const ItemWrapperLoading = withLoading('div');

const Organization = ({
   handleGetBlogCategories, getBlogCategoriesInProgress, detachCategories, attachCategories,
   attachedCategories,
   post,
   // categories
}) => {
   useEffect(() => {
      handleGetBlogCategories();
   }, []);


   return (
      <ItemWrapperLoading isLoading={ getBlogCategoriesInProgress }>
         <div className='organization'>
            <div>
               <div>
                  <Text
                     type={ TextType.medium160 }
                     size={ TextSize.xlarge }
                     inner='Organization'
                  />
               </div>
               <div className='organization_subtitle'>
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     inner='Set the category for this article'
                  />
               </div>
            </div>
            <div>
               <div className='multiselect_header'>
                  <div>
                     <Text
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                        inner='Categories'
                     />
                  </div>
               </div>
               <BlogCategoryEngineContainer
                  attachedValues={ attachedCategories }
                  className='w-full'
                  onAttach={ value => attachCategories(value, true) }
                  onDetach={ (id) => detachCategories(id, false) }
                  post={ post }
                  isBlog={ true }
                  tagName='category'
               />
            </div>
         </div>
      </ItemWrapperLoading>
   );
};

Organization.propTypes = {
   handleGetBlogCategories: PropTypes.func,
   getBlogCategoriesInProgress: PropTypes.bool,
   detachCategories: PropTypes.func,
   attachCategories: PropTypes.func,
   attachedCategories: PropTypes.array,
   post: PropTypes.object,
};

export default Organization;
