import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import certificate from 'assets/images/certificate.png';
import book from 'assets/images/book.png';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import CertificateSignature from '../../Signature';

const BlackBackground = ({
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
         className='certeficateBlackBackground'
         style={ {
            backgroundImage: `url(${ backgroundImage })`,
            backgroundColor: '#383838',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
         } }
      >
         <div
            className='blackBackgroundTopLogo'
            style={ {
               backgroundImage: `url(${ book })`,
            } }
         />
         <span
            style={ {
               fontFamily: certificateFont || 'LucidaGrande',
               color: primaryTextColor || '#fbfbfb',
            } }
            className='blackBackgroundTitle'
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
         <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: secondaryTextColor || '#e1b457' } } className='blackBackgroundBelowTitle'>
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
         <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#fbfbfb' } } className='blackBackgroundStudentName'>{courseName || '{{Student Name}}'}</span>
         <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: secondaryTextColor || '#e1b457' } } className='blackBackgroundNote'>
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
         <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#fbfbfb' } } className='blackBackgroundCourseName'>{'{{Class Name}}'}</span>

         <div style={ { display: 'flex', alignItems: 'center', marginTop: '34px' } }>

            <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
               {/* <hr style={ { backgroundColor: tertiaryTextColor || '#fbfbfb', border: 'none', height: '2px' } } width='244px' /> */}
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: tertiaryTextColor || '#fbfbfb' } } className='blackBackgroundDates'>Issued on {dateIssued || 'date'}</span>
            </div>
            <CertificateLogo
               src={ logo || certificate }
               className={ cx({ blackBackgroundLogo: true, defaultLogo: typeof logo !== 'string' }) }
               onUpdateSize={ onUpdateLogoSize }
               template='blackBackground'
            />
            <div style={ {
               display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '-56px',
            } }
            >
               <CertificateSignature width='194px' onSave={ (value) => onChange('signatureImg', value, 'metas') } signatureImage={ signatureImg } />
               <hr style={ { backgroundColor: tertiaryTextColor || '#fbfbfb', border: 'none', height: '2px' } } width='244px' />
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: tertiaryTextColor || '#fbfbfb' } } className='blackBackgroundDates'>Sign</span>
            </div>

         </div>

      </div>
   );
};

BlackBackground.propTypes = {
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

export default BlackBackground;
