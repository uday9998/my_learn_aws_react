import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import './index.scss';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';

const CourseInformationPage = ({
   inputs, onChange, setOpenModal, errorMessages
}) => {
   const tabVariants = [
      { value: 'information', key: 'Product Information', iconName: 'ProductInformationFirstM' },
      { value: 'images', key: 'Product Images', iconName: 'ProductInformationSecondM' },
   ];
   const [selectedTab, setSelectedTab] = useState('information');

   return (
      <div className='course__information__page'>
         <div className='course__information__page__tabs'>
            <Tabs
               hasIcon={ true }
               selectedVariant={ selectedTab }
               isButton={ false }
               variants={ tabVariants }
               onSelect={ (item) => setSelectedTab(item) }
            />
         </div>
         {selectedTab === 'information' && (
            <div className='course__information__page__inputs'>
               <Text
                  inner='Product Information'
                  type={ types.medium150 }
                  size={ sizes.medium }
               />
               <div className='course__information__page__inputs__flex'>
                  <Input
                     errorMessages={errorMessages.name}
                     placeholder='Enter Product Name'
                     name='name'
                     value={ inputs.name }
                     onChange={ onChange }
                     label='Product Name'
                     withIcon={ true }
                     iconName='Generator'
                     setOpenModal={ setOpenModal }
                     IToolTipTextNew='AI Generator'
                     maxlength={ 50 }
                     characterLimit='50'
                  />
                  <Input
                     type='textarea'
                     placeholder='Enter Product Description'
                     label='Product Description'
                     name='description'
                     value={ inputs.description }
                     onChange={ onChange }
                     withIcon={ true }
                     iconName='Generator'
                     setOpenModal={ setOpenModal }
                     IToolTipTextNew='AI Generator'
                     maxLengthTextArea={ 500 }
                     characterLimit='500'
                  />
               </div>
            </div>
         )}
         {selectedTab !== 'information' && (
            <div className='course__information__page__inputs'>
               <div className='course__information__page__inputs__upload'>
                  <div className='title'>
                     <Text
                        inner='Product Cover'
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </div>
                  <UploadMediaImageView
                     src={ inputs.thumbnail_image }
                     type='image'
                     buttonText='Image'
                     iconName='ClearImageM'
                     isRemove={ true }
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '1920x1080',
                        onChange: (value) => onChange('thumbnail_image', value),
                     } }
                  />
               </div>
               <div className='course__information__page__inputs__upload'>
                  <div className='title'>
                     <Text
                        inner='Product Logo'
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </div>
                  <UploadMediaImageView
                     src={ inputs.logo }
                     type='image'
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '50*50',
                        onChange: (value) => onChange('logo', value),
                     } }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

CourseInformationPage.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   setOpenModal: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default CourseInformationPage;
