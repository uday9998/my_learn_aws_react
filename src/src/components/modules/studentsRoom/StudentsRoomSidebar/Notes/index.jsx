/* eslint-disable array-callback-return */
import React from 'react';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Switch from 'components/elements/form/SwitchNew';
import Proptypes from 'prop-types';
import TextArea from 'components/elements/form/CustomTextArea';
import emptyNote from 'assets/images/schoolRoom/note.png';
import DropTriggle from 'components/elements/newDropTriggle';
import Input from 'components/elements/inputNew';
import SortButton from 'components/elements/buttons/SortButton';
import moment from 'moment';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import './index.scss';

const Notes = ({
   notes, setNotes, addNote, showAll, setShowAll,
   lessonNotes, lessonAllNotes, lesson, searchValue, setSearchValue,
   onFilter, sortingValue, handleDeleteLessonNoteFunc, noteLoading,
}) => {
   let currentLessonNotes = lessonNotes;
   if (showAll) {
      currentLessonNotes = lessonAllNotes;
   }

   const options = {
      newest: 'Newest',
      oldest: 'Oldest',
   };

   return (
      <div className='lessonNotes'>
         {!!noteLoading && <LoaderSpinner width={ 150 } heigth={ 150 } background='transparent' />}
         <div className='notesHeader'>
            <div>
               <Text
                  inner='Notes'
                  type={ TextType.medium }
                  size={ TextSize.xxlarge }
               />
            </div>
            <div className='notesHeader__switch'>
               <Switch
                  label='Show All Notes'
                  checked={ !!showAll }
                  name='showAll'
                  onChange={ () => {
                     setShowAll(!showAll);
                  } }
               />
            </div>
         </div>
         {!!showAll && (
            <div className='note__filters'>
               <div>
                  <Input
                     value={ searchValue }
                     // onKeyPress={ searchOnEnter }
                     onClearSearchValue={ () => setSearchValue('') }
                     type='search'
                     placeholder='Search'
                     onChange={ (name, value) => setSearchValue(value) }
                  />
               </div>
               <div>
                  <SortButton onFilter={ onFilter } value={ sortingValue } options={ options } sortBy={ false } filterType='' />
               </div>
            </div>
         )}
         {currentLessonNotes && !!currentLessonNotes.length && currentLessonNotes.map((note, i) => {
            return (
               <div className='lessonNotes__single' key={ note.id }>
                  <div>
                     <div>
                        <Text
                           inner={ note.title }
                           type={ TextType.medium150 }
                           size={ TextSize.medium }
                        />
                     </div>
                     <div className='lessonNotes__single__date'>
                        <div>
                           <Text
                              inner={ moment(note.created_at).format('DD MMM YYYY') }
                              type={ TextType.regularDefaultGrey }
                              size={ TextSize.small }
                           />
                        </div>
                        <DropTriggle
                           className='noteTriggle'
                           options={ [
                              {
                                 trash: true,
                                 iconName: 'TrashSettingsM',
                                 name: 'Delete',
                                 onClick: () => { handleDeleteLessonNoteFunc(i, note.id); },
                              },
                           ] }
                        />
                     </div>

                  </div>
                  <div>
                     <Text
                        inner={ !showAll ? `#${ lesson && lesson.name && lesson.name.replace(' ', '_') }` : `#${ note.lesson.name.replace(' ', '_') }` }
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        style={ { color: 'var(--buttonBgcolor)' } }
                     />
                  </div>
                  <div>
                     <Text
                        inner={ note.description }
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                     />
                  </div>
               </div>
            );
         })}

         {!(currentLessonNotes && !!currentLessonNotes.length) && (
            <div className='lessonNotes__empty'>
               <div>
                  <img src={ emptyNote } alt='note' />
               </div>
               <div>
                  <Text
                     inner='Currently, there are no notes.'
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     // style={ { color: 'rgba(114, 121, 120, 1)' } }
                  />
               </div>
            </div>
         )}
         {!showAll && (
            <div className='notesContent'>
               <div className='notesContent__title'>
                  <TextArea
                     title={ notes.title }
                     placeholder='Title'
                     name='title'
                     //  withIcon={ true }
                     // iconName='Generator'
                     // setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                     // IToolTipTextNew='AI Generator'
                     onInputChange={ (name, value) => setNotes({ ...notes, [name]: value }) }
                  />
               </div>
               <div>
                  <Text
                     inner={ `#${ lesson && lesson.name && lesson.name.replace(' ', '_') }` }
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     style={ { color: 'var(--buttonBgcolor)' } }
                  />
               </div>
               <div className='notesContent__desc'>
                  <TextArea
                     title={ notes.description }
                     placeholder='Add your note here'
                     name='description'
                     // withIcon={ true }
                     // iconName='Generator'
                     // setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                     // IToolTipTextNew='AI Generator'
                     onInputChange={ (name, value) => setNotes({ ...notes, [name]: value }) }
                  />
               </div>
               <div className='add__note__btn'>
                  <BaseButton
                     size={ btnSize.medium }
                     theme={ btnTheme.purple }
                     text='Add Note'
                     onClick={ () => addNote(notes) }
                     disabled={ !notes.title.trim() }
                     className='add__note'
                     style={ { backgroundColor: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)' } }
                  />
               </div>
            </div>
         )}
      </div>

   );
};

Notes.propTypes = {
   notes: Proptypes.object,
   setNotes: Proptypes.func,
   addNote: Proptypes.func,
   showAll: Proptypes.bool,
   setShowAll: Proptypes.func,
   lesson: Proptypes.object,
   lessonNotes: Proptypes.array,
   lessonAllNotes: Proptypes.array,
   searchValue: Proptypes.string,
   setSearchValue: Proptypes.func,
   onFilter: Proptypes.func,
   sortingValue: Proptypes.string,
   handleDeleteLessonNoteFunc: Proptypes.func,
   noteLoading: Proptypes.bool,
};

Notes.defaultProps = {

};

export default Notes;
