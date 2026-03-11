import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const NotesEditor = ({
   inputs, onChange, isEditNote, onAdd, onUpdate, onCancel, errorMessages,
}) => {
   return (
      <div className='notes__editor'>
         <Input
            errorMessages={ errorMessages.title }
            value={ inputs.title }
            placeholder='Add Title For Your Note'
            name='title'
            label='Title'
            helpText={ `${ inputs.title.length }/150` }
            onChange={ onChange }
         />
         <Input
            errorMessages={ errorMessages.description }
            value={ inputs.description }
            placeholder='Write Your Note Here'
            name='description'
            type='textarea'
            label='Note'
            onChange={ (name, value) => onChange(name, value) }
         />
         {isEditNote ? (
            <div className='notes__editor__buttons'>
               <BaseButton
                  text='Cancel'
                  onClick={ () => onCancel() }
                  theme={ btnTheme.secondary }
               />
               <BaseButton
                  text='Update'
                  onClick={ () => onUpdate() }
               />
            </div>
         ) : (
            <BaseButton
               isIconRight={ true }
               text='Add Note'
               onClick={ () => onAdd() }
               theme={ btnTheme.primary }
               size={ btnSizes.medium }
               iconName='PluseNewL'
            />
         )}
      </div>
   );
};

NotesEditor.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   isEditNote: PropTypes.bool,
   onAdd: PropTypes.func,
   onUpdate: PropTypes.func,
   onCancel: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default NotesEditor;
