import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { TextWithIcon } from '../TextNew';
import ModalNew from '../ModalNew';
import UploadWithMedia from '../UploadWithMedia';
import './index.scss';
import ChangeButton from '../buttons/ChangeButton';

const UploadCover = ({ cover, onChange, hideMediaLibrary }) => {
   const [isOpenUpload, setIsOpenUpload] = useState(false);
   const [isMouseOver, setIsMouseOver] = useState(false);
   return (
      <div className='upload__cover'>
         {!cover ? (
            <TextWithIcon
               iconName='plusSectionProgramM'
               inner='Add cover (Optional)'
               type={ types.regularDefaultSmallX }
               size={ sizes.small }
               style={ { color: '#24554E' } }
               onClick={ () => setIsOpenUpload(true) }
               generalStyles={ { cursor: 'pointer' } }
            />
         ) : (
            <div
               onMouseEnter={ () => setIsMouseOver(true) }
               onMouseLeave={ () => setIsMouseOver(false) }
               className='upload__cover__image'
            >
               <img src={ cover } alt='' />
               <div className={ `upload__cover__image__buttons${ isMouseOver ? ' upload__cover__image__buttons_active' : '' }` }>
                  <ChangeButton
                     text='Change Cover'
                     iconName='ChangeImageM'
                     withText={ true }
                     onClick={ () => setIsOpenUpload(true) }
                  />
                  <ChangeButton
                     iconName='DeleteMediaM'
                     onClick={ () => onChange('cover', null) }
                  />

               </div>
            </div>
         )}
         {isOpenUpload && (
            <ModalNew
               onCloseModal={ () => setIsOpenUpload(false) }
               // isUpload={ true }
            >
               <div className='upload__cover__modal'>
                  <Text
                     inner='Add Cover'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <UploadWithMedia
                     src={ cover }
                     type='image'
                     onFinish={ () => {} }
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '1920x540',
                        onChange: (value) => {
                           onChange('cover', value);
                           setIsOpenUpload(false);
                        },
                     } }
                     hideMediaLibrary={ hideMediaLibrary }
                  />
               </div>
            </ModalNew>
         )}
      </div>
   );
};

UploadCover.propTypes = {
   cover: PropTypes.string,
   onChange: PropTypes.func,
   hideMediaLibrary: PropTypes.bool,
};

export default UploadCover;
