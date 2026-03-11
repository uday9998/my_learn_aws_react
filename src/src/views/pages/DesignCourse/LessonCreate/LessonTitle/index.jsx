/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextArea from 'components/elements/form/CustomTextArea';
import Text, { TextWithIcon, TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import GeneratorModal from 'components/elements/GeneratorModal';
import './index.scss';
import { Popover } from '@material-ui/core';
import SliceAndConnectText from 'utils/getSplitedText';

const LessonTitle = ({
   subtitle, author,
   title, onChange, course, authors, handleAttachAuthorToLesson,
   setOpenSettings,
}) => {
   const [isClosedInput, setIsClosedInput] = useState(true);
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });
   const onClickButton = (e) => {
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };
   const onClose = () => {
      setIsOpen(false);
   };

   const handleOpenSettings = () => {
      setOpenSettings(true);
   };

   const LessonAuthor = author || (course && course.authors[0]);
   return (
      <div className='lesson__title'>
         <div className='lesson__title__content'>
            <div>
               <TextArea
                  title={ title }
                  placeholder='New Lesson'
                  name='name'
                  withIcon={ true }
                  iconName='Generator'
                  setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                  IToolTipTextNew='AI Generator'
                  onInputChange={ onChange }
               />
            </div>
            {(!subtitle && isClosedInput) && (
               <div
                  className='add__subtitle'
                  role='presentation'
                  onClick={ () => setIsClosedInput(false) }
               >
                  <IconNew
                     name='PlusSupportM'
                  />
                  <Text
                     inner='Add Description'
                     size={ TextSize.small }
                     type={ TextType.regularDefaultSmallX }
                     style={ { color: '#24554E', height: '50px',  overflow: 'auto' } }
                  />
               </div>
            )}
            {(!isClosedInput || subtitle) && (
               <div className='add__subtitle'>
                  <TextArea
                     title={ subtitle === null ? '' : subtitle }
                     placeholder='Provide a summary of the content here.'
                     name='subtitle'
                     maxLength={ 2000 }
                     withIcon={ true }
                     iconName='Generator'
                     setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                     IToolTipTextNew='AI Generator'
                     onInputChange={ onChange }
                     style={ {
                        fontSize: '16px', color: '#444C4B', fontWeight: '400', lineHeight: '148%', height: '29px',
                     } }
                  />
               </div>
            )}
            <div className='icon__text__wrapper__author'>
               {LessonAuthor && (
                  <div className='lesson__title__author' role='presentation' onClick={ onClickButton }>
                     <div className='lesson__title__author__img'>
                        <img src={ LessonAuthor.picture_src } alt='author' />
                     </div>
                     <TextWithIcon
                        inner={ LessonAuthor.name }
                        size={ TextSize.small }
                        type={ TextType.regularDefault }
                        isIconRight={ true }
                        iconName={ isOpen ? 'PostLeaveArrowUp' : 'PostLeaveArrow' }
                     />
                  </div>
               )}
               <div role='presentation' onClick={ handleOpenSettings } className='icon__wrapper'>
                  <IconNew name='SettingsProductM' />
               </div>
            </div>
            <Popover
               open={ isOpen }
               anchorEl={ anchorEl }
               onClose={ onClose }
               className='custom-popover'
               elevation={ 24 }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center',
               } }
               transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'center',
               } }
            >
               <div className='lesson__authors'>
                  {authors && authors.map((e, index) => {
                     return (
                        <div
                           role='presentation'
                           onClick={ () => {
                              handleAttachAuthorToLesson(e);
                              onClose();
                           } }
                           className='lesson__author'
                           key={ index }
                        >
                           <div className='lesson__author__img'>
                              <img src={ e.picture_src } alt='author' />
                           </div>
                           <Text
                              inner={ SliceAndConnectText(e.name, 20) }
                              size={ TextSize.small }
                              type={ TextType.regularDefault }
                           />
                        </div>
                     );
                  })}
               </div>
            </Popover>
         </div>
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Lesson'
               isQuiz={ true }
               //  data={ data }
               setData={ onChange }
            />
         )}
      </div>
   );
};

LessonTitle.propTypes = {
   title: PropTypes.string,
   subtitle: PropTypes.string,
   onChange: PropTypes.func,
   author: PropTypes.object,
   authors: PropTypes.array,
   handleAttachAuthorToLesson: PropTypes.func,
   setOpenSettings: PropTypes.func,
   course: PropTypes.object,
};

export default LessonTitle;
