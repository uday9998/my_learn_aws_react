import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import TextInput from 'components/elements/form/TextInput';
import useS3Upload from 'components/modules/S3Upload';
import Modal from 'components/elements/Modal';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const LessonResources = ({
   isOpen, handleSave, handleDelete, handleEdit, handleInputChange, openResourceEdit,
   lessonResources,
}) => {
   const currentResource = {};


   // const [isOpenModal, setIsOpenModal] = useState(false);
   // const [isLoader, setIsLoader] = useState(false);
   // const { progressEL, uploadButton } = useS3Upload(BaseButton, {
   //    buttonProps: {
   //       text: 'Upload File',
   //       theme: buttonTheme.lightGreen,
   //       size: buttonSizes.large,
   //    },
   // onChange: (src, name, file) => {
   //    handleSave({
   //       type: 'resource',
   //       resource_file_src: src,
   //       file_name: name,
   //       file_type: file.type,
   //       file_size: file.size,
   //    });
   // },
   // acceptFilesExtentions: 'png jpg jpeg tiff JPG JPEG mp3 ogg pot pptx ppt potx ppsx thmx mp4 mov webm pdf',
   // });
   return (
      <DynamicWrapper
         isOpen={ true }
         title='Resources'
         openedBackColor='#ffffff'
         openedHasShadow
      >
         {/* <div className='m-t-l'>
            <Text
               inner='You can upload files with the following extensions: jpg, png, jpeg, mp3, ogg, ppt, pot, pps, pptx, potx, ppsx, thmx, mp4, mov, webm, pdf.'
               type={ textType.normal }
               size={ textSize.small }
               color='#8a94a2'
            />
         </div> */}
         <div className='m-t-m lessonResourceContent'>

            {lessonResources && lessonResources.map((lessonResource) => {
               //  const type = (lessonResource.type.split('/'))[0] === 'image';
               return (
                  <div
                     role='presentation'
                     key={ lessonResource.id }
                     // onClick={ () => {
                     //    if (type) {
                     //       setIsOpenModal(!isOpenModal);
                     //       setIsLoader(true);
                     //    }
                     // } }
                     className={ (lessonResource.id === (currentResource && currentResource.id)) ? 'lessonResource lessonResource__edit' : 'lessonResource' }
                  >

                     <div className='lessonResource__left'>

                        {/* {type && isOpenModal && (
                           <Modal
                              blurColor='rgba(63, 79, 101, 0.6)'
                              contentBgColor='#fff'
                              contentPosition='center'
                              className='lessonResource__unVisible'
                              contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                              closeOnClickOutside={ true }
                              onClose={ () => setIsOpenModal(false) }
                           >
                              {isLoader
                                 && <LoaderSpinner />
                              }
                              <img onLoad={ () => setIsLoader(false) } style={ { display: isLoader ? 'none' : 'block' } } className='lessonResource__modal' src={ lessonResource.src } alt='' />
                           </Modal>

                        )} */}

                        <div>
                           {(lessonResource.id === (currentResource && currentResource.id)) ? (
                              <div className='lessonResource__edit'>
                                 <TextInput
                                    placeholder='Text Title'
                                    id='textTitle'
                                    name='title'
                                    value={ currentResource.title }
                                    onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonResources', id: currentResource.id }) }
                                    maxlength='150'
                                 />


                              </div>
                           ) : (
                              <div>
                                 <Text
                                    inner={ lessonResource.title }
                                    type={ textType.regular }
                                    size={ textSize.extraSmall }
                                 />

                              </div>
                           ) }


                        </div>
                        {(lessonResource.id !== (currentResource && currentResource.id)) && (
                           <div className='lessonResourcs__created'>
                              <Text
                                 inner={ [`${ moment(lessonResource.created_at).format('MM/DD/YYYY') }`] }
                                 type={ textType.regular }
                                 size={ textSize.extraSmall }
                              />
                              <Text
                                 inner={ [<span className='oval' />] }
                                 type={ textType.regular }
                                 size={ textSize.extraSmall }
                              />
                              {/* <Text
                                 inner={ lessonResource.size === '0.00' ? '0.01 MB' : `${ lessonResource.size } MB` }
                                 type={ textType.regular }
                                 size={ textSize.extraSmall }
                              /> */}
                           </div>
                        )}
                     </div>


                     {/* {(lessonResource.id === (currentResource && currentResource.id)) ? (
                        <div className='lessonResource__right__btns lessonResource__edit__btns'>
                           <BaseButton
                              theme={ buttonTheme.darkGreen }
                              size={ buttonSizes.large }
                              text='Save'
                              onClick={ () => handleEdit({ id: lessonResource.id, title: currentResource.title }) }
                           />
                           <BaseButton
                              theme={ buttonTheme.grey }
                              size={ buttonSizes.large }
                              text='Cancel'
                              onClick={ () => openResourceEdit(0) }
                           />
                        </div>
                     ) : (
                        <div className='lessonResource__right__btns'>
                           <div className='lessonResource__right' role='presentation' onClick={ () => openResourceEdit(lessonResource.id) }>
                              <Icon name='EditItem' />
                           </div>
                           <div className='lessonResource__right' role='presentation' onClick={ () => handleDelete(lessonResource.id) }>
                              <Icon name='DeleteItem' />
                           </div>
                        </div>
                     )} */}


                  </div>


               );
            })

            }
         </div>
         {/* {progressEL}
         <div className='lessonResources__buttons'>
            {lessonResources && lessonResources.length !== 0 && (
               <BaseButton
                  theme={ buttonTheme.grey }
                  size={ buttonSizes.large }
                  text='Delete All'
                  onClick={ () => handleDelete('all') }
               />
            )}

            <div className=' m-r-m ' />
            {uploadButton}
         </div> */}
      </DynamicWrapper>
   );
};

LessonResources.propTypes = {
   isOpen: PropTypes.bool,
   lessonResources: PropTypes.array,
   handleSave: PropTypes.func,
   handleDelete: PropTypes.func,
   handleEdit: PropTypes.func,
   handleInputChange: PropTypes.func,
   openResourceEdit: PropTypes.func,
   currentResource: PropTypes.object,
};

LessonResources.defaultProps = {
   isOpen: false,
};

export default LessonResources;
