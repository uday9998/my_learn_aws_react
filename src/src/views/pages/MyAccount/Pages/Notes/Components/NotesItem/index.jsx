import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import DeleteModal from 'components/elements/DeleteModal';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import ModalNew from 'components/elements/ModalNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import { toast } from 'react-toastify';

const NoteItem = ({
   title, description, onEdit, createdAt, onDelete, onCheck, isChecked, updateNoteQuery, id,
   updateLoading,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
   const [innerNoteInputs, setInnerNoteInputs] = React.useState({});
   const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

   const handleOpenEditModal = () => {
      setInnerNoteInputs({
         title, description,
      });
      setIsOpenEditModal(true);
   };

   const handleUpdateNote = () => {
      updateNoteQuery([id, innerNoteInputs], () => {
         toast.success('Note updated successfuly.');
         onEdit(id, innerNoteInputs);
         setIsOpenEditModal(false);
      });
   };

   return (
      <>
         {isOpenDeleteModal && (
            <DeleteModal
               deleteText='Delete'
               maxWidth={ 414 }
               loading={ updateLoading }
               title={ `Are you sure you want to delete [${ title }] note ?` }
               onCancel={ () => {
                  setIsOpenDeleteModal(false);
                  setInnerNoteInputs({});
               } }
               onDelete={ () => {
                  onDelete();
                  setIsOpenDeleteModal(false);
               } }
            />
         )}
         {isOpenEditModal && (
            <ModalNew onCloseModal={ () => {
               setIsOpenEditModal(false);
               setInnerNoteInputs({});
            } }
            >
               <div className='note__edit'>
                  <Text
                     inner='Edit Note'
                     type={ types.medium150 }
                     size={ sizes.large }
                  />
                  <div className='note__edit__inputs'>
                     <Input
                        label='Title'
                        value={ innerNoteInputs.title }
                        placeholder='Note Title'
                        onChange={ (n, value) => setInnerNoteInputs({ ...innerNoteInputs, 'title': value }) }
                     />
                     <Input
                        label='Description'
                        value={ innerNoteInputs.description }
                        placeholder='Note Description'
                        onChange={ (n, value) => setInnerNoteInputs({ ...innerNoteInputs, 'description': value }) }
                     />
                  </div>
                  <div className='note__edit__buttons'>
                     <Button
                        text='Cancel'
                        theme={ themes.secondary }
                        onClick={ () => {
                           setIsOpenEditModal(false);
                           setInnerNoteInputs({});
                        } }
                     />
                     <Button
                        text='Save'
                        onClick={ () => {
                           handleUpdateNote();
                        } }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         <div className='note__item'>
            <CheckBox
               checked={ isChecked }
               onChange={ () => onCheck() }
            />
            <div className='note__item__right'>
               <div className='note__item__right__top'>
                  <Text
                     inner={ title }
                     type={ types.medium150 }
                     size={ sizes.medium }
                     style={ { color: 'var(--buttonBgcolor)' } }
                  />
                  <Text
                     inner={ moment(createdAt).format('D MMMM LT') }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               <Text
                  inner={ description }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div className='note__item__right__bottom'>
                  <Text
                     inner='Remove'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     onClick={ () => setIsOpenDeleteModal(true) }
                     style={ { color: '#24554E', cursor: 'pointer' } }
                  />
                  <Text
                     inner='Edit'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     onClick={ () => handleOpenEditModal() }
                     style={ { color: '#24554E', cursor: 'pointer' } }
                  />
               </div>
            </div>
         </div>
      </>
   );
};

NoteItem.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   createdAt: PropTypes.string,
   onDelete: PropTypes.func,
   isChecked: PropTypes.bool,
   updateNoteQuery: PropTypes.func,
   onCheck: PropTypes.func,
   onEdit: PropTypes.func,
   id: PropTypes.number,
   updateLoading: PropTypes.bool,
};

export default NoteItem;
