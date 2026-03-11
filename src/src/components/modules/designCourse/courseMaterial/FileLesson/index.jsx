import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const FileLesson = ({
   title, src, handleSave, setActiveName,
}) => {
   const [fileTitle, setFileTitle] = useState(title);
   const [fileSrc, setFileSrc] = useState(src);
   const [charectersLimit, setCharectersLimit] = useState(16);
   const getCharectersLength = (l) => setCharectersLimit(l);

   useEffect(() => {
      setFileTitle(title);
      setActiveName(title);
      setFileSrc(src);
   }, [title, src]);

   const saveLesson = () => {
      if (fileSrc) {
         handleSave({
            type: 'multimedia',
            name: fileTitle,
            src: fileSrc,
         });
      } else if (!fileSrc) {
         handleSave({
            name: fileTitle || 'File title',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };


   return (
      <ItemWrapper>
         <div className='fileLesson'>
            <div className='fileLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ fileTitle }
                  style={ { marginBottom: '36px' } }
               />
               <TextInput
                  placeholder='File Title'
                  label='Lesson Title'
                  rightLabel={ `${ charectersLimit }/250` }
                  id='fileTitle'
                  name='fileTitle'
                  value={ fileTitle }
                  onChange={ (name, value) => {
                     if (value.length < 251) {
                        setFileTitle(value);
                        setActiveName(value);
                        getCharectersLength(value.length);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
               />
               <div className='m-t-m'>
                  <Text
                     type={ textType.regular }
                     size={ textSize.small }
                     inner={ [
                        'Please note that the Multimedia lesson type uses an iframe to embed the content into your class, so in order for something to work as a Multimedia lesson it must be ‘’frameable’’.',
                        <br />,
                        'You can also use',
                        <a href='http://www.tinywebgallery.com/blog/advanced-iframe/free-iframe-checker' rel='noopener noreferrer' target='_blank'> <span className='upload__link'> this free tool </span></a>,
                        'to confirm whether or not the content is iframeable.',
                        <br />,
                        'Please use URL with HTTPS protocol, the iframe will not work.',
                     ] }
                     color='#8a94a2'
                     bold
                  />
               </div>
               <div className='m-t-exl'>
                  <TextInput
                     placeholder='ex: https://docs.google.com/document/d/xxxx'
                     label='File Src'
                     id='fileSrc'
                     name='fileSrc'
                     value={ fileSrc }
                     onChange={ (name, value) => setFileSrc(value) }
                  />
               </div>
               {fileSrc && (
                  <div className='fileLesson__file m-t-l m-b-l'>
                     <iframe src={ fileSrc } title={ fileSrc } allowFullScreen />
                  </div>
               )}
            </div>
            <div className='fileLesson__buttons'>
               <div className='m-r-exl'>
                  {(fileTitle === title && fileSrc === src) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setFileTitle(title);
                           setFileSrc(src);
                        } }
                     />
                  )}

               </div>
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

FileLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   handleSave: PropTypes.func,
   setActiveName: PropTypes.func,
};

export default FileLesson;
