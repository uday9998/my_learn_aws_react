import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../form/CustomTextArea';
import './index.scss';

const CodeInput = ({ value, onChange, name }) => {
   const rowCount = (value && value.split('\n').length > 16) ? value.split('\n').length : 16;

   return (
      <div className='code__input'>
         <div className='code__input__left'>
            {new Array(rowCount).fill(0).map((row, index) => {
               const number = index + 1;
               return <div key={ number }>{number}<br /></div>;
            })}
         </div>
         <TextArea
            title={ value || '' }
            placeholder='Paste your code here'
            name={ name }
            onInputChange={ (textAreaName, textAreaValue) => onChange(textAreaName, textAreaValue) }
            style={ {
               fontSize: '16px',
               color: '#727978',
               fontWeight: '500',
               lineHeight: '168%',
               height: 'auto',
            } }
         />
         {/* <div>
       <code>
          <div>{textDescription}</div>
       </code>
    </div> */}
      </div>
   );
};

CodeInput.propTypes = {
   value: PropTypes.string,
   name: PropTypes.string,
   onChange: PropTypes.func,
};

export default CodeInput;
