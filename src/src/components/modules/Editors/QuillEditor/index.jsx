
import React, {
   useRef, useMemo, useState, useEffect,
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { fontList, fontSizeList } from 'utils/constants.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LinkHref } from 'utils/url';
import './index.scss';
import '../fonts.scss';
import '../sizes.scss';
import InsertLinkModal from '../InsertLinkModal';

// Register new fonts
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

const QuillEditor = ({
   title, text, onChange, modules, withoutBorder, placeholder, removeFontSize,
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
         'video',
      ];
   }, []);


   const [showLinkModal, setShowLinkModal] = useState(false);
   const [linkURL, setLinkURL] = useState('');
   const [linkText, setLinkText] = useState('');
   const [selectionRange, setSelectionRange] = useState(null);
   const quillRef = useRef(null);


   const handleLinkButtonClick = () => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range && range.length > 0) {
         const selectedText = quill.getText(range.index, range.length);
         setLinkText(selectedText);
      } else {
         setLinkText('');
      }
      setSelectionRange(range); 
      setShowLinkModal(true);
   };

   const handleLinkInsert = () => {
      const quill = quillRef.current.getEditor();
      if (selectionRange.index === 0 && selectionRange.length === 0) {
         quill.insertText(1, '');
      } 
      if (selectionRange) {
         const { index, length } = selectionRange;
         quill.deleteText(index, length); 
         quill.insertText(index, linkText, { link: LinkHref(linkURL) }); 
         quill.setSelection(index + linkText.length); 
      } else {
         const cursorPosition = quill.getLength();
         quill.insertText(cursorPosition, linkText, { link: LinkHref(linkURL) });
         quill.setSelection(cursorPosition + linkText.length);
      }
  
      setShowLinkModal(false);
      setLinkURL('');
      setLinkText('');
      setSelectionRange(null);
   };
 

   let toolbar = [
      [{ font: fontList }],
      [{ 'size': fontSizeList }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['video'],
   ];

   if (removeFontSize) {
      toolbar = {
         container: [[{ font: fontList }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ customLink: 'link' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['video'],
         ],
         handlers: {
            customLink: handleLinkButtonClick,
         },
      };
   }


   useEffect(() => {
      const toolbarButton = document.querySelector('.ql-customLink');
      if (toolbarButton) {
         toolbarButton.innerHTML = ''; 
         const icon = document.createElement('span');
         icon.innerHTML = '<svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg>'; 
         toolbarButton.appendChild(icon);
      }
   }, []);

   const currentModules = useMemo(() => {
      return {
         toolbar,
         clipboard: {
            matchVisual: false,
         },
      };
   }, []);


   const editorRef = useRef(null);
   const isFirstRender = useRef(true);


   const handleChange = (value) => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      // if (isReadOnly) {
      onChange(value);
      // }
   };

   const handleFocus = () => {
      setIsReadOnly(true);
   };
  
   const handleBlur = () => {
      setIsReadOnly(false);
   };


   return (
      <>
         {title && (
            <div className='quillEditor__title'>
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
                  'quillEditor',
                  {
                     'quillEditor__withoutBorder': withoutBorder,
                  })
            }
         >
            <ReactQuill
               value={ text }
               ref={ quillRef }
               onChange={ handleChange }
               theme='snow'
               modules={ modules || currentModules }
               formats={ formats }
               onFocus={ handleFocus }
               onBlur={ handleBlur }
               placeholder={ placeholder || '' }
            />
            {showLinkModal && (
               <InsertLinkModal 
                  linkText={ linkText } 
                  setLinkText={ setLinkText }
                  linkURL={ linkURL } 
                  setLinkURL={ setLinkURL }
                  handleLinkInsert={ handleLinkInsert }
                  setShowLinkModal={ setShowLinkModal }
               />
            )}
         </div>
      </>
   );
};

QuillEditor.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   onChange: PropTypes.func,
   withoutBorder: PropTypes.bool,
   modules: PropTypes.object,
   placeholder: PropTypes.string,
   removeFontSize: PropTypes.bool,
};

export default QuillEditor;
