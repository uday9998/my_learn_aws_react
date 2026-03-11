import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Tabs from 'components/elements/tabs';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import GeneratorModal from 'components/elements/GeneratorModal';

const SectionSettings = ({ inputs, onChange, errorMessages }) => {
   const tabVariants = [
      { value: 'information', key: 'Section Information', iconName: 'ProductInformationFirstM' },
      // { value: 'images', key: 'Section Image', iconName: 'ProductInformationSecondM' },
   ];
   const [selectedTab, setSelectedTab] = useState('information');
   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });

   return (
      <div className='product__section__settings'>
         <div className='product__section__settings__tabs'>
            <Tabs
               hasIcon={ true }
               isButton={ false }
               selectedVariant={ selectedTab }
               variants={ tabVariants }
               onSelect={ (name) => setSelectedTab(name) }
            />
         </div>
         <div className='product__section__settings__content'>
            <div className='product__section__settings__content__flex'>
               <div className='product__section__settings__content__left'>
                  <Text
                     inner={ `Section ${ selectedTab === 'information' ? 'Information' : 'Image' }` }
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  {selectedTab === 'information' ? (
                     <div className='product__section__settings__content__inputs'>
                        <Input
                           errorMessages={ errorMessages.name }
                           name='name'
                           placeholder='Enter section name'
                           value={ inputs.name }
                           onChange={ onChange }
                           label='Section Name'
                           withIcon={ true }
                           iconName='Generator'
                           maxlength={ 150 }
                           setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                           IToolTipTextNew='AI Generator'
                        />
                        <Input
                           name='description'
                           placeholder='Enter section description'
                           value={ inputs.description }
                           onChange={ onChange }
                           type='textarea'
                           label='Section Description'
                           maxLengthTextArea={ 500 }
                           withIcon={ true }
                           iconName='Generator'
                           setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                           IToolTipTextNew='AI Generator'
                        />
                     </div>
                  ) : (
                     <div className='product__section__settings__content__upload'>
                        <UploadMediaImageView
                           src={ inputs.picture_src }
                           type='image'
                           buttonText='Image'
                           iconName='ClearImageM'
                           isRemove={ true }
                           uploadProps={ {
                              fileLessonFormat: 'image',
                              isAmazonFile: true,
                              cropRatio: '1920x1080',
                              onChange: (value) => onChange('picture_src', value),
                           } }
                        />
                     </div>
                  )}
               </div>
               {/* <div className='product__section__settings__content__right'>
                  <img src={ inputs.picture_src } alt='' />
               </div> */}
            </div>
         </div>
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Section'
               setData={ onChange }
            />
         )}

      </div>
   );
};

SectionSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default SectionSettings;
