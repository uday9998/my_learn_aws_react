import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import DropTriggle from 'components/elements/newDropTriggle';
import './index.scss';
import { sortBy, uniqueId } from 'lodash';
import ModalNew from 'components/elements/ModalNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import PollDrangAndDrop from 'components/modules/PostEditor/PostEditorComponents/PollDranAndDrop';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import DeleteModal from 'components/elements/DeleteModal';

const CommunityPoll = ({
   poll, onRemove, onChange, isView, isActive, onClick,
}) => {
   const textAreaRef = useRef(null);
   const textAreaRefSubtitle = useRef(null);
   const [isOpenDelete, setIsOpenDelete] = useState(false);
   const [isOpenEdit, setIsOpenEdit] = useState(false);
   const [inputs, setInputs] = useState({
      ...poll,
   });
   const ids = useRef(2);
   const allVotesCount = useRef(0);
   if (isView) {
      allVotesCount.current = poll.options.reduce((prev, next) => prev + next.count, 0);
   }
   const handleInputChange = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   const handleAddOption = () => {
      if (inputs.options.length < 8) {
         setInputs({
            ...inputs,
            options: [
               ...inputs.options,
               { id: `${ ids.current }`, name: '' },
            ],
         });
         ids.current += 1;
      } else if (isPrint('Maximum options length is 8.')) {
         toast.error('Maximum options length is 8.');
      }
   };

   const handleDragChange = (newOptions) => {
      setInputs({
         ...inputs,
         options: newOptions,
      });
   };
   const onSumbit = () => {
      onChange(inputs);
   };

   const handleRemoveOption = (id) => {
      const newOptions = inputs.options.filter((op) => Number.parseFloat(op.id) !== id);
      setInputs({
         ...inputs,
         options: newOptions,
      });
      ids.current -= 1;
   };

   const onRename = (id, name) => {
      const newOptions = inputs.options.map((op) => {
         if (Number.parseFloat(op.id) === id) {
            return {
               ...op,
               name,
            };
         }
         return op;
      });
      setInputs({
         ...inputs,
         options: newOptions,
      });
   };

   const isTheHighestScore = (score) => {
      const scores = sortBy(poll.options.map((e) => e.count));
      return score === scores.at(-1);
   };

   const getPrsentage = (number) => {
      const all = allVotesCount.current / 100;
      return Math.round(number / all);
   };

   const onClickActive = (id) => {
      if (id !== poll.voted_options.poll_option_id) {
         onClick(id);
      }
   };

   return (
      <div className='community__poll'>
         {isOpenDelete && (
            <div className='m-popup'>
               <DeleteModal
                  onDelete={ () => {
                     onRemove();
                  } }
                  onCancel={ () => setIsOpenDelete(false) }
                  deleteText='Delete'
                  title='Are you sure you want to delete?'
               />
            </div>
         )}
         {isOpenEdit && (
            <ModalNew
               onCloseModal={ () => setIsOpenEdit(false) }
            >
               <div className='post__editor__poll'>
                  <Text
                     inner='Edit Poll'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <div className='post__editor__poll__editor'>
                     <textarea
                        ref={ textAreaRef }
                        value={ inputs.title || '' }
                        name='title'
                        className='post__editor__poll__editor__title'
                        placeholder='Ask a question'
                        onChange={ (e) => {
                           handleInputChange('title', e.target.value);
                        } }
                     />
                     {inputs.subTitle === undefined ? (
                        <TextWithIcon
                           iconName='plusSectionProgramM'
                           inner='Add Subtitle'
                           type={ types.regularDefaultSmallX }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                           onClick={ () => handleInputChange('subTitle', '') }
                           generalStyles={ { cursor: 'pointer', maxWidth: 'max-content' } }
                        />
                     ) : (
                        <textarea
                           ref={ textAreaRefSubtitle }
                           value={ inputs.subTitle || '' }
                           name='subTitle'
                           className='post__editor__poll__editor__subtitle'
                           placeholder='Write subtitle'
                           onChange={ (e) => {
                              handleInputChange('subTitle', e.target.value);
                           } }
                        />
                     )}
                  </div>
                  <PollDrangAndDrop
                     handleRemoveOption={
                        handleRemoveOption
                     }
                     onRename={ onRename }
                     setOptions={ handleDragChange }
                     options={ inputs.options }
                  />
                  <TextWithIcon
                     iconName='plusSectionProgramM'
                     inner='Add Choice'
                     type={ types.regularDefaultSmallX }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                     onClick={ () => handleAddOption() }
                     generalStyles={ { cursor: 'pointer', maxWidth: 'max-content', marginTop: '5px' } }
                  />
                  <div className='post__editor__poll__editor__button'>
                     <Button
                        onClick={ () => onSumbit() }
                        text='Save'
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         <div className='community__poll__top'>
            <Text
               inner={ poll.title }
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            {!isView && (
               <DropTriggle
                  activeStyles={ { boxShadow: '0px 0px 4px #54938B', background: '#E8F2F1', border: '1px solid #36796F' } }
                  options={ [
                     {
                        trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => setIsOpenEdit(true),
                     },
                     {
                        trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => setIsOpenDelete(true),
                     },
                  ] }
               />
            ) }
         </div>
         {poll.subTitle && (
            <Text
               inner={ poll.subTitle }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         )}
         <div className='community__poll__options'>
            {isActive && isView ? (
               <>
                  {poll.options.map((e) => {
                     return (
                        <div
                           key={ uniqueId() }
                           role='presentation'
                           onClick={ () => onClickActive(e.id) }
                           className='community__poll__option__answered'
                        >
                           <Text
                              inner={ e.name }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                           <div
                              className='community__poll__option__answered__background'
                              style={ {
                                 width: `${ getPrsentage(e.count) }%`,
                                 background: isTheHighestScore(e.count) ? '#36796F' : '#F0F2F2',
                              } }
                           />
                           <Text
                              inner={ `${ getPrsentage(e.count) }%` }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                        </div>
                     );
                  })}
               </>
            ) : (
               <>
                  {poll.options.map((e) => {
                     return (
                        <div
                           key={ uniqueId() }
                           role='presentation'
                           onClick={ () => onClick(e.id) }
                           className='community__poll__option'
                        >
                           <Text
                              inner={ e.name }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />

                        </div>
                     );
                  })}
               </>
            )}
            {isActive && isView && (
            <>
               <div className='community__poll__option__votes'>
                  <Text
                     inner={ `${ allVotesCount.current } votes` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
                  <Text
                     inner='Undo Vote'
                     onClick={ () => onClick(poll.voted_options.poll_option_id) }
                     type={ types.regularMin }
                     size={ sizes.small }
                     style={ { color: '#24554E', cursor: 'pointer' } }
                  />
               </div>
            </>
            )}
         </div>
      </div>
   );
};

CommunityPoll.propTypes = {
   poll: PropTypes.object,
   onChange: PropTypes.func,
   onRemove: PropTypes.func,
   onClick: PropTypes.func,
   isView: PropTypes.bool,
   isActive: PropTypes.bool,
};

export default CommunityPoll;
