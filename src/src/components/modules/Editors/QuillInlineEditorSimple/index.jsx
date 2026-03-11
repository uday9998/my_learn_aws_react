
import React, {
   useRef, useMemo, useState, useEffect,
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { fontList } from 'utils/constants.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../fonts.scss';
import './index.scss';

const FontAttributor = Quill.import('attributors/style/font');
const Font = Quill.import('formats/font');
FontAttributor.whitelist = fontList;
Font.whitelist = fontList;
Quill.register(Font, true);
Quill.register(FontAttributor, true);

const QuillInlineEditorSimple = ({
   text, onChange, isTemplate, modules, isOtherPage, isEmail, fromEditable,
}) => {
   const editingTimeout = useRef(null);

   const editorRef = useRef(null);
   const isFirstRender = useRef(true);
   const quillRef = useRef(null);

   const [isReadOnly, setIsReadOnly] = useState(false);
   const [currentText, setCurrentText] = useState(text);

   useEffect(() => {
      const editor = quillRef.current.getEditor();
      const tooltip = editor.theme?.tooltip?.root;
      if (tooltip) {
         const observer = new MutationObserver(() => {
            const tooltipLeft = parseInt(tooltip.style.left, 10);

            if (tooltipLeft < 0) {
               tooltip.style.left = '0px';
            }
         });

         observer.observe(tooltip, { attributes: true, attributeFilter: ['style'] });

         return () => {
            observer.disconnect();
         };
      }
   }, []);

   useEffect(() => {
      if (!editingTimeout.current) {
         setCurrentText(text);
      }
   }, [text]);

   const formats = useMemo(() => ([
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'ordered',
      'align',
      'link',
      'font',
   ]), []);

   let toolbar = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
   ];

   if (isTemplate) {
      toolbar = [
         [{ 'header': 1 }, { 'header': 2 }], 
         [{ font: fontList }],
         ['bold', 'italic', 'underline', 'strike', 'link'],
      ];
   }

   const currentModules = useMemo(() => ({ toolbar }), []);

   const handleChange = (value) => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // const isHaveExtraSpaces = /^\s{1}\S|.*\s{2,}.*/;
      // if (isHaveExtraSpaces.test(value)) {
      //    setCurrentText(prev => prev);

      //    return;
      // }

      if ((isOtherPage && isReadOnly) || (isEmail || isTemplate)) {
         setCurrentText(value);
         onChange(value);

         clearTimeout(editingTimeout.current);
         editingTimeout.current = setTimeout(() => {
            editingTimeout.current = null;
         }, 500);
      }
   };

   const handleFocus = () => {
      setIsReadOnly(true);
   };

   const handleBlur = () => {
      setIsReadOnly(false);
   };

   return (
      <div
         ref={ editorRef }
         className={
            classNames(
               'quillInlineEditorSimple',
               {
                  'quillInlineEditorSimple__isTemplate': isTemplate,
                  'quillInlineEditorSimple__isEmail': isEmail,
                  'quillInlineEditorSimple__isOtherPage': isOtherPage,
                  'quillInlineEditorSimple__isEditable': fromEditable,
               })
         }
      >
         <ReactQuill
            ref={ quillRef }
            value={ currentText }
            onChange={ handleChange }
            theme='bubble' 
            onFocus={ handleFocus }
            onBlur={ handleBlur }
            modules={ modules || currentModules }
            formats={ formats }
         /> 
      </div>
   );
};
 
QuillInlineEditorSimple.propTypes = {
   text: PropTypes.string,
   onChange: PropTypes.func,
   isTemplate: PropTypes.bool,
   modules: PropTypes.object,
   isOtherPage: PropTypes.bool,
   isEmail: PropTypes.bool,
   fromEditable: PropTypes.bool,
};
 
export default QuillInlineEditorSimple;