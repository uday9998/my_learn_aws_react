/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from 'react';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Proptypes from 'prop-types';
import TextArea from 'components/elements/form/CustomTextArea';
import IconNew from 'components/elements/iconsSize';
import moment from 'moment';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import './index.scss';

function TextWithSeeMore({ description }) {
   const [isOverflowing, setIsOverflowing] = useState(false);
   const textRef = useRef(null);

   useEffect(() => {
      const element = textRef.current;
      if (element && element.scrollHeight > 47) {
         setIsOverflowing(true);
      } else {
         setIsOverflowing(false);
      }
   }, [description]);

   const handleSeeMoreClick = () => {
      const element = textRef.current;
      element.style.maxHeight = 'none';
      setIsOverflowing(false);
   };

   return (
      <div className='text-container-notes'>
         <div
            ref={ textRef }
            className={ `text-subtitle ${ !isOverflowing ? 'show-full-text' : 'hide-overflow' }` }
         >
            <Text
               inner={ description }
               type={ TextType.regularDefaultGrey }
               size={ TextSize.size_14 }
               style={ { color: 'var(--textColor60)' } }
            />
         </div>
         {isOverflowing && (
            <button
               type='button'
               onClick={ handleSeeMoreClick }
               className='see-more-btn'
            >
               See more
            </button>
         )}
      </div>
   );
}

const Notes = ({
   notes, setNotes, addNote, showAll,
   lessonNotes, lessonAllNotes, lesson,
   handleDeleteLessonNoteFunc, noteLoading,
}) => {
   let currentLessonNotes = lessonNotes;
   if (showAll) {
      currentLessonNotes = lessonAllNotes;
   }

   return (
      <div className='videolessonNotes'>
         {!!noteLoading && <LoaderSpinner width={ 150 } heigth={ 150 } />}
         <div className='notesContent'>
            <div className='notesContent__title'>
               <TextArea
                  title={ notes.title }
                  placeholder='Title'
                  name='title'
                  maxLength={ 190 }
                  onInputChange={ (name, value) => setNotes({ ...notes, [name]: value }) }
               />
               <div className='notesContent__title__lesson'>
                  <Text
                     inner={ `#${ lesson && lesson.name && lesson.name.replace(' ', '_') }` }
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     style={ { color: 'var(--buttonBgcolor)' } }
                  />
               </div>
            </div>

            <div className='notesContent__desc'>
               <TextArea
                  title={ notes.description }
                  placeholder='Add your note here'
                  name='description'
                  onInputChange={ (name, value) => setNotes({ ...notes, [name]: value }) }
               />
            </div>
            <div className='add__note__btn'>
               <BaseButton
                  size={ btnSize.medium }
                  theme={ btnTheme.purple }
                  text='Add Note'
                  onClick={ () => addNote(notes) }
                  disabled={ !notes.title }
                  className='add__note'
                  style={ { backgroundColor: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)' } }
               />
            </div>
         </div>
         {currentLessonNotes && !!currentLessonNotes.length && currentLessonNotes.map((note, i) => {
            return (
               <div className='videolessonNotes__single' key={ note.id }>
                  <div>
                     <div>
                        <div>
                           <Text
                              inner={ note.title }
                              type={ TextType.mediumLarge }
                              size={ TextSize.size_14 }
                           />
                        </div>
                        <div>
                           <Text
                              inner={ moment(note.created_at).format('MMM D / h:mm A') }
                              type={ TextType.regularDefaultGrey }
                              size={ TextSize.xsmall }
                              style={ { color: 'var(--textColor40)' } }
                           />
                        </div>
                     </div>
                     <div className='videolessonNotes__single__date'>
                        <div className='noteTriggle' role='presentation' onClick={ () => handleDeleteLessonNoteFunc(i, note.id) }>
                           <IconNew name='TrashSettingsM' />
                        </div>
                     </div>
                  </div>
                  <TextWithSeeMore key={ note.id } description={ note.description } />
               </div>
            );
         })}
      </div>

   );
};

Notes.propTypes = {
   notes: Proptypes.object,
   setNotes: Proptypes.func,
   addNote: Proptypes.func,
   showAll: Proptypes.bool,
   lesson: Proptypes.object,
   lessonNotes: Proptypes.array,
   lessonAllNotes: Proptypes.array,
   handleDeleteLessonNoteFunc: Proptypes.func,
   noteLoading: Proptypes.bool,
};

Notes.defaultProps = {

};

TextWithSeeMore.propTypes = {
   description: Proptypes.string,
};

export default Notes;
