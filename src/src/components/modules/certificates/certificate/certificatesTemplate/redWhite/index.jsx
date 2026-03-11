import React from 'react';
import PropTypes from 'prop-types';
import light from 'assets/images/light.png';
import './index.scss';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CertificateSignature from '../../Signature';

const RedWhite = ({
   backgroundImage,
   logo,
   title,
   belowTitle,
   courseName,
   note,
   dateIssued,
   onUpdateLogoSize,
   certificateFont,
   primaryTextColor,
   secondaryTextColor,
   tertiaryTextColor,
   signatureImg,
   onChange,
   titleSize,
   belowTitleSize,
   noteSize,
}) => {
   return (
      <div className='redWhite'>
         <div
            className='redWhiteBackground'
            style={ {
               backgroundImage: `url(${ backgroundImage })`,
            } }
         >
            <div className='redWhiteInnerBackground'>
               <CertificateLogo
                  src={ logo || light }
                  className={ cx({ redWhiteLogo: true, defaultLogo: typeof logo !== 'string' }) }
                  isDefaultlogo={ typeof logo !== 'string' }
                  onUpdateSize={ onUpdateLogoSize }
                  template='redWhite'
               />
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: secondaryTextColor || '#000033' } } className='redWhiteTitle'>
                  <input
                     type='text'
                     onChange={ (e) => {
                        if (e.target.value.length < 35) {
                           onChange('title', e.target.value, 'metas');
                        } else if (isPrint('You are reached character limit')) {
                           toast.error('You are reached character limit');
                        }
                     } }
                     value={ title || 'Certificate of Completion' }
                     style={ {
                        fontSize: `${ titleSize }px`,
                     } }
                  />
               </span>
               <span style={ { fontFamily: certificateFont || 'Lato', color: secondaryTextColor || '#000033' } } className='redWhiteBelowTitle'>  <input
                  type='text'
                  onChange={ (e) => {
                     if (e.target.value.length < 40) {
                        onChange('text_bellow_title', e.target.value, 'metas');
                     } else if (isPrint('You are reached character limit')) {
                        toast.error('You are reached character limit');
                     }
                  } }
                  value={ belowTitle || 'THIS CERTIFIES THAT' }
                  style={ {
                     fontSize: `${ belowTitleSize }px`,
                  } }
               />
               </span>
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#d35543' } } className='redWhiteName'>{courseName}</span>
               <span style={ { fontFamily: certificateFont || 'Lato', color: secondaryTextColor || '##000033' } } className='redWhiteNote'> <textarea
                  type='text'
                  onChange={ (e) => {
                     if (e.target.value.length < 60) {
                        onChange('note', e.target.value, 'metas');
                     } else if (isPrint('You are reached character limit')) {
                        toast.error('You are reached character limit');
                     }
                  } }
                  value={ note || 'has successfully completed Basic Graphic Design at Eight Dots Studio.' }
                  style={ {
                     fontSize: `${ noteSize }px`,
                     overflow: 'hidden',
                  } }
               />
               </span>
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#d35543' } } className='redWhiteCourseName'>{'{{Class Name}}'}</span>

               <div style={ {
                  display: 'flex', width: '372px', justifyContent: 'space-between', alignItems: 'flex-end',
               } }
               >
                  <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                     {/* <hr style={ { backgroundColor: tertiaryTextColor || '#1d2c3e', border: 'none', height: '2px' } } width='140px' /> */}
                     <span style={ { fontFamily: certificateFont || 'Lato', color: tertiaryTextColor || '#000033' } } className='redWhiteDate'>Issued on {dateIssued}</span>
                  </div>

                  <div style={ {
                     display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
                  } }
                  >
                     <CertificateSignature height='40px' width='194px' onSave={ (value) => onChange('signatureImg', value, 'metas') } signatureImage={ signatureImg } />
                     <hr style={ { backgroundColor: tertiaryTextColor || '#1d2c3e', border: 'none', height: '2px' } } width='140px' />
                     <span style={ { fontFamily: certificateFont || 'Lato', color: tertiaryTextColor || '#000033' } } className='redWhiteDate'>Sign</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

RedWhite.propTypes = {
   backgroundImage: PropTypes.string,
   logo: PropTypes.string,
   title: PropTypes.string,
   belowTitle: PropTypes.string,
   onUpdateLogoSize: PropTypes.func,
   courseName: PropTypes.string,
   note: PropTypes.string,
   dateIssued: PropTypes.string,
   signatureImg: PropTypes.any,
   certificateFont: PropTypes.string,
   primaryTextColor: PropTypes.string,
   secondaryTextColor: PropTypes.string,
   tertiaryTextColor: PropTypes.string,
   onChange: PropTypes.func,
   titleSize: PropTypes.number,
   belowTitleSize: PropTypes.number,
   noteSize: PropTypes.number,
};

export default RedWhite;
