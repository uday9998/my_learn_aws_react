import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import moment from 'moment';
import Icon from 'components/elements/Icon';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import noNotes from 'assets/images/schoolRoom/empty_state_product.png'; 

const Note = ({ note, onEdit, onDelete }) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   return (
      <div className='note'>
         <div className='note__left'>
            <Text
               inner={ note.title }
               size={ txtSizes.medium }
               type={ txtTypes.regular148 }
            />
            <Text
               inner={ note.description }
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
         </div>
         <div className='note__right'>
            <Text
               inner={ moment(note.created_at).format('D MMM YYYY') }
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
               className='right-top-border'
            />
            <div className='class__course__right__triangle'>
               <div className='class__course__right__triangle__icon' role='presentation' onClick={ () => setIsOpenTriangle(true) }>
                  <Icon name='Triangle' />
               </div>
               {isOpenTriangle && (
                  <div className='showPopup__content'>
                     <ClickOutside onClick={ () => setIsOpenTriangle(false) }>
                        <div
                           className='popup__status'
                           role='presentation'
                           onClick={ () => {
                              onEdit(note);
                              setIsOpenTriangle(false);
                           } }
                        >
                           <Icon name='EditNew' />
                           <Text inner='Edit' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                        </div>
                        <div className='popup__delete popup__status' role='presentation' onClick={ () => onDelete(note.id) }>
                           <Icon name='TrashMember' />
                           <Text inner='Delete' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                        </div>
                     </ClickOutside>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const NotesFlex = ({ notes = [], onEdit, onDelete }) => {
   return (
      <div className='notes__flex'>
         <div className='notes__flex__title'>
            <Text
               inner='Notes'
               type={ txtTypes.regularDefault }
               size={ txtSizes.large }
            />
         </div>
         <div className='notes__flex__wrapper'>
            {notes.length ? notes.map((note) => {
               return (
                  <Note note={ note } key={ uniqueId() } onEdit={ onEdit } onDelete={ onDelete } />
               );
            }) : (
               <div className='notes__empty__text notes_empty_wrapper'>
                  <img src={ noNotes } alt='noNotes' />
                  <Text
                     inner='There are no tags yet.'
                     style={ { color: 'rgba(19, 31, 30, 1)' } }
                     type={ txtTypes.regular148 }
                     size={ txtSizes.small14 }
                  />
               </div>
            )}
         </div>
      </div>
   );
};

NotesFlex.propTypes = {
   notes: PropTypes.array,
   onEdit: PropTypes.func,
   onDelete: PropTypes.func,
};

Note.propTypes = {
   note: PropTypes.object,
   onEdit: PropTypes.func,
   onDelete: PropTypes.func,
};

export default NotesFlex;
