import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import Signature from 'utils/signatureEdit';
import './index.scss';

const Content = ({
   certificate,
   handleInputChange,
}) => {
   const {
      metas: {
         title, text_bellow_title: belowTitle, text_above_course_name: courseName,
         note, signatureColor: penColor,
      },
   } = certificate;
   const [charectersLimit, setCharectersLimit] = useState(title && title.length);
   const [charectersLimitText, setCharectersLimitText] = useState(belowTitle && belowTitle.length);
   const [charectersLimitNote, setCharectersLimitNote] = useState(note && note.length);
   const [progressEl, setProgressEl] = useState(false);
   return (
      <div className='content'>
         <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Title'
               value={ title }
               placeholder='Certificate'
               name='title'
               onChange={ (name, value) => { handleInputChange(name, value, 'metas'); setCharectersLimit(value.length); } }
               maxlength='35'
               rightLabel={ `${ charectersLimit }/35` }
            />
         </div>

         <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Text Below title'
               value={ belowTitle }
               name='text_bellow_title'
               onChange={ (name, value) => { handleInputChange(name, value, 'metas'); setCharectersLimitText(value.length); } }
               maxlength='40'
               rightLabel={ `${ charectersLimitText }/40` }
            />
         </div>

         {/* <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Text Above Course Name'
               value={ courseName }
               name='text_above_course_name'
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
            />
         </div> */}

         <div style={ { marginBottom: '24px' } }>
            <TextArea
               label='Note'
               placeholder='Enter note description here'
               value={ note }
               name='note'
               onChange={ (name, value) => { handleInputChange(name, value, 'metas'); setCharectersLimitNote(value.length); } }
               maxLength='60'
               rightLabel={ `${ charectersLimitNote }/60` }
            />
         </div>


         {/* <div style={ { marginBottom: '24px' } }>
            <TextInput
               label='Date Issued Description'
               placeholder='Certificate'
               value={ dateIssued }
               name='updated_at'
               onChange={ (name, value) => handleInputChange(name, value, 'certificate') }
            />
         </div> */}
         <Signature
            width={ 240 }
            height={ 70 }
            penColor={ penColor }
            changeSignatureImg={ (name, value) => handleInputChange(name, value, 'metas') }
            changeSignaturesPenColor={ (name, value) => handleInputChange(name, value, 'metas') }
            onChange={ (name, value) => handleInputChange('signatureColor', value, 'metas') }
            getUploadProgress={ (progress) => setProgressEl(progress) }
         />
         <div className='m-t-m'>
            {progressEl}
         </div>
      </div>
   );
};

Content.propTypes = {
   handleInputChange: PropTypes.func,
   certificate: PropTypes.object,
};

export default Content;
