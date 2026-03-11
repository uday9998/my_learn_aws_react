import React, { useEffect, useState } from 'react';
import Tabs from 'components/elements/tabs';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import { getFoldersData } from 'state/modules/mediaLibrary/operations';
import { foldersSelector } from 'state/modules/mediaLibrary/selectors';
import { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Upload from 'components/modules/uploadWithoutS3';
import Input from 'components/elements/inputNew';
import Info from 'components/elements/messages/info';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { urlValidation } from 'utils/validations';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UploadWithMediaView from '../../UploadWithMedia/UploadWithMediaView';
import IconNew from '../../iconsSize';

const UploadWithExtensions = ({
   init, folders, onChange, extensions, linkBottomText, onAddLink, secondaryText,
}) => {
   const tabVariants = [
      { value: 'upload', key: 'Upload', iconName: 'UploadMediaFirstM' },
      { value: 'media', key: 'Media Library', iconName: 'UploadMediaSecondM' },
      { value: 'code', key: 'Insert Link', iconName: 'UploadMediaThirdM' },
   ];
   const [linkText, setLinkText] = useState('');
   const getFoldersDataByExtensions = () => {
      return folders.map(e => {
         const files = e.files.filter((item) => {
            const extension = item.name ? item.name.split('.').at(-1) : item.extension;
            return extensions.includes(extension);
         });
         return {
            ...e,
            files,
         };
      });
   };
   useEffect(() => {
      init('');
   }, []);
   const [selectedTab, setSelectedTab] = useState('upload');
   const [selectedFolder, setSelectedFolder] = useState(folders.length ? getFoldersDataByExtensions()[0] : null);
   useEffect(() => {
      if (folders.length) {
         setSelectedFolder(getFoldersDataByExtensions()[0]);
      }
   }, [folders]);
   return (
      <div className='upload__with__media'>

         <div
            className='upload__with__media__tab'
            style={ { marginBottom: selectedTab === 'upload' ? '-8px' : '0px' } }
         >
            <Tabs
               variants={ tabVariants }
               selectedVariant={ selectedTab }
               isButton={ false }
               onSelect={ (value) => setSelectedTab(value) }
               hasIcon={ true }
            />
         </div>
         {selectedTab !== 'media' ? (
            <div className='upload__with__media__content'>
               <>
                  <div className='upload__with__media__content__icon'>
                     <IconNew name='AffiliateUploadM' />
                  </div>
               </>
               {selectedTab === 'code' ? (
                  <div className='upload__with__media__content__link'>
                     <Input
                        value={ linkText }
                        onChange={ (name, value) => setLinkText(value) }
                        placeholder='Enter your link here'
                        onKeyPress={ (e) => {
                           if (e.key === 'Enter') {
                              if (urlValidation(linkText)) {
                                 onAddLink(linkText);
                                 setLinkText('');
                              } else if (isPrint('Please enter valid url.')) {
                                 toast.error('Please enter valid url.');
                              }
                           }
                        } }
                     />
                     {linkText.length > 0 && (
                        <Info
                           title='Press "Enter" to Add'
                           isHaveCancel={ false }
                        />
                     )}
                     {linkBottomText && (
                        <Text
                           inner={ linkBottomText }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#727978' } }
                        />
                     )}
                  </div>
               ) : (
                  <Upload
                     isHaveRecomenededText={ true }
                     bottomText={ `You can upload files with the extensions: ${ extensions.split(' ').join(', ') }` }
                     text='Files'
                     onChange={ onChange }
                     fileTypes={ extensions }
                     isAmazonFile={ true }
                     generalButtonProps={ {
                        theme: themes.primary,
                        text: 'Upload Files',
                        iconName: 'uploadVideoM',
                     } }
                     secondaryText={ secondaryText }
                  />
               )}
               {/* {uploadProps.cropRatio && (
                        <div className='upload__with__media__content__crop' style={ { zIndex: '4' } }>
                           <Text
                              inner={ `Recommended size ${ uploadProps.cropRatio }` }
                              type={ types.regularDefault }
                              style={ { color: '#727978' } }
                              size={ sizes.small }
                           />
                        </div>
                     )} */}
            </div>
         ) : (
            <div className='upload__with__media__files scroll'>
               <UploadWithMediaView
                  data={ getFoldersDataByExtensions() }
                  onSelectFile={ (url, file) => {
                     onChange(url, file.name, file);
                  } }
                  selectedFolder={ selectedFolder }
                  setSelectedFolder={ setSelectedFolder }
               />
            </div>
         )}
      </div>
   );
};

UploadWithExtensions.propTypes = {
   onChange: PropTypes.func,
   init: PropTypes.func,
   folders: PropTypes.array,
   extensions: PropTypes.string,
   onAddLink: PropTypes.func,
   linkBottomText: PropTypes.string,
   secondaryText: PropTypes.string,
};

const mapStateToProps = (state) => {
   return {
      folders: foldersSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (type) => dispatch(getFoldersData(type)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadWithExtensions);
