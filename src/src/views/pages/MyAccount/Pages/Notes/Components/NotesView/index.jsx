import React from 'react';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { deleteNoteFront, myAccountNotes, updateNoteFront } from 'api';
import PropTypes from 'prop-types';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import { toast } from 'react-toastify';
import NoteItem from '../NotesItem';

const MyAccountNotesView = ({ data, setData }) => {
   const [search, setSearch] = React.useState('');
   const [filter] = useSubmitForm(myAccountNotes);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
   const [selectedNotesIds, setSelectedNotesIds] = React.useState([]);
   const [deleteNoteQuery] = useSubmitForm(deleteNoteFront);
   const [updateNoteQuery, { loading: noteUpdateLoading }] = useSubmitForm(updateNoteFront);

   React.useEffect(() => {
      filter([`search=${ search }`], (e) => {
         setSelectedNotesIds([]);
         setData(e);
      });
   }, [search]);

   const handleChackAll = () => {
      if (selectedNotesIds.length === data.page_data.length) {
         setSelectedNotesIds([]);
         return;
      }
      setSelectedNotesIds(data.page_data.map((e) => e.id));
   };

   const handleChackItem = (id) => {
      if (selectedNotesIds.includes(id)) {
         setSelectedNotesIds(selectedNotesIds.filter((e) => e !== id));
         return;
      }
      setSelectedNotesIds([...selectedNotesIds, id]);
   };

   const handleBulkDelete = () => {
      deleteNoteQuery(selectedNotesIds, () => {
         setData({
            ...data,
            page_data: data.page_data.filter((e) => !selectedNotesIds.includes(e.id)),
         });
         toast.success('Notes deleted successfuly.');
      });
      setIsOpenDeleteModal(false);
      setSelectedNotesIds([]);
   };

   const deleteNote = (id) => {
      deleteNoteQuery([id], () => {
         setData({
            ...data,
            page_data: data.page_data.filter((e) => e.id !== id),
         });
         toast.success('Note deleted successfuly.');
      });
      if (selectedNotesIds.includes(id)) {
         setSelectedNotesIds(selectedNotesIds.filter((e) => e !== id));
      }
   };

   const handleUpdateNotesList = (id, inputs) => {
      setData({
         ...data,
         page_data: data.page_data.map((e) => {
            if (e.id === id) {
               return {
                  ...e,
                  ...inputs,
               };
            }
            return e;
         }),
      });
   };

   return (
      <>
         {isOpenDeleteModal && (
            <DeleteModal
               deleteText='Delete'
               title='Are you sure you want to delete selected items ?'
               onDelete={ () => handleBulkDelete() }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <div className='notes__view'>
            <Input
               type='search'
               value={ search }
               placeholder='Search'
               onChange={ (n, value) => setSearch(value) }
            />
            <Line />
            <div className='notes__view__top'>
               <div className='notes__view__checkbox'>
                  <CheckBox
                     checked={ selectedNotesIds.length > 0 }
                     onChange={ () => handleChackAll() }
                  />
                  <div>
                     <Text
                        inner='Select all '
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ `(${ data.page_data.length })` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
               </div>
               {selectedNotesIds.length > 0 && (
                  <IconButton
                     name='DeleteCommentM'
                     onClick={ () => setIsOpenDeleteModal(true) }
                  />
               )}
            </div>
            <Line />
            <div className='notes__view__data'>
               {data.page_data.map((e) => {
                  return (
                     <NoteItem
                        title={ e.title }
                        createdAt={ e.created_at }
                        key={ e.id }
                        updateNoteQuery={ updateNoteQuery }
                        onDelete={ () => deleteNote(e.id) }
                        isChecked={ selectedNotesIds.includes(e.id) }
                        updateLoading={ noteUpdateLoading }
                        id={ e.id }
                        onCheck={ () => handleChackItem(e.id) }
                        onEdit={ handleUpdateNotesList }
                        description={ e.description }
                     />
                  );
               })}
               {data.page_data.length === 0 && (
                  <Text
                     inner='No results'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978', margin: '0px auto', paddingBottom: '40px' } }
                  />
               )}
            </div>
         </div>
      </>
   );
};

MyAccountNotesView.propTypes = {
   data: PropTypes.object,
   setData: PropTypes.func,
};

export default MyAccountNotesView;
