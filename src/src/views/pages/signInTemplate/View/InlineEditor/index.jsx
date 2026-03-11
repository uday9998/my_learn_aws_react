import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

const UpsellInlineEditor = (props) => {
   const {
      text, onChange, fontSize, fontWeight, lineHeight, color,
   } = props;
   const editorRef = useRef();
   const handleClickOutside = () => {
      if (editorRef.current && editorRef.current.id && document.getElementById(editorRef.current.id)) {
         document.getElementById(editorRef.current.id).blur();
      }
   };
   useOutsideClickDetector(editorRef, () => handleClickOutside(), true);
   return (
      <div style={ {
         fontSize: `${ fontSize }px`,
         fontWeight,
         lineHeight: `${ lineHeight }%`,
         color,
      } }
      >
         <Editor
            value={ text }
            onInit={ (evet, editors) => editorRef.current = editors }
            ref={ editorRef }
            apiKey={ process.env.REACT_APP_EDITOR_API_KEY }
            onEditorChange={ (e) => {
               onChange(e);
            } }
            init={
               {
                  skin: 'oxide-dark',
                  body_id: 'editor_body',
                  branding: false,
                  removed_menuitems: '',
                  menubar: false,
                  inline: true,
                  quickbars_selection_toolbar: '',
                  toolbar: false,
                  plugins: ['quickbars', 'lists'],
                  force_br_newlines: false,
                  force_p_newlines: false,
                  forced_root_block: '',
                  paste_data_images: false,
                  content_style: `
                 .tox-pop__dialog{
                    min-width: max-content !important;
                 }

              `
                  ,
               }
            }
         />
      </div>
   );
};

UpsellInlineEditor.propTypes = {
   text: PropTypes.string,
   onChange: PropTypes.func,
   lineHeight: PropTypes.string,
   fontWeight: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.string,
};

export default UpsellInlineEditor;
