import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import UploadImg from 'components/modules/blog/UploadImg';
import places from 'assets/images/places.png';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Switch from 'components/elements/form/Switch';
import Tooltip from 'components/elements/members/Tooltip';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
// import TextArea from 'components/elements/form/TextArea';
// import Select from 'components/elements/form/Select';
// import ColorInput from 'components/elements/form/ColorInput';


const BlogSettings = ({
   saveBlogSettings, blogSettings, handleInputChange, blogTotal,
}) => {
   return (
      <div className='blogsettings__module__container'>
         <ItemWrapper>
            <div className='blogsettings__module'>
               <div className='blogsettings__toggle'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.medium }
                        inner='Blog Settings'
                     />
                  </div>
                  <div className='m-l-l blogSwitch__content'>
                     <div className='blogSwitch__off' role='presentation' onClick={ () => handleInputChange('blog_page_status', 'off', 'blogSettings') }>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.small }
                           inner='Off'
                        />
                     </div>
                     <div>
                        <Switch
                           checked={ blogSettings && blogSettings.blog_page_status && (blogSettings.blog_page_status === 'on' || (blogTotal !== 0 && blogSettings.blog_page_status === 'on_default')) }
                           name='blog_page_status'
                           onChange={ (name, value) => handleInputChange(name, value ? 'on' : 'off', 'blogSettings') }
                           isCommentPage={ true }
                        />
                     </div>
                     <div className='blogSwitch__on' role='presentation' onClick={ () => handleInputChange('blog_page_status', 'on', 'blogSettings') }>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.small }
                           inner='On'
                        />
                     </div>
                     <Tooltip
                        hintText='By turning on the Blog settings, there would be an option for your members to access your blog through the menu in your portal.'
                        style={ { top: '3px' } }
                        hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
                     />
                  </div>
               </div>
               <div className='m-t-exl' />
               <div className='blogsettings__content'>
                  <div className='blogsettings__inputs'>
                     <TextInput
                        label='Page Title'
                        placeholder='Enter Title'
                        rightLabel={ `${ blogSettings && blogSettings.blog_page_title ? blogSettings.blog_page_title.length : 0 }/150` }
                        name='blog_page_title'
                        value={ blogSettings && blogSettings.blog_page_title }
                        onChange={ (name, value) => {
                           if (value.length < 151) {
                              handleInputChange(name, value, 'blogSettings');
                           } else if (isPrint('You are reached the character limit')) {
                              toast.error('You are reached the character limit');
                           }
                        } }
                     />
                     <div className='m-t-exl' />
                     <TextInput
                        label='Page Subtitle'
                        placeholder='Enter Subtitle'
                        name='blog_page_description'
                        rightLabel={ `${ blogSettings && blogSettings.blog_page_description ? blogSettings.blog_page_description.length : 0 }/250` }
                        onChange={ (name, value) => {
                           if (value.length <= 250) {
                              handleInputChange(name, value, 'blogSettings');
                           } else if (isPrint('You are reached the character limit')) {
                              toast.error('You are reached the character limit');
                           }
                        } }
                        value={ blogSettings && blogSettings.blog_page_description }
                     />
                     <div className='m-t-exl' />
                  </div>
                  <div className='uploadImgs'>
                     <UploadImg
                        title='Page Image'
                        crop='1500x300'
                        img={ blogSettings && (blogSettings.blog_page_image ? blogSettings.blog_page_image : places) }
                        isMemberPic={ true }
                        onChange={ (value) => handleInputChange('blog_page_image', value, 'blogSettings') }
                     />
                  </div>
               </div>
               <div className='save__btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Save'
                     className='blog-save'
                     onClick={ () => saveBlogSettings() }
                  />
               </div>
            </div>
         </ItemWrapper>
      </div>
   );
};

BlogSettings.propTypes = {
   saveBlogSettings: PropTypes.func,
   blogSettings: PropTypes.object,
   handleInputChange: PropTypes.func,
   blogTotal: PropTypes.number,
};


export default BlogSettings;
