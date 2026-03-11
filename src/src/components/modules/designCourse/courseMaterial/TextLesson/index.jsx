import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
// import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import EditorConvertToHTML from 'components/modules/editor';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const TextLesson = ({
   title, description, handleSave, setActiveName,
}) => {
   const [textTitle, setTextTitle] = useState(title);
   const [textDescription, setTextDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(10);
   const [isCancel, setIsCancel] = useState(false);

   const getCharectersLength = (l) => setCharectersLimit(l);

   const inputRef = useRef(null);
   useEffect(() => {
      setTextTitle(title);
      setActiveName(title);
      setTextDescription(description);
   }, [title, description]);

   const onClick = () => {
      if (inputRef && inputRef.current) {
         setTextDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = textDescription;
      }
      if (textDescription) {
         handleSave({
            type: 'text',
            text_title: textTitle,
            text_description: textDescription,
         });
      } else if (!textDescription) {
         handleSave({
            name: textTitle || 'Lesson Title',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };


   return (
      <ItemWrapper>
         <div className='textLesson'>
            <div className='textLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ title }
                  style={ { marginBottom: '36px' } }
               />
               <TextInput
                  placeholder='Enter Lesson Title'
                  label='Lesson Title'
                  rightLabel={ `${ charectersLimit }/150` }
                  id='textTitle'
                  name='textTitle'
                  value={ textTitle || '' }
                  onChange={ (name, value) => {
                     if (value.length < 151) {
                        setTextTitle(value);
                        setActiveName(value);
                        getCharectersLength(value.length);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
               />
               <div className='textLesson__content'>
                  <Text
                     size={ textSize.extraSmall }
                     type={ textType.normal }
                     inner='Lesson Content'
                  />
                  <EditorConvertToHTML
                     ref={ inputRef }
                     description={ description }
                     onClick={ () => onClick() }
                     data={ textDescription || '' }
                     isCancel={ isCancel }
                     initial={ description }
                     onChange={ (data) => {
                        setTextDescription(data);
                     } }
                  />
               </div>

            </div>
            <div className='textLesson__buttons'>
               {((((textDescription && textDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !textDescription) && textTitle === title) ? null : (
                  <BaseButton
                     theme={ buttonTheme.grey }
                     size={ buttonSizes.large }
                     text='Cancel'
                     margin
                     onClick={ () => {
                        setTextTitle(title);
                        setIsCancel(!isCancel);
                        setTextDescription(description);
                        onClick();
                     } }
                  />
               )

               }

               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Save'
                  className='save-lesson'
                  onClick={ () => saveLesson() }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

TextLesson.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   handleSave: PropTypes.func,
   setActiveName: PropTypes.func,
};

export default TextLesson;
