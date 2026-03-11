import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import './index.scss';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import AuthorCreateModal from '../AuthorCreateModal';

const CourseInstructorPage = ({
   selectedAuthor, setSelectedAuthor, authors, createAuthor, deleteAuthor,
   errorMessages, removeErrorMessage
}) => {
   const tabVariants = [
      { value: 'information', key: 'Instructor Information', iconName: 'ProductInformationFirstM' },
   ];
   const imageTab = { value: 'images', key: 'Instructor Images', iconName: 'ProductInformationSecondM' };
   const [selectedTab, setSelectedTab] = useState('information');
   const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
   const handleAuthorInputChange = (name, value) => {
      setSelectedAuthor({
         ...selectedAuthor,
         [name]: value,
      });
   };
   const [authorsOptions, setAuthorsOptions] = useState(authors.map((author) => (
      {
         label: author.name,
         value: author.id,
      }
   )));

   useEffect(() => {
      setAuthorsOptions(authors.map((author) => (
         {
            label: author.name,
            value: author.id,
         }
      )));
   }, [authors]);

   return (
      <div className='course__intstructor__page'>
         {isOpenCreateModal && (
            <AuthorCreateModal
               deleteAuthor={ deleteAuthor }
               authors={ authorsOptions }
               onCloseModal={ () => setIsOpenCreateModal(false) }
               onCreate={ createAuthor }
               errorMessages={ errorMessages.name }
               removeErrorMessage={ removeErrorMessage }
            />
         )}
         <div className='course__intstructor__page__tabs'>
            <Tabs
               hasIcon={ true }
               selectedVariant={ selectedTab }
               isButton={ false }
               variants={ selectedAuthor ? [...tabVariants, imageTab] : tabVariants }
               onSelect={ (item) => setSelectedTab(item) }
            />
         </div>
         {selectedTab === 'information' && (
            <div className='course__intstructor__page__inputs'>
               <div className='top'>
                  <div className='course__intstructor__page__inputs__top'>
                     <Select
                        options={ authorsOptions }
                        placeholder=''
                        type='select-large'
                        label='Instructor Name'
                        value={ selectedAuthor ? selectedAuthor.id : false }
                        onChange={ (name, id) => setSelectedAuthor(authors.filter((item) => item.id === id)[0]) }
                     />
                     <Button
                        text='Add New'
                        theme={ themes.secondary }
                        onClick={ () => setIsOpenCreateModal(true) }
                     />
                  </div>
                  {selectedAuthor && (
                     <Input
                        name='description'
                        type='textarea'
                        value={ selectedAuthor.description || '' }
                        onChange={ handleAuthorInputChange }
                        label='Instructor Bio'
                        placeholder='Briefly describe your professional background and expertise'
                     />
                  )}
               </div>
               {/* {selectedAuthor && (
                  <div className='bottom'>
                     <Button
                        text='Save Instructor'
                        className='save-instructor'
                        onClick={ () => onSaveInstructor(selectedAuthor) }
                     />
                  </div>
               )} */}
            </div>
         )}
         {selectedTab !== 'information' && (
            <div className='course__intstructor__page__inputs'>
               <div className='top'>
                  {selectedAuthor && (
                     <div className='course__intstructor__page__inputs__block'>
                        <UploadMediaImageView
                           src={ selectedAuthor.picture_src }
                           type='image'
                           buttonText='Image'
                           iconName='ClearImageM'
                           isRemove={ true }
                           uploadProps={ {
                              fileLessonFormat: 'image',
                              isAmazonFile: true,
                              cropRatio: '320x320',
                              onChange: (value) => handleAuthorInputChange('picture_src', value),
                           } }
                        />
                     </div>
                  )}
               </div>
               {/* {selectedAuthor && (
                  <div className='bottom'>
                     <Button
                        className='save-instructor'
                        text='Save Instructor'
                        onClick={ () => onSaveInstructor(selectedAuthor) }
                     />
                  </div>
               )} */}
            </div>
         )}
      </div>
   );
};

CourseInstructorPage.propTypes = {
   selectedAuthor: PropTypes.object,
   setSelectedAuthor: PropTypes.func,
   authors: PropTypes.array,
   createAuthor: PropTypes.func,
   deleteAuthor: PropTypes.func,
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
};

export default CourseInstructorPage;
