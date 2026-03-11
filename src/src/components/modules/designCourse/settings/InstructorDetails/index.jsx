import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import TextArea from 'components/elements/form/TextArea';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import useS3Upload from 'components/modules/S3Upload';
import LoaderSpiner from 'components/modules/designCourse/settings/LoaderSpiner';
import Select from 'components/elements/form/Select';
import Modal from 'components/elements/Modal';
import coverImg from 'assets/images/thumbnail.png';
import { fileToDataUrl } from 'utils/mediaLibrary';
import AuthorModal from './AuthorModal';
import AuthorDeleteModal from './AuthorDeleteModal';

const InstructorDetails = ({
   handleInternalInputChange, settingsData, instructorDataInProgress, authorOptions,
   setOpenAuthorPopup, isOpenAuthorPopup, onCreateAuthor, onDeleteAuthor,
   setOpenDeleteAuthorPopup, isOpenDeleteAuthorPopup, handleAuthorSave,
}) => {
   const [deleteAuthor, setDeleteAuthor] = useState({});
   const [isChangeAuthor, setChangeAuthor] = useState(false);
   const [imageDataUrl, setImageDataUrl] = useState('');

   function handleInputChange(name, value, isSelect) {
      const author = authorOptions && authorOptions.filter(option => option.id === value);
      let data = [];
      if (isSelect) {
         data = author;
         setChangeAuthor(true);
      } else data = [{ [name]: value }];
      handleInternalInputChange(data, isSelect);
   }

   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload Image',
         theme: btnType.blueBordered,
         size: btnSize.full,
      },
      onChange: async (src, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         setImageDataUrl(dataUrl);
         handleInputChange('picture_src', src);
      },
      fileLessonFormat: 'image',
      cropRatio: true,
   });

   let options = [];
   options = authorOptions && authorOptions.map(option => {
      return { value: option.id, label: option.name };
   });
   const authorsData = settingsData.authors;
   const data = {
      description: authorsData && authorsData[0] && authorsData[0].description,
      picture_src: authorsData && authorsData[0] && authorsData[0].picture_src,
   };
   const descriptionLength = settingsData.authors && settingsData.authors[0] && settingsData.authors[0].description && settingsData.authors[0].description.length || 0;
   const authorImg = settingsData && settingsData.authors && settingsData.authors[0] && !settingsData.authors[0].picture_src.includes('default.png')
   && settingsData.authors[0].picture_src;
   const authorImage = imageDataUrl || authorImg;
   return (
      <>
         {instructorDataInProgress && (<LoaderSpiner />)}
         {
            !instructorDataInProgress && (
               <ItemWrapper>
                  <div className='instructorDetails'>
                     <div className='instructorDetails_name'>
                        <Select
                           label='Class Instructor Name'
                           placeholder=''
                           options={ options }
                           iconColor='#3f4f65'
                           name='name'
                           value={ settingsData.authors && settingsData.authors[0] && settingsData.authors[0].id }
                           onChange={ (key, value) => handleInputChange(key, value, true) }
                        />
                        <div className='instructorDetailsSaveBtn'>
                           <BaseButton
                              theme={ btnType.darkGreen }
                              size={ btnSize.large }
                              text='Add'
                              onClick={ () => setOpenAuthorPopup(true) }
                           />
                        </div>
                     </div>
                     <div className='w-full m-t-m'>
                        <TextArea
                           label='Bio Description'
                           placeholder="Enter the Instructor's Bio Description"
                           name='description'
                           rightLabel={ `${ descriptionLength }/150` }
                           maxLength={ 150 }
                           value={ settingsData.authors && settingsData.authors[0] && settingsData.authors[0].description }
                           onChange={ (key, value) => handleInputChange(key, value) }
                        />
                     </div>
                     <div className='instructorImg m-t-m'>
                        <div className='instructorImg__image'>
                           <Text
                              size={ txtSizes.extraSmall }
                              type={ txtType.normal }
                              inner='Instructor Image'
                           />
                           <div className='m-t-exs'>
                              <Text
                                 type={ txtType.regular }
                                 size={ txtSizes.extraSmall }
                                 inner='Recommended size (50x50)'
                                 color='#8a94a2'
                              />
                           </div>
                           <img
                              src={ authorImage || coverImg }
                              alt='Instructor'
                           />
                        </div>

                        <div className='instructorImg__button m-t-exl'>
                           {progressEL}
                           {uploadButton}
                           <BaseButton
                              theme={ btnType.grey }
                              size={ btnSize.full }
                              text='Remove Instructor Image'
                              style={ {
                                 marginTop: '10px',
                              } }
                              onClick={ () => { setImageDataUrl(coverImg); } }
                           />
                        </div>
                     </div>
                     <div className='instructorDetailsSaveBtn w-full m-t-exl'>
                        <BaseButton
                           theme={ btnType.darkGreen }
                           size={ btnSize.large }
                           text='Save'
                           className='save-instructor'
                           onClick={ () => {
                              handleAuthorSave(settingsData.id, settingsData.authors[0].id, data, isChangeAuthor);
                              setChangeAuthor(false);
                           } }
                        />
                     </div>
                  </div>
               </ItemWrapper>
            )
         }
         {
            isOpenAuthorPopup && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='white'
                  contentPosition='center'
                  contentWidth={ window.innerWidth >= 600 ? '480px' : '90%' }
                  className={ window.innerHeight < 550 ? 'miniHeight' : 'autoHeight' }
                  closeOnClickOutside={ false }
                  onClose={ () => setOpenAuthorPopup(false) }
               >
                  {
                     !isOpenDeleteAuthorPopup ? (
                        <AuthorModal
                           author={ settingsData.author }
                           onCancel={ () => setOpenAuthorPopup(false) }
                           onCreate={ (newAuthor) => {
                              onCreateAuthor(newAuthor);
                              setChangeAuthor(true);
                           } }
                           authorOptions={ options }
                           setOpenDeleteModal={ (value, id, lable) => {
                              setOpenDeleteAuthorPopup(value);
                              setDeleteAuthor({ id, lable });
                           } }
                        />
                     ) : (
                        <AuthorDeleteModal
                           onCancel={ () => { setOpenDeleteAuthorPopup(false); } }
                           onDelete={ () => {
                              onDeleteAuthor(deleteAuthor.id);
                           } }
                        />
                     )
                  }
               </Modal>
            )
         }
      </>
   );
};

InstructorDetails.propTypes = {
   handleInternalInputChange: PropTypes.func,
   settingsData: PropTypes.object,
   instructorDataInProgress: PropTypes.bool,
   authorOptions: PropTypes.array,
   setOpenAuthorPopup: PropTypes.func,
   isOpenAuthorPopup: PropTypes.bool,
   onCreateAuthor: PropTypes.func,
   handleAuthorSave: PropTypes.func,
   onDeleteAuthor: PropTypes.func,
   setOpenDeleteAuthorPopup: PropTypes.func,
   isOpenDeleteAuthorPopup: PropTypes.bool,
};


export default InstructorDetails;
