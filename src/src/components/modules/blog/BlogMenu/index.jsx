import React, { useState } from 'react';
import BlogItem from 'components/modules/blog/BlogMenu/BlogItem';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import { useHistory } from 'react-router';
import './index.scss';

const BlogMenu = ({
   TabConsumer, handleSaveBlogPost, addErrorMessages, post
}) => {
   const { activeTab, switchTab } = TabConsumer;
   const [doneStates, setdoneStates] = useState({
      post_details: false,
      visibility: false,
      organization: false,
      seo_and_sharing: false,
   });
   const history = useHistory();
   let nextTab = 'organization';
   if (activeTab === 'organization') {
      nextTab = 'seo_and_sharing';
   } else if (activeTab === 'seo_and_sharing') {
      nextTab = 'visibility';
   } else if (activeTab === 'visibility') {
      nextTab = 'visibility';
   }

   const openPreview = () => {
      const win = window.open(`/blog/${ post.slug }`, '_blank');
      win.blog = post;
      return win;
   };

   const handleSave = async () => {
      const errorMessages = await handleSaveBlogPost(activeTab) || {};

      if (Object.keys(errorMessages).length) {
         addErrorMessages(errorMessages);
         return;
      }

      switchTab(nextTab);
      setdoneStates({ ...doneStates, [activeTab]: true });
   };

   return (
      <div className='blogMenuHeader'>
         <div className='blogMenuHeader_left' onClick={ () => history.push('/admin/blog') } role='presentation'>
            <IconNew name='arrowLeftL' />
            <Text
               inner='New Article'
               type={ txtType.regularDefault }
               size={ txtSizes.large }
            />
         </div>
         <div className='blogMenu'>
            <BlogItem
               text='Post Details'
               active={ activeTab === 'post_details' }
               tabId='post_details'
               switchTab={ switchTab }
               number={ 1 }
               isDone={ doneStates.post_details }
            />
            {/* <div className='m-t-exs' /> */}
            <BlogItem
               text='Organization'
               active={ activeTab === 'organization' }
               tabId='organization'
               switchTab={ switchTab }
               number={ 2 }
               isDone={ doneStates.organization }
            />
            {/* <div className='m-t-exs' />
            <div className='m-t-exs' /> */}
            <BlogItem
               text='SEO and Sharing'
               active={ activeTab === 'seo_and_sharing' }
               tabId='seo_and_sharing'
               switchTab={ switchTab }
               number={ 3 }
               isDone={ doneStates.seo_and_sharing }
            />
            {/* <div className='m-t-exs' />
            <div className='m-t-exs' /> */}
            <BlogItem
               text='Visibility'
               active={ activeTab === 'visibility' }
               tabId='visibility'
               switchTab={ switchTab }
               number={ 4 }
               isDone={ doneStates.visibility }
            />
         </div>
         <div className='blogMenuHeader_btns'>
            <div className='preview__wrapper'>
               <BaseButton
                  text='Preview'
                  theme={ btnTheme.tertiaryGreen }
                  size={ btnSize.xsmall }
                  iconName='eyeM'
                  onClick={ () => openPreview() }
                  isIconRight={ true }
               />
            </div>
            <div className='grey_line' />
            {/* <BaseButton
               text='Save to Draft'
               theme={ btnTheme.secondary }
               size={ btnSize.xsmall }
               onClick={ () => {} }
            /> */}
            <BaseButton
               text={ activeTab === 'visibility' ? 'Save' : 'Save & Continue' }
               theme={ btnTheme.primary }
               size={ btnSize.xsmall }
               onClick={ handleSave }
               style={ {
                  fontSize: '16px',
                  minHeight: '44px',
                  marginLeft: '10px',
               } }
            />
         </div>
      </div>
   );
};

BlogMenu.propTypes = {
   TabConsumer: PropTypes.any,
   handleSaveBlogPost: PropTypes.func,
   addErrorMessages: PropTypes.func,
   post: PropTypes.object,
};

export default BlogMenu;
