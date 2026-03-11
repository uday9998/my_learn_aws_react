import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import { sortableElement, sortableContainer, sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => (
   <Icon name='Dragdrop' />
));

function Item({
   id, name, active, onItemToggle, handleUpdate, handleDelete, useDragHandle,
}) {
   return (
      <li>
         <div role='presentation' onClick={ (evt) => onItemToggle(evt, id) } className={ `item ${ active ? 'active-item' : '' }` }>
            <div className='flex'>
               {useDragHandle && (<DragHandle />)}
               <Text
                  type={ TextType.medium }
                  size={ TextSize.small }
                  inner={ name }
               />
            </div>
            <span className='actions'>
               <button type='button' onClick={ (evt) => handleUpdate(evt, { name, id }) }>
                  <Icon name='Pencil' />
               </button>
               <button type='button' onClick={ (evt) => handleDelete(evt, id) }>
                  <Icon name='Delete' />
               </button>
            </span>
         </div>
      </li>
   );
}

Item.propTypes = {
   id: PropTypes.number,
   name: PropTypes.string,
   active: PropTypes.bool,
   onItemToggle: PropTypes.func,
   handleDelete: PropTypes.func,
   handleUpdate: PropTypes.func,
   useDragHandle: PropTypes.bool,
};

const SortableItem = sortableElement((props) => <Item { ...props } />);
const SortableContainer = sortableContainer(({ children }) => {
   return (
      children
   );
});


function ItemsList({
   items, onItemToggle, handleUpdate, handleDelete, onSortEnd,
   hideReordering,
}) {
   const [containerEl, setContainerEl] = useState(null);
   return (
      <>
         {typeof onSortEnd === 'function' && !hideReordering ? (
            <SortableContainer onSortEnd={ onSortEnd } helperContainer={ containerEl } useDragHandle>
               <ul className='items-list' ref={ node => setContainerEl(node) }>

                  {items.map(({ id, name, active }, index) => {
                     return (
                        <SortableItem
                           id={ id }
                           key={ id }
                           index={ index }
                           name={ name }
                           active={ active }
                           onItemToggle={ onItemToggle }
                           handleDelete={ handleDelete }
                           handleUpdate={ handleUpdate }
                           useDragHandle
                        />
                     );
                  })}
               </ul>

            </SortableContainer>
         ) : (
            <ul className='items-list'>
               {items.map(({ id, name, active }) => {
                  return (
                     <Item
                        id={ id }
                        key={ id }
                        name={ name }
                        active={ active }
                        onItemToggle={ onItemToggle }
                        handleDelete={ handleDelete }
                        handleUpdate={ handleUpdate }
                     />
                  );
               })}
            </ul>
         )}
      </>
   );
}

ItemsList.propTypes = {
   items: PropTypes.array,
   onItemToggle: PropTypes.func,
   handleUpdate: PropTypes.func,
   handleDelete: PropTypes.func,
   hideReordering: PropTypes.bool,
   onSortEnd: PropTypes.func,
};

export default ItemsList;
