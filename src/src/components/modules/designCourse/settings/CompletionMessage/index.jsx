import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Radio from 'components/elements/form/Radio';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextArea from 'components/elements/form/TextArea';
import CompletionModal from 'views/pages/StudentsRoom/CompletionModal';
import Modal from 'components/elements/Modal';
import Tooltip from 'components/elements/members/Tooltip';

const CompletionMessage = ({
   handleInternalInputChange,
   handleSettingsSave,
   settingsData,
}) => {
   const [isComplate, setIsComplate] = useState(false);
   const isChecked = !!settingsData.finish_message || settingsData.finish_message === '';
   let siteTheme = {};
   siteTheme = settingsData && settingsData.theme && settingsData.theme.themesparts.find(el => el.key === 'theme_font');

   return (
      <ItemWrapper>
         <div className='completionMessage'>
            {/* <CKEditor
               editor={ ClassicEditor }
               data={ mainhubSettings.terms }
               onChange={ (event, editor) => {
                  const data = editor.getData();
                  onChange('terms', data);
               } }
            /> */}
            <div className='flex'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner='Completion Message'
               />
               <Tooltip
                  hintText='The message customers see after completing your course.'
                  hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
               />
            </div>
            <div className='completionMessage_content'>
               <Text
                  type={ textType.medium }
                  size={ textSize.extraSmall }
                  inner='Default Completion'
               />
               <div className='completionMessage_radioBox'>
                  <Radio checked={ !isChecked } name='yes' label='Yes' onChange={ () => handleInternalInputChange('finish_message', null) } />
                  <Radio checked={ isChecked } name='no' label='No' className='m-l-m' onChange={ () => handleInternalInputChange('finish_message', '') } />
               </div>
            </div>
            {
               isChecked && (
                  <div className='finish_messageEditor'>
                     <TextArea
                        label=''
                        placeholder='Enter the message you want your users to see after completing your course'
                        value={ settingsData.finish_message }
                        maxLength='350'
                        onChange={ (event, value) => {
                           handleInternalInputChange('finish_message', value);
                        } }
                     />
                  </div>
               )
            }

            <div className='completionMessage_btn flex w-full m-t-exl'>
               {
                  (
                     <BaseButton
                        theme={ btnType.grey }
                        size={ btnSize.large }
                        text='Preview'
                        margin
                        onClick={ () => setIsComplate(true) }
                     />
                  )
               }
               <BaseButton
                  theme={ btnType.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  className='save-detalis'
                  onClick={ () => handleSettingsSave('completion-message') }
               />

            </div>
            {
               isComplate && (
                  <Modal
                     blurColor='rgba(63, 79, 101, 0.6)'
                     contentBgColor='#fff'
                     contentPosition='center'
                     closeOnClickOutside={ true }
                     contentWidth='648px'
                     className='Completion_student'
                     onClose={ () => setIsComplate(false) }
                  >
                     <CompletionModal
                        description={ settingsData.finish_message }
                        closeModal={ () => setIsComplate(false) }
                        primaryTheme={ siteTheme && siteTheme.value ? siteTheme.value : 'Avenir Next' }
                        isAdmin={ true }
                     />
                  </Modal>
               )
            }
         </div>
      </ItemWrapper>
   );
};

CompletionMessage.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.object,
};

export default CompletionMessage;
