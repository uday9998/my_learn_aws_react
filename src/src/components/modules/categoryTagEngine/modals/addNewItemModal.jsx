import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

import TextInput from 'components/elements/form/TextInput';
import MaterialModal from 'components/elements/MaterialModal';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import EditNameModal from './editNameModal';

import './index.scss';
import DeleteDialog from './deleteDialog';
import ItemsList from '../ItemLists';


const AddItemModal = ({
   onClose, title, options, open, onCreate, onRemove, onUpdate,
   resource, onItemToggle, onSortEnd, disableReorder,
}) => {
   const [addingItem, setAddingItem] = useState({});
   const [editingItem, setEditingItem] = useState({});
   const [search, setSearch] = useState('');
   const [deleteingItemId, setDeleteingItemId] = useState(null);
   const [filteredOptions, setFilteredOptions] = useState([]);
   useEffect(() => {
      const filtered = options.filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      setFilteredOptions(filtered);
   }, [search, options]);

   function handleDelete(evt, id) {
      evt.stopPropagation();
      setDeleteingItemId(id);
   }
   function handleUpdate(evt, data) {
      evt.stopPropagation();
      setEditingItem(data);
   }
   return (
      <>
         <MaterialModal onClose={ onClose } open={ open }>

            <div className='addItemModal'>
               <div className='addItemModal__header'>
                  <Text
                     type={ TextType.demiBold }
                     size={ TextSize.large }
                     inner={ title }
                  />
                  <div
                     className='addItemModal__close'
                     role='presentation'
                     onClick={ onClose }
                  >
                     <Icon name='CloseXNew' />
                  </div>
                  <div className='m-t-m'>
                     <TextInput
                        name='search'
                        value={ search }
                        placeholder='Find By Name'
                        onChange={ (name, value) => {
                           if (value.length <= 150) {
                              setSearch(value);
                           } else if (isPrint('You are reached character limit')) {
                              toast.error('You are reached character limit');
                           }
                        } }
                        rightLabel={ `${search ? search.length : 0}/150` }
                     />
                  </div>
                  <ItemsList
                     items={ filteredOptions }
                     handleDelete={ handleDelete }
                     onSortEnd={ onSortEnd }
                     handleUpdate={ handleUpdate }
                     onItemToggle={ onItemToggle }
                     hideReordering={ !!search || disableReorder }
                  />
                  {search && filteredOptions.length === 0 && (
                     <div className='m-b-m'>
                        <Text
                           type={ TextType.medium }
                           size={ TextSize.small }
                           inner='No Results Found'
                        />
                     </div>
                  )}

               </div>
               <BaseButton
                  size={ btnSize.large }
                  text='Add new'
                  onClick={ () => {
                     setSearch('');
                     setAddingItem({ open: true });
                  } }
               />

            </div>
         </MaterialModal>
         <EditNameModal
            title={ `Edit ${resource}` }
            open={ !!editingItem.id }
            item={ editingItem }
            onChange={ (key, value) => setEditingItem({ ...editingItem, [key]: value }) }
            onClose={ () => setEditingItem({}) }
            onConfirm={ () => onUpdate(editingItem) }
            placeholder={ `Edit ${resource}` }
         />
         <EditNameModal
            title={ `Create ${resource}` }
            open={ !!addingItem.open }
            item={ addingItem }
            onChange={ (key, value) => setAddingItem({ ...addingItem, [key]: value }) }
            onClose={ () => setAddingItem({ open: false }) }
            onConfirm={ () => onCreate(addingItem.name) }
            placeholder={ `Create ${resource}` }
         />
         <DeleteDialog
            title='Are you sure you want to delete this category?'
            open={ !!deleteingItemId }
            onClose={ () => setDeleteingItemId(null) }
            onConfirm={ () => onRemove(deleteingItemId) }
         />

      </>
   );
};

AddItemModal.propTypes = {
   onClose: PropTypes.func,
   onCreate: PropTypes.func,
   onRemove: PropTypes.func,
   onUpdate: PropTypes.func,
   onItemToggle: PropTypes.func,
   onSortEnd: PropTypes.func,
   title: PropTypes.string,
   resource: PropTypes.string,
   options: PropTypes.array,
   open: PropTypes.bool,
   disableReorder: PropTypes.bool,
};

AddItemModal.defaultProps = {
};

export default AddItemModal;
