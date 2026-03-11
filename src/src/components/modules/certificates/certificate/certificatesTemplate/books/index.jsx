import React from 'react';
import PropTypes from 'prop-types';
import books from 'assets/images/books.png';
import './index.scss';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import CertificateSignature from '../../Signature';

const BookTemplate = ({
   backgroundImage,
   title,
   belowTitle,
   courseName,
   note,
   dateIssued,
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
         className='bookTemplate'
         style={ {
            backgroundImage: `url(${ backgroundImage })`,
         } }
      >
         <div style={ { display: 'flex' } }>
            <div
               className='bookBackground'
               style={ {
                  backgroundImage: `url(${ books })`,
               } }
            />
            <div className='bookTextsRectangle'>
               <span style={ { fontFamily: certificateFont || 'PlayfairDisplay', color: secondaryTextColor || '#e29544' } } className='bookTitle'>  <input
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
               <span style={ { fontFamily: certificateFont || 'OpenSans', color: primaryTextColor || '#877760' } } className='bookBelowTitle'> <input
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
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#877760' } } className='bookStudentName'>{courseName}</span>
               <span style={ { fontFamily: certificateFont || 'OpenSans', color: primaryTextColor || '#877760' } } className='bookNote'> <textarea
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
               <span style={ { fontFamily: certificateFont || 'LucidaGrande', color: primaryTextColor || '#877760' } } className='bookCourseName'>{'{{Class Name}}'}</span>
               <div style={ {
                  display: 'flex', width: '444px', justifyContent: 'space-between', alignItems: 'flex-end',
               } }
               >
                  <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                     {/* <hr style={ { backgroundColor: tertiaryTextColor || '#373635', border: 'none', height: '2px' } } width='172px' /> */}
                     <span style={ { fontFamily: certificateFont || 'OpenSans', color: tertiaryTextColor || '#373635' } } className='bookDate'>Issued on {dateIssued}</span>
                  </div>

                  <div style={ {
                     display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
                  } }
                  >
                     <CertificateSignature width='194px' height='40px' onSave={ (value) => onChange('signatureImg', value, 'metas') } signatureImage={ signatureImg } />
                     <hr style={ { backgroundColor: tertiaryTextColor || '#373635', border: 'none', height: '2px' } } width='172px' />
                     <span style={ { fontFamily: certificateFont || 'OpenSans', color: tertiaryTextColor || '#373635' } } className='bookDate'>Sign</span>
                  </div>
               </div>
            </div>


         </div>
      </div>
   );
};

BookTemplate.propTypes = {
   backgroundImage: PropTypes.string,
   title: PropTypes.string,
   belowTitle: PropTypes.string,
   courseName: PropTypes.string,
   note: PropTypes.string,
   dateIssued: PropTypes.string,
   signatureImg: PropTypes.any,
   certificateFont: PropTypes.string,
   primaryTextColor: PropTypes.string,
   onChange: PropTypes.func,
   secondaryTextColor: PropTypes.string,
   tertiaryTextColor: PropTypes.string,
   titleSize: PropTypes.number,
   belowTitleSize: PropTypes.number,
   noteSize: PropTypes.number,
};

export default BookTemplate;
