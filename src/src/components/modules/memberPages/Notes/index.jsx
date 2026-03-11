import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NotesEditor from './NotesComponents/NotesEditor';
import NotesFlex from './NotesComponents/NotesFlex';
import './index.scss';

const Notes = ({
   currentMember, onAdd, onUpdate, onDelete,
}) => {
   const [inputs, setInputs] = useState({
      title: '',
      description: '',
   });
   const [isEditNote, setIsEditNode] = useState(false);
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const onEditNote = (note) => {
      setInputs({
         ...note,
      });
      setIsEditNode(true);
   };

   const onAddNote = async () => {
      const newErrMessages = await onAdd(currentMember.id, inputs);

      if (newErrMessages) {
         addErrorMessages(newErrMessages);
         return;
      }

      setInputs({
         title: '',
         description: '',
      });
   };
   const onUpdateNote = async () => {
      const newErrMessages = await onUpdate(inputs.id, currentMember.id, {
         title: inputs.title,
         description: inputs.description,
      });

      if (newErrMessages) {
         addErrorMessages(newErrMessages);
         return;
      }

      setInputs({
         title: '',
         description: '',
      });
      setIsEditNode(false);
   };
   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   const onCancel = () => {
      setInputs({
         title: '',
         description: '',
      });
      setIsEditNode(false);
   };
   const onDeleteNote = (noteId) => {
      onDelete(currentMember.id, noteId);
   };
   return (
      <div className='notes'>
         <NotesEditor
            onUpdate={ onUpdateNote }
            isEditNote={ isEditNote }
            onAdd={ onAddNote }
            inputs={ inputs }
            memberName={ currentMember.name }
            onCancel={ onCancel }
            onChange={ handleInputChange }
            errorMessages={ errorMessages }
         />
         <NotesFlex
            currentMember={ currentMember }
            notes={ currentMember.notes }
            onEdit={ onEditNote }
            onDelete={ onDeleteNote }
         />
      </div>
   );
};

Notes.propTypes = {
   currentMember: PropTypes.object,
   onAdd: PropTypes.func,
   onUpdate: PropTypes.func,
   onDelete: PropTypes.func,
};

export default Notes;
