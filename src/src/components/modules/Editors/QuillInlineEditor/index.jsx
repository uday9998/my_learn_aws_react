import React, {
   useRef, useMemo, useState,
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; 
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { fontSizeList, fontList } from 'utils/constants.js';
import IconNew from 'components/elements/iconsSize';
import Select from 'components/elements/SelectNew';
// import { getThemeFonts } from 'utils/StaticData';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';
import '../fonts.scss';
import '../sizes.scss';

// Register new fonts
// const fontList = getThemeFonts().map(font => font.label);
const FontAttributor = Quill.import('attributors/style/font');
const Font = Quill.import('formats/font');
FontAttributor.whitelist = fontList;
Font.whitelist = fontList;
Quill.register(Font, true);
Quill.register(FontAttributor, true);

// Register new font sizes
const Size = Quill.import('attributors/style/size');
const FormatsSize = Quill.import('formats/size');
Size.whitelist = fontSizeList;
FormatsSize.whitelist = fontSizeList;
Quill.register(Size, true);
Quill.register(FormatsSize, true);

const QuillInlineEditor = ({
   title, text, onChange, isEmail, placeholder, emailCodes, isLesson,
}) => {
   const [isReadOnly, setIsReadOnly] = useState(false);
   const formats = useMemo(() => {
      return [
         'bold',
         'italic',
         'underline',
         'strike',
         'blockquote',
         'code-block',
         'direction',
         'header',
         'font',
         'size',
         'list',
         'bullet',
         'indent',
         'ordered',
         'script',
         'link',
         'image',
         'color',
         'background',
         'align',
         'clean',
         'imageBlot',
         'width',
         'height',
         'style',
         'data-align',
         'placeholder',
         'autocomplete',
      ];
   }, []);


   const modules = useMemo(() => {
      return {
         toolbar: [
            [{ font: fontList }],
            [{ 'size': fontSizeList }], 
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            // ['video'],
         ],
      }; 
   }, []);

   const editorRef = useRef(null);
   const quillRef = useRef(null);
   const isFirstRender = useRef(true);


   const handleChange = (value) => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      onChange(value);
   };

   const handleFocus = () => {
      setIsReadOnly(true);
   };
  
   const handleBlur = () => {
      setIsReadOnly(false);
   };

   const handleInsertString = (value) => {
      if (quillRef.current) {
         const quill = quillRef.current.getEditor();
         setTimeout(() => {
            quill.insertText(quill.selection?.savedRange?.index || 0, value);
         }, 0);
      }
   };

   return (
      <>
         {title && (
            <div className='quillInlineEditor__title'>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner={ title }
               />
            </div>
         )}
         <div
            ref={ editorRef }
            className={
               classNames(
                  'quillInlineEditor',
                  {
                     'quillInlineEditor__isEmail': isEmail,
                     'quillInlineEditor__isGeneral': !isEmail && isLesson,
                  })
            }
         >
            {isEmail && (
               <div className='email__blocks__code__dict_editor'>
                  <IconNew name='CodeM' />
                  <Select
                     type='select-medium'
                     label=''
                     onChange={ (name, value) => handleInsertString(value) }
                     placeholder='Email Code Dictionary'
                     options={ emailCodes }
                     name='emailCodes'
                  />
               </div>
            )}
            <ReactQuill
               placeholder={ placeholder }
               ref={ quillRef }
               value={ text }
               onChange={ handleChange }
               theme='bubble' 
               modules={ modules }
               formats={ formats }
               onFocus={ handleFocus }
               onBlur={ handleBlur }
            />
         </div>
      </>
   );
};

QuillInlineEditor.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   onChange: PropTypes.func,
   isEmail: PropTypes.bool,
   emailCodes: PropTypes.array,
   placeholder: PropTypes.string,
   isLesson: PropTypes.bool,
};

export default QuillInlineEditor;