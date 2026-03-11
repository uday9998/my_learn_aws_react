import React, { useState } from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import Text from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import moment from 'moment';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const SettingNotes = ({
   memberNotes, noteTitle = '', note, handleInternalInputChange, handleCreateNote, handleDeleteNote, handleChooseNote,
   currentNote, handleUpdateNote, handleNoteInputChange, /* noteActionProgress, */
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [deleteNoteModalIsOpen, setDeleteNoteModalIsOpen] = useState(false);
   const [noteId, setNoteId] = useState(0);

   const delNoteModalClick = (id) => {
      setNoteId(id);
      setDeleteNoteModalIsOpen(true);
   };

   const delNoteModalApproveClick = () => {
      handleDeleteNote(noteId);
      setDeleteNoteModalIsOpen(false);
   };
   // const {
   //    // eslint-disable-next-line camelcase
   //    id, updated_at, created_at, user_id, ...inputs
   // } = currentNote;
   return (
      <>
         <DynamicWrapper
            isOpen={ false }
            title='Notes'
            borderColor='#cddaf1'
            setIsOpen={ setIsOpen }
         >

            <div className='settingNotes'>
               <TextInput
                  label='Title'
                  placeholder='Enter title of note'
                  rightLabel={ `${ noteTitle.length }/150` }
                  name='noteTitle'
                  value={ noteTitle }
                  onChange={ (name, value) => {
                     if (value.length < 151) {
                        handleInternalInputChange(name, value);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
                  maxlength='151'
               />
               {/* <TextInput
                  placeholder='Audio Title'
                  label='Lesson Title'
                  rightLabel={ `${ charectersLimit }/150` }
                  id='audioTitle'
                  name='audionTitle'
                  value={ audioTitle }
                  onChange={ (name, value) => {
                     // setAudioTitle(value);
                     // setActiveName(value);
                     // getCharectersLength(value.length);
                  } }
               /> */}
               <div className='m-t-exl m-b-exl'>
                  <TextArea
                     label='Note'
                     placeholder='Enter note description here'
                     name='note'
                     value={ note }
                     onChange={ handleInternalInputChange }
                  />
               </div>
               <div className='settingNotes__button'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Create Note'
                     onClick={ () => handleCreateNote() }
                  />
               </div>
               {/* {

                  !noteActionProgress && memberNotes.length !== 0 && (
                     <div className='settingNotes__notes'>
                        {
                           memberNotes.map(noteElem => (
                              <div className='settingNotes__note' key={ noteElem.id }>
                                 <div className='settingNotes__title'>
                                    <Text
                                       size='extraSmall'
                                       type='bold'
                                       inner={ noteElem.title }
                                    />
                                    <div className='settingNotes__actions'>
                                       <div className='m-r-exs'>
                                          <Icon name='Pencil' />
                                       </div>
                                       <div
                                          role='presentation'
                                          onClick={ () => handleDeleteNote(noteElem.id) }
                                       >
                                          <Icon name='Delete' />
                                       </div>
                                    </div>
                                 </div>
                                 <div className='settingNotes__description'>
                                    <Text
                                       size='extraSmall'
                                       type='regular'
                                       bold
                                       inner={ noteElem.description }
                                    />
                                 </div>
                                 <div className='settingNotes__date m-t-m'>
                                    <Text
                                       size='extraSmall'
                                       type='regular'
                                       bold
                                       inner={ moment(noteElem.updated_at).format('MM/DD/YYYY') }
                                       color='#C2CEDB'
                                    />
                                 </div>
                              </div>
                           ))
                        }
                     </div>
                  )
               } */}
            </div>


         </DynamicWrapper>
         {isOpen && memberNotes.length !== 0 && (
            <ItemWrapper style={ {
               borderColor: '#cddaf1', padding: '23px 40px', backgroundColor: 'rgb(251, 253, 255)', marginTop: '16px',
            } }
            >
               <div className='settingNotes'>
                  {

                     /*! noteActionProgress && */ (
                        <div className='settingNotes__notes'>
                           {
                              memberNotes.map(noteElem => (
                                 <div className='settingNotes__note' key={ noteElem.id }>
                                    {(noteElem.id !== (currentNote && currentNote.id)) ? (
                                       <>
                                          <div className='settingNotes__title'>
                                             <Text
                                                size='extraSmall'
                                                type='bold'
                                                inner={ noteElem.title }
                                             />
                                             <div className='settingNotes__actions'>
                                                <div
                                                   className='m-r-exs'
                                                   role='presentation'
                                                   onClick={ () => handleChooseNote(noteElem.id) }
                                                >
                                                   <Icon name='Pencil' />
                                                </div>
                                                <div
                                                   role='presentation'
                                                   onClick={ () => delNoteModalClick(noteElem.id) }
                                                >
                                                   <Icon name='Delete' />
                                                </div>
                                             </div>
                                          </div>
                                          <div className='settingNotes__description'>
                                             <Text
                                                size='extraSmall'
                                                type='regular'
                                                inner={ noteElem.description }
                                             />
                                          </div>
                                          <div className='settingNotes__date'>
                                             <Text
                                                size='extraSmall'
                                                type='regular'
                                                inner={ moment(noteElem.updated_at).format('MM/DD/YYYY') }
                                                color='#9da8b2'
                                             />
                                          </div>
                                       </>
                                    ) : (
                                       <><TextInput
                                          label='Title'
                                          placeholder='Type here'
                                          name='title'
                                          value={ currentNote.title }
                                          onChange={ handleNoteInputChange }
                                       />
                                          <div className='m-t-exl m-b-exl'>
                                             <TextArea
                                                label='Note'
                                                placeholder='Type here'
                                                name='description'
                                                value={ currentNote.description }
                                                onChange={ handleNoteInputChange }
                                             />
                                          </div>
                                          <div className='settingNotes__button'>
                                             <BaseButton
                                                theme={ btnTheme.grey }
                                                size={ btnSize.large }
                                                text='Cancel'
                                                onClick={ () => handleChooseNote(0) }
                                             />
                                             <BaseButton
                                                theme={ btnTheme.darkGreen }
                                                size={ btnSize.large }
                                                text='Update Note'
                                                onClick={ () => handleUpdateNote(currentNote.id, currentNote.user_id,
                                                   { title: currentNote.title, description: currentNote.description }) }
                                             />
                                          </div>
                                       </>
                                    ) }
                                 </div>
                              ))
                           }
                        </div>
                     )
                  }
               </div>
               {/* {currentNote && (
                  <div className='settingNotes'>
                     <TextInput
                        label='Title'
                        placeholder='Type here'
                        name='title'
                        value={ currentNote.title }
                        onChange={ handleNoteInputChange }
                     />
                     <div className='m-t-exl m-b-exl'>
                        <TextArea
                           label='Note'
                           placeholder='Type here'
                           name='description'
                           value={ currentNote.description }
                           onChange={ handleNoteInputChange }
                        />
                     </div>
                     <div className='settingNotes__button'>
                        <BaseButton
                           theme={ btnTheme.grey }
                           size={ btnSize.large }
                           text='Cancel'
                           onClick={ () => handleChooseNote(0) }
                        />
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           text='Update Note'
                           onClick={ () => handleUpdateNote(currentNote.id, currentNote.user_id,
                              { title: currentNote.title, description: currentNote.description }) }
                        />
                     </div>
                  </div>
               ) } */}

               {
                  deleteNoteModalIsOpen && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                        onClose={ () => setDeleteNoteModalIsOpen(false) }
                     >
                        <div>
                           <DeleteModalContent
                              onCancel={ () => setDeleteNoteModalIsOpen(false) }
                              onApprove={ () => delNoteModalApproveClick() }
                              title='Delete Note'
                              content='Are you sure you want to delete this note?'
                           />
                        </div>
                     </Modal>
                  )
               }
            </ItemWrapper>
         )}
      </>
   );
};

SettingNotes.propTypes = {
   memberNotes: PropTypes.array,
   handleInternalInputChange: PropTypes.func,
   handleCreateNote: PropTypes.func,
   handleDeleteNote: PropTypes.func,
   noteTitle: PropTypes.string,
   note: PropTypes.string,
   handleChooseNote: PropTypes.func,
   currentNote: PropTypes.object,
   handleUpdateNote: PropTypes.func,
   handleNoteInputChange: PropTypes.func,
   // noteActionProgress: PropTypes.bool,
};

export default SettingNotes;
