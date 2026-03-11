import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BlogMenu from 'components/modules/blog/BlogMenu';
// import AccountInfoModule from 'components/modules/settings/AccountInfo';
// import SiteChanges from 'components/modules/settings/SiteChanges';
// import LoginWith from 'components/modules/settings/LoginWith';
// import IntegrationModule from 'components/modules/settings/Integration';
import TabSwitch from 'components/elements/TabSwitch';
import PostDetails from 'components/modules/blog/PostDetails';
import Visibility from 'components/modules/blog/Visibility';
import Organization from 'components/modules/blog/Organization';
// import BlogSettings from 'components/modules/blog/BlogSettings';
import SeoandSharing from 'components/modules/blog/SeoandSharing';

const BlogCreate = (props) => {
   const {
      onSwitchTab, tabName, post, handleInputChange, handleSaveBlogPost, handleGetBlogCategories,
      categories, getBlogCategoriesInProgress, attachCategories, detachCategories, attachedCategories,
      addCategory, getBlogPostInProgress, authors,
   } = props;
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const changeInputs = (name, value, target) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      handleInputChange(name, value, target);
   };

   const isMobile = false;
   return (
      <TabSwitch
         onSwitchTab={ onSwitchTab }
         dataIsFetching={ getBlogPostInProgress }
         initialTab=''
      >
         <div className='blogCreate'>
            {
               (!isMobile || !tabName) && (
                  <div className='blogCreate_header'>
                     <div>
                        <TabSwitch.Tab>
                           <BlogMenu
                              handleSaveBlogPost={ handleSaveBlogPost }
                              addErrorMessages={ addErrorMessages }
                              post={ post }
                           />
                        </TabSwitch.Tab>
                     </div>
                  </div>
               )
            }
            {
               (!isMobile || !!tabName) && (
                  <div className='blogCreate_content'>
                     <div>
                        <TabSwitch.Content>
                           <PostDetails
                              tabId='post_details'
                              post={ post }
                              handleInputChange={ changeInputs }
                              authors={ authors }
                              errorMessages={ errorMessages }
                           />
                           <Visibility
                              tabId='visibility'
                              post={ post }
                              handleInputChange={ changeInputs }
                              handleSaveBlogPost={ handleSaveBlogPost }
                           />
                           <Organization
                              tabId='organization'
                              handleInputChange={ changeInputs }
                              handleGetBlogCategories={ handleGetBlogCategories }
                              post={ post }
                              categories={ categories }
                              getBlogCategoriesInProgress={ getBlogCategoriesInProgress }
                              attachCategories={ attachCategories }
                              detachCategories={ detachCategories }
                              attachedCategories={ attachedCategories }
                              addCategory={ addCategory }
                           />
                           {/* <BlogSettings
                              tabId='blog_settings'
                           /> */}
                           <SeoandSharing
                              tabId='seo_and_sharing'
                              post={ post }
                              handleInputChange={ changeInputs }
                              handleSaveBlogPost={ handleSaveBlogPost }
                           />
                        </TabSwitch.Content>
                     </div>
                  </div>
               )
            }
         </div>
      </TabSwitch>
   );
};

BlogCreate.propTypes = {
   onSwitchTab: PropTypes.func,
   tabName: PropTypes.string,
   post: PropTypes.object,
   handleInputChange: PropTypes.func,
   handleSaveBlogPost: PropTypes.func,
   handleGetBlogCategories: PropTypes.func,
   categories: PropTypes.array,
   getBlogCategoriesInProgress: PropTypes.bool,
   detachCategories: PropTypes.func,
   attachCategories: PropTypes.func,
   attachedCategories: PropTypes.array,
   addCategory: PropTypes.func,
   getBlogPostInProgress: PropTypes.bool,
   authors: PropTypes.array,
};

BlogCreate.defaultProps = {
   tabName: '',
};

export default BlogCreate;
