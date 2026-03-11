import React from 'react';
import PropTypes from 'prop-types';
import { tabVariants } from 'utils/constants';

import TextArea from 'components/elements/TextArea';
import Tabs from 'components/elements/tabs';
import Select from 'components/elements/SelectNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import AuthorCreateModal from 'views/pages/DesignCourse/CourseInformation/CourseInformationComponents/AuthorCreateModal';

import './index.scss';

const InstructorSection = ({
   selectedInstructorTab,
   handleChangeInstructorTab,
   fieldsValues,
   handleChangeTextarea,
   instructorData,
   handleChangeInstructor,
   handleChangeAuthorImage,
   handleChangeOpenCreateModal,
   handleSaveAuthor,
   handleDeleteAuthor,
   errorMessages,
   removeErrorMessage,
}) => {
   return (
      <div className='instructor__tabs'>
         {
            instructorData.isOpenCreateModal && (
               <AuthorCreateModal
                  authors={ instructorData.instAuthors }
                  onCloseModal={ handleChangeOpenCreateModal }
                  onCreate={ handleSaveAuthor }
                  deleteAuthor={ handleDeleteAuthor }
                  isPlaylist={ true }
                  errorMessages={ errorMessages.name }
                  removeErrorMessage={ removeErrorMessage }
               />
            )
         }
         <Tabs
            variants={ tabVariants }
            selectedVariant={ selectedInstructorTab }
            isButton={ false }
            hasIcon={ true }
            isPlayList={ true }
            onSelect={ handleChangeInstructorTab }
            isFullWidth={ true }
         />
         {
            selectedInstructorTab === 'info' ? (
               <>
                  <div className='instructor__name__wrapper'>
                     <Select
                        options={ instructorData.instAuthors }
                        placeholder=''
                        type='select-large'
                        label='Instructor Name'
                        value={ instructorData.selectedAuthor.value }
                        onChange={ handleChangeInstructor }
                     />
                     <Button
                        text='Add New'
                        theme={ themes.secondary }
                        onClick={ handleChangeOpenCreateModal }
                     />
                  </div>
                  <TextArea
                     width='100%'
                     placeholderText='Enter Description'
                     labelText='Instructor Description'
                     color='#131F1E'
                     maxLength={ 2000 }
                     value={ fieldsValues.instructorAreaValue }
                     onChange={ handleChangeTextarea }
                     name='instructorAreaValue'
                  />
               </>
            ) : (
               <UploadMediaImageView
                  src={ instructorData.selectedAuthor.picture_src }
                  type='image'
                  buttonText='Image'
                  iconName='ClearImageM'
                  isRemove={ true }
                  uploadProps={ {
                     fileLessonFormat: 'image',
                     isAmazonFile: true,
                     cropRatio: '320x320',
                     onChange: (value) => handleChangeAuthorImage('picture_src', value),
                  } }
               />
            )
         }
      </div>
   );
};


InstructorSection.propTypes = {
   selectedInstructorTab: PropTypes.string,
   handleChangeInstructorTab: PropTypes.func,
   fieldsValues: PropTypes.object,
   instructorData: PropTypes.object,
   handleChangeTextarea: PropTypes.func,
   handleChangeInstructor: PropTypes.func,
   handleChangeAuthorImage: PropTypes.func,
   handleChangeOpenCreateModal: PropTypes.func,
   handleSaveAuthor: PropTypes.func,
   handleDeleteAuthor: PropTypes.func,
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
};

export default InstructorSection;
