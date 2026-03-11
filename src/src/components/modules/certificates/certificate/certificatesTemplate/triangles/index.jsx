import React from 'react';
import PropTypes from 'prop-types';
import triangles from 'assets/images/triangles.png';
import miniGlobus from 'assets/images/miniGlobus.png';
import './index.scss';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CertificateSignature from '../../Signature';

const Triangles = (
   {
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
   }
) => {
   return (
      <div
         className='trianglesTemplate'
         style={ {
            backgroundColor: '#f6f6f4',
            backgroundImage: `url(${ backgroundImage })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%',
            width: '100%',
            position: 'relative',
         } }
      >
         <div
            className='triangles'
            style={ backgroundImage ? {} : {
               backgroundImage: `url(${ triangles })`,
            } }
         />
         <div style={ { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } }>

            <div style={ { marginLeft: '76px' } }>
               <div style={ {
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '56px',
               } }
               >
                  {/* <hr style={ { backgroundColor: tertiaryTextColor || '#373635', border: 'none', height: '2px' } } width='172px' /> */}
                  <span style={ { fontFamily: certificateFont || 'OpenSans', color: tertiaryTextColor || '#373635' } } className='trianglesDate'>Issued {dateIssued}</span>
               </div>
               <div style={ {
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative',
               } }
               >

                  <CertificateSignature width='194px' onSave={ (value) => onChange('signatureImg', value, 'metas') } signatureImage={ signatureImg } />
                  <hr style={ { backgroundColor: tertiaryTextColor || '#373635', border: 'none', height: '2px' } } width='172px' />
                  <span style={ { fontFamily: certificateFont || 'OpenSans', color: tertiaryTextColor || '#373635' } } className='trianglesDate'>Sign</span>
               </div>
            </div>


            <div style={ {
               display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '64px',
            } }
            >
               <CertificateLogo
                  className={ cx({ trianglesLogo: true, defaultLogo: typeof logo !== 'string' }) }
                  src={ logo || miniGlobus }
                  onUpdateSize={ onUpdateLogoSize }
                  isDefaultlogo={ typeof logo !== 'string' }
                  template='triangles'
               />
               <span style={ { fontFamily: certificateFont || 'BebasNeue', color: primaryTextColor || '#373635' } } className='trianglesTitle'>
                  <textarea
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
                        overflow: 'hidden',
                     } }
                  />
               </span>
               <span style={ { fontFamily: certificateFont || 'OpenSans', color: secondaryTextColor || '#cc3838' } } className='trianglesBelowTitle'>  <input
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
               <span style={ { fontFamily: certificateFont || 'BebasNeue', color: primaryTextColor || '#373635' } } className='trianglesStudentName'>{courseName}</span>
               <span style={ { fontFamily: certificateFont || 'OpenSans', color: secondaryTextColor || '#cc3838' } } className='trianglesNote'>
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
               <span style={ { fontFamily: certificateFont || 'BebasNeue', color: primaryTextColor || '#373635' } } className='trianglesCourseName'>{'{{Class Name}}'}</span>

            </div>


         </div>
         <div style={ {
            height: '28px', width: '100%', backgroundColor: '#cc3838', position: 'absolute', bottom: 0,
         } }
         />
      </div>
   );
};

Triangles.propTypes = {
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

export default Triangles;
