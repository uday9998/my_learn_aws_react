import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import Signature from 'utils/signature';
import './index.scss';

const Content = ({
   title,
   belowTitle,
   note,
   dateIssued,
   changeTitle,
   changeBelowTitle,
   changeNote,
   changeDateIssued,
   changeSignatureImg,
   penColor,
   changeSignaturesPenColor,
}) => {
   const [charectersLimit, setCharectersLimit] = useState(title && title.length);
   const [charectersLimitText, setCharectersLimitText] = useState(belowTitle && belowTitle.length);
   const [charectersLimitNote, setCharectersLimitNote] = useState(note && note.length);
   const [progressEl, setProgressEl] = useState(false);
   return (
      <div className='content'>
         {/* <div className='contentRectangle'> */}

         <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Title'
               value={ title }
               placeholder='Certificate'
               onChange={ (name, value) => { changeTitle(value); setCharectersLimit(value.length); } }
               maxlength='35'
               rightLabel={ `${ charectersLimit }/35` }
            />
         </div>

         <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Text Below title'
               value={ belowTitle }
               onChange={ (name, value) => { changeBelowTitle(value); setCharectersLimitText(value.length); } }
               maxlength='40'
               rightLabel={ `${ charectersLimitText }/40` }
            />
         </div>

         {/* <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Text Above Class Name'
               value={ courseName }
               onChange={ (name, value) => changeCourseName(value) }
               maxlength='20'
            />
         </div> */}

         <div style={ { marginBottom: '24px' } }>
            <TextArea
               label='Note'
               placeholder='Enter note description here'
               value={ note }
               name='note'
               onChange={ (name, value) => { changeNote(value); setCharectersLimitNote(value.length); } }
               maxLength='60'
               rightLabel={ `${ charectersLimitNote }/60` }
            />
         </div>


         {/* <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Date Issued Description'
               placeholder='Certificate'
               value={ dateIssued }
               onChange={ (name, value) => changeDateIssued(value) }
               maxlength='8'
            />
         </div> */}
         {/*
         <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Expiry Description (If Applicable)'
               placeholder='Certificate'
               value={ expiryDescription }
               onChange={ (name, value) => changeExpiryDescription(value) }
            />
         </div> */}
         {/* <div style={ { marginBottom: '24px' } }>
            <ColorInput
               label='Color for new signatures'
               name='item_bg_color'
               value={ penColor }
               onChange={ (key, value) => changeSignaturesPenColor(value) }
               left={ true }
               withIcon={ false }
            />
         </div> */}
         <Signature
            width={ 240 }
            height={ 70 }
            penColor={ penColor }
            changeSignatureImg={ changeSignatureImg }
            changeSignaturesPenColor={ changeSignaturesPenColor }
            getUploadProgress={ (progress) => setProgressEl(progress) }
         />
         <div className='m-t-m'>
            {progressEl}
         </div>
      </div>
   );
};

Content.propTypes = {
   title: PropTypes.string,
   belowTitle: PropTypes.string,
   note: PropTypes.string,
   dateIssued: PropTypes.string,
   changeTitle: PropTypes.func,
   changeBelowTitle: PropTypes.func,
   changeNote: PropTypes.func,
   changeDateIssued: PropTypes.func,
   changeSignatureImg: PropTypes.func,
   penColor: PropTypes.string,
   changeSignaturesPenColor: PropTypes.func,
};

export default Content;
