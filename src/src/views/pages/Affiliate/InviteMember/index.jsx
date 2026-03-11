import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Info from 'components/elements/messages/info';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import { Editor } from '@tinymce/tinymce-react';

const AffiliateInviteMember = ({
   inputs, onChange, goBack, onInvite,
}) => {
   const editorRef = useRef();
   return (
      <div className='affiliate__invite__view'>
         <div className='affiliate__invite__view__left'>
            <Text
               inner='Invitation Email'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Input
               disabled={ true }
               value={ inputs.from }
               label='From'
            />
            <div className='affiliate__invite__view__left__recipients'>
               <Input
                  value={ inputs.recipients }
                  name='recipients'
                  onChange={ onChange }
                  label='Recipients'
               />
               <Info
                  title='The comma can be used to separate multiple email addresses, which will let you invite multiple people at the same time.'
                  bottomText='Eg. first@email.com, second@email.com'
                  isHaveCancel={ false }
               />
            </div>
            <Input
               value={ inputs.subject }
               name='subject'
               onChange={ onChange }
               label='Subject Line'
            />
            <div className='affiliate__invite__view__left__editor'>
               <Text
                  inner='Text'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Editor
                  value={ inputs.text }
                  onInit={ (evet, editors) => editorRef.current = editors }
                  ref={ editorRef }
                  apiKey={ process.env.REACT_APP_EDITOR_API_KEY }
                  onEditorChange={ (e) => {
                     onChange('text', e);
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
               />
            </div>
            <div className='affiliate__invite__view__left__buttons'>
               <Button
                  theme={ btnThemes.secondary }
                  text='Previous'
                  onClick={ () => goBack() }
               />
               <Button
                  text='Invite Users'
                  onClick={ () => onInvite() }
               />
            </div>
         </div>
         <div className='affiliate__invite__view__right' />
      </div>
   );
};

AffiliateInviteMember.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   goBack: PropTypes.func,
   onInvite: PropTypes.func,
};

export default AffiliateInviteMember;
