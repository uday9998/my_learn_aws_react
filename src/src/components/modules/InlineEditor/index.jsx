/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';
import QuillInlineEditorSimple from 'components/modules/Editors/QuillInlineEditorSimple';
import './index.scss';

const InlineEditor = (props) => {
   const {
      changeProp, text, index, isSubcomponent, subIndex, handleDuplicateComponent, handleDeleteComponent,
      slug, sectionIndex, isSubofSubcomponent, subofSubIndex, isClassName, propsName, fromEditable, hideInlineActions
   } = props;

   // const editorRef = useRef({
   //    targetElm: {
   //       innerHTML: text,
   //    },
   // });
   // const [editor, setEditor] = useState(() => {
   //    
   //    return text;
   // });
   // const handleClickOutside = () => {
   //    if (editorRef.current && editorRef.current.id && document.getElementById(editorRef.current.id)) {
   //       document.getElementById(editorRef.current.id).blur();
   //    }
   // };
   // useOutsideClickDetector(editorRef, () => handleClickOutside(), true);
   // useEffect(() => {
   //    setEditor(text);
   //    if (editorRef.current.targetElm && text !== editorRef.current.targetElm.innerHTML && text !== editor) {
   //       editorRef.current.targetElm.innerHTML = text;
   //    }
   // }, [text]);

   // useEffect(() => {
   //    if (document.querySelector('#right_container')) {
   //       document.querySelector('#right_container').addEventListener('scroll', (e) => handleClickOutside(e));
   //    }
   //    return () => {
   //       if (document.querySelector('#right_container')) {
   //          document.querySelector('#right_container').removeEventListener('scroll', (e) => handleClickOutside(e));
   //       }
   //    };
   // }, []);

   const handleChangeProp = (e) => {
      // setEditor(e);
      if (isSubofSubcomponent) {
         changeProp(e, propsName, 'subOfSubComponent', index, subIndex, false, [], subofSubIndex);
      } else if (isSubcomponent) {
         changeProp(e, propsName, 'subcomponent', index, subIndex);
      } else if (isClassName) {
         const div = document.createElement('div');
         div.innerHTML = e;
         changeProp(div.innerText, isClassName ? 'name' : propsName, 'component', index, '', isClassName);
         if (!e.includes('<span')) {
            changeProp('none', 'textDecoration', 'component', index, '', false);
         } if (!e.includes('<em')) {
            changeProp('normal', 'fontStyle', 'component', index, '', false);
         } if (!e.includes('<strong>')) {
            changeProp('normal', 'fontWeight', 'component', index, '', false);
         }
         if (e.includes('<span')) {
            changeProp('underline', 'textDecoration', 'component', index, '', false);
         } else if (e.includes('<em')) {
            changeProp('italic', 'fontStyle', 'component', index, '', false);
         } else if (e.includes('<strong>')) {
            changeProp('bold', 'fontWeight', 'component', index, '', false);
         }
      } else {
         changeProp(e, isClassName ? 'name' : propsName, 'component', index, '', isClassName);
      }
   };

   return (
      <div className='inlineEditor'>
         {!isSubcomponent && !isSubofSubcomponent && !fromEditable && !hideInlineActions && (
            <InlineActions
               slug={ slug }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         )}
         <QuillInlineEditorSimple
            text={ text || '' }
            onChange={ handleChangeProp }
            isTemplate={ true } 
            // modules={ { toolbar: false } }
            fromEditable={ fromEditable }
         />
      </div>

   );
};

InlineEditor.defaultProps = {
   propsName: 'text',
};

InlineEditor.propTypes = {
   text: PropTypes.string,
   index: PropTypes.number,
   changeProp: PropTypes.func,
   isSubcomponent: PropTypes.bool,
   subIndex: PropTypes.number,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   slug: PropTypes.string,
   sectionIndex: PropTypes.number,
   isSubofSubcomponent: PropTypes.bool,
   subofSubIndex: PropTypes.number,
   isClassName: PropTypes.bool,
   propsName: PropTypes.string,
   fromEditable: PropTypes.bool,
   hideInlineActions: PropTypes.bool,
};

export default InlineEditor;
