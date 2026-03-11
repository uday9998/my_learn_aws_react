import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WritableSelect from 'components/elements/form/WritableSelect';
import Tooltip from 'components/elements/members/Tooltip';
import AddNewItemModal from './modals/addNewItemModal';
import './index.scss';
import AddButton from './AddButton';

function CategoriesEngine(props) {
   const {
      attachedValues, onCreate, options, onAttach, onDetach, className, onUpdate, onRemove,
      selectProps, resource, onItemToggle, onSortEnd, modalTitle, tooltipText, tooltipTag,
      isMemberTags, disableReorder,
   } = props;
   const [modalOpen, setModalOpen] = useState(false);
   return (
      <>
         <div className={ ` category-tag-engine categories flex ${ className }` }>
            <WritableSelect
               label='Categories'
               tooltip={ true }
               tooltipText={ tooltipText }
               tooltipTag={ tooltipTag }
               isMemberTags={ isMemberTags }
               values={ attachedValues }
               options={ options }
               onCreate={ value => onCreate(value.value) }
               onSelect={ value => onAttach(value, true) }
               className='flex-1'
               onDelete={ (id) => onDetach(id, false) }
               { ...selectProps }
            />
            <AddButton
               onClick={ () => {
                  setModalOpen(true);
               } }
            />
            <Tooltip
               hintText={ tooltipTag ? 'Tags Manager' : 'Categories Manager' }
               style={ {
                  top: '38px',
                  marginLeft: '0',
               } }
               hintStyle={ { bottom: 'auto', top: '-27px', width: '151px' } }
               left={ true }
            />
         </div>
         { modalOpen && (
            <AddNewItemModal
               title={ modalTitle }
               open={ modalOpen }
               options={ options }
               onClose={ () => setModalOpen(false) }
               onCreate={ name => onCreate(name) }
               onUpdate={ onUpdate }
               onRemove={ onRemove }
               resource={ resource }
               onItemToggle={ onItemToggle }
               onSortEnd={ onSortEnd }
               disableReorder={ disableReorder }
            />
         )}
      </>
   );
}

CategoriesEngine.propTypes = {
   attachedValues: PropTypes.array,
   options: PropTypes.array,
   onCreate: PropTypes.func,
   onUpdate: PropTypes.func,
   onRemove: PropTypes.func,
   onAttach: PropTypes.func,
   onDetach: PropTypes.func,
   className: PropTypes.string,
   disableReorder: PropTypes.bool,
   resource: PropTypes.string,
   selectProps: PropTypes.object,
   onItemToggle: PropTypes.func,
   onSortEnd: PropTypes.func,
   modalTitle: PropTypes.string,
   tooltipText: PropTypes.string,
   tooltipTag: PropTypes.bool,
   isMemberTags: PropTypes.bool,
};

export default CategoriesEngine;
