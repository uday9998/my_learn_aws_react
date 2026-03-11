import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import InlineEditor from 'components/modules/textInlineEditor';
// import InlineEditor from 'components/modules/InlineEditorNew';
import GeneratorModal from 'components/elements/GeneratorModal';

const TextLesson = ({
   onChange, block,
}) => {
   const changeLesson = (name, value) => {
      onChange(name, value, true);
   };
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });


   return (
      <div className='text__lesson' style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }>
         <InlineEditor
            text={ block.description || '' }
            onChange={ (value) => changeLesson('description', value) }
            biggerFront={ true }
            withIcon={ true }
            iconName='Generator'
            name='description'
            setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
            IToolTipTextNew='AI Generator'
            isLesson={ true }
         />
         {/* <InlineEditor
            text={ block.description || '' }
            onChange={ (value) => changeLesson('description', value) }
         />  */}
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               isQuiz={ true }
               title='Text'
               setData={ changeLesson }
            />
         )}

      </div>
   );
};

TextLesson.propTypes = {
   onChange: PropTypes.func,
   block: PropTypes.object,
};

export default TextLesson;
