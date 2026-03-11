import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TextWithIcon, TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Input from 'components/elements/inputNew';
import ColorInput from 'components/elements/form/ColorInput';
import UploadImage from 'components/modules/uploadImage';
import BlogPreview from 'assets/images/blog/preview.png';
import BlogCover from 'assets/images/blog/cover.png';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const BlogHeaderCreate = ({
   saveBlogSettings, blogSettings, handleInputChange,
}) => {
   return (
      <div className='blogHeaderCreate'>
         <div className='blogHeaderCreate_left'>
            <div>
               <Text
                  type={ TextType.medium160 }
                  size={ TextSize.xlarge }
                  inner='Set a title and cover for the blog'
               />
            </div>
            <div>
               <Input
                  label='Blog Title'
                  name='blog_page_title'
                  value={ blogSettings.blog_page_title || '' }
                  onChange={ (name, value) => {
                     if (value.length < 151) {
                        handleInputChange(name, value, 'blogSettings');
                     } else if (isPrint('You are reached the character limit')) {
                        toast.error('You are reached the character limit');
                     }
                  } }
               />
            </div>
            <div>
               <Input
                  label='Blog Subtitle'
                  helpText='Optional'
                  name='blog_page_description'
                  onChange={ (name, value) => {
                     if (value.length <= 250) {
                        handleInputChange(name, value, 'blogSettings');
                     } else if (isPrint('You are reached the character limit')) {
                        toast.error('You are reached the character limit');
                     }
                  } }
                  value={ blogSettings.blog_page_description || '' }

               />
            </div>
            <div>
               <ColorInput
                  label='Title Color'
                  subLabel=''
                  icon='TriangleDown'
                  name='blog_page_color'
                  value={ blogSettings.blog_page_color || '#ffffff' }
                  onChange={ (name, value) => handleInputChange(name, value, 'blogSettings') }
               />
            </div>
            <div>
               <UploadImage
                  label='Blog Cover'
                  isOptional={ true }
                  size='full'
                  cropRatio='1920x420'
                  name='blog_page_image'
                  src={ blogSettings.blog_page_image || null }
                  onChange={ (name, value) => handleInputChange('blog_page_image', value, 'blogSettings') }
                  isImageUpload={ true }
               />
               <div className='optional-text m-t-m'>
                  <TextWithIcon
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.xsmall }
                     iconName='infoS'
                     iconGap={ 5 }
                     inner='Image dimensions&nbsp;'
                  />
                  <Text
                     type={ TextType.mediumLargeGrey }
                     size={ TextSize.xsmall }
                     inner='1920x420'
                  />
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.xsmall }
                     inner='px, File size max&nbsp;'
                  />
                  <Text
                     type={ TextType.mediumLargeGrey }
                     size={ TextSize.xsmall }
                     inner=' 5 mb'
                  />
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.xsmall }
                     inner=', Format: &nbsp;'
                  />
                  <Text
                     type={ TextType.mediumLargeGrey }
                     size={ TextSize.xsmall }
                     inner=' PNG, JPG'
                  />
               </div>
            </div>
         </div>
         <div className='blogHeaderCreate_right'>
            <div>
               <Text
                  type={ TextType.medium160 }
                  size={ TextSize.xlarge }
                  inner='Preview'
               />
            </div>
            <div className='blogHeaderCreate_right_img'>
               <div className='blogCover'><img src={ blogSettings.blog_page_image || BlogCover } alt='blog' /></div>
               <div className='blogHeaderCreate_right_img_text'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.medium }
                        style={ { color: blogSettings.blog_page_color } }
                        inner={ blogSettings.blog_page_title || 'Blog Title' }
                     />
                  </div>
                  <div>
                     <Text
                        type={ TextType.mediumLargeGrey }
                        size={ TextSize.small }
                        style={ { color: blogSettings.blog_page_color } }
                        inner={ blogSettings.blog_page_description || 'Subtitle' }
                     />
                  </div>
               </div>
            </div>
            <div className='blogHeaderCreate_right_img_bottom'><img src={ BlogPreview } alt='blog' /></div>
            <div className='blogHeaderCreate_right_btn'>
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSize.large }
                  disabled={ !Object.values(blogSettings).length }
                  text='Save Changes'
                  onClick={ () => saveBlogSettings() }
               />
            </div>
         </div>
      </div>
   );
};

BlogHeaderCreate.propTypes = {
   saveBlogSettings: PropTypes.func,
   blogSettings: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default BlogHeaderCreate;
