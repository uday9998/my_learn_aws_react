import React from 'react';
import PropTypes from 'prop-types';
import circleLogo from 'assets/images/circleLogo.png';
import './index.scss';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CertificateSignature from '../../Signature';

const GreenWhite = ({
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
      <div className='greenWhite'>
         <div
            className='greenWhiteBorderImg'
            style={ {
               backgroundImage: `url(${ backgroundImage })`,
            } }
         >
            <div className='greenWhiteBackground'>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Trocchi',
                     color: primaryTextColor || '#c9b876',
                  } }
                  className='greenWhiteTitle'
               >
                  {' '}
                  <input
                     type='text'
                     onChange={ e => {
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
                  style={ {
                     fontFamily: certificateFont || 'OpenSans',
                     color: secondaryTextColor || '#345130',
                  } }
                  className='greenWhiteBelowTitle'
               >
                  {' '}
                  <input
                     type='text'
                     onChange={ e => {
                        if (e.target.value.length < 40) {
                           onChange(
                              'text_bellow_title',
                              e.target.value,
                              'metas'
                           );
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
                  style={ {
                     fontFamily: certificateFont || 'Trocchi',
                     color: primaryTextColor || '#c9b876',
                  } }
                  className='greenWhiteName'
               >
                  {courseName}
               </span>
               <span
                  style={ {
                     fontFamily: certificateFont || 'OpenSans',
                     color: secondaryTextColor || '#345130',
                  } }
                  className='greenWhiteNote'
               >
                  <input
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
                     } }
                  />
               </span>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Trocchi',
                     color: primaryTextColor || '#c9b876',
                  } }
                  className='greenWhiteCourseName'
               >
                  {'{{Class Name}}'}
               </span>

               <div style={ { display: 'flex', alignItems: 'center' } }>
                  <div
                     style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     } }
                  >
                     {/* <hr style={ { backgroundColor: tertiaryTextColor || '#345130', border: 'none', height: '2px' } } width='140px' /> */}
                     <span
                        style={ {
                           fontFamily: certificateFont || 'OpenSans',
                           color: tertiaryTextColor || '#000033',
                        } }
                        className='greenWhiteDate'
                     >
                        Issued on {dateIssued}
                     </span>
                  </div>

                  <CertificateLogo
                     src={ logo || circleLogo }
                     className={ cx({
                        greenWhiteLogo: true,
                        defaultLogo: typeof logo !== 'string',
                     }) }
                     template='greenWhite'
                     onUpdateSize={ onUpdateLogoSize }
                     isDefaultlogo={ typeof logo !== 'string' }
                  />

                  <div
                     style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                     } }
                  >
                     <CertificateSignature
                        width='180px'
                        height='40px'
                        onSave={ value => onChange('signatureImg', value, 'metas')
                        }
                        signatureImage={ signatureImg }
                     />
                     <hr style={ { backgroundColor: tertiaryTextColor || '#345130', border: 'none', height: '2px' } } width='140px' />
                     <span
                        style={ {
                           fontFamily: certificateFont || 'OpenSans',
                           color: tertiaryTextColor || '#000033',
                        } }
                        className='greenWhiteDate'
                     >
                        Sign
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

GreenWhite.propTypes = {
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

export default GreenWhite;
