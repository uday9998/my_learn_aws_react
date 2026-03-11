import React from 'react';
import PropTypes from 'prop-types';
import bigArrowDown from 'assets/images/bigArrowDown.png';
import dots from 'assets/images/dots.png';
import './index.scss';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CertificateSignature from '../../Signature';

const CerteficateBlackWhite = ({
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
      <div
         className='certeficateBlackWhite'
         style={ {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${ backgroundImage || `${ process.env.REACT_APP_MAIN_DOMAIN_LIVE }/images/certificates/grid.png` })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
         } }
      >

         <div style={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '582px',
            backgroundColor: '#fafafa',
            position: 'relative',
            paddingBottom: '30px',
         } }
         >
            <div
               style={ {
                  height: '97px',
                  width: '96px',
                  position: 'absolute',
                  top: '-43px',
                  backgroundImage: `url(${ bigArrowDown })`,
               } }
            />
            <span
               className='blackWhiteTitle'
               style={ {
                  fontSize: `${ titleSize }px`,
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  letterSpacing: '2px',
                  textAlign: 'center',
                  fontFamily: certificateFont || 'LeagueSpartan',
                  color: primaryTextColor,
                  marginBottom: '64px',
                  paddingTop: '66px',
               } }
            >
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
            <span
               className='blackWhiteBelowTitle'
               style={ {
                  fontFamily: certificateFont || 'Montserrat',
                  color: secondaryTextColor,
                  marginBottom: '13px',
                  fontSize: `${ belowTitleSize }px`,
               } }
            >
               <input
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
            <span
               className='blackWhiteUserName'
               style={ {
                  fontSize: '36px',
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  letterSpacing: '4.5px',
                  fontFamily: certificateFont || 'LeagueSpartan',
                  color: primaryTextColor,
               } }
            >{courseName || '{{Student Name}}'}
            </span>
            <div style={ { textAlign: 'center', paddingTop: '14px' } }>
               <span
                  className='blackWhiteNotetext'
                  style={ {
                     fontSize: `${ noteSize }px`,
                     fontWeight: '600',
                     fontStretch: 'normal',
                     fontStyle: 'normal',
                     lineHeight: '1.33',
                     letterSpacing: 'normal',
                     textAlign: 'center',
                     fontFamily: certificateFont || 'Montserrat',
                     color: tertiaryTextColor,
                  } }
               >
                  <textarea
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
            </div>

            <span
               style={ {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  letterSpacing: 'normal',
                  paddingTop: '12px',
                  fontFamily: certificateFont || 'LeagueSpartan',
                  color: primaryTextColor,
               } }
            >Class Name
            </span>

            <div style={ { display: 'flex', alignItems: 'center', marginTop: '68px' } }>

               <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                  <span className='blackWhiteInstructorsNames' style={ { fontFamily: certificateFont || 'LeagueSpartan', color: secondaryTextColor } }>Issued on {dateIssued}</span>
               </div>
               <CertificateLogo
                  src={ logo || dots }
                  className={ cx({ blackandwhite__logo: true, logo: true, defaultLogo: typeof logo !== 'string' }) }
                  isDefaultlogo={ typeof logo !== 'string' }
                  onUpdateSize={ onUpdateLogoSize }
                  template='certeficateBlackWhite'
               />

               <div style={ {
                  display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
               } }
               >
                  <CertificateSignature width='194px' onSave={ (value) => onChange('signatureImg', value, 'metas') } signatureImage={ signatureImg } />
                  <hr
                     style={ {
                        backgroundColor: tertiaryTextColor || '#373635', border: 'none', height: '2px', margin: '0px',
                     } }
                     width='194px' />
                  <span
                     className='blackWhiteInstructorsNames'
                     style={ {
                        fontSize: '12px',
                        fontWeight: 'bold',
                        fontStretch: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: ' 0.86px',
                        fontFamily: certificateFont || 'LeagueSpartan',
                        color: tertiaryTextColor,
                     } }
                  >
                     Sign
                  </span>
               </div>

            </div>
         </div>

      </div>

   );
};

CerteficateBlackWhite.propTypes = {
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

export default CerteficateBlackWhite;
