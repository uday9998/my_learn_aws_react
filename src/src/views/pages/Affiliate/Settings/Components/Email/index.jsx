/* eslint-disable react/no-danger */
import React, { useContext, useRef } from 'react';
import { AffiliateSettingsContext } from 'containers/pages/admin/affiliate/Settings';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
// import { Editor } from '@tinymce/tinymce-react';
import QuillInlineEditorSimple from 'components/modules/Editors/QuillInlineEditorSimple';

const AffiliateSettingsEmail = () => {
   const { data, handleInputChange } = useContext(AffiliateSettingsContext);
   // const editorRef = useRef();
   return (
      <div className='affiliate__settings__email'>
         <div className='affiliate__settings__email__left'>
            <div className='affiliate__settings__email__left__block'>
               <Text
                  inner='Welcome Email'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner='This email will be sent to people after they sign up for the affiliate partnership.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978', marginBottom: '20px' } }
               />
               <Input
                  label='Subject Line'
                  value={ data.emailSettings.subject_line }
                  name='subject_line'
                  onChange={ handleInputChange }
               />
            </div>
            <div className='affiliate__settings__email__left__block'>
               <Text
                  inner='Text'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { marginBottom: '8px' } }
               />
               <QuillInlineEditorSimple
                  text={ data.emailSettings.text }
                  onChange={ (e) => {
                     handleInputChange('text', e);
                  } }
                  isEmail={ true } 
               />
               {/* <Editor
                  value={ data.emailSettings.text }
                  onInit={ (evet, editors) => editorRef.current = editors }
                  ref={ editorRef }
                  apiKey={ process.env.REACT_APP_EDITOR_API_KEY }
                  onEditorChange={ (e) => {
                     handleInputChange('text', e);
                  } }
                  init={
                     {
                        width: 390,
                        skin: 'oxide-dark',
                        body_id: 'editor_body',
                        branding: false,
                        removed_menuitems: '',
                        menubar: false,
                        inline: true,
                        toolbar: false,
                        plugins: ['quickbars', 'lists'],
                        quickbars_insert_toolbar: 'undo redo',
                        quickbars_selection_toolbar: 'bold | italic | underline | alignleft | aligncenter | alignright | alignjustify | numlist | bullist',
                        force_br_newlines: false,
                        force_p_newlines: false,
                        forced_root_block: '',
                        paste_data_images: false,
                        content_style: `
                     .tox-pop__dialog{
                        min-width: max-content !important;
                     }
                     .mce-content-body{
                        border: 1px solid #E7E9E9;
                        min-height: 150px;
                        border-radius: 12px;
                        padding: 8px 16px !important;
                        outline: none !important;

                     }
                  `
                        ,
                     }
                  }
               /> */}
            </div>
         </div>
         <div className='affiliate__settings__email__right'>
            <Text
               inner='Preview'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <div className='affiliate__settings__email__right__preview'>
               <div dangerouslySetInnerHTML={ {
                  __html: data.emailSettings.text,
               } }
               />
            </div>
         </div>
      </div>
   );
};

AffiliateSettingsEmail.propTypes = {

};

export default AffiliateSettingsEmail;
