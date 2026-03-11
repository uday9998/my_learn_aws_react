import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import InlineEditor from 'components/modules/textInlineEditor';
import GeneratorModal from 'components/elements/GeneratorModal';

const TextEmail = ({
   onChange, block,
}) => {
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });

   const changeLesson = (name, value) => {
      onChange(name, value, true);
   };

   return (
      <div className='text__email' style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }>
         <div>
            <InlineEditor
               text={ (block.css_attributes && block.css_attributes.description) || '' }
               onChange={ (value) => changeLesson('description', value) }
               placeholder='Title here...'
               withIcon={ true }
               iconName='Generator'
               name='description'
               setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
               IToolTipTextNew='AI Generator'
               isEmail={ true }
            />
         </div>
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

TextEmail.propTypes = {
   onChange: PropTypes.func,
   block: PropTypes.object,
};

export default TextEmail;
