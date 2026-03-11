import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import mediumGlobus from 'assets/images/mediumGlobus.png';
import CertificateLogo from 'components/modules/certificates/CertificateLogo';
import cx from 'classnames';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CertificateSignature from '../../Signature';

const YellowFloral = ({
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
      <div className='yellowFloral'>
         <div
            className='yellowFloralBackground'
            style={ {
               backgroundImage: `url(${ backgroundImage })`,
            } }
         >
            <div className='yellowFloralLeftSideBackground'>
               <CertificateLogo
                  src={ logo || mediumGlobus }
                  className={ cx({
                     yellowFloralLogo: true,
                     defaultLogo: typeof logo !== 'string',
                  }) }
                  isDefaultlogo={ typeof logo !== 'string' }
                  template='yellowFloral'
                  onUpdateSize={ onUpdateLogoSize }
               />
            </div>

            <div className='yellowFloralTextsRectangle'>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Norwester',
                     color: primaryTextColor || '#1d2c3e',
                  } }
                  className='yellowFloralTitle'
               >
                  <textarea
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
                        overflow: 'hidden',
                     } }
                  />
               </span>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Lustria',
                     color: secondaryTextColor || '#1d2c3e',
                  } }
                  className='yellowFloralBelowTitle'
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
                     fontFamily: certificateFont || 'Norwester',
                     color: primaryTextColor || '#1d2c3e',
                  } }
                  className='yellowFloralName'
               >
                  {courseName}
               </span>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Lustria',
                     color: secondaryTextColor || '#1d2c3e',
                  } }
                  className='yellowFloralNote'
               >
                  <input
                     type='text'
                     onChange={ e => {
                        if (e.target.value.length < 60) {
                           onChange('note', e.target.value, 'metas');
                        } else if (isPrint('You are reached character limit')) {
                           toast.error('You are reached character limit');
                        }
                     } }
                     value={
                        note
                        || 'has successfully completed Basic Graphic Design at Eight Dots Studio.'
                     }
                     style={ {
                        fontSize: `${ noteSize }px`,
                     } }
                  />
               </span>
               <span
                  style={ {
                     fontFamily: certificateFont || 'Norwester',
                     color: primaryTextColor || '#1d2c3e',
                  } }
                  className='yellowFloralName'
               >
                  {'{{Class Name}}'}
               </span>
               <div
                  style={ {
                     width: '347px',
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'flex-end',
                  } }
               >
                  <div
                     style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     } }
                  >
                     {/* <hr style={ { backgroundColor: tertiaryTextColor || '#1d2c3e', border: 'none', height: '2px' } } width='140px' /> */}
                     <span
                        style={ {
                           fontFamily: certificateFont || 'Lustria',
                           color: tertiaryTextColor || '#1d2c3e',
                        } }
                        className='yellowFloralDate'
                     >
                        Issued on {dateIssued}
                     </span>
                  </div>

                  <div
                     style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                     } }
                  >
                     <CertificateSignature
                        width='194px'
                        height='40px'
                        onSave={ value => onChange('signatureImg', value, 'metas')
                        }
                        signatureImage={ signatureImg }
                     />
                     <hr style={ { backgroundColor: tertiaryTextColor || '#1d2c3e', border: 'none', height: '2px' } } width='140px' />
                     <span
                        style={ {
                           fontFamily: certificateFont || 'Lustria',
                           color: tertiaryTextColor || '#1d2c3e',
                        } }
                        className='yellowFloralDate'
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

YellowFloral.propTypes = {
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

export default YellowFloral;
