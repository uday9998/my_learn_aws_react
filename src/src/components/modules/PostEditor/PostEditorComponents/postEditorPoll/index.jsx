import React, { useState, useRef } from 'react';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import useAutosizeTextArea from 'utils/useAutosizeTextArea';
import Button from 'components/elements/buttons/BaseButtonNew';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import PollDrangAndDrop from '../PollDranAndDrop';


const PostEditorPoll = ({ handleAddPoll }) => {
   const [data, setData] = useState({
      question: '',
      subtitle: undefined,
      options: [{ id: '1', name: null }],
   });
   const ids = useRef(2);
   const textAreaRef = useRef(null);
   const textAreaRefSubtitle = useRef(null);
   useAutosizeTextArea(textAreaRef.current, data.question);
   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };

   const handleAddOption = () => {
      if (data.options.length < 8) {
         setData({
            ...data,
            options: [
               ...data.options,
               { id: `${ ids.current }`, name: '' },
            ],
         });
         ids.current += 1;
      } else if (isPrint('Maximum options count is 8.')) {
         toast.error('Maximum options count is 8.');
      }
   };

   const handleDragChange = (newOptions) => {
      setData({
         ...data,
         options: newOptions,
      });
   };
   const onSumbit = () => {
      let isOptionError = false;
      if (!data.question) {
         if (isPrint('Question is required field.')) {
            toast.error('Question is required field.');
         }
         return;
      }
      data.options.forEach(element => {
         if (!element.name) {
            isOptionError = true;
         }
      });
      if (isOptionError) {
         if (isPrint('Option name is required field.')) {
            toast.error('Option name is required field.');
         }
         return;
      }
      handleAddPoll(data.question, data.subtitle, data.options);
   };

   const handleRemoveOption = (id) => {
      const newOptions = data.options.filter((op) => Number.parseFloat(op.id) !== id);
      setData({
         ...data,
         options: newOptions,
      });
      ids.current -= 1;
   };

   const onRename = (id, name) => {
      const newOptions = data.options.map((op) => {
         if (Number.parseFloat(op.id) === id) {
            return {
               ...op,
               name,
            };
         }
         return op;
      });
      setData({
         ...data,
         options: newOptions,
      });
   };

   return (
      <div className='post__editor__poll'>
         <Text
            inner='Add Poll'
            type={ types.medium160 }
            size={ sizes.xlarge }
         />
         <div className='post__editor__poll__editor'>
            <textarea
               ref={ textAreaRef }
               value={ data.question || '' }
               name='question'
               className='post__editor__poll__editor__title'
               placeholder='Ask a question'
               onChange={ (e) => {
                  handleInputChange('question', e.target.value);
               } }
            />
            {data.subtitle === undefined ? (
               <TextWithIcon
                  iconName='plusSectionProgramM'
                  inner='Add Subtitle'
                  type={ types.regularDefaultSmallX }
                  size={ sizes.small }
                  style={ { color: '#24554E' } }
                  onClick={ () => handleInputChange('subtitle', '') }
                  generalStyles={ { cursor: 'pointer', maxWidth: 'max-content' } }
               />
            ) : (
               <textarea
                  ref={ textAreaRefSubtitle }
                  value={ data.subtitle || '' }
                  name='subtitle'
                  className='post__editor__poll__editor__subtitle'
                  placeholder='Write subtitle'
                  onChange={ (e) => {
                     handleInputChange('subtitle', e.target.value);
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
            options={ data.options }
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
               text='Add Poll'
            />
         </div>
      </div>
   );
};

PostEditorPoll.propTypes = {
   handleAddPoll: PropTypes.func,
};

export default PostEditorPoll;
