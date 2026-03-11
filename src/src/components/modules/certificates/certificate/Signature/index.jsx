import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { TYPES as txtTypes, SIZES as txtSizes, TextWithIcon } from 'components/elements/TextNew';
import ModalNew from 'components/elements/ModalNew';
import Upload from 'components/modules/uploadWithoutS3';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import SignatureCanvas from 'react-signature-canvas';
import IconNew from 'components/elements/iconsSize';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { Popover } from '@material-ui/core';
import { SketchPicker } from 'react-color';


const CertificateSignature = ({
   signatureImage, onSave, width, height = '60px',
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const [isOpenAfterEditPopup, setIsOpenAfterEditPopup] = useState(false);
   const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
   const [color, setColor] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [penColor, setPenColor] = useState({
      hex: '#000',
   });
   let sigCanvas = {};
   const clear = () => {
      sigCanvas.clear();
      onSave('signatureImg', null);
   };
   return (
      <div className='certificate__signature' style={ { width, height } }>
         {isOpenUploadModal && (
            <ModalNew onCloseModal={ () => setIsOpenUploadModal(false) }>
               <Upload
                  onChange={ (src) => {
                     onSave(src);
                     setIsOpenUploadModal(false);
                  } }
                  isAmazonFile={ true }
                  fileTypes='png jpg'
                  isImageUpload={ true }
               />
            </ModalNew>
         )}
         {(signatureImage && !isEditing) && (
            <div role='presentation' onClick={ () => setIsOpenAfterEditPopup(true) }>
               <img src={ signatureImage } alt='' style={ { height } } height={ height } />
            </div>
         )}
         {isEditing && (
            <div className='certificate__signature__editing'>
               <div className='editing__options'>
                  <div className='editing__options__left'>
                     <div
                        className='editing__options__left__button'
                        role='presentation'
                        onClick={ (e) => {
                           setAnchorEl(e.currentTarget);
                           setColor(true);
                        } }
                     >
                        <IconNew name='SignaturePenL' />
                     </div>
                     {color && (
                        <Popover
                           open={ color }
                           anchorEl={ anchorEl }
                           onClose={ () => setColor(false) }
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
                           <div>
                              <SketchPicker
                                 color={ penColor.hex }
                                 onChangeComplete={ (colorNew) => setPenColor(colorNew) }
                              />
                           </div>
                        </Popover>
                     )}
                  </div>
                  <div className='editing__options__right'>
                     <div className='editing__options__right__button' role='presentation' onClick={ () => clear() }>
                        <IconNew name='SignatureDeleteL' />
                     </div>
                     <BaseButton
                        text='Save Signature'
                        onClick={ () => {
                           onSave(sigCanvas.toDataURL('image/png'));
                           setIsEditing(false);
                        } }
                     />
                  </div>
               </div>
               {penColor && (
                  <SignatureCanvas penColor={ penColor.hex } canvasProps={ { width: 194, height, className: 'newCanvas' } } ref={ (ref) => { sigCanvas = ref; } } />
               )}
            </div>
         )}
         {isOpenAfterEditPopup && (
            <ClickOutside onClick={ () => setIsOpenAfterEditPopup(false) }>
               <div className='certificate__signature__create'>
                  <TextWithIcon
                     iconName='SignatureAddM'
                     inner='Add Signature'
                     type={ txtTypes.regularDefaultSmall }
                     size={ txtSizes.small }
                     onClick={ () => {
                        setIsEditing(true);
                        setIsOpenAfterEditPopup(false);
                     } }
                     style={ { color: '#24554E' } }
                  />
                  <div />
                  <TextWithIcon
                     iconName='SignatureUploadM'
                     inner='Upload Signature'
                     type={ txtTypes.regularDefaultSmall }
                     size={ txtSizes.small }
                     onClick={ () => setIsOpenUploadModal(true) }
                     style={ { color: '#24554E' } }
                  />
               </div>
            </ClickOutside>
         )}
         {(!signatureImage && !isEditing) && (
            <div className='certificate__signature__none' role='presentation' onClick={ () => setIsOpenAfterEditPopup(true) } />
         )}
      </div>
   );
};

CertificateSignature.propTypes = {
   signatureImage: PropTypes.string,
   onSave: PropTypes.func,
   width: PropTypes.any,
   height: PropTypes.string,
};

export default CertificateSignature;
